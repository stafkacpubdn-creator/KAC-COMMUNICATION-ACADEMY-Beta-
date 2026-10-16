import React, { useState } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Cloud,
  RefreshCw,
  Bell,
  Flame,
  FileDown,
  ChevronDown,
  Building2,
  CheckCircle2,
  Sparkles,
  Camera,
  Edit3,
  Megaphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchUser,
    allUsers,
    isDarkMode,
    setIsDarkMode,
    isOfflineMode,
    setIsOfflineMode,
    isSyncing,
    triggerCloudSync,
    lastSyncedTime,
    notifications,
    setShowReportModal,
    setShowProfileModal,
    isContentAdmin,
    globalAnnouncement,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Map view to friendly title
  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard_executive':
        return 'Executive Summary • Dasbor Eksekutif & Ringkasan Kinerja';
      case 'dashboard_peserta':
        return 'Dashboard Progres Peserta Real-Time • Monitoring 15 Unit Terpadu';
      case 'dashboard_graphic':
        return 'Graphic, Chart & Pie • Visualisasi Perkembangan Belajar';
      case 'dashboard_ipooi':
        return 'Analytic (IPOOI) • Evaluasi Input, Process, Output, Outcome & Impact';
      case 'newbie_materi':
        return 'NEWBIE Class • Base KPI A & Materi Teoritis (Know How)';
      case 'newbie_assessment':
        return 'NEWBIE Class • Basic Assessment (50 Butir Reflektif)';
      case 'newbie_result':
        return 'NEWBIE Class • Level 1 Achievement & Sertifikasi';
      case 'newbie_cta':
        return 'NEWBIE Class • 1st Call to Action (Program 21 Hari Alpha)';
      case 'runner_materi':
        return 'RUNNER Class • Stair KPI B & Materi Praktis (Do How)';
      case 'runner_assessment':
        return 'RUNNER Class • Intermediate Assessment (50 Butir Taktis Lapangan)';
      case 'runner_result':
        return 'RUNNER Class • Level 2 Achievement & Rekomendasi Taktis';
      case 'runner_cta':
        return 'RUNNER Class • 2nd Call to Action (Program 21 Hari Beta Role Play)';
      case 'master_materi':
        return 'MASTER Class • Roof KPI C & Materi Strategis (Show How)';
      case 'master_assessment':
        return 'MASTER Class • Advance Assessment (50 Butir Kepemimpinan & Krisis)';
      case 'master_result':
        return 'MASTER Class • Level 3 Achievement & Predikat Master Communicator';
      case 'master_cta':
        return 'MASTER Class • 3rd Call to Action (Program 21 Hari Delta Mentoring)';
      case 'bullet_elevator':
        return 'Bite The Bullets • Elevator Pitch Masterclass';
      case 'bullet_pra':
        return 'Bite The Bullets • Pra Pengabaran (SOP & Pemetaan Lapangan)';
      case 'bullet_pengabaran':
        return 'Bite The Bullets • Materi Pengabaran (Teknik Komunikasi Inti)';
      case 'bullet_pembinaan':
        return 'Bite The Bullets • Materi Pembinaan (Kaderisasi Berkelanjutan)';
      case 'bullet_aora':
        return 'Bite The Bullets • AORA (Ask, Observe, Research, Act)';
      case 'forum_komunitas':
        return 'Forum Diskusi Komunitas • Berbagi Pengetahuan & Studi Kasus';
      case 'setting_tampilan':
        return 'Pengaturan Tampilan & Antarmuka';
      case 'setting_password':
        return 'Keamanan Akun & Ganti Password';
      case 'setting_member_admin':
        return 'Member/Admin Dapur Setting Modular (Config Per Menu)';
      case 'setting_content_editor':
        return 'Dapur Edit Konten Live • Tanpa Coding (Khusus Admin Resmi)';
      default:
        return 'Communicator Academy';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-[#162740] border-b border-slate-200 dark:border-[#233c5e] px-4 flex items-center justify-between sticky top-0 z-30 transition-colors shadow-sm">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-bold text-slate-800 dark:text-white truncate flex items-center space-x-2">
            <span>{getViewTitle()}</span>
          </h1>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:flex items-center space-x-2">
            <span>Peserta: {currentUser.unit}</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">{currentUser.name}</span>
            <span>•</span>
            <span className="text-sky-500">{lastSyncedTime}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Offline Mode Toggle Button */}
        <button
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
            isOfflineMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 animate-pulse'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          }`}
          title={isOfflineMode ? 'Klik untuk kembali daring' : 'Klik untuk uji coba Mode Luring / Offline'}
        >
          {isOfflineMode ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mode Luring (Offline)</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Online (Luring Siap)</span>
            </>
          )}
        </button>

        {/* Cloud Sync Button */}
        <button
          onClick={triggerCloudSync}
          disabled={isSyncing}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 relative transition-all"
          title="Sinkronisasi Progres ke Cloud & Seluruh Perangkat"
        >
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
          ) : (
            <Cloud className="w-4 h-4 text-sky-400" />
          )}
        </button>

        {/* Streak Counter */}
        <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-xs font-bold text-orange-500 dark:text-orange-300">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
          <span>{currentUser.streakDays} Hari</span>
        </div>

        {/* Live Content Editor Quick Access for Authorized Admin */}
        {isContentAdmin && (
          <button
            onClick={() => setActiveView('setting_content_editor')}
            className="px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
            title="Dapur Edit Konten Live Tanpa Coding"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-500" />
            <span className="hidden sm:inline">Edit Konten Live</span>
          </button>
        )}

        {/* Export PDF Report Button */}
        <button
          onClick={() => setShowReportModal(true)}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 transition-all shadow-sm"
        >
          <FileDown className="w-3.5 h-3.5 text-indigo-400" />
          <span>Laporan PDF</span>
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowUserDropdown(false);
            }}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 relative transition-all"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#162740]" />
            )}
          </button>
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a2d4b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-white/10">
                <span className="font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Notifikasi Gamifikasi & Pengingat</span>
                </span>
                <span className="text-[10px] text-slate-400">{notifications.length} Terkini</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-100">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Unit & Member Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifDropdown(false);
            }}
            className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1c3254] hover:bg-slate-200 dark:hover:bg-[#233e68] border border-slate-200 dark:border-sky-500/30 transition-all text-xs"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-sky-400"
            />
            <div className="text-left hidden sm:block">
              <div className="font-bold text-slate-800 dark:text-white leading-tight">
                {currentUser.unit}
              </div>
              <div className="text-[10px] text-sky-600 dark:text-sky-300 flex items-center space-x-1">
                <span>{currentUser.role === 'admin' ? 'Admin / Kordinator' : 'Peserta'}</span>
                {isContentAdmin && <span className="text-purple-400 font-bold">★ Live Edit</span>}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" />
          </button>
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a2d4b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 z-50 text-xs">
              {/* Profile Picture & Info Quick Card */}
              <div className="p-3 border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="relative group shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-400"
                    />
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserDropdown(false);
                      }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[9px] shadow cursor-pointer"
                      title="Ganti Foto Profil"
                    >
                      <Camera className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-800 dark:text-white truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowUserDropdown(false);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 text-[11px] font-bold border border-sky-500/30 transition-all shrink-0 flex items-center space-x-1 cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                  <span>Ganti Foto</span>
                </button>
              </div>

              <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10">
                <div className="font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span>Pilih Unit KAC / Shaf 2</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Beralih unit untuk melihat data, ritme adaptif, dan hasil belajar secara instan.
                </p>
              </div>
              <div className="max-h-72 overflow-y-auto space-y-1 p-1 custom-scrollbar">
                {allUsers.map((u) => {
                  const isSelected = u.id === currentUser.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-sky-500/20 text-sky-600 dark:text-sky-300 font-semibold border border-sky-500/40'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-sky-400/40 shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-medium text-[12px] truncate flex items-center space-x-1.5">
                            <span>{u.unit}</span>
                            {(u.email === 'stafkacpubdn@gmail.com' || u.email === 'pubdnkac@gmail.com') && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30">
                                Admin Live
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {u.name} • <span className="font-mono">{u.email}</span>
                          </div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
