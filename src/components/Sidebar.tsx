import React, { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  CircleDot,
  Award,
  ChevronDown,
  ChevronRight,
  Compass,
  FileSpreadsheet,
  Megaphone,
  Sliders,
  KeyRound,
  LogOut,
  Users,
  Trophy,
  Swords,
  Sparkles,
  Activity,
  Edit3,
  Camera,
  Bot,
  ShieldCheck,
  Disc,
  BarChart2,
  BookOpen,
  FolderLock,
  Layers,
  GraduationCap,
  Cpu,
  MessagesSquare,
  Settings,
  ShieldAlert,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveView } from '../types';
import { BrandLogo } from './brand/BrandLogo';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchUser,
    setShowCompetitionModal,
    setShowLeaderboardModal,
    setShowProfileModal,
    setShowGoogleSyncModal,
    addNotification,
    isContentAdmin,
    domainTitles,
  } = useApp();

  // Accordion state strictly limited to the 7 main domains
  // Auto-closes any previously opened domain when a new one is selected
  const [openDomain, setOpenDomain] = useState<string | null>(() => {
    if (activeView === 'panduan_infografis') return 'sop';
    if (activeView.startsWith('dashboard_')) return 'dashboard';
    if (
      activeView.startsWith('newbie_') ||
      activeView.startsWith('runner_') ||
      activeView.startsWith('master_')
    )
      return 'academy';
    if (activeView.startsWith('bullet_') || activeView.startsWith('elevator_')) return 'studio';
    if (activeView === 'forum_komunitas' || activeView === 'kompetisi_teman') return 'forum';
    if (activeView.startsWith('setting_')) return 'setting';
    return 'dashboard';
  });

  // Sub-tier state inside Academy and Studio
  const [activeAcademyTier, setActiveAcademyTier] = useState<'newbie' | 'runner' | 'master'>('newbie');
  const [activeStudioCategory, setActiveStudioCategory] = useState<'bullets' | 'simulations'>('bullets');

  const toggleDomain = (domainKey: string) => {
    setOpenDomain((prev) => (prev === domainKey ? null : domainKey));
  };

  const handleNav = (view: ActiveView) => {
    try {
      if (view === 'elevator_coach') {
        window.history.pushState(null, '', '/coach');
      } else if (view === 'elevator_human') {
        window.history.pushState(null, '', '/human');
      } else if (view === 'elevator_habit_lab') {
        window.history.pushState(null, '', '/lab');
      }
    } catch {}
    setActiveView(view);
    if (onCloseMobile) onCloseMobile();
  };

  const isNavActive = (view: ActiveView) => activeView === view;

  // Active navigation button style
  const getItemClasses = (view: ActiveView) => {
    const active = isNavActive(view);
    return `w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-left cursor-pointer text-xs font-medium ${
      active
        ? 'bg-sky-500/20 text-sky-200 border-l-2 border-sky-400 pl-2.5 font-semibold shadow-xs'
        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
    }`;
  };

  // Main domain accordion header style
  const getDomainHeaderClasses = (domainKey: string, isActiveDomain: boolean) => {
    const isOpen = openDomain === domainKey;
    return `w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer font-bold text-xs uppercase tracking-wider border ${
      isOpen || isActiveDomain
        ? 'bg-white/[0.08] text-white border-sky-500/30 shadow-xs'
        : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-white/[0.04]'
    }`;
  };

  const isAcademyActive =
    activeView.startsWith('newbie_') ||
    activeView.startsWith('runner_') ||
    activeView.startsWith('master_');

  const isStudioActive =
    activeView.startsWith('bullet_') || activeView.startsWith('elevator_');

  const isDashboardActive = activeView.startsWith('dashboard_');
  const isForumActive = activeView === 'forum_komunitas' || activeView === 'kompetisi_teman';
  const isSettingActive = activeView.startsWith('setting_');
  const isSopActive = activeView === 'panduan_infografis';

  return (
    <aside className="w-72 bg-[#0a1220] text-slate-200 flex flex-col h-full select-none border-r border-white/[0.07] shadow-2xl overflow-hidden font-sans">
      {/* ========================================================= */}
      {/* BRANDING HEADER: OFFICIAL MASTER MA·CAN                   */}
      {/* ========================================================= */}
      <div className="p-3 border-b border-white/[0.08] bg-[#070d18]/90 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] px-2 py-0.5 rounded-md font-extrabold uppercase tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/30">
              OFFICIAL MASTER
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
              Shaf 2 · ka01–ka14
            </span>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-lg bg-white/[0.06] hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 border border-white/10 transition-all cursor-pointer shrink-0"
                aria-label="Tutup menu navigasi"
                title="Tutup Menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Master Logo lockup with background */}
        <div className="p-1 rounded-2xl bg-white shadow-md border border-slate-200/90 overflow-hidden flex items-center justify-center">
          <BrandLogo size="auto" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7 MAIN DOMAINS ACCORDION CONTAINER                         */}
      {/* All sub-domains outside these 7 are automatically closed    */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-2.5 custom-scrollbar text-xs">
        {/* DOMAIN 1: MA-COMM ACADEMY NETWORK SOP */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('sop')}
            className={getDomainHeaderClasses('sop', isSopActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">{domainTitles.sop || 'MA-COMM ACADEMY NETWORK SOP'}</span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'sop' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          </button>

          {openDomain === 'sop' && (
            <div className="border-l border-sky-500/30 ml-3.5 pl-2 py-1 space-y-1 animate-fadeIn">
              <button
                type="button"
                onClick={() => handleNav('panduan_infografis')}
                className={getItemClasses('panduan_infografis')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Infografis &amp; Petunjuk Aplikasi</span>
                </div>
                <span className="text-[9px] font-mono px-1 rounded bg-sky-500/20 text-sky-300">SOP</span>
              </button>
            </div>
          )}
        </div>

        {/* DOMAIN 2: DASHBOARD */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('dashboard')}
            className={getDomainHeaderClasses('dashboard', isDashboardActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <LayoutGrid className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{domainTitles.dashboard || 'DASHBOARD'}</span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'dashboard' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {openDomain === 'dashboard' && (
            <div className="border-l border-emerald-500/30 ml-3.5 pl-2 py-1 space-y-1 animate-fadeIn">
              <button
                type="button"
                onClick={() => handleNav('dashboard_executive')}
                className={getItemClasses('dashboard_executive')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <LayoutGrid className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Executive Summary</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNav('dashboard_peserta')}
                className={getItemClasses('dashboard_peserta')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Monitoring 15 Unit Peserta</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400">Live</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('dashboard_ipooi')}
                className={getItemClasses('dashboard_ipooi')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Disc className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">Analitik (IPOOI Framework)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNav('dashboard_graphic')}
                className={getItemClasses('dashboard_graphic')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <BarChart2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">Grafik &amp; Perkembangan</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* DOMAIN 3: PERSONAL GROWTH & HABIT-TRACKING ACADEMY */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('academy')}
            className={getDomainHeaderClasses('academy', isAcademyActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                {domainTitles.academy || 'PERSONAL GROWTH & HABIT-TRACKING ACADEMY'}
              </span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'academy' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {openDomain === 'academy' && (
            <div className="border-l border-amber-500/30 ml-3.5 pl-2 py-1 space-y-2 animate-fadeIn">
              {/* Quick Sub-Tier Selector Pills */}
              <div className="flex rounded-lg bg-white/[0.04] p-0.5 border border-white/5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveAcademyTier('newbie')}
                  className={`flex-1 py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                    activeAcademyTier === 'newbie'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Newbie
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAcademyTier('runner')}
                  className={`flex-1 py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                    activeAcademyTier === 'runner'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Runner
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAcademyTier('master')}
                  className={`flex-1 py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                    activeAcademyTier === 'master'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Master
                </button>
              </div>

              {/* TIER CONTENT */}
              {activeAcademyTier === 'newbie' && (
                <div className="space-y-0.5 animate-fadeIn">
                  <div className="px-1 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                    Newbie Class (Know How) • KPI A
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_materi')}
                    className={getItemClasses('newbie_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_assessment')}
                    className={getItemClasses('newbie_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_result')}
                    className={getItemClasses('newbie_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Hasil Asesmen</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_cta')}
                    className={getItemClasses('newbie_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Alpha Habit Tracker (21 Hari)</span>
                    </div>
                  </button>
                </div>
              )}

              {activeAcademyTier === 'runner' && (
                <div className="space-y-0.5 animate-fadeIn">
                  <div className="px-1 text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                    Runner Class (Do How) • KPI B
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_materi')}
                    className={getItemClasses('runner_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_assessment')}
                    className={getItemClasses('runner_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_result')}
                    className={getItemClasses('runner_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Hasil Asesmen</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_cta')}
                    className={getItemClasses('runner_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Flame className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Beta Habit Lapangan (21 Hari)</span>
                    </div>
                  </button>
                </div>
              )}

              {activeAcademyTier === 'master' && (
                <div className="space-y-0.5 animate-fadeIn">
                  <div className="px-1 text-[9px] font-bold text-purple-400 uppercase tracking-wider">
                    Master Class (Show How) • KPI C
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNav('master_materi')}
                    className={getItemClasses('master_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_assessment')}
                    className={getItemClasses('master_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_result')}
                    className={getItemClasses('master_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Hasil Asesmen</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_cta')}
                    className={getItemClasses('master_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Flame className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Delta Habit Leadership (21 Hari)</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DOMAIN 4: STUDIO & TACTICAL MODULE */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('studio')}
            className={getDomainHeaderClasses('studio', isStudioActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <Cpu className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">{domainTitles.studio || 'STUDIO & TACTICAL MODULE'}</span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'studio' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {openDomain === 'studio' && (
            <div className="border-l border-sky-500/30 ml-3.5 pl-2 py-1 space-y-2 animate-fadeIn">
              <div className="flex rounded-lg bg-white/[0.04] p-0.5 border border-white/5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveStudioCategory('bullets')}
                  className={`flex-1 py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                    activeStudioCategory === 'bullets'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bite The Bullets
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStudioCategory('simulations')}
                  className={`flex-1 py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                    activeStudioCategory === 'simulations'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Simulasi Taktis
                </button>
              </div>

              {activeStudioCategory === 'bullets' && (
                <div className="space-y-0.5 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_elevator')}
                    className={getItemClasses('bullet_elevator')}
                  >
                    <span className="truncate">Bullet 1: Elevator Pitch</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pra')}
                    className={getItemClasses('bullet_pra')}
                  >
                    <span className="truncate">Bullet 2: Pra-Pengabaran</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pengabaran')}
                    className={getItemClasses('bullet_pengabaran')}
                  >
                    <span className="truncate">Bullet 3: Pengabaran</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pembinaan')}
                    className={getItemClasses('bullet_pembinaan')}
                  >
                    <span className="truncate">Bullet 4: Pembinaan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_aora')}
                    className={getItemClasses('bullet_aora')}
                  >
                    <span className="truncate">Bullet 5: AORA Framework</span>
                  </button>
                </div>
              )}

              {activeStudioCategory === 'simulations' && (
                <div className="space-y-0.5 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => handleNav('elevator_habit_lab')}
                    className={getItemClasses('elevator_habit_lab')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Elevator Habit Lab</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('elevator_coach')}
                    className={getItemClasses('elevator_coach')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Bot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Tactical Coach Dialogue</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('elevator_human')}
                    className={getItemClasses('elevator_human')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Human Dialogue Simulator</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DOMAIN 5: THE COMMUNICATORS FORUM */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('forum')}
            className={getDomainHeaderClasses('forum', isForumActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <MessagesSquare className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">{domainTitles.forum || 'THE COMMUNICATORS FORUM'}</span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'forum' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {openDomain === 'forum' && (
            <div className="border-l border-purple-500/30 ml-3.5 pl-2 py-1 space-y-1 animate-fadeIn">
              <button
                type="button"
                onClick={() => handleNav('forum_komunitas')}
                className={getItemClasses('forum_komunitas')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <MessagesSquare className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">Forum Komunitas &amp; Diskusi</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLeaderboardModal(true);
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/[0.04] transition-all text-left text-xs cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Papan Peringkat Global</span>
                </div>
                <span className="text-[9px] font-mono text-amber-400">TOP 15</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('kompetisi_teman')}
                className={getItemClasses('kompetisi_teman')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Swords className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">Arena Kompetisi Antar Shaf</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* DOMAIN 6: SETTING */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDomain('setting')}
            className={getDomainHeaderClasses('setting', isSettingActive)}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <Settings className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="truncate">{domainTitles.setting || 'SETTING'}</span>
            </div>
            <span className="text-slate-400 shrink-0 ml-1">
              {openDomain === 'setting' ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          {openDomain === 'setting' && (
            <div className="border-l border-slate-500/30 ml-3.5 pl-2 py-1 space-y-1 animate-fadeIn">
              <button
                type="button"
                onClick={() => handleNav('setting_tampilan')}
                className={getItemClasses('setting_tampilan')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Sliders className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Pengaturan Tampilan &amp; Tema</span>
                </div>
              </button>

              {isContentAdmin && (
                <button
                  type="button"
                  onClick={() => handleNav('setting_content_editor')}
                  className={getItemClasses('setting_content_editor')}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Live Content &amp; Domain Editor</span>
                  </div>
                  <span className="text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300">ADMIN</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleNav('setting_member_admin')}
                className={getItemClasses('setting_member_admin')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Manajemen Anggota &amp; Akun</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNav('setting_password')}
                className={getItemClasses('setting_password')}
              >
                <div className="flex items-center space-x-2 truncate">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Keamanan &amp; Kata Sandi</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowGoogleSyncModal(true);
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-white/[0.04] transition-all text-left text-xs cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Koneksi Sheets &amp; Cloud</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400">SYNC</span>
              </button>
            </div>
          )}
        </div>

        {/* DOMAIN 7: SIGN OUT */}
        <div className="pt-2 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              addNotification(
                'Sesi Pengguna',
                'Anda dapat beralih ke unit atau peserta lain melalui tombol profil.',
                'info'
              );
              setShowProfileModal(true);
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-rose-500/[0.06] hover:bg-rose-500/15 text-rose-300 border border-rose-500/20 hover:border-rose-500/40 transition-all text-left cursor-pointer font-bold text-xs uppercase tracking-wider"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="truncate">{domainTitles.signout || 'SIGN OUT'}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200">
              EXIT
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* USER PROFILE FOOTER: Executive Status                      */}
      {/* ========================================================= */}
      <div className="p-3 border-t border-white/[0.07] bg-[#070d18]/85 backdrop-blur-md">
        <div className="flex items-center justify-between space-x-2.5">
          <div className="relative group shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-400/50"
            />
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs cursor-pointer"
              title="Ganti Foto Profil"
            >
              <Camera className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400 truncate flex items-center space-x-1.5">
              <span className="text-amber-300 font-mono font-medium">{currentUser.unit}</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">{currentUser.totalXp} XP</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
