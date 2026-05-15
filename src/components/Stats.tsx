import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { LogEntry } from '../hooks/useLogs';
import { motion } from 'motion/react';

interface StatsProps {
  logs: LogEntry[];
}

export default function Stats({ logs }: StatsProps) {
  const chartData = [...logs]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(-7)
    .map(log => ({
      ...log,
      dateStr: format(log.date, 'MMM dd'),
    }));

  if (logs.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-[#374151] bg-[#1f2937] rounded-3xl text-[#94a3b8] italic">
        Add logs to visualize your progress
      </div>
    );
  }

  const latest = logs[0];
  
  // Example targets based on common values, can be made dynamic later
  const targets = {
    proteins: 180,
    calories: 2200,
    water: 3.5 // Mock for visual
  };

  const getProgress = (value: number, target: number) => {
    return Math.min(Math.round((value / target) * 100), 100);
  };

  return (
    <div className="space-y-8">
      {/* Macro Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2">Protein</p>
          <p className="text-3xl font-bold">{latest.proteins}g</p>
          <p className="text-xs text-[#10b981] mt-1 font-medium">Target: {targets.proteins}g</p>
          <div className="h-1.5 bg-[#374151] rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getProgress(latest.proteins, targets.proteins)}%` }}
              className="h-full bg-[#10b981] rounded-full"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2">Calories</p>
          <p className="text-3xl font-bold">{latest.calories.toLocaleString()}</p>
          <p className="text-xs text-[#10b981] mt-1 font-medium">Target: {targets.calories}</p>
          <div className="h-1.5 bg-[#374151] rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getProgress(latest.calories, targets.calories)}%` }}
              className="h-full bg-[#10b981] rounded-full"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2">Current Weight</p>
          <p className="text-3xl font-bold">{latest.weight}kg</p>
          <p className="text-xs text-[#f43f5e] mt-1 font-medium">Synced today</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2">Log Volume</p>
          <p className="text-3xl font-bold">{logs.length}</p>
          <p className="text-xs text-[#94a3b8] mt-1 font-medium">Total records</p>
        </motion.div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1f2937] p-8 rounded-3xl border border-[#374151]"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-8">Weight Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.5} />
                <XAxis 
                  dataKey="dateStr" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  domain={['auto', 'auto']}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    borderRadius: '12px', 
                    border: '1px solid #374151',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1f2937] p-8 rounded-3xl border border-[#374151] flex items-center justify-center italic text-[#94a3b8]"
        >
          Trend Analytics Placeholder
        </motion.div>
      </div>
    </div>
  );
}
