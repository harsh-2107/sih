"use client";

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Zap } from 'lucide-react';
import { getMockAIResponse } from '@/lib/mock/ai';

const SUGGESTED_QUERIES = [
  "What is the strongest connection in this case?",
  "What changed after the latest evidence?",
  "Which entities connect separate clusters?",
  "What evidence connects Victor Vance and Apex Global?",
  "Which anomaly needs the most attention?",
  "Who authorized the $450k wire transfer?",
];

export default function QnABar({ selectedNode, embedded = false }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'CrimeNet AI Copilot active. Ask any question about network topology, financial trails, entity connections, or anomalies in CASE-2049.',
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
      const responseText = getMockAIResponse(q);
      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
      setIsThinking(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-xl shadow-lg flex flex-col gap-3 h-[520px]">

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
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--primary)]/12 text-[var(--primary)] border border-[var(--primary)]/20">
            Focus: {selectedNode.name}
          </span>
        )}
      </div>

      {/* Message feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse ml-4' : 'mr-4'}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--accent)]/12 text-[var(--accent)] border border-[var(--accent)]/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
            </div>
            <div
              className={`px-3 py-2.5 rounded-xl text-[12px] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[var(--primary)] text-white rounded-tr-none'
                  : 'bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] italic">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[var(--accent)]" />
            <span>Analysing graph topology…</span>
          </div>
        )}
      </div>

      {/* Suggested queries */}
      {messages.length <= 1 && (
        <div className="space-y-1.5 shrink-0">
          <div className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3" /> Suggested Queries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="px-2.5 py-1 rounded-lg text-[11px] bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/30 transition-all font-medium"
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
          className="flex-1 px-3 py-2 text-[12px] rounded-xl bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] font-sans transition-colors"
        />
        <button
          type="submit"
          disabled={!query.trim() || isThinking}
          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-40 flex items-center gap-1.5 text-[12px] font-semibold transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
