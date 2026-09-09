"use client";

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Zap, FileText, Network, ArrowRight } from 'lucide-react';
import { getMockAIResponse } from '@/lib/mock/ai';

const SUGGESTED_QUERIES = [
  "What is the strongest connection in this case?",
  "What changed after the latest evidence?",
  "Which entities connect separate clusters?",
  "What evidence connects Victor Vance and Apex Global?",
  "Which anomaly needs the most attention?",
];

export default function QnABar({ selectedNode, onSelectNode, onSelectTab, embedded = false }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      data: {
        finding: 'CrimeNet AI Copilot active. Ready for GraphRAG investigation queries for CASE-2049.',
        supportingEvidence: ['EVID-2024-001 through 006 Ingested'],
        relevantEntities: ['Victor Vance', 'Apex Global Trading', 'Warehouse 12 Pier 9'],
        relevantRelationships: ['Beneficial Ownership', 'Physical Entry', 'Financial Wire'],
        evidenceBasis: 'Knowledge graph continuously synchronised with verified case evidence repository.',
      },
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = (text) => {
    const q = (text || query).trim();
    if (!q || isThinking) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const responseData = getMockAIResponse(q);
      setMessages((prev) => [...prev, { sender: 'ai', data: responseData }]);
      setIsThinking(false);
    }, 500 + Math.random() * 400);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg flex flex-col gap-3 h-[560px]">

      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[var(--divider)] shrink-0">
        <div className="p-1.5 rounded-lg bg-[var(--accent)]/12 border border-[var(--accent)]/20">
          <Sparkles className="w-4 h-4 text-[var(--accent)]" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[var(--text-primary)]">AI Copilot</div>
          <div className="text-[10px] font-mono text-[var(--text-tertiary)]">CrimeNet GraphRAG · CASE-2049</div>
        </div>
        {selectedNode && (
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--primary)]/12 text-[var(--primary)] border border-[var(--primary)]/20 truncate max-w-[120px]">
            Focus: {selectedNode.name}
          </span>
        )}
      </div>

      {/* Message feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar"
      >
        {messages.map((msg, idx) => {
          if (msg.sender === 'user') {
            return (
              <div key={idx} className="flex items-start gap-2.5 flex-row-reverse ml-6">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0">
                  <User className="w-3 h-3" />
                </div>
                <div className="px-3 py-2 rounded-xl text-[12px] leading-relaxed bg-[var(--primary)] text-white rounded-tr-none font-medium">
                  {msg.text}
                </div>
              </div>
            );
          }

          const d = msg.data || {};
          return (
            <div key={idx} className="flex items-start gap-2.5 mr-2">
              <div className="w-6 h-6 rounded-full bg-[var(--accent)]/12 text-[var(--accent)] border border-[var(--accent)]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 p-3.5 rounded-xl text-[12px] leading-relaxed bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-none space-y-2.5">
                {/* Finding */}
                <div>
                  <div className="text-[10px] font-mono font-semibold text-[var(--accent)] uppercase tracking-wider mb-0.5">
                    Finding
                  </div>
                  <div className="font-semibold text-[var(--text-primary)] text-[12px] leading-snug">
                    {d.finding}
                  </div>
                </div>

                {/* Supporting Evidence */}
                {d.supportingEvidence && d.supportingEvidence.length > 0 && (
                  <div>
                    <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                      Supporting Evidence
                    </div>
                    <ul className="space-y-0.5">
                      {d.supportingEvidence.map((ev, i) => (
                        <li key={i} className="text-[11px] text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                          <FileText className="w-3 h-3 text-[var(--primary)] shrink-0" />
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Relevant Entities */}
                {d.relevantEntities && d.relevantEntities.length > 0 && (
                  <div>
                    <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                      Relevant Entities
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {d.relevantEntities.map((ent, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => onSelectTab && onSelectTab('network')}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 hover:bg-[var(--primary)]/20 transition-colors"
                        >
                          {ent}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evidence Basis */}
                {d.evidenceBasis && (
                  <div className="pt-2 border-t border-[var(--divider)] text-[11px] text-[var(--text-secondary)] italic">
                    <span className="font-semibold not-italic text-[var(--text-primary)] font-mono text-[10px] uppercase">Basis: </span>
                    {d.evidenceBasis}
                  </div>
                )}

                {/* Buttons: View Evidence / View Graph */}
                <div className="pt-2 flex items-center gap-2 border-t border-[var(--divider)]">
                  {onSelectTab && (
                    <>
                      <button
                        type="button"
                        onClick={() => onSelectTab('evidence')}
                        className="px-2.5 py-1 rounded-md bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30 hover:bg-[var(--primary)]/25 text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View Evidence</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectTab('network')}
                        className="px-2.5 py-1 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/25 text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <Network className="w-3 h-3" />
                        <span>View Graph</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] italic px-2 py-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[var(--accent)]" />
            <span>Traversing knowledge graph & evidence vectors…</span>
          </div>
        )}
      </div>

      {/* Suggested queries */}
      {messages.length <= 1 && (
        <div className="space-y-1.5 shrink-0">
          <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-[var(--accent)]" /> Suggested Graph Queries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="px-2.5 py-1 rounded-lg text-[11px] bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/40 transition-all font-medium text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="pt-2 border-t border-[var(--divider)] flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about entity connections, anomalies, or financial trails…"
          className="flex-1 px-3 py-2 text-[12px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
        <button
          type="submit"
          disabled={!query.trim() || isThinking}
          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-40 flex items-center gap-1.5 text-[12px] font-semibold transition-all shrink-0 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}

