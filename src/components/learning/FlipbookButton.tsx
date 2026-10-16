import React, { useState } from 'react';
import { ExternalLink, BookOpen, Maximize2, ArrowUpRight, ShieldCheck, Info } from 'lucide-react';
import { FlipbookFullscreenViewer } from './FlipbookFullscreenViewer';

interface FlipbookButtonProps {
  href?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  colorVariant?: 'green' | 'purple';
  badgeText?: string;
  modalTitle?: string;
}

export const FlipbookButton: React.FC<FlipbookButtonProps> = ({
  href = 'https://sites.google.com/view/communicator-basic',
  className = '',
  title,
  subtitle,
  description,
  buttonText,
  colorVariant = 'green',
  badgeText,
  modalTitle,
}) => {
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  const isPurple = colorVariant === 'purple';

  const defaultTitle = isPurple
    ? 'Flipbook Interaktif Materi Do How'
    : 'Flipbook Interaktif Materi Know How';

  const defaultSubtitle = isPurple
    ? 'E-Book Digital Praktis (Layar Penuh Terkunci)'
    : 'E-Book Digital Interaktif (Layar Penuh Terkunci)';

  const defaultDescription = isPurple
    ? 'Klik icon button ungu di samping untuk membuka modul referensi praktis lapangan langsung pada flipbook interaktif Heyzine.'
    : 'Klik tombol hijau di samping untuk membuka modul langsung secara penuh tanpa kendala blokir iframe dari Google Sites.';

  const defaultButtonText = isPurple
    ? 'OPEN FLIPBOOK DO HOW'
    : 'OPEN FLIPBOOK KNOW HOW';

  const defaultBadgeText = isPurple ? 'Heyzine Reader' : 'Bebas Blokir';

  const defaultModalTitle = isPurple
    ? 'Flipbook Do How - Communicator Runner'
    : 'Flipbook Know How - Communicator Basic';

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl ${
          isPurple
            ? 'bg-gradient-to-r from-purple-950/45 via-indigo-950/35 to-slate-900/40 border-purple-500/35 shadow-purple-950/20'
            : 'bg-gradient-to-r from-emerald-950/40 via-green-950/30 to-slate-900/40 border-emerald-500/30'
        } border shadow-lg ${className}`}
      >
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-10 h-10 rounded-2xl ${
              isPurple
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/35 shadow-purple-500/10'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10'
            } flex items-center justify-center shrink-0 border shadow-inner`}
          >
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-widest ${
                  isPurple ? 'text-purple-400' : 'text-emerald-400'
                } block`}
              >
                {subtitle || defaultSubtitle}
              </span>
              <span
                className={`text-[9px] ${
                  isPurple
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                } border px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1`}
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>{badgeText || defaultBadgeText}</span>
              </span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white">
              {title || defaultTitle}
            </h4>
            <p className="text-[11px] text-slate-400">
              {description || defaultDescription}
            </p>
          </div>
        </div>

        {/* 3D Glossy Button (Purple for DO HOW, Green for KNOW HOW) */}
        <div className="flex items-center space-x-2 shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            title={
              isPurple
                ? 'Buka Flipbook Do How (Heyzine) dalam Format Layar Penuh Langsung'
                : 'Buka Flipbook Know How dalam Format Layar Penuh Langsung'
            }
          >
            {/* Ambient Pulsing Glow behind button */}
            <div
              className={`absolute -inset-1 rounded-full ${
                isPurple
                  ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 opacity-60'
                  : 'bg-gradient-to-r from-emerald-500 to-green-400 opacity-60'
              } blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
            />

            {/* 3D Button Core */}
            <div
              className={`relative px-7 md:px-9 py-3.5 md:py-4 rounded-full ${
                isPurple
                  ? 'bg-gradient-to-b from-[#a855f7] via-[#7e22ce] to-[#581c87] border-4 border-[#3b0764] shadow-[0_6px_0_#2e0854,0_10px_20px_rgba(0,0,0,0.5)] group-active:shadow-[0_2px_0_#2e0854,0_4px_10px_rgba(0,0,0,0.5)]'
                  : 'bg-gradient-to-b from-[#00b82b] via-[#009420] to-[#005713] border-4 border-[#00380c] shadow-[0_6px_0_#002b09,0_10px_20px_rgba(0,0,0,0.4)] group-active:shadow-[0_2px_0_#002b09,0_4px_10px_rgba(0,0,0,0.4)]'
              } group-active:translate-y-1 transition-all overflow-hidden flex items-center justify-center space-x-2`}
            >
              {/* Glossy Top Glass Reflection */}
              <div className="absolute top-0 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              {/* Inner Stroke */}
              <div
                className={`absolute inset-1 rounded-full border ${
                  isPurple ? 'border-purple-200/50' : 'border-green-300/40'
                } pointer-events-none`}
              />
              <span className="relative z-10 font-black tracking-wide text-white text-xs md:text-sm uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] flex items-center space-x-2">
                <Maximize2
                  className={`w-4 h-4 ${
                    isPurple ? 'text-purple-100' : 'text-emerald-200'
                  }`}
                />
                <span>{buttonText || defaultButtonText}</span>
                <ArrowUpRight
                  className={`w-4 h-4 ${
                    isPurple ? 'text-purple-100' : 'text-emerald-200'
                  }`}
                />
              </span>
            </div>
          </a>

          <button
            type="button"
            onClick={() => setShowExplanationModal(true)}
            className={`p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 ${
              isPurple
                ? 'text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/40'
                : 'text-slate-400 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40'
            } border transition-colors cursor-pointer`}
            title="Informasi Teknis Mode Layar Penuh Flipbook"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showExplanationModal && (
        <FlipbookFullscreenViewer
          isOpen={showExplanationModal}
          onClose={() => setShowExplanationModal(false)}
          url={href}
          title={modalTitle || defaultModalTitle}
          colorVariant={colorVariant}
        />
      )}
    </>
  );
};
