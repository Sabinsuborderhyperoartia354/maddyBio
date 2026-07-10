import type {
  Block, ThemeConfig, BackgroundConfig,
  ProfileBlock, LinkButtonBlock, SocialBlock, CardInfoBlock,
  TextBlock, DividerBlock, VideoBlock, ContactBlock, EmailBlock,
  ProductBlock, ProductItem, HoursBlock, DaySchedule, MapBlock, FaqBlock, FaqItem,
  TestimonialBlock, TestimonialItem, VcardBlock, GalleryBlock,
} from '../types'
import { toPersianDigits, formatPrice } from '../utils/persian'

// ── Optional font data ──────────────────────────────────────────────
let vazirmatnBase64: Record<string, string> = {}
try {
  const mod = await import('./fontBase64')
  if (mod?.vazirmatnBase64) vazirmatnBase64 = mod.vazirmatnBase64
} catch {
  // fontBase64.ts not yet created — system font fallback
}

// ── Helpers ──────────────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function n(theme: ThemeConfig, val: string): string {
  return theme.typography.numerals === 'latin' ? val : toPersianDigits(val)
}

function basePx(bs: string): number {
  return bs === 'sm' ? 14 : bs === 'lg' ? 18 : 16
}

function lhVal(lh: string): number {
  return lh === 'tight' ? 1.3 : lh === 'loose' ? 2.0 : 1.6
}

function entranceCss(e: string): string {
  if (e === 'fade') return 'opacity:0;animation:fadeIn 0.5s ease-out forwards'
  if (e === 'slide-up') return 'opacity:0;transform:translateY(20px);animation:slideUp 0.5s ease-out forwards'
  if (e === 'pop') return 'opacity:0;transform:scale(0.8);animation:popIn 0.4s ease-out forwards'
  return ''
}

function hoverRule(hover: string, primary: string): string {
  if (hover === 'lift') return `:hover{transform:translateY(-3px);box-shadow:0 8px 25px ${primary}40}`
  if (hover === 'glow') return `:hover{box-shadow:0 0 20px ${primary},0 0 40px ${primary}25}`
  if (hover === 'scale') return `:hover{transform:scale(1.04)}`
  return ''
}

function btnShadow(intensity: string): string {
  if (intensity === 'soft') return 'box-shadow:0 2px 8px rgba(0,0,0,0.06)'
  if (intensity === 'medium') return 'box-shadow:0 4px 16px rgba(0,0,0,0.1)'
  return ''
}

function getBg(bg: BackgroundConfig): string {
  switch (bg.type) {
    case 'linear-gradient':
      return `background:linear-gradient(${bg.angle}deg,${bg.colors.join(',')})`
    case 'radial-gradient':
      return `background:radial-gradient(circle,${bg.colors.join(',')})`
    case 'pattern': {
      const c = bg.colors[0] || '#ffffff'
      const o = Math.round(bg.patternOpacity * 255).toString(16).padStart(2, '0')
      const t = c + o
      const p = bg.pattern || 'dots'
      let extra = ''
      if (p === 'dots') extra = `radial-gradient(${t} 1.5px,transparent 1.5px);background-size:20px 20px`
      else if (p === 'grid') extra = `linear-gradient(${t} 1px,transparent 1px),linear-gradient(90deg,${t} 1px,transparent 1px);background-size:20px 20px`
      else if (p === 'waves') extra = `repeating-linear-gradient(45deg,transparent,transparent 10px,${t} 10px,${t} 11px)`
      else if (p === 'hearts') extra = `radial-gradient(${t} 2px,transparent 2px);background-size:30px 30px`
      else if (p === 'stars') extra = `radial-gradient(${t} 1px,transparent 1px);background-size:24px 24px`
      return `background-color:${c};background-image:${extra}`
    }
    default:
      return `background:${bg.colors[0] || '#ffffff'}`
  }
}

function socialSvg(k: string): string {
  const m: Record<string, string> = {
    instagram: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v6M7 7.5v.5M11 16v-4.5a1.5 1.5 0 013 0V16M11 11.5V16"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.63 29.63 0 001 12a29.63 29.63 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29.63 29.63 0 0023 12a29.63 29.63 0 00-.46-5.58z"/><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l6.5 7.5L4 20h2l5-5.5L15.5 20H20l-7-8.5L19.5 4h-2L13 9.5 8.5 4H4z"/></svg>',
    eitaa: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>',
    bale: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
    rubika: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.8"/></svg>',
  }
  return m[k] || ''
}

function starSvg(full: boolean): string {
  return full
    ? '<svg viewBox="0 0 20 20" width="18" height="18" fill="#f59e0b"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"/></svg>'
    : '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#f59e0b" stroke-width="1.5"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"/></svg>'
}

function stars(n: number): string {
  let s = ''
  for (let i = 1; i <= 5; i++) s += starSvg(i <= n)
  return s
}

// ── Block renderers ──────────────────────────────────────────────────

function renderProfile(block: ProfileBlock, theme: ThemeConfig, base: number): string {
  const aR = block.avatarShape === 'circle' ? '50%' : block.avatarShape === 'squircle' ? '20px' : '12px'
  const e = entranceCss(theme.effects.entrance)
  return `
    <div class="block profile-block" style="text-align:center;${e}">
      ${block.avatar
        ? `<div class="avatar-img" style="width:96px;height:96px;margin:0 auto ${base * 0.75}px;border-radius:${aR};background:url('${escapeHtml(block.avatar)}') center/cover;${btnShadow(theme.effects.shadowIntensity)}"></div>`
        : `<div style="width:96px;height:96px;margin:0 auto ${base * 0.75}px;border-radius:${aR};background:${theme.colors.primary}20;display:flex;align-items:center;justify-content:center;font-size:36px">🌸</div>`}
      ${block.name ? `<h1 style="font-size:${base * 1.375}px;font-weight:${theme.typography.headingWeight};margin:0 0 ${base * 0.25}px;color:${theme.colors.text};line-height:${lhVal(theme.typography.lineHeight)}">${escapeHtml(block.name)}</h1>` : ''}
      ${block.title ? `<p style="font-size:${base * 0.875}px;margin:0 0 ${base * 0.25}px;color:${theme.colors.textMuted}">${escapeHtml(block.title)}</p>` : ''}
      ${block.bio ? `<p style="font-size:${base}px;margin:${base * 0.5}px 0 0;color:${theme.colors.textMuted};line-height:${lhVal(theme.typography.lineHeight)}">${escapeHtml(block.bio)}</p>` : ''}
      ${block.showBadge ? `<span style="display:inline-block;margin-top:${base * 0.5}px;padding:4px 14px;border-radius:999px;background:${theme.colors.primary};color:${theme.colors.onPrimary};font-size:${base * 0.75}px;font-weight:600">${n(theme, '✓')} ${n(theme, 'verified')}</span>` : ''}
    </div>`
}

function renderLink(block: LinkButtonBlock, theme: ThemeConfig, base: number): string {
  const radius = theme.shape.buttonRadius >= 32 ? '9999px' : `${theme.shape.buttonRadius}px`
  const style = block.style || theme.shape.buttonStyle
  const e = entranceCss(theme.effects.entrance)
  const h = theme.effects.buttonHover
  const isGradient = style === 'gradient'
  let s = ''
  if (style === 'fill') s = `background:${theme.colors.primary};color:${theme.colors.onPrimary};border:none`
  else if (style === 'outline') s = `background:transparent;color:${theme.colors.primary};border:2px solid ${theme.colors.primary}`
  else if (style === 'soft') s = `background:${theme.colors.primary}15;color:${theme.colors.primary};border:none`
  else if (style === 'glass') s = `background:${theme.colors.surface}80;color:${theme.colors.text};border:1px solid ${theme.colors.border};backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)`
  else if (style === 'shadow') s = `background:${theme.colors.surface};color:${theme.colors.text};border:none;${btnShadow(theme.effects.shadowIntensity)}`
  else s = `background:linear-gradient(135deg,${theme.colors.primary},${theme.colors.accent});color:${theme.colors.onPrimary};border:none`
  const hoverId = `h${block.id.replace(/[^a-zA-Z0-9]/g, '')}`
  const sizeMap: Record<string, string> = { compact: `${base * 0.75}px ${base * 1.25}px`, normal: `${base * 0.875}px ${base * 1.5}px`, large: `${base}px ${base * 1.75}px` }
  const padding = sizeMap[theme.shape.buttonSize] || sizeMap.normal
  const badgeHtml = block.badge === 'new' ? `<span style="position:absolute;top:-6px;left:-6px;background:${theme.colors.accent};color:${theme.colors.onPrimary};font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px">${n(theme, 'جدید')}</span>`
    : block.badge === 'special' ? `<span style="position:absolute;top:-6px;left:-6px;background:linear-gradient(135deg,${theme.colors.primary},${theme.colors.accent});color:${theme.colors.onPrimary};font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px">${n(theme, '✨ ویژه')}</span>`
    : ''
  return `
    <div class="block link-block" style="text-align:center;${e}">
      <a href="${escapeHtml(block.url)}" target="${block.newTab ? '_blank' : '_self'}" rel="noopener" class="${hoverId}" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:${padding};border-radius:${radius};text-decoration:none;font-weight:600;font-size:${base}px;position:relative;overflow:hidden;width:100%;max-width:480px;box-sizing:border-box;cursor:pointer;${s};${h !== 'none' ? `transition:transform 0.25s,box-shadow 0.25s` : ''}">
        ${block.icon ? `<span>${block.icon}</span>` : ''}
        <span>${escapeHtml(block.title)}</span>
        ${block.highlight ? `<span style="position:absolute;inset:0;border-radius:${radius};background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);background-size:200% 100%;animation:shimmer 2s infinite;pointer-events:none"></span>` : ''}
        ${badgeHtml}
      </a>
      ${h !== 'none' ? `<style>.${hoverId}${hoverRule(h, theme.colors.primary)}</style>` : ''}
    </div>`
}

function renderSocial(block: SocialBlock, theme: ThemeConfig): string {
  const e = entranceCss(theme.effects.entrance)
  const platforms = block.platforms
  const links: { svg: string; url: string }[] = []
  const map: Record<string, string> = {
    instagram: 'instagram', telegram: 'telegram', whatsapp: 'whatsapp',
    linkedin: 'linkedin', github: 'github', youtube: 'youtube',
    x: 'x', eitaa: 'eitaa', bale: 'bale', rubika: 'rubika',
  }
  for (const [key, val] of Object.entries(platforms)) {
    if (!val) continue
    let url = ''
    const v = String(val)
    if (key === 'instagram') url = `https://instagram.com/${v}`
    else if (key === 'telegram') url = `https://t.me/${v}`
    else if (key === 'whatsapp') url = `https://wa.me/${v.replace(/^0/, '98')}`
    else if (key === 'eitaa') url = `https://eitaa.com/${v}`
    else if (key === 'bale') url = `https://ble.ir/${v}`
    else if (key === 'rubika') url = `https://rubika.ir/${v}`
    else if (key === 'youtube') url = v.startsWith('http') ? v : `https://youtube.com/@${v}`
    else if (key === 'linkedin') url = v.startsWith('http') ? v : `https://linkedin.com/in/${v}`
    else if (key === 'github') url = `https://github.com/${v}`
    else if (key === 'x') url = `https://x.com/${v}`
    if (!url) continue
    const svg = socialSvg(map[key] || key)
    links.push({ svg, url })
  }
  if (!links.length) return ''
  return `
    <div class="block social-block" style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;padding:4px 0;${e}">
      ${links.map(l => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" style="width:46px;height:46px;border-radius:50%;background:${theme.colors.primary}15;color:${theme.colors.primary};display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform 0.2s,background 0.2s" onmouseover="this.style.transform='scale(1.12)'" onmouseout="this.style.transform='scale(1)'">${l.svg}</a>`).join('')}
    </div>`
}

function renderCard(block: CardInfoBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const clean = block.cardNumber.replace(/\D/g, '').slice(0, 16)
  const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1-')
  const displayNum = theme.typography.numerals === 'latin' ? formatted : toPersianDigits(formatted)
  const cr = `${theme.shape.cardRadius}px`
  return `
    <div class="block card-block" style="background:${theme.colors.surface};border-radius:${cr};padding:${base * 1.25}px;border:1px solid ${theme.colors.border};${e}">
      ${block.accountHolder ? `<p style="margin:0 0 ${base * 0.5}px;font-weight:${theme.typography.headingWeight};font-size:${base}px;color:${theme.colors.text}">${escapeHtml(block.accountHolder)}</p>` : ''}
      ${block.cardNumber ? `<div style="font-family:'Courier New',monospace;font-size:${base * 1.125}px;letter-spacing:1px;direction:ltr;text-align:center;color:${theme.colors.text};margin:${base * 0.5}px 0;padding:${base * 0.75}px;background:${theme.colors.primary}08;border-radius:${cr}">${displayNum}</div>` : ''}
      ${block.bankName ? `<p style="margin:${base * 0.25}px 0;font-size:${base * 0.8125}px;color:${theme.colors.textMuted}">${escapeHtml(block.bankName)}</p>` : ''}
      ${block.shaba ? `<p style="margin:${base * 0.25}px 0;font-size:${base * 0.75}px;color:${theme.colors.textMuted};direction:ltr;text-align:center;font-family:'Courier New',monospace">${escapeHtml(block.shaba)}</p>` : ''}
      ${block.cardNumber ? `<button onclick="copyCard('${clean}')" style="margin-top:${base * 0.75}px;width:100%;padding:${base * 0.625}px;border-radius:${cr};border:none;background:${theme.colors.primary};color:${theme.colors.onPrimary};font-weight:600;cursor:pointer;font-size:${base}px;transition:opacity 0.2s" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${n(theme, '📋 کپی شماره کارت')}</button>` : ''}
    </div>`
}

function renderText(block: TextBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const align = block.alignment
  const size = block.fontSize === 'sm' ? base * 0.875 : block.fontSize === 'lg' ? base * 1.125 : base
  const w = block.variant === 'heading' ? theme.typography.headingWeight : theme.typography.bodyWeight
  const content = block.content.replace(/\n/g, '<br>')
  return `
    <div class="block text-block" style="text-align:${align};font-size:${size}px;font-weight:${w};color:${theme.colors.text};line-height:${lhVal(theme.typography.lineHeight)};${e}">
      ${content}
    </div>`
}

function renderDivider(block: DividerBlock, theme: ThemeConfig): string {
  const e = entranceCss(theme.effects.entrance)
  if (block.style === 'space') {
    return `<div class="block divider-block" style="height:16px;${e}"></div>`
  }
  if (block.style === 'emoji') {
    return `<div class="block divider-block" style="text-align:center;padding:8px 0;color:${theme.colors.primary};font-size:20px;${e}">${block.emoji || '🌸'}</div>`
  }
  const border = block.style === 'dashed' ? 'dashed' : 'solid'
  return `<div class="block divider-block" style="border-top:1px ${border} ${theme.colors.border};margin:8px 0;${e}"></div>`
}

function renderVideo(block: VideoBlock, _theme: ThemeConfig): string {
  let src = ''
  if (block.platform === 'youtube') {
    const m = block.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    if (m) src = `https://www.youtube.com/embed/${m[1]}`
  } else if (block.platform === 'aparat') {
    const m = block.url.match(/aparat\.com\/v\/([a-zA-Z0-9_-]+)/)
    if (m) src = `https://www.aparat.com/video/video/embed/videohash/${m[1]}/vt/frame`
  }
  if (!src) return ''
  const e = entranceCss(_theme.effects.entrance)
  return `
    <div class="block video-block" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:${_theme.shape.cardRadius}px;${e}">
      <iframe src="${escapeHtml(src)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>
    </div>`
}

function renderContact(block: ContactBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const items: { label: string; href: string; icon: string }[] = []
  if (block.phone) items.push({ label: block.phone, href: `tel:${block.phone}`, icon: '📞' })
  if (block.whatsapp) {
    const num = block.whatsapp.replace(/^0/, '98')
    const text = block.whatsappText ? `?text=${encodeURIComponent(block.whatsappText)}` : ''
    items.push({ label: `پیام در واتساپ`, href: `https://wa.me/${num}${text}`, icon: '💬' })
  }
  if (block.telegram) items.push({ label: `پیام در تلگرام`, href: `https://t.me/${block.telegram}`, icon: '✈️' })
  return `
    <div class="block contact-block" style="display:flex;flex-direction:column;gap:8px;${e}">
      ${items.map(item => `
        <a href="${escapeHtml(item.href)}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;padding:${base * 0.875}px ${base}px;border-radius:${cr};background:${theme.colors.surface};color:${theme.colors.text};text-decoration:none;font-size:${base}px;border:1px solid ${theme.colors.border};transition:background 0.2s" onmouseover="this.style.background='${theme.colors.primary}10'" onmouseout="this.style.background='${theme.colors.surface}'">
          <span style="font-size:${base * 1.25}px">${item.icon}</span>
          <span>${escapeHtml(item.label)}</span>
        </a>`).join('')}
    </div>`
}

function renderEmail(block: EmailBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const href = block.subject ? `mailto:${block.email}?subject=${encodeURIComponent(block.subject)}` : `mailto:${block.email}`
  return `
    <div class="block email-block" style="${e}">
      <a href="${escapeHtml(href)}" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:${base * 0.875}px ${base}px;border-radius:${cr};background:${theme.colors.surface};color:${theme.colors.text};text-decoration:none;font-size:${base}px;border:1px solid ${theme.colors.border};transition:background 0.2s" onmouseover="this.style.background='${theme.colors.primary}10'" onmouseout="this.style.background='${theme.colors.surface}'">
        <span style="font-size:${base * 1.25}px">✉️</span>
        <span>${escapeHtml(block.email)}</span>
      </a>
    </div>`
}

function renderProduct(block: ProductBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const btnR = theme.shape.buttonRadius >= 32 ? '9999px' : `${theme.shape.buttonRadius}px`

  const renderItem = (item: ProductItem) => {
    const badgeHtml = item.badge === 'new' ? `<span style="position:absolute;top:8px;left:8px;background:${theme.colors.accent};color:${theme.colors.onPrimary};font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;z-index:1">${n(theme, 'جدید')}</span>`
      : item.badge === 'sale' ? `<span style="position:absolute;top:8px;left:8px;background:#ef4444;color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;z-index:1">${n(theme, 'تخفیف')}</span>`
      : item.badge === 'unavailable' ? `<span style="position:absolute;top:8px;left:8px;background:#6b7280;color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;z-index:1">${n(theme, 'ناموجود')}</span>`
      : ''
    const price = theme.typography.numerals === 'latin' ? formatPrice(item.price) : formatPrice(item.price)
    return `
      <div style="background:${theme.colors.surface};border-radius:${cr};overflow:hidden;border:1px solid ${theme.colors.border};display:flex;flex-direction:column">
        <div style="position:relative;padding-bottom:100%;background:${theme.colors.primary}08">
          ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" loading="lazy">` : `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:32px">📦</div>`}
          ${badgeHtml}
        </div>
        <div style="padding:${base * 0.75}px;flex:1;display:flex;flex-direction:column;gap:6px">
          <p style="margin:0;font-size:${base}px;font-weight:${theme.typography.headingWeight};color:${theme.colors.text};line-height:1.4">${escapeHtml(item.name)}</p>
          <p style="margin:0;font-size:${base * 0.875}px;font-weight:700;color:${theme.colors.primary}">${price} ${n(theme, 'تومان')}</p>
          ${item.link ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener" style="display:inline-block;text-align:center;padding:${base * 0.5}px ${base * 0.75}px;border-radius:${btnR};background:${theme.colors.primary};color:${theme.colors.onPrimary};text-decoration:none;font-size:${base * 0.8125}px;font-weight:600;margin-top:auto;transition:opacity 0.2s" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${n(theme, 'سفارش')}</a>` : ''}
        </div>
      </div>`
  }

  if (block.layout === 'grid') {
    return `
      <div class="block product-block" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;${e}">
        ${block.items.map(renderItem).join('')}
      </div>`
  }
  if (block.layout === 'slider') {
    return `
      <div class="block product-block" style="${e}">
        <div style="display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding-bottom:8px;scrollbar-width:none">
          ${block.items.map(item => `<div style="flex:0 0 75%;scroll-snap-align:start;max-width:280px">${renderItem(item)}</div>`).join('')}
        </div>
      </div>`
  }
  return `
    <div class="block product-block" style="display:flex;flex-direction:column;gap:12px;${e}">
      ${block.items.map(renderItem).join('')}
    </div>`
}

function renderHours(block: HoursBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  return `
    <div class="block hours-block" style="background:${theme.colors.surface};border-radius:${cr};border:1px solid ${theme.colors.border};overflow:hidden;${e}">
      <table style="width:100%;border-collapse:collapse;font-size:${base}px">
        <tbody>
          ${block.schedule.map((day, i) => `
            <tr style="border-bottom:1px solid ${theme.colors.border}${i === block.schedule.length - 1 ? '' : ''}">
              <td style="padding:${base * 0.5}px ${base * 0.75}px;color:${theme.colors.text};font-weight:600;width:40%">${escapeHtml(day.day)}</td>
              <td style="padding:${base * 0.5}px ${base * 0.75}px;color:${day.isOff ? theme.colors.textMuted : theme.colors.text};text-align:left">
                ${day.isOff ? `<span style="color:${theme.colors.textMuted}">${n(theme, 'تعطیل')}</span>` : `${day.open} – ${day.close}`}
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`
}

function renderMap(block: MapBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const lat = block.lat
  const lng = block.lng
  return `
    <div class="block map-block" style="background:${theme.colors.surface};border-radius:${cr};padding:${base}px ${base}px;border:1px solid ${theme.colors.border};${e}">
      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:${base * 0.5}px">
        <span style="font-size:${base * 1.25}px">📍</span>
        <p style="margin:0;font-size:${base}px;color:${theme.colors.text};line-height:1.6">${escapeHtml(block.address)}</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <a href="https://neshan.org/maps/@${lat},${lng},16z" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:${base * 0.5}px ${base * 0.75}px;border-radius:${cr};background:${theme.colors.primary}12;color:${theme.colors.primary};text-decoration:none;font-size:${base * 0.8125}px;font-weight:600;transition:background 0.2s" onmouseover="this.style.background='${theme.colors.primary}25'" onmouseout="this.style.background='${theme.colors.primary}12'">🗺 ${n(theme, 'نشان')}</a>
        <a href="https://balemaps.ir/map/${lat},${lng}" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:${base * 0.5}px ${base * 0.75}px;border-radius:${cr};background:${theme.colors.primary}12;color:${theme.colors.primary};text-decoration:none;font-size:${base * 0.8125}px;font-weight:600;transition:background 0.2s" onmouseover="this.style.background='${theme.colors.primary}25'" onmouseout="this.style.background='${theme.colors.primary}12'">📍 ${n(theme, 'بله')}</a>
        <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener" style="flex:1;text-align:center;padding:${base * 0.5}px ${base * 0.75}px;border-radius:${cr};background:${theme.colors.primary}12;color:${theme.colors.primary};text-decoration:none;font-size:${base * 0.8125}px;font-weight:600;transition:background 0.2s" onmouseover="this.style.background='${theme.colors.primary}25'" onmouseout="this.style.background='${theme.colors.primary}12'">🌍 ${n(theme, 'گوگل مپ')}</a>
      </div>
    </div>`
}

function renderFaq(block: FaqBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  return `
    <div class="block faq-block" style="${e}">
      ${block.items.map(item => `
        <details style="background:${theme.colors.surface};border-radius:${cr};border:1px solid ${theme.colors.border};margin-bottom:8px;overflow:hidden">
          <summary style="padding:${base * 0.75}px ${base}px;font-size:${base}px;font-weight:600;color:${theme.colors.text};cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between">
            <span>${escapeHtml(item.question)}</span>
            <span style="font-size:12px;color:${theme.colors.textMuted};transition:transform 0.2s">▼</span>
          </summary>
          <div style="padding:0 ${base}px ${base * 0.75}px;font-size:${base * 0.875}px;color:${theme.colors.textMuted};line-height:${lhVal(theme.typography.lineHeight)}">
            ${item.answer.replace(/\n/g, '<br>')}
          </div>
        </details>`).join('')}
    </div>`
}

function renderTestimonial(block: TestimonialBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  return `
    <div class="block testimonial-block" style="display:flex;flex-direction:column;gap:12px;${e}">
      ${block.items.map(item => `
        <div style="background:${theme.colors.surface};border-radius:${cr};padding:${base * 0.875}px;border:1px solid ${theme.colors.border}">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            ${item.avatar ? `<div style="width:40px;height:40px;border-radius:50%;background:url('${escapeHtml(item.avatar)}') center/cover;flex-shrink:0"></div>` : `<div style="width:40px;height:40px;border-radius:50%;background:${theme.colors.primary}20;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">👤</div>`}
            <div>
              <p style="margin:0;font-size:${base}px;font-weight:${theme.typography.headingWeight};color:${theme.colors.text}">${escapeHtml(item.name)}</p>
              <div style="display:flex;gap:2px;margin-top:2px">${stars(item.rating)}</div>
            </div>
          </div>
          <p style="margin:0;font-size:${base * 0.875}px;color:${theme.colors.textMuted};line-height:${lhVal(theme.typography.lineHeight)}">${escapeHtml(item.text)}</p>
        </div>`).join('')}
    </div>`
}

function renderVcard(block: VcardBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const btnR = theme.shape.buttonRadius >= 32 ? '9999px' : `${theme.shape.buttonRadius}px`
  const id = block.id.replace(/[^a-zA-Z0-9]/g, '')
  return `
    <div class="block vcard-block" style="background:${theme.colors.surface};border-radius:${cr};padding:${base * 1.25}px;border:1px solid ${theme.colors.border};text-align:center;${e}">
      <div style="font-size:40px;margin-bottom:${base * 0.5}px">📇</div>
      ${block.fullName ? `<h3 style="margin:0 0 4px;font-size:${base * 1.125}px;font-weight:${theme.typography.headingWeight};color:${theme.colors.text}">${escapeHtml(block.fullName)}</h3>` : ''}
      ${block.title ? `<p style="margin:0 0 ${base * 0.25}px;font-size:${base * 0.875}px;color:${theme.colors.textMuted}">${escapeHtml(block.title)}</p>` : ''}
      ${block.org ? `<p style="margin:0 0 ${base * 0.25}px;font-size:${base * 0.875}px;color:${theme.colors.textMuted}">${escapeHtml(block.org)}</p>` : ''}
      <div style="text-align:right;margin:${base * 0.75}px 0;font-size:${base}px;color:${theme.colors.text};line-height:2">
        ${block.phone ? `<div>📞 ${escapeHtml(block.phone)}</div>` : ''}
        ${block.email ? `<div>✉️ ${escapeHtml(block.email)}</div>` : ''}
        ${block.address ? `<div>📍 ${escapeHtml(block.address)}</div>` : ''}
      </div>
      <button onclick="downloadVcf('${id}')" class="vcf-btn-${id}" style="width:100%;padding:${base * 0.75}px;border-radius:${btnR};border:none;background:${theme.colors.primary};color:${theme.colors.onPrimary};font-weight:600;cursor:pointer;font-size:${base}px;transition:opacity 0.2s" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${n(theme, '📥 دانلود کارت ویزیت')}</button>
      <script>
        window.vcfData_${id} = ${JSON.stringify(block)};
      <\/script>
    </div>`
}

function renderGallery(block: GalleryBlock, theme: ThemeConfig, base: number): string {
  const e = entranceCss(theme.effects.entrance)
  const cr = `${theme.shape.cardRadius}px`
  const cols = block.columns === 3 ? 'repeat(3,1fr)' : 'repeat(2,1fr)'
  return `
    <div class="block gallery-block" style="display:grid;grid-template-columns:${cols};gap:8px;${e}">
      ${block.images.map(img => `
        <a href="${escapeHtml(img)}" target="_blank" rel="noopener" style="display:block;border-radius:${cr};overflow:hidden">
          <img src="${escapeHtml(img)}" alt="" style="width:100%;height:auto;aspect-ratio:1;object-fit:cover;display:block;transition:transform 0.3s" loading="lazy" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
        </a>`).join('')}
    </div>`
}

// ── Main render ──────────────────────────────────────────────────────

function renderBlock(block: Block, theme: ThemeConfig, base: number): string {
  switch (block.type) {
    case 'profile': return renderProfile(block as ProfileBlock, theme, base)
    case 'link': return renderLink(block as LinkButtonBlock, theme, base)
    case 'social': return renderSocial(block as SocialBlock, theme)
    case 'card': return renderCard(block as CardInfoBlock, theme, base)
    case 'text': return renderText(block as TextBlock, theme, base)
    case 'divider': return renderDivider(block as DividerBlock, theme)
    case 'video': return renderVideo(block as VideoBlock, theme)
    case 'contact': return renderContact(block as ContactBlock, theme, base)
    case 'email': return renderEmail(block as EmailBlock, theme, base)
    case 'product': return renderProduct(block as ProductBlock, theme, base)
    case 'hours': return renderHours(block as HoursBlock, theme, base)
    case 'map': return renderMap(block as MapBlock, theme, base)
    case 'faq': return renderFaq(block as FaqBlock, theme, base)
    case 'testimonial': return renderTestimonial(block as TestimonialBlock, theme, base)
    case 'vcard': return renderVcard(block as VcardBlock, theme, base)
    case 'gallery': return renderGallery(block as GalleryBlock, theme, base)
    default: return ''
  }
}

export function generateHtml(blocks: Block[], theme: ThemeConfig, pageName: string): string {
  const base = basePx(theme.typography.baseSize)
  const bgCss = getBg(theme.colors.background)
  const animatedCss = theme.colors.background.animated ? 'animation:bgShift 20s ease infinite;background-size:200% 200%' : ''
  const imageCss = theme.colors.background.image ? `background-image:url('${theme.colors.background.image}');background-size:cover;background-position:center` : ''

  const fontFaces = Object.entries(vazirmatnBase64).map(([w, b64]) => `
    @font-face {
      font-family: 'Vazirmatn';
      src: url(data:font/woff2;base64,${b64}) format('woff2');
      font-weight: ${w};
      font-style: normal;
      font-display: swap;
    }`).join('')

  const fontFamily = theme.typography.fontFamily === 'vazirmatn' && vazirmatnBase64['400']
    ? "'Vazirmatn',tahoma,'Segoe UI',sans-serif"
    : "tahoma,'Segoe UI',sans-serif"

  const blocksHtml = blocks.filter(b => b.enabled).map(b => renderBlock(b, theme, base)).join('\n      ')

  const footerHtml = theme.showMaddyBioFooter
    ? `<div style="text-align:center;padding:20px 0 10px;font-size:${base * 0.75}px;color:${theme.colors.textMuted}80"><a href="https://maddybio.app" style="color:${theme.colors.textMuted}80;text-decoration:none">${n(theme, 'ساخته‌شده با maddyBio')} 🌸</a></div>`
    : ''

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="theme-color" content="${theme.colors.primary}">
  <meta name="description" content="${escapeHtml(pageName)}">
  <meta property="og:title" content="${escapeHtml(pageName)}">
  <meta property="og:description" content="${n(theme, 'صفحه لینک در بایو')}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fa_IR">
  <title>${escapeHtml(pageName)}</title>
  <style>
    ${fontFaces}
    *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    html{scroll-behavior:smooth}
    body{font-family:${fontFamily};direction:rtl;${bgCss};${animatedCss};${imageCss};min-height:100vh;background-attachment:fixed;background-size:cover;background-repeat:no-repeat}
    .container{max-width:520px;margin:0 auto;padding:32px 16px}
    .block{margin-bottom:16px}
    .avatar-img{background-size:cover;background-position:center;flex-shrink:0}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes bgShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
    @keyframes toastOut{from{opacity:1;transform:translateX(-50%) translateY(0)}to{opacity:0;transform:translateX(-50%) translateY(20px)}}
    details>summary::-webkit-details-marker{display:none}
    details[open]>summary span:last-child{transform:rotate(180deg)}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${theme.colors.textMuted}40;border-radius:4px}
  </style>
</head>
<body>
  <div class="container">
    ${blocksHtml}
    ${footerHtml}
  </div>
  <div id="toast" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;padding:12px 24px;border-radius:999px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:999;display:none;animation:toastIn 0.3s ease-out;white-space:nowrap;font-family:${fontFamily}"></div>
  <script>
    function copyCard(n){navigator.clipboard.writeText(n).then(function(){var t=document.getElementById('toast');t.textContent='✅ ${n(theme, 'کپی شد')}';t.style.display='block';t.style.animation='toastIn 0.3s ease-out';setTimeout(function(){t.style.animation='toastOut 0.3s ease-in forwards';setTimeout(function(){t.style.display='none';t.style.animation='toastIn 0.3s ease-out'},300)},2000)})}
    function downloadVcf(id){try{var d=window['vcfData_'+id];if(!d)return;var lines=['BEGIN:VCARD','VERSION:3.0'];if(d.fullName)lines.push('FN:'+d.fullName);if(d.phone)lines.push('TEL:'+d.phone);if(d.email)lines.push('EMAIL:'+d.email);if(d.org)lines.push('ORG:'+d.org);if(d.title)lines.push('TITLE:'+d.title);if(d.address)lines.push('ADR:'+d.address);lines.push('END:VCARD');var blob=new Blob([lines.join('\\r\\n')],{type:'text/vcard'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='contact.vcf';document.body.appendChild(a);a.click();setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(a.href)},100)}catch(e){}}
  </script>
</body>
</html>`
}
