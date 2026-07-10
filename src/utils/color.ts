export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100; l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

export function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

export function relativeLuminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(x => {
    x /= 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function contrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1); const c2 = hexToRgb(hex2)
  if (!c1 || !c2) return 0
  const l1 = relativeLuminance(c1.r, c1.g, c1.b)
  const l2 = relativeLuminance(c2.r, c2.g, c2.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function deriveColor(hex: string, lightnessDelta: number, saturationDelta: number): string {
  const hsl = hexToHsl(hex)
  if (!hsl) return hex
  let newL = Math.min(100, Math.max(0, hsl.l + lightnessDelta))
  let newS = Math.min(100, Math.max(0, hsl.s + saturationDelta))
  return hslToHex(hsl.h, newS, newL)
}

export function isValidHex(hex: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)
}

export function generateOnPrimary(primary: string): string {
  const hsl = hexToHsl(primary)
  if (!hsl) return '#ffffff'
  return hsl.l > 60 ? '#1a1a1a' : '#ffffff'
}

export function generateSurface(primary: string): string {
  return deriveColor(primary, 35, -20)
}

export function generateTextMuted(primary: string): string {
  return deriveColor(primary, -15, -30)
}

export function generateAccent(primary: string): string {
  const hsl = hexToHsl(primary)
  if (!hsl) return '#E8A0BF'
  return hslToHex((hsl.h + 30) % 360, Math.min(100, hsl.s + 20), Math.min(100, hsl.l + 5))
}

export function generateBorder(primary: string): string {
  return deriveColor(primary, 20, -40)
}

const pastelColors = [
  '#FDA4AF', '#C4B5FD', '#FED7AA', '#81D4FA', '#A5D6A7',
  '#FFCC80', '#CE93D8', '#EF9A9A', '#90CAF9', '#FFF176',
  '#FFAB91', '#B39DDB', '#80CBC4', '#F48FB1', '#FFE082',
  '#B2DFDB', '#C5CAE9', '#FFCCBC', '#DCEDC8', '#F8BBD0',
]
export function getPastelColors(): string[] { return pastelColors }
