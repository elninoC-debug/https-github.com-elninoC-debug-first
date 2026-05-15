import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ListTodo } from 'lucide-react';

interface LogFormProps {
  onAdd: (data: {
    proteins: number;
    calories: number;
    fats: number;
    carbs: number;
    weight: number;
    notes: string;
    date: Date;
  }) => Promise<void>;
}

export default function LogForm({ onAdd }: LogFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    proteins: '',
    calories: '',
    fats: '',
    carbs: '',
    weight: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd({
        proteins: Number(formData.proteins) || 0,
        calories: Number(formData.calories) || 0,
        fats: Number(formData.fats) || 0,
        carbs: Number(formData.carbs) || 0,
        weight: Number(formData.weight) || 0,
        notes: formData.notes,
        date: new Date(formData.date),
      });
      setFormData({
        proteins: '',
        calories: '',
        fats: '',
        carbs: '',
        weight: '',
        notes: '',
        date: new Date().toISOString().split('T')[0],
      });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#10b981] text-[#0b0e14] rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40 cursor-pointer"
      >
        <Plus className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-[#111827] rounded-[32px] overflow-hidden shadow-2xl border border-[#1f2937]"
            >
              <div className="flex items-center justify-between p-8 border-b border-[#1f2937]">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-[#10b981]" />
                  Log Daily Metrics
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-[#1f2937] rounded-full transition-colors cursor-pointer text-[#94a3b8]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Service Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full h-12 px-4 bg-[#1f2937] border border-[#374151] text-white rounded-xl outline-hidden focus:border-[#10b981] transition-all font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                      className="w-full h-12 px-4 bg-[#1f2937] border border-[#374151] text-white rounded-xl outline-hidden focus:border-[#10b981] transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Prot (g)', key: 'proteins' },
                    { label: 'Cal (kcal)', key: 'calories' },
                    { label: 'Fat (g)', key: 'fats' },
                    { label: 'Carbs (g)', key: 'carbs' }
                  ].map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">{field.label}</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full h-12 px-4 bg-[#1f2937] border border-[#374151] text-white rounded-xl outline-hidden focus:border-[#10b981] transition-all font-mono"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Daily Notes</label>
                  <textarea
                    placeholder="Log your mood, recovery, or training highlights..."
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full h-24 px-4 py-3 bg-[#1f2937] border border-[#374151] text-white rounded-xl outline-hidden focus:border-[#10b981] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[#10b981] text-[#0b0e14] rounded-2xl font-bold hover:bg-[#34d399] active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#10b981]/20"
                >
                  {loading ? 'Processing...' : 'Submit Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
