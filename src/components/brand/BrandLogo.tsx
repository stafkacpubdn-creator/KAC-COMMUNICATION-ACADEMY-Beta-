import React, { useState } from 'react';
import { OFFICIAL_MASTER_BRAND } from '../../data/brandMasterConfig';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface BrandLogoProps {
  /**
   * Predefined size presets maintaining the master proportional 3.06:1 aspect ratio.
   * - 'xs': compact in-bar logo (height ~26px)
   * - 'sm': sidebar/navbar header (height ~36px)
   * - 'md': standard section header (height ~48px)
   * - 'lg': modal/card hero header (height ~64px)
   * - 'xl': landing / splash hero (height ~80px-96px)
   * - 'auto': fluid, obeys container width
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  /**
   * Optional custom class for the image element (sizing, margin, alignment ONLY).
   * Strict mode: CSS filters, color shifts, blend modes, and transforms are prohibited.
   */
  className?: string;
  /**
   * Container wrapper class (useful for padding, alignment, or mounting background).
   */
  containerClassName?: string;
  /**
   * If true, wraps the logo inside a neat rounded container card with subtle border & shadow.
   */
  mountOnNeutralCard?: boolean;
  /**
   * Accessible label. Defaults to official master brand name.
   */
  alt?: string;
  /**
   * Which approved master asset to render.
   * Defaults to 'banner' (logo yang memiliki background).
   */
  variant?: 'banner' | 'master';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  containerClassName = '',
  mountOnNeutralCard = false,
  alt = OFFICIAL_MASTER_BRAND.brandName,
  variant,
}) => {
  const [hasError, setHasError] = useState(false);

  // Read global logo preference if variant is not explicitly passed
  let globalLogoStyle: 'banner' | 'master' = 'banner';
  try {
    const appCtx = useApp();
    if (appCtx && appCtx.logoStyle) {
      globalLogoStyle = appCtx.logoStyle === 'transparent' ? 'master' : 'banner';
    }
  } catch {
    // If rendered outside AppContext, default to banner (logo yang memiliki background)
    globalLogoStyle = 'banner';
  }

  const effectiveVariant = variant || globalLogoStyle;

  const assetSrc =
    effectiveVariant === 'banner'
      ? OFFICIAL_MASTER_BRAND.officialMasterBannerPath
      : OFFICIAL_MASTER_BRAND.officialMasterAssetPath;

  // Strict proportional sizing definitions (width: auto, height: fixed OR max-width: 100%)
  const sizeClasses: Record<NonNullable<BrandLogoProps['size']>, string> = {
    xs: 'h-6 sm:h-7 w-auto max-w-full',
    sm: 'h-8 sm:h-9 w-auto max-w-full',
    md: 'h-11 sm:h-12 w-auto max-w-full',
    lg: 'h-14 sm:h-16 w-auto max-w-full',
    xl: 'h-20 sm:h-24 w-auto max-w-full',
    auto: 'w-full h-auto max-w-full',
  };

  if (hasError) {
    return (
      <div
        className={`p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center space-x-2 ${containerClassName}`}
        role="alert"
        aria-label="Peringatan pemuatan aset logo master MA·CAN"
      >
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
        <span className="font-semibold text-[11px] truncate">
          Aset Logo Master MA·CAN Gagal Dimuat ({OFFICIAL_MASTER_BRAND.brandAbbreviation})
        </span>
      </div>
    );
  }

  const logoImage = (
    <img
      src={assetSrc}
      alt={alt}
      loading="eager"
      onError={() => {
        // Fallback gracefully only to verified local backup master path if public root path differs
        const target = document.querySelector(`img[alt="${alt}"]`) as HTMLImageElement | null;
        if (target) {
          if (effectiveVariant === 'banner' && !target.src.includes('Branding_Banner')) {
            target.src = '/assets/aistudio/Macan_Lion_Crown_Branding_Banner_76324e83.png';
            return;
          } else if (effectiveVariant === 'master' && !target.src.includes('Glossy_Lion_Crest')) {
            target.src = '/assets/aistudio/Glossy_Lion_Crest_MACAN_Logo_transparan_cddd3260.png';
            return;
          }
        }
        setHasError(true);
      }}
      className={`object-contain block shrink-0 select-none rounded-xl overflow-hidden ${sizeClasses[size]} ${className}`}
      style={{
        // Maintain strict aspect ratio and forbid distortion or filter overrides
        aspectRatio: OFFICIAL_MASTER_BRAND.aspectRatio,
        maxHeight: '100%',
      }}
    />
  );

  if (mountOnNeutralCard) {
    return (
      <div
        className={`inline-flex items-center justify-center p-1 rounded-2xl bg-white shadow-xs border border-slate-200/80 overflow-hidden ${containerClassName}`}
      >
        {logoImage}
      </div>
    );
  }

  if (containerClassName) {
    return <div className={`inline-flex items-center ${containerClassName}`}>{logoImage}</div>;
  }

  return logoImage;
};

export default BrandLogo;
