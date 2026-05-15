import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLogs } from '../hooks/useLogs';
import { motion } from 'motion/react';
import { LogOut, User as UserIcon, Calendar, Trash2, LayoutDashboard, Database, Weight, Settings } from 'lucide-react';
import { format } from 'date-fns';
import LogForm from './LogForm';
import Stats from './Stats';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { logs, loading, addLog, deleteLog } = useLogs(user?.uid);

  return (
    <div className="flex min-h-screen bg-[#0b0e14]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-[#1f2937] p-8 flex flex-col hidden lg:flex">
        <div className="text-xl font-extrabold text-[#10b981] mb-12 tracking-tighter">MACROMETRIC</div>
        
        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#10b981]/10 text-[#10b981] font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1f2937] transition-all">
            <Database className="w-5 h-5" />
            Nutrition Log
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1f2937] transition-all">
            <Weight className="w-5 h-5" />
            Body Weight
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1f2937] transition-all">
            <Settings className="w-5 h-5" />
            Goal Settings
          </a>
        </nav>

        <div className="mt-auto flex items-center gap-3 p-3 bg-[#1f2937] border border-[#374151] rounded-2xl">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#10b981]">
            {user?.photoURL ? <img src={user.photoURL} alt="" /> : <UserIcon className="w-4 h-4 m-2" />}
          </div>
          <span className="text-xs font-semibold truncate">{user?.displayName?.split(' ')[0]}</span>
          <button onClick={logout} className="ml-auto p-1.5 hover:text-[#f43f5e] transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold">Daily Overview</h1>
            <p className="text-[#94a3b8] text-sm mt-1">{format(new Date(), 'MMMM dd, yyyy')} • Tracking Active</p>
          </div>
          <button 
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="space-y-12">
          {/* Main Stats */}
          <Stats logs={logs} />

          {/* Recent History */}
          <section className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Entry History</h2>

            <div className="space-y-4">
              {loading ? (
                <div className="h-20 animate-pulse bg-[#1f2937] rounded-2xl" />
              ) : logs.length === 0 ? (
                <div className="p-12 text-center text-[#94a3b8] bg-[#1f2937] rounded-3xl border border-[#374151]">
                  No entries recorded yet.
                </div>
              ) : (
                logs.map((log) => (
                  <motion.div
                    key={log.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#1f2937] border border-[#374151] rounded-2xl hover:border-[#10b981] transition-all items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#111827] rounded-xl flex items-center justify-center border border-[#374151]">
                        <span className="text-[#10b981] text-xs font-bold">{format(log.date, 'dd')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{format(log.date, 'EEE, MMM dd')}</p>
                        <p className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">{log.notes ? 'Entry w/ Notes' : 'Metric Entry'}</p>
                      </div>
                    </div>

                    <div className="text-center font-mono">
                      <span className="bg-[#10b981]/10 text-[#10b981] px-2 py-1 rounded-md text-xs font-bold">{log.proteins}g Prot</span>
                    </div>

                    <div className="text-center hidden lg:block">
                      <p className="text-sm font-bold">{log.calories} kcal</p>
                      <p className="text-[10px] text-[#94a3b8] uppercase">Calories</p>
                    </div>

                    <div className="flex items-center justify-end gap-6 text-right">
                      <div>
                        <p className="text-sm font-bold">{log.weight} kg</p>
                        <p className="text-[10px] text-[#94a3b8] uppercase">Weight</p>
                      </div>
                      <button 
                        onClick={() => deleteLog(log.id)}
                        className="p-2 text-[#374151] hover:text-[#f43f5e] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Floating Add Button */}
        <LogForm onAdd={addLog} />
      </main>
    </div>
  );
}
