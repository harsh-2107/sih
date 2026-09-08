"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage({ mode = "login" }) {
  const router = useRouter();
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans text-[#17201F] bg-[#E9E7E1]">
      
      {/* ─── LEFT PANEL (Dark Primary Hero) ─────────────────────────────────── */}
      <div className="lg:w-1/2 bg-[#174A46] text-[#EFF2ED] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden select-none min-h-[380px] lg:min-h-screen">
        
        {/* Top Brand Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-7 h-7 rounded-lg bg-[#2E6E63] border border-[#3F8A82]/40 flex items-center justify-center text-white shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-semibold text-[15px] tracking-wide text-white">
            CrimeNet AI
          </span>
        </div>

        {/* Center Hero Content */}
        <div className="my-auto py-10 z-10 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight leading-[1.08] text-white">
            One case.
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight leading-[1.08] text-[#6FA79B] mb-6">
            One connected network.
          </h2>
          <p className="text-[16px] text-[#A1AAA6] leading-[1.5] font-normal max-w-md">
            Surface hidden relationships across people, places, and records before a lead goes cold.
          </p>
        </div>

        {/* Bottom Left Footer */}
        <div className="z-10 text-[12px] font-mono font-medium text-[#66716F] tracking-wider uppercase">
          CrimeNet AI &nbsp;•&nbsp; Criminal Network Analysis Platform
        </div>

        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>


      {/* ─── RIGHT PANEL (Light Form Container) ─────────────────────────────────── */}
      <div className="lg:w-1/2 bg-[#E9E7E1] p-8 lg:p-16 flex items-center justify-center min-h-[500px] lg:min-h-screen">
        <div className="w-full max-w-sm space-y-6">
          
          {/* Header text */}
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#174A46]">
              SECURE ACCESS
            </span>
            <h2 className="text-[30px] sm:text-[32px] font-semibold text-[#17201F] tracking-tight mt-1">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-[15px] text-[#66716F] mt-2 leading-[1.5]">
              {isLogin
                ? "Sign in to access your assigned cases and intelligence feed."
                : "Register with your official credentials to get access to assigned cases."}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[#B84B4B] flex items-start gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[14px] font-medium text-[#17201F]">
                Official email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@crimenet.gov.in"
                required
                autoComplete="email"
                className="w-full px-3.5 py-2.5 text-[15px] placeholder:text-[15px] rounded-lg bg-[#F7F8F5CC] text-[#17201F] border border-[#CCD3CE] placeholder-[#66716F]/70 focus:outline-none focus:border-[#174A46] transition-all font-sans"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[14px] font-medium text-[#17201F]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full px-3.5 py-2.5 text-[15px] placeholder:text-[15px] rounded-lg bg-[#F7F8F5CC] text-[#17201F] border border-[#CCD3CE] placeholder-[#66716F]/70 focus:outline-none focus:border-[#174A46] transition-all pr-10 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66716F] hover:text-[#17201F] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-[#174A46] hover:bg-[#103A37] text-white font-semibold text-[15px] transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              <span>{isSubmitting ? "Authenticating..." : (isLogin ? "Sign in securely" : "Create account")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </form>

          {/* Footer Navigation Link */}
          <div className="pt-2 text-center text-[14px] text-[#66716F]">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#174A46] font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-[#174A46] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
