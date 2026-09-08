# Development Guide & Commands — CrimeNet AI

This guide contains all necessary commands and configurations for running the **CrimeNet AI** platform in development mode using Docker Compose.

---

## 🚀 Quick Start (Development Mode)

### 0. Prerequisites

- Docker ≥ 24 and Docker Compose V2 (`docker compose`, not `docker-compose`)
- Copy the environment file and edit secrets:

```bash
cp .env.example .env
# Edit .env — at minimum change *_PASSWORD values
```

> **Ollama / LLM note:** Agent 1 and Agent 4 default to Ollama running on your host machine.
> The Docker images point to `http://host.docker.internal:11434` (works on Docker Desktop on Mac/Windows).
> On **Linux** with Docker Engine, run Ollama on the host and set:
> ```
> LLM_BASE_URL=http://172.17.0.1:11434/v1
> NL_LLM_BASE_URL=http://172.17.0.1:11434/v1
> ```
> or change `host.docker.internal` to your host's Docker bridge IP in `.env`.

---

### 1. Start All Development Services

To build images and start containers in development mode with **Hot Reloading**:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

> **Note:**
> - Source code from `./frontend`, `./backend`, and `./processing` is mounted into containers. Changes saved on your host will immediately reflect inside the running containers without rebuilding images.
> - `node_modules` are stored in named Docker volumes to prevent host dependency overwrites.
> - **First build of `processing`** downloads all ML wheels (~2–4 GB: spacy, transformers, surya-ocr, etc.).  
>   This is a **one-time cost** — Docker BuildKit stores the pip cache on your host machine.  
>   **Subsequent builds skip all downloads** and run in under 60 seconds.
> - Ensure Docker BuildKit is enabled (default in Docker ≥ 23). If you see slow pip downloads on every build, run:
>   ```bash
>   export DOCKER_BUILDKIT=1
>   ```

---

### 2. Accessing Running Applications

| Service | Host URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:3000](http://localhost:3000) | Next.js App Router UI |
| **Backend API** | [http://localhost:5000](http://localhost:5000) | Express.js REST API |
| **Processing API** | [http://localhost:8000](http://localhost:8000) | FastAPI ML pipeline |
| **PostgreSQL** | `localhost:5433` | Direct DB connection (`POSTGRES_PORT`) |
| **Neo4j Browser** | [http://localhost:7474](http://localhost:7474) | Graph DB UI (`NEO4J_HTTP_PORT`) |
| **Neo4j Bolt** | `localhost:7687` | Bolt protocol (`NEO4J_BOLT_PORT`) |

---

### 3. View Service Logs

Follow live logs for all running services:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
```

To view logs for a specific service:

```bash
# Backend logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f backend

# Frontend logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f frontend

# FastAPI processing logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f processing

# Neo4j logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f neo4j

# PostgreSQL logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f postgres
```

---

### 4. Health Check Verification

```bash
# Backend
curl http://localhost:5000/api/health

# FastAPI processing
curl http://localhost:8000/
```

Expected processing response:
```json
{
  "status": "active",
  "services": ["Agent 1 Extraction", "Agent 2 Resolution", "Agent 3 Graph Builder", "Agent 4 GraphRAG"]
}
```

---

### 5. Database Migrations

Run database migrations against the running PostgreSQL container:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec backend npm run migrate
```

---

### 6. Interactive Container Shells

```bash
# Shell inside backend container
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec backend sh

# Shell inside processing container
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec processing bash

# Shell inside frontend container
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec frontend sh

# PostgreSQL CLI
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec postgres psql -U postgres -d sih_db

# Neo4j Cypher shell
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec neo4j cypher-shell -u neo4j -p <your_neo4j_password>
```

---

### 7. Rebuilding Services (Dependency Changes)

If you add new Python packages to `processing/requirements.txt` or Node packages to `package.json`:

```bash
# Rebuild the processing service
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build processing

# Rebuild backend service
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build backend

# Rebuild frontend service
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build frontend
```

---

### 8. Stop Services & Cleanup

#### Stop Containers (Preserve Volume Data)
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

#### Stop Containers & Delete All Dev Volumes
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

---

## 🏭 Production Mode

```bash
cp .env.example .env
# Set NODE_ENV=production, strong passwords, real NEXT_PUBLIC_API_URL, etc.

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

In production:
- Neo4j and processing ports are **not** exposed to the host (internal network only).
- The processing service runs with 2 uvicorn workers.
- Place a reverse proxy (nginx / Caddy) in front of ports 3000 and 5000 for TLS termination.

---

## 🛠 Architectural Overview

```
                          ┌── sih-network (Docker bridge) ──────────────────────────────┐
                          │                                                               │
  Browser ──HTTP──►  :3000│  [frontend]  ──API──►  :5000│  [backend]  ──SQL──►  :5432│  [postgres]
                          │    Next.js                    │   Express                  │   PG 15
                          │                               │      │                    │
                          │                               │      └──HTTP──►  :8000│  [processing]
                          │                               │                   FastAPI│   4 Agents
                          │                               │                          │      │
                          │                               │                          │   :7687│  [neo4j]
                          └──────────────────────────────────────────────────────────┘
```

**Data flows:**
- **Browser → Frontend:** React/Next.js UI served on port 3000.
- **Frontend → Backend:** API calls to `NEXT_PUBLIC_API_URL` (port 5000), cookies included.
- **Backend → Processing:** Express proxies ML tasks to `PROCESSING_API_URL` (port 8000).
- **Processing → PostgreSQL:** All four agents share the same `DATABASE_URL`.
- **Processing → Neo4j:** Agents 3 & 4 write/read the knowledge graph via Bolt (port 7687).
- **Authentication:** HttpOnly session cookies set by backend; never stored in localStorage.
