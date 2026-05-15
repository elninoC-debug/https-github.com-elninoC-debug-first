import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { LogIn, Zap } from 'lucide-react';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0b0e14]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] rounded-[40px] p-12 shadow-2xl border border-[#1f2937]"
      >
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="w-20 h-20 bg-[#10b981] rounded-3xl flex items-center justify-center text-[#0b0e14] rotate-3 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <Zap className="w-10 h-10 fill-current" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tighter text-white">MACROMETRIC</h1>
            <p className="text-[#94a3b8] text-sm">Professional nutrition tracking for athletes.</p>
          </div>

          <button
            onClick={signIn}
            className="w-full h-14 bg-[#10b981] text-[#0b0e14] rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#34d399] transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#10b981]/20"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="pt-4 space-y-2">
            <p className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-widest">Powered by Gemini AI</p>
            <p className="text-[10px] text-[#4b5563]">Secure • Private • Performance-First</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
