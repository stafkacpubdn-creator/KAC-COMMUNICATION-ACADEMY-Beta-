/**
 * =========================================================================
 * MA·CAN MASTER BRAND IDENTITY CONFIGURATION
 * STATUS: OFFICIAL MASTER — APPROVED — DO NOT MODIFY
 * =========================================================================
 * Master Brand Identity Lock — Strict Mode
 * 
 * Visual Identity Specifications:
 * 1. Simbol: Kepala singa bermahkota (Crowned Lion Crest)
 * 2. Wordmark: MACAN
 * 3. Karakter Huruf: Huruf 'A' pertama berbentuk segitiga geometris dengan outline/stroke
 *    tanpa fill sesuai desain master yang disetujui.
 * 4. Subline: "— MILLAH ABRAHAM —"
 * 5. Tagline: "COMMUNICATORS ACADEMY NETWORK"
 * 6. Kombinasi Warna: Navy (#0b192e / deep blue) dan Copper Rose Gold (#c88360 / metallic warm copper)
 * 
 * LARANGAN MUTLAK:
 * - Dilarang merekonstruksi, menggambar ulang, atau memodifikasi logo master.
 * - Dilarang menerapkan filter CSS, recoloring, invert, hue-rotate, atau distorsi aspek rasio.
 * - Dilarang menggunakan logo tiruan atau generator AI.
 */

export interface MasterBrandMetadata {
  status: 'OFFICIAL MASTER — APPROVED — DO NOT MODIFY';
  version: string;
  approvedDate: string;
  brandName: string;
  brandAbbreviation: string;
  subline: string;
  tagline: string;
  officialMasterAssetPath: string;
  officialMasterBannerPath: string;
  aspectRatio: string;
  palette: {
    navyDark: string;
    copperRoseGold: string;
    copperGlow: string;
  };
}

export const OFFICIAL_MASTER_BRAND: MasterBrandMetadata = {
  status: 'OFFICIAL MASTER — APPROVED — DO NOT MODIFY',
  version: '2026.10-FINAL-MASTER',
  approvedDate: '2026-10-25',
  brandName: 'MILLAH ABRAHAM COMMUNICATORS ACADEMY NETWORK',
  brandAbbreviation: 'MA·CAN',
  subline: 'MILLAH ABRAHAM',
  tagline: 'COMMUNICATORS ACADEMY NETWORK',
  // Official master transparent asset (highest resolution, verified master)
  officialMasterAssetPath: '/assets/brand/macan-master-logo.png',
  officialMasterBannerPath: '/assets/brand/macan-master-banner.png',
  aspectRatio: '1410 / 460', // Native 3.06:1 aspect ratio of the master horizontal lockup
  palette: {
    navyDark: '#0b192e',
    copperRoseGold: '#c88360',
    copperGlow: '#f3b082',
  },
};
