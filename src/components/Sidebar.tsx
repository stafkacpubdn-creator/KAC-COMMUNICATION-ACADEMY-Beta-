import React, { useState } from 'react';
import {
  LayoutGrid,
  BarChart2,
  Disc,
  FileText,
  CircleDot,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Compass,
  FileSpreadsheet,
  Megaphone,
  HeartHandshake,
  SearchCode,
  Sliders,
  KeyRound,
  LogOut,
  Users,
  Trophy,
  Swords,
  MessageSquareQuote,
  Sparkles,
  Activity,
  Flame,
  Edit3,
  Camera,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveView } from '../types';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    setShowLeaderboardModal,
    setShowCompetitionModal,
    addNotification,
    setShowProfileModal,
    isContentAdmin,
  } = useApp();

  const [openNewbie, setOpenNewbie] = useState(true);
  const [openRunner, setOpenRunner] = useState(true);
  const [openMaster, setOpenMaster] = useState(true);

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    if (onCloseMobile) onCloseMobile();
  };

  const isNavActive = (view: ActiveView) => activeView === view;

  return (
    <aside className="w-72 bg-[#172b47] text-slate-100 flex flex-col h-full select-none border-r border-[#243d63] shadow-2xl overflow-hidden font-sans">
      {/* Top Branding Header */}
      <div className="p-4 pt-5 pb-3 border-b border-[#243d63]/70 bg-[#14253e]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold tracking-tight text-white text-[15px] leading-tight">
                Communicator Academy
              </div>
              <div className="text-[11px] text-sky-300/80 font-medium tracking-wide">
                Pusat & Shaf 2 (ka01-ka14)
              </div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Self-Learn
          </span>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar text-[13.5px]">
        {/* SECTION: DASHBOARD */}
        <div>
          <div className="px-3 pb-1.5 text-[11px] font-semibold text-slate-400/90 tracking-wider uppercase">
            DASHBOARD
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleNav('dashboard_executive')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                isNavActive('dashboard_executive')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium shadow-inner border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">Executive Summary</span>
            </button>

            {/* NEW PARTICIPANT REAL-TIME PROGRESS DASHBOARD */}
            <button
              onClick={() => handleNav('dashboard_peserta')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                isNavActive('dashboard_peserta')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium shadow-inner border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Activity className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                <span className="truncate font-semibold text-emerald-300">Progres Peserta Real-Time</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                LIVE 15
              </span>
            </button>

            <button
              onClick={() => handleNav('dashboard_graphic')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                isNavActive('dashboard_graphic')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium shadow-inner border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="truncate">Graphic, Chart & Pie</span>
            </button>

            <button
              onClick={() => handleNav('dashboard_ipooi')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                isNavActive('dashboard_ipooi')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium shadow-inner border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Disc className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Analytic (IPOOI)</span>
            </button>
          </div>
        </div>

        {/* SECTION: COMMUNICATOR LEARNING */}
        <div className="pt-1">
          <div className="px-3 pb-1.5 text-[11px] font-semibold text-slate-400/90 tracking-wider uppercase">
            COMMUNICATOR LEARNING
          </div>
          <div className="space-y-2">
            {/* 1. NEWBIE CLASS */}
            <div className="rounded-xl overflow-hidden bg-black/10 border border-white/5">
              <button
                onClick={() => setOpenNewbie(!openNewbie)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-200 hover:text-white hover:bg-white/5 font-semibold text-[13px]"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sky-400 text-xs">
                    {openNewbie ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span>NEWBIE Class (Know How)</span>
                </div>
              </button>
              {openNewbie && (
                <div className="pb-1.5 pt-0.5 px-1.5 space-y-0.5 bg-[#12233b]/60">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-sky-400/80">
                    NEWBIE CLASS • KNOW HOW
                  </div>
                  <button
                    onClick={() => handleNav('newbie_assessment')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('newbie_assessment')
                        ? 'bg-sky-500/25 text-sky-200 font-medium border border-sky-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Basic Assessment (50 Soal)</span>
                  </button>
                  <button
                    onClick={() => handleNav('newbie_materi')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('newbie_materi')
                        ? 'bg-sky-500/25 text-sky-200 font-medium border border-sky-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">Materi Teoritis & Base KPI A</span>
                  </button>
                  <button
                    onClick={() => handleNav('newbie_result')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('newbie_result')
                        ? 'bg-sky-500/25 text-sky-200 font-medium border border-sky-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Level 1 Result</span>
                  </button>
                  <button
                    onClick={() => handleNav('newbie_cta')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('newbie_cta')
                        ? 'bg-sky-500/25 text-sky-200 font-medium border border-sky-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">1st CTA • Alpha Role Play (21 Hari)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. RUNNER CLASS */}
            <div className="rounded-xl overflow-hidden bg-black/10 border border-white/5">
              <button
                onClick={() => setOpenRunner(!openRunner)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-200 hover:text-white hover:bg-white/5 font-semibold text-[13px]"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-400 text-xs">
                    {openRunner ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span>RUNNER Class (Do How)</span>
                </div>
              </button>
              {openRunner && (
                <div className="pb-1.5 pt-0.5 px-1.5 space-y-0.5 bg-[#12233b]/60">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-indigo-400/80">
                    RUNNER CLASS • DO HOW
                  </div>
                  <button
                    onClick={() => handleNav('runner_assessment')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('runner_assessment')
                        ? 'bg-indigo-500/25 text-indigo-200 font-medium border border-indigo-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Intermediate Assessment (50 Soal)</span>
                  </button>
                  <button
                    onClick={() => handleNav('runner_materi')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('runner_materi')
                        ? 'bg-indigo-500/25 text-indigo-200 font-medium border border-indigo-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">Materi Praktis & Stair KPI B</span>
                  </button>
                  <button
                    onClick={() => handleNav('runner_result')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('runner_result')
                        ? 'bg-indigo-500/25 text-indigo-200 font-medium border border-indigo-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Level 2 Result</span>
                  </button>
                  <button
                    onClick={() => handleNav('runner_cta')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('runner_cta')
                        ? 'bg-indigo-500/25 text-indigo-200 font-medium border border-indigo-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">2nd CTA • Beta Role Play (21 Hari)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. MASTER CLASS */}
            <div className="rounded-xl overflow-hidden bg-black/10 border border-white/5">
              <button
                onClick={() => setOpenMaster(!openMaster)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-200 hover:text-white hover:bg-white/5 font-semibold text-[13px]"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400 text-xs">
                    {openMaster ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span>MASTER Class (Show How)</span>
                </div>
              </button>
              {openMaster && (
                <div className="pb-1.5 pt-0.5 px-1.5 space-y-0.5 bg-[#12233b]/60">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-purple-400/80">
                    MASTER CLASS • SHOW HOW
                  </div>
                  <button
                    onClick={() => handleNav('master_assessment')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('master_assessment')
                        ? 'bg-purple-500/25 text-purple-200 font-medium border border-purple-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Advance Assessment (50 Soal)</span>
                  </button>
                  <button
                    onClick={() => handleNav('master_materi')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('master_materi')
                        ? 'bg-purple-500/25 text-purple-200 font-medium border border-purple-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">Materi Strategis & Roof KPI C</span>
                  </button>
                  <button
                    onClick={() => handleNav('master_result')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('master_result')
                        ? 'bg-purple-500/25 text-purple-200 font-medium border border-purple-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Level 3 Result</span>
                  </button>
                  <button
                    onClick={() => handleNav('master_cta')}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-[12.5px] transition-all ${
                      isNavActive('master_cta')
                        ? 'bg-purple-500/25 text-purple-200 font-medium border border-purple-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">3rd CTA • Delta Role Play (21 Hari)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION: BITE THE BULLETS */}
        <div className="pt-1">
          <div className="px-3 pb-1.5 text-[11px] font-semibold text-slate-400/90 tracking-wider uppercase">
            BITE THE BULLETS
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleNav('bullet_elevator')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('bullet_elevator')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">Elevator pitch</span>
            </button>
            <button
              onClick={() => handleNav('bullet_pra')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('bullet_pra')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">Pra Pengabaran</span>
            </button>
            <button
              onClick={() => handleNav('bullet_pengabaran')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('bullet_pengabaran')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Megaphone className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="truncate">Materi Pengabaran</span>
            </button>
            <button
              onClick={() => handleNav('bullet_pembinaan')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('bullet_pembinaan')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Materi Pembinaan</span>
            </button>
            <button
              onClick={() => handleNav('bullet_aora')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('bullet_aora')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <SearchCode className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="truncate">AORA • Ask, Observe, Research, Act</span>
            </button>
          </div>
        </div>

        {/* SECTION: INTERACTIVE & COMMUNITY */}
        <div className="pt-1">
          <div className="px-3 pb-1.5 text-[11px] font-semibold text-slate-400/90 tracking-wider uppercase">
            KOMUNITAS & KOMPETISI
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setShowCompetitionModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-left group"
            >
              <div className="flex items-center space-x-3 truncate">
                <Swords className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">Duel 1v1 Antar Teman</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                LIVE
              </span>
            </button>

            <button
              onClick={() => setShowLeaderboardModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-left group"
            >
              <div className="flex items-center space-x-3 truncate">
                <Trophy className="w-4 h-4 text-yellow-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">Papan Peringkat Global</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                TOP 15
              </span>
            </button>

            <button
              onClick={() => handleNav('forum_komunitas')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('forum_komunitas')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">Forum Diskusi Komunitas</span>
            </button>
          </div>
        </div>

        {/* SECTION: SETTING */}
        <div className="pt-1">
          <div className="px-3 pb-1.5 text-[11px] font-semibold text-slate-400/90 tracking-wider uppercase">
            SETTING
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleNav('setting_tampilan')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('setting_tampilan')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">Pengaturan Tampilan</span>
            </button>

            <button
              onClick={() => handleNav('setting_password')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('setting_password')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">Ganti Password</span>
            </button>

            <button
              onClick={() => handleNav('setting_member_admin')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('setting_member_admin')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Member / Admin Dapur</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Modular
              </span>
            </button>

            {/* LIVE CONTENT EDITOR (No-code WYSIWYG for authorized admins) */}
            <button
              onClick={() => handleNav('setting_content_editor')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('setting_content_editor')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Edit3 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">Edit Konten Live</span>
              </div>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                  isContentAdmin
                    ? 'bg-purple-500/25 text-purple-300 border-purple-500/40'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }`}
              >
                {isContentAdmin ? 'ADMIN' : 'RESTRICTED'}
              </span>
            </button>
            
            <button
              onClick={() => handleNav('backend_test')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                isNavActive('backend_test')
                  ? 'bg-gradient-to-r from-white/18 to-white/10 text-white font-medium border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">Uji Koneksi Database</span>
            </button>

            <button
              onClick={() => {
                addNotification('Sesi Berakhir', 'Anda telah keluar dari sesi saat ini.', 'info');
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all text-left"
            >
              <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="truncate">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Footer Profile Card with Edit Photo Button */}
      <div className="p-3 border-t border-[#243d63] bg-[#12223a]">
        <div className="flex items-center justify-between space-x-3">
          <div className="relative group shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-400/40"
            />
            <button
              onClick={() => setShowProfileModal(true)}
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform group-hover:scale-110"
              title="Ganti Foto Profil"
            >
              <Camera className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
            <div className="text-[11px] text-sky-300/80 truncate flex items-center space-x-1.5">
              <span>{currentUser.unit}</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{currentUser.totalXp} XP</span>
            </div>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Ganti Foto Profil"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
