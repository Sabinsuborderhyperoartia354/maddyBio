import type { Palette } from '../types'

export const palettes: Palette[] = [
  {
    id: 'blossom', name: 'شکوفه', icon: '🌸',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#FFE4E6', '#FCE7F3', '#FFF7ED'], angle: 135, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.8)', primary: '#FDA4AF', onPrimary: '#1a1a1a',
        text: '#1f1f1f', textMuted: '#8a7a7a', accent: '#E8A0BF', border: '#f0d0d6',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 9999, buttonStyle: 'shadow', cardRadius: 20, buttonSize: 'normal' },
      effects: { entrance: 'fade', buttonHover: 'lift', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'peach', name: 'هلویی', icon: '🍑',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#FED7AA', '#FDE8EF'], angle: 135, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.6)', primary: '#FFAB91', onPrimary: '#1a1a1a',
        text: '#2d2d2d', textMuted: '#8a7a7a', accent: '#FF8A65', border: '#f5d0c0',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 16, buttonStyle: 'glass', cardRadius: 16, buttonSize: 'normal' },
      effects: { entrance: 'slide-up', buttonHover: 'scale', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'lavender', name: 'یاسی', icon: '💜',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#EDE7F6'], angle: 0, patternOpacity: 0, animated: false },
        surface: '#ffffff', primary: '#B39DDB', onPrimary: '#ffffff',
        text: '#1a1a2e', textMuted: '#7a6a8a', accent: '#CE93D8', border: '#d5c6e0',
      },
      typography: { fontFamily: 'estedad', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0.01 },
      shape: { buttonRadius: 12, buttonStyle: 'fill', cardRadius: 14, buttonSize: 'normal' },
      effects: { entrance: 'fade', buttonHover: 'glow', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'ocean', name: 'اقیانوس', icon: '🌊',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#81D4FA', '#B3E5FC'], angle: 180, patternOpacity: 0, animated: true },
        surface: 'rgba(255,255,255,0.7)', primary: '#4FC3F7', onPrimary: '#1a1a1a',
        text: '#01579B', textMuted: '#5a7a8a', accent: '#26C6DA', border: '#b0d4e8',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 24, buttonStyle: 'glass', cardRadius: 18, buttonSize: 'normal' },
      effects: { entrance: 'slide-up', buttonHover: 'glow', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'midnight', name: 'میدنایت', icon: '🖤',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#0a0a1a'], angle: 0, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.06)', primary: '#FF4081', onPrimary: '#ffffff',
        text: '#ffffff', textMuted: '#8a8aaa', accent: '#00E5FF', border: 'rgba(255,255,255,0.1)',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 800, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 8, buttonStyle: 'outline', cardRadius: 12, buttonSize: 'normal' },
      effects: { entrance: 'pop', buttonHover: 'glow', shadowIntensity: 'medium' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'minimal', name: 'مینیمال', icon: '🤍',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#ffffff'], angle: 0, patternOpacity: 0, animated: false },
        surface: '#f5f5f5', primary: '#1a1a1a', onPrimary: '#ffffff',
        text: '#1a1a1a', textMuted: '#888888', accent: '#333333', border: '#e0e0e0',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 300, baseSize: 'md', lineHeight: 'tight', numerals: 'latin', letterSpacing: -0.01 },
      shape: { buttonRadius: 4, buttonStyle: 'outline', cardRadius: 8, buttonSize: 'compact' },
      effects: { entrance: 'none', buttonHover: 'scale', shadowIntensity: 'none' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'cafe', name: 'کافه', icon: '☕',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#F5E6D3'], angle: 0, pattern: 'dots', patternOpacity: 0.05, animated: false },
        surface: 'rgba(255,255,255,0.8)', primary: '#8D6E63', onPrimary: '#ffffff',
        text: '#3E2723', textMuted: '#7a6a5a', accent: '#A1887F', border: '#d5c0b0',
      },
      typography: { fontFamily: 'shabnam', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 12, buttonStyle: 'soft', cardRadius: 14, buttonSize: 'normal' },
      effects: { entrance: 'fade', buttonHover: 'lift', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'nature', name: 'طبیعت', icon: '🌿',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#C8E6C9', '#E8F5E9'], angle: 135, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.7)', primary: '#81C784', onPrimary: '#1a1a1a',
        text: '#1B5E20', textMuted: '#5a7a5a', accent: '#66BB6A', border: '#b8d8b8',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 20, buttonStyle: 'shadow', cardRadius: 16, buttonSize: 'normal' },
      effects: { entrance: 'slide-up', buttonHover: 'lift', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'luxury', name: 'لاکچری', icon: '✨',
    config: {
      colors: {
        background: { type: 'radial-gradient', colors: ['#1a1a1a', '#0d0d0d'], angle: 0, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.05)', primary: '#D4A017', onPrimary: '#1a1a1a',
        text: '#F5F5F5', textMuted: '#8a8a6a', accent: '#FFD700', border: 'rgba(212,160,23,0.3)',
      },
      typography: { fontFamily: 'markaziText', headingWeight: 700, bodyWeight: 400, baseSize: 'lg', lineHeight: 'loose', numerals: 'persian', letterSpacing: 0.03 },
      shape: { buttonRadius: 4, buttonStyle: 'gradient', cardRadius: 20, buttonSize: 'large' },
      effects: { entrance: 'fade', buttonHover: 'glow', shadowIntensity: 'medium' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'strawberry', name: 'توت‌فرنگی', icon: '🍓',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#FFF0F5'], angle: 0, pattern: 'hearts', patternOpacity: 0.08, animated: false },
        surface: 'rgba(255,255,255,0.8)', primary: '#FF6B8A', onPrimary: '#ffffff',
        text: '#2d1a1a', textMuted: '#8a5a6a', accent: '#FF4081', border: '#f5d0d8',
      },
      typography: { fontFamily: 'estedad', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 9999, buttonStyle: 'fill', cardRadius: 20, buttonSize: 'normal' },
      effects: { entrance: 'pop', buttonHover: 'scale', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'autumn', name: 'پاییزی', icon: '🍂',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#FFCC80', '#FFE0B2', '#FFF8E1'], angle: 135, patternOpacity: 0, animated: false },
        surface: 'rgba(255,255,255,0.7)', primary: '#FF8A65', onPrimary: '#ffffff',
        text: '#3E2723', textMuted: '#8a7a5a', accent: '#FF7043', border: '#e8c8a8',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 12, buttonStyle: 'soft', cardRadius: 14, buttonSize: 'normal' },
      effects: { entrance: 'fade', buttonHover: 'lift', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'night-sky', name: 'آسمان شب', icon: '🌙',
    config: {
      colors: {
        background: { type: 'radial-gradient', colors: ['#0a0e27', '#1a1a3e'], angle: 0, pattern: 'stars', patternOpacity: 0.1, animated: false },
        surface: 'rgba(255,255,255,0.06)', primary: '#7C4DFF', onPrimary: '#ffffff',
        text: '#E8E8FF', textMuted: '#7a7aaa', accent: '#B388FF', border: 'rgba(124,77,255,0.2)',
      },
      typography: { fontFamily: 'sahel', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 8, buttonStyle: 'glass', cardRadius: 12, buttonSize: 'normal' },
      effects: { entrance: 'slide-up', buttonHover: 'glow', shadowIntensity: 'medium' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'lemon', name: 'لیمویی', icon: '🍋',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#FFFDE7'], angle: 0, patternOpacity: 0, animated: false },
        surface: '#ffffff', primary: '#FFD600', onPrimary: '#1a1a1a',
        text: '#1a1a1a', textMuted: '#7a7a5a', accent: '#FFEA00', border: '#f0e8c0',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'tight', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 9999, buttonStyle: 'fill', cardRadius: 12, buttonSize: 'normal' },
      effects: { entrance: 'pop', buttonHover: 'scale', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'hologram', name: 'هولوگرافیک', icon: '🌈',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#FFE4E6', '#E8E0F0', '#E0F0FF', '#E0FFE8'], angle: 45, patternOpacity: 0, animated: true },
        surface: 'rgba(255,255,255,0.6)', primary: '#E8A0BF', onPrimary: '#ffffff',
        text: '#2d1a2d', textMuted: '#8a7a8a', accent: '#C4B5FD', border: '#e8d8e8',
      },
      typography: { fontFamily: 'estedad', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0.02 },
      shape: { buttonRadius: 20, buttonStyle: 'glass', cardRadius: 20, buttonSize: 'normal' },
      effects: { entrance: 'slide-up', buttonHover: 'glow', shadowIntensity: 'soft' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'navy', name: 'بیزینسی', icon: '💼',
    config: {
      colors: {
        background: { type: 'solid', colors: ['#ECEFF1'], angle: 0, pattern: 'grid', patternOpacity: 0.03, animated: false },
        surface: '#ffffff', primary: '#1A237E', onPrimary: '#ffffff',
        text: '#1a1a2e', textMuted: '#5a6a7a', accent: '#3949AB', border: '#c5cae8',
      },
      typography: { fontFamily: 'shabnam', headingWeight: 700, bodyWeight: 400, baseSize: 'md', lineHeight: 'tight', numerals: 'latin', letterSpacing: 0 },
      shape: { buttonRadius: 4, buttonStyle: 'fill', cardRadius: 8, buttonSize: 'compact' },
      effects: { entrance: 'fade', buttonHover: 'lift', shadowIntensity: 'none' },
      showMaddyBioFooter: true,
    },
  },
  {
    id: 'rainbow', name: 'رنگین‌کمان', icon: '🌈',
    config: {
      colors: {
        background: { type: 'linear-gradient', colors: ['#FFE4E6', '#FCE7F3', '#EDE7F6', '#E0F7FA', '#FFF8E1'], angle: 135, patternOpacity: 0, animated: true },
        surface: 'rgba(255,255,255,0.7)', primary: '#EC407A', onPrimary: '#ffffff',
        text: '#2d1a2d', textMuted: '#7a6a7a', accent: '#AB47BC', border: '#e8d0e0',
      },
      typography: { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 500, baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0 },
      shape: { buttonRadius: 9999, buttonStyle: 'gradient', cardRadius: 16, buttonSize: 'normal' },
      effects: { entrance: 'pop', buttonHover: 'glow', shadowIntensity: 'medium' },
      showMaddyBioFooter: true,
    },
  },
]

export const fontFamilyNames: Record<string, string> = {
  vazirmatn: 'وزیرمتن',
  estedad: 'استعداد',
  shabnam: 'شبنم',
  sahel: 'ساحل',
  markaziText: 'مرکزی Text',
}
