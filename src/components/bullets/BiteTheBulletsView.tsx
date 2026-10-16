import React, { useState, useEffect } from 'react';
import {
  Compass,
  FileSpreadsheet,
  Megaphone,
  HeartHandshake,
  SearchCode,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Save,
  MessageSquare,
  Check,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BiteTheBulletsViewProps {
  bulletId: 'elevator-pitch' | 'pra-pengabaran' | 'materi-pengabaran' | 'materi-pembinaan' | 'aora';
}

export const BiteTheBulletsView: React.FC<BiteTheBulletsViewProps> = ({ bulletId }) => {
  const { bullets, updateBulletModule, triggerCelebration, addNotification, currentUser } = useApp();
  const module = bullets[bulletId];

  // Elevator Pitch Timer
  const [pitchSeconds, setPitchSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // AORA Worksheet State
  const [aoraForm, setAoraForm] = useState({
    ask: 'Apa kendala warga wilayah ka04 belum membuka pintu silaturahmi?',
    observe: 'Audiens cenderung terburu-buru saat jam pulang kerja, respon verbal ramah tapi ragu.',
    research: 'Kajian unit ka02 menunjukkan pendekatan terbaik adalah di akhir pekan pagi saat kerja bakti.',
    act: 'Jadwalkan silaturahmi santai dengan membawa kue tradisional pada Minggu pagi pukul 09:00 WIB.',
  });

  useEffect(() => {
    let t: any;
    if (isTimerRunning && pitchSeconds > 0) {
      t = setInterval(() => setPitchSeconds((s) => s - 1), 1000);
    } else if (pitchSeconds === 0) {
      setIsTimerRunning(false);
      triggerCelebration();
      addNotification('Elevator Pitch Tuntas! ⏱️', 'Waktu 60 detik tepat berakhir. Latihan artikulasi Anda luar biasa.', 'achievement');
    }
    return () => clearInterval(t);
  }, [isTimerRunning, pitchSeconds]);

  const toggleChecklist = (checkId: string) => {
    if (!module) return;
    const updated = {
      ...module,
      checklistItems: module.checklistItems.map((item) =>
        item.id === checkId ? { ...item, done: !item.done } : item
      ),
    };
    updateBulletModule(bulletId, updated);
  };

  if (!module) return <div>Modul tidak ditemukan.</div>;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bite The Bullets Series</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
            {module.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {module.tagline}
          </p>
        </div>

        {bulletId === 'elevator-pitch' && (
          /* Pitch Timer Widget */
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black font-mono text-sky-400">
                00:{pitchSeconds.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Batas 60 Detik</span>
            </div>
            <div className="flex space-x-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all ${
                  isTimerRunning ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setPitchSeconds(60);
                }}
                className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Description & Core Concept */}
      <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
        {module.description}
      </div>

      {/* Checklist & Practical SOP */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-white text-base flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Daftar Periksa & Kaidah Standar Operasional (SOP)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tandai setiap butir yang telah dipenuhi sebelum dan saat pelaksanaan di lapangan.
        </p>
        <div className="space-y-2">
          {module.checklistItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs md:text-sm ${
                item.done
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-sky-400/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? 'bg-emerald-500 text-white' : 'border border-slate-400'
                  }`}
                >
                  {item.done && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className={item.done ? 'line-through opacity-80' : 'font-medium'}>
                  {item.text}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                {item.done ? 'Terpenuhi' : 'Belum'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Tactical Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {module.frameworkSteps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
              0{idx + 1}
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">{step.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 text-[11px] text-amber-600 dark:text-amber-300">
              <strong>Tips Lapangan:</strong> {step.tips}
            </div>
          </div>
        ))}
      </div>

      {/* Special Module: AORA Interactive Matrix */}
      {bulletId === 'aora' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
              <SearchCode className="w-5 h-5 text-teal-400" />
              <span>Lembar Kerja Interaktif AORA Lapangan ({currentUser.unit})</span>
            </h3>
            <span className="text-xs text-teal-400 font-bold">Matriks 4 Kuadran</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Ask */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-2">
              <label className="font-bold text-sky-500 dark:text-sky-300 uppercase tracking-wider block">
                A - ASK (Pertanyaan Mendalam)
              </label>
              <textarea
                rows={3}
                value={aoraForm.ask}
                onChange={(e) => setAoraForm({ ...aoraForm, ask: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#12223a] border border-sky-500/30 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            {/* Observe */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
              <label className="font-bold text-indigo-500 dark:text-indigo-300 uppercase tracking-wider block">
                O - OBSERVE (Temuan Bahasa Tubuh & Lingkungan)
              </label>
              <textarea
                rows={3}
                value={aoraForm.observe}
                onChange={(e) => setAoraForm({ ...aoraForm, observe: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#12223a] border border-indigo-500/30 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            {/* Research */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <label className="font-bold text-amber-500 dark:text-amber-300 uppercase tracking-wider block">
                R - RESEARCH (Rujukan Solusi Unit & Modul)
              </label>
              <textarea
                rows={3}
                value={aoraForm.research}
                onChange={(e) => setAoraForm({ ...aoraForm, research: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#12223a] border border-amber-500/30 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            {/* Act */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <label className="font-bold text-emerald-500 dark:text-emerald-300 uppercase tracking-wider block">
                A - ACT (Rencana Tindakan Terukur)
              </label>
              <textarea
                rows={3}
                value={aoraForm.act}
                onChange={(e) => setAoraForm({ ...aoraForm, act: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#12223a] border border-emerald-500/30 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                triggerCelebration();
                addNotification('Worksheet AORA Tersimpan', 'Data observasi lapangan telah direkam ke matriks IPOOI Process.', 'achievement');
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shadow-md shadow-teal-500/25 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Matriks AORA (+100 XP)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
