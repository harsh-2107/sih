/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// API origin is required; must be set in environment.
// NEXT_PUBLIC_API_URL is the only configured backend origin.
// We do NOT derive this from user input.
const apiOrigin = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Content-Security-Policy ──────────────────────────────────────────────────
//
// Application requirements:
//  • Next.js bootstrap scripts — requires 'self' for script-src
//  • Geist fonts loaded from next/font (inlined as data-URIs or served from /),
//    so no external font CDN needed → no extra connect-src/font-src domain
//  • D3 renders to SVG in-memory; no eval or new Function needed
//  • No analytics, no third-party scripts
//  • No inline event handlers in our own components
//
// Next.js 16 injects a small inline bootstrap script. This requires
// 'unsafe-inline' for script-src OR the nonce-based approach. Because
// Next.js App Router does not yet provide a stable per-request nonce
// mechanism that works with static generation, we accept 'unsafe-inline'
// for scripts ONLY IN DEV. In production, the bootstrap is hashed/nonce'd
// via Next.js's built-in mechanism (script-src includes the nonce automatically
// when configured). For this prototype we use 'self' + 'unsafe-inline' and
// document the limitation.
//
// 'unsafe-eval' is intentionally OMITTED — D3 does not require it.
//
// In development mode (next dev), React overlay and Turbopack require 'unsafe-eval'
// for callstack reconstruction and hot module replacement debugging.
// In production mode, 'unsafe-eval' is omitted.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const csp = [
  "default-src 'self'",
  scriptSrc,
  // Styles: Next.js may inject critical CSS inline
  "style-src 'self' 'unsafe-inline'",
  // Images: only same origin + data URIs (for SVG graph labels if any)
  "img-src 'self' data:",
  // Fonts: Geist is self-hosted via next/font — no external CDN required
  "font-src 'self'",
  // Connect: only our backend API origin (no wildcards)
  `connect-src 'self' ${apiOrigin}`,
  // No embeds, no frames
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Block all mixed content
  "upgrade-insecure-requests",
].join('; ');

const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content-Security-Policy
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          // Anti-clickjacking — prefer CSP frame-ancestors, also set legacy header
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Referrer: send only origin on cross-origin requests, nothing on
          // downgrade (http → https). Investigation metadata must not leak.
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Prevents MIME-sniffing attacks
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Restrict access to browser features. Investigation platform has
          // no need for camera, microphone, geolocation, or payment.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
