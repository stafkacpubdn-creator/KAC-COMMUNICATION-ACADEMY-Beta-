import React, { useState } from 'react';
import { BackendTest } from './components/BackendTest';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary';
import { ParticipantProgressDashboard } from './components/dashboard/ParticipantProgressDashboard';
import { GraphicChartPie } from './components/dashboard/GraphicChartPie';
import { AnalyticIPOOI } from './components/dashboard/AnalyticIPOOI';
import { CalendarTaskManager } from './components/dashboard/CalendarTaskManager';
import { ClassDetailView } from './components/learning/ClassDetailView';
import { BiteTheBulletsView } from './components/bullets/BiteTheBulletsView';
import { AppearanceSettings } from './components/settings/AppearanceSettings';
import { PasswordSettings } from './components/settings/PasswordSettings';
import { DapurSetting } from './components/settings/DapurSetting';
import { CommunityForum } from './components/forum/CommunityForum';
import { CompetitionMode } from './components/gamification/CompetitionMode';
import { LeaderboardModal } from './components/gamification/LeaderboardModal';
import { ProgressReportModal } from './components/reports/ProgressReportModal';
import { ProfilePictureModal } from './components/profile/ProfilePictureModal';
import { LiveContentEditor } from './components/admin/LiveContentEditor';
import { WifiOff, Sparkles, X, Megaphone } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeView,
    isOfflineMode,
    setIsOfflineMode,
    showProfileModal,
    setShowProfileModal,
    globalAnnouncement,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dismissBanner, setDismissBanner] = useState(false);

  // Render view router
  const renderView = () => {
    switch (activeView) {
      case 'dashboard_executive':
        return (
          <div className="space-y-6">
            <ExecutiveSummary />
            <CalendarTaskManager />
          </div>
        );
      case 'dashboard_peserta':
        return <ParticipantProgressDashboard />;
      case 'dashboard_graphic':
        return <GraphicChartPie />;
      case 'dashboard_ipooi':
        return (
          <div className="space-y-6">
            <AnalyticIPOOI />
            <CalendarTaskManager />
          </div>
        );

      // NEWBIE (Know How - Base KPI A)
      case 'newbie_materi':
        return <ClassDetailView levelId="newbie" subTab="materi" />;
      case 'newbie_assessment':
        return <ClassDetailView levelId="newbie" subTab="assessment" />;
      case 'newbie_result':
        return <ClassDetailView levelId="newbie" subTab="result" />;
      case 'newbie_cta':
        return <ClassDetailView levelId="newbie" subTab="cta" />;

      // RUNNER (Do How - Stair KPI B)
      case 'runner_materi':
        return <ClassDetailView levelId="runner" subTab="materi" />;
      case 'runner_assessment':
        return <ClassDetailView levelId="runner" subTab="assessment" />;
      case 'runner_result':
        return <ClassDetailView levelId="runner" subTab="result" />;
      case 'runner_cta':
        return <ClassDetailView levelId="runner" subTab="cta" />;

      // MASTER (Show How - Roof KPI C)
      case 'master_materi':
        return <ClassDetailView levelId="master" subTab="materi" />;
      case 'master_assessment':
        return <ClassDetailView levelId="master" subTab="assessment" />;
      case 'master_result':
        return <ClassDetailView levelId="master" subTab="result" />;
      case 'master_cta':
        return <ClassDetailView levelId="master" subTab="cta" />;

      // BITE THE BULLETS
      case 'bullet_elevator':
        return <BiteTheBulletsView bulletId="elevator-pitch" />;
      case 'bullet_pra':
        return <BiteTheBulletsView bulletId="pra-pengabaran" />;
      case 'bullet_pengabaran':
        return <BiteTheBulletsView bulletId="materi-pengabaran" />;
      case 'bullet_pembinaan':
        return <BiteTheBulletsView bulletId="materi-pembinaan" />;
      case 'bullet_aora':
        return <BiteTheBulletsView bulletId="aora" />;

      // COMMUNITY & FORUM
      case 'forum_komunitas':
        return <CommunityForum />;

      // SETTINGS
      case 'setting_tampilan':
        return <AppearanceSettings />;
      case 'setting_password':
        return <PasswordSettings />;
      case 'setting_member_admin':
        return <DapurSetting />;
      case 'setting_content_editor':
        return <LiveContentEditor />;
      case 'backend_test':
        return <BackendTest />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-[#0e1b2e] text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* Permanent Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Global Announcement Marquee / Banner (if set) */}
        {globalAnnouncement && !dismissBanner && (
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white px-4 py-2 text-xs flex items-center justify-between shadow-sm border-b border-sky-400/30">
            <div className="flex items-center space-x-2.5 truncate">
              <Megaphone className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
              <span className="truncate font-medium">{globalAnnouncement}</span>
            </div>
            <button
              onClick={() => setDismissBanner(true)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white shrink-0 ml-2"
              title="Tutup banner sementara"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Offline Mode Alert Banner (if active) */}
        {isOfflineMode && (
          <div className="bg-amber-500/20 text-amber-900 dark:text-amber-200 border-b border-amber-500/30 px-4 py-2 text-xs flex items-center justify-between transition-all">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>
                <strong>Mode Luring Aktif:</strong> Materi pembelajaran, modul kuis, dan habit tracker tersimpan lokal di perangkat Anda. Akses 100% tanpa jaringan internet.
              </span>
            </div>
            <button
              onClick={() => setIsOfflineMode(false)}
              className="text-amber-700 dark:text-amber-300 font-bold underline text-[11px]"
            >
              Kembali Online
            </button>
          </div>
        )}

        {/* Dynamic Route Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Global Interactive Modals */}
      <CompetitionMode />
      <LeaderboardModal />
      <ProgressReportModal />
      <ProfilePictureModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
