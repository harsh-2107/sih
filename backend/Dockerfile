# ──────────────────────────────────────────────────────────────────────────────
# backend/Dockerfile
# Multi-stage build for Express backend with argon2 native compilation support
# ──────────────────────────────────────────────────────────────────────────────

# ---------------------------------------------------------------------------
# Stage 1: builder — install build tools & compile native Node modules (argon2)
# ---------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Build dependencies required by node-gyp for native module compilation
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

# ---------------------------------------------------------------------------
# Stage 2: base — clean runtime image with pre-compiled node_modules
# ---------------------------------------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# ---------------------------------------------------------------------------
# Stage 3: development — local dev with live reload via nodemon
# ---------------------------------------------------------------------------
FROM base AS development
ENV NODE_ENV=development

COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]

# ---------------------------------------------------------------------------
# Stage 4: production — minimal production image
# ---------------------------------------------------------------------------
FROM base AS production
ENV NODE_ENV=production

COPY src ./src

USER node
EXPOSE 5000
CMD ["npm", "start"]
