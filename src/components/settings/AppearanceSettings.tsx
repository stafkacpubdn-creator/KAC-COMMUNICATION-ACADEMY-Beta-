import React from 'react';
import {
  Sliders,
  Sun,
  Moon,
  Laptop,
  Check,
  Eye,
  Type,
  Palette,
  Camera,
  Edit3,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppearanceSettings: React.FC = () => {
  const {
    currentUser,
    isDarkMode,
    setIsDarkMode,
    addNotification,
    setShowProfileModal,
    isContentAdmin,
    setActiveView,
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Profile Picture & Identity Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
              <Camera className="w-5 h-5 text-sky-400" />
              <span>Foto Profil & Identitas Akun</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola avatar Anda yang ditampilkan pada seluruh fitur forum, rapor, dan dasbor.
            </p>
          </div>
          {isContentAdmin && (
            <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
              <span>Admin Live Editor</span>
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5">
          <div className="flex items-center space-x-4">
            <div className="relative group shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-sky-400/40 shadow-lg"
              />
              <button
                onClick={() => setShowProfileModal(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-md cursor-pointer transition-transform group-hover:scale-110"
                title="Ganti Foto Profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-800 dark:text-white text-sm">
                {currentUser.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentUser.unit}</span>
                <span>•</span>
                <span className="font-mono text-sky-600 dark:text-sky-300">{currentUser.email}</span>
              </div>
              <div className="text-[11px] text-amber-500 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{currentUser.totalXp} XP • Streak {currentUser.streakDays} Hari</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Ganti Foto Profil</span>
            </button>

            {isContentAdmin && (
              <button
                onClick={() => setActiveView('setting_content_editor')}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-500" />
                <span>Edit Konten Live</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Appearance & Theme Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-white/10 pb-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-sky-400" />
            <span>Pengaturan Tampilan & Antarmuka</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sesuaikan kenyamanan visual untuk sesi belajar siang maupun malam hari
          </p>
        </div>

        {/* Theme Options */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tema Warna Utama
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsDarkMode(false);
                addNotification('Tema Terang Aktif', 'Tampilan telah disesuaikan ke mode terang.', 'info');
              }}
              className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                !isDarkMode
                  ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/20'
                  : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-slate-800 dark:text-white">
                  Mode Terang (Light)
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Kontras tinggi & bersih di siang hari
                </div>
              </div>
              {!isDarkMode && <Check className="w-4 h-4 text-sky-500 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setIsDarkMode(true);
                addNotification('Mode Gelap Aktif', 'Tema biru malam estetis telah diaktifkan.', 'info');
              }}
              className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                isDarkMode
                  ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/20'
                  : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-slate-800 dark:text-white">
                  Mode Gelap (Navy Slate)
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Nyaman untuk sesi belajar malam
                </div>
              </div>
              {isDarkMode && <Check className="w-4 h-4 text-sky-500 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Font Scaling & Contrast */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Kenyamanan Membaca Materi
          </label>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-sky-400" />
                <span>Ukuran Teks Materi Belajar</span>
              </span>
              <span className="font-bold text-sky-400">Standar (14px)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Ukuran teks dioptimalkan untuk keterbacaan tinggi di layar smartphone maupun desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
