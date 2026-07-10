import React from 'react'
import type { Block, ThemeConfig } from '../../types'
import type {
  ProfileBlock, LinkButtonBlock, SocialBlock, CardInfoBlock,
  TextBlock, DividerBlock, VideoBlock, ContactBlock, EmailBlock,
  ProductBlock, HoursBlock, MapBlock, FaqBlock, TestimonialBlock,
  VcardBlock, GalleryBlock,
} from '../../types'
import { toPersianDigits } from '../../utils/persian'
import { hexToRgb } from '../../utils/color'
import { formatCardNumber } from '../../lib/persian'

function alpha(hex: string, a: number): string {
  const r = hexToRgb(hex)
  return r ? `rgba(${r.r},${r.g},${r.b},${a})` : hex
}

const fontFamilyMap: Record<string, string> = {
  vazirmatn: "'Vazirmatn', sans-serif",
  estedad: "'Estedad', sans-serif",
  shabnam: "'Shabnam', sans-serif",
  sahel: "'Sahel', sans-serif",
  markaziText: "'Markazi Text', serif",
}

const baseSizePx: Record<string, number> = { sm: 14, md: 16, lg: 18 }
const textSizeFactor: Record<string, number> = { sm: 0.875, md: 1, lg: 1.25 }

const persianDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

const buttonPaddingMap: Record<string, string> = {
  compact: '6px 16px',
  normal: '10px 20px',
  large: '14px 28px',
}

function SocialSvgInstagram({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
}
function SocialSvgTelegram({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 12.5l3.5 1.5 1.5 4 5-8-10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function SocialSvgWhatsapp({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.43 5.18L2 22l4.82-1.43A9.959 9.959 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 8s1-1 2.5-.5S13 10 13 10s-1 1-1 2 2 2 2 2 1 1 1 2-.5 2-.5 2-3 0-5-3-2.5-5-2.5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function SocialSvgTwitter({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 4l6.5 7.5L4 20h2l5.5-6.5L17 20h5l-7-8.5L21 4h-2l-5 6L9 4H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function SocialSvgLinkedin({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 10v6M7 7.5v.5M11 16v-5a1.5 1.5 0 013 0v5M11 11.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function SocialSvgYoutube({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.63 29.63 0 001 12a29.63 29.63 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29.63 29.63 0 0023 12a29.63 29.63 0 00-.46-5.58z" stroke="currentColor" strokeWidth="1.5" /><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" stroke="currentColor" strokeWidth="1.5" /></svg>
}
function SocialSvgGithub({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="currentColor" strokeWidth="1.5" /></svg>
}
function SocialSvgTiktok({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M19 8a5 5 0 01-5-5h-3v11a3 3 0 11-2-2.83V9.1a6 6 0 105 5.9V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function SocialSvgEitaa({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M7 12l3 2 2 4 5-9-10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function SocialSvgBale({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="10" r="2" fill="currentColor" /><circle cx="15" cy="10" r="2" fill="currentColor" /><path d="M8 15c1.5 1.5 4 2 4 2s2.5-.5 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}
function SocialSvgRubika({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 9h8M8 13h6M8 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}

const socialSvgMap: Record<string, React.FC<{ size?: number }>> = {
  instagram: SocialSvgInstagram,
  telegram: SocialSvgTelegram,
  whatsapp: SocialSvgWhatsapp,
  x: SocialSvgTwitter,
  linkedin: SocialSvgLinkedin,
  youtube: SocialSvgYoutube,
  github: SocialSvgGithub,
  tiktok: SocialSvgTiktok,
  eitaa: SocialSvgEitaa,
  bale: SocialSvgBale,
  rubika: SocialSvgRubika,
}

function platformUrl(platform: string, handle: string): string {
  const urls: Record<string, (h: string) => string> = {
    instagram: h => `https://instagram.com/${h}`,
    telegram: h => `https://t.me/${h}`,
    whatsapp: h => `https://wa.me/${h.replace(/[^0-9]/g, '')}`,
    x: h => `https://x.com/${h}`,
    linkedin: h => h.includes('linkedin.com') ? h : `https://linkedin.com/in/${h}`,
    youtube: h => h.includes('youtube.com') || h.includes('youtu.be') ? h : `https://youtube.com/@${h}`,
    github: h => `https://github.com/${h}`,
    tiktok: h => `https://tiktok.com/@${h}`,
    eitaa: h => `https://eitaa.com/${h}`,
    bale: h => `https://ble.ir/${h}`,
    rubika: h => `https://rubika.ir/${h}`,
  }
  return (urls[platform] || (h => h))(handle)
}

function escapeVcard(str: string): string {
  return str.replace(/[\\;,;\n]/g, c => '\\' + c)
}

function renderProfile(block: ProfileBlock, theme: ThemeConfig, fontFamily: string) {
  const avatarSize = block.title || block.bio ? 72 : 80
  let shapeStyle: React.CSSProperties = {}
  let shapeClass = ''
  if (block.avatarShape === 'circle') {
    shapeClass = 'rounded-full'
  } else if (block.avatarShape === 'square') {
    shapeClass = 'rounded-xl'
  } else if (block.avatarShape === 'squircle') {
    shapeClass = 'rounded-2xl'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', fontFamily }}>
      {block.avatar ? (
        <img
          src={block.avatar}
          alt={block.name}
          style={{
            width: avatarSize,
            height: avatarSize,
            objectFit: 'cover',
            borderRadius: shapeClass === 'rounded-full' ? '50%' : shapeClass === 'rounded-2xl' ? '16px' : '12px',
            border: `2px solid ${theme.colors.primary}`,
          }}
        />
      ) : (
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            backgroundColor: alpha(theme.colors.primary, 0.15),
            borderRadius: shapeClass === 'rounded-full' ? '50%' : shapeClass === 'rounded-2xl' ? '16px' : '12px',
            border: `2px solid ${theme.colors.primary}`,
          }}
        >
          {block.avatarShape === 'squircle' ? '🌸' : '👤'}
        </div>
      )}
      {block.name && (
        <div style={{ fontWeight: 700, fontSize: 20, color: theme.colors.text, textAlign: 'center' }}>
          {block.name}
        </div>
      )}
      {block.title && (
        <div style={{ fontSize: 14, color: theme.colors.textMuted, textAlign: 'center' }}>
          {block.title}
        </div>
      )}
      {block.bio && (
        <div style={{ fontSize: 13, color: theme.colors.textMuted, textAlign: 'center', lineHeight: 1.6, maxWidth: 320 }}>
          {block.bio}
        </div>
      )}
      {block.showBadge && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 12px',
            borderRadius: 9999,
            fontSize: 11,
            backgroundColor: alpha(theme.colors.primary, 0.15),
            color: theme.colors.primary,
          }}
        >
          ✓ {toPersianDigits('صفحه رسمی')}
        </div>
      )}
    </div>
  )
}

function renderLink(block: LinkButtonBlock, theme: ThemeConfig, fontFamily: string) {
  const borderRadius = theme.shape.buttonRadius >= 32 ? 9999 : theme.shape.buttonRadius
  const padding = buttonPaddingMap[theme.shape.buttonSize] || '10px 20px'

  let btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding,
    borderRadius,
    fontWeight: 500,
    fontSize: 14,
    textDecoration: 'none',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
    fontFamily,
  }

  switch (block.style) {
    case 'fill':
      Object.assign(btnStyle, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary })
      break
    case 'outline':
      Object.assign(btnStyle, { border: `2px solid ${theme.colors.primary}`, color: theme.colors.primary, backgroundColor: 'transparent' })
      break
    case 'soft':
      Object.assign(btnStyle, { backgroundColor: alpha(theme.colors.primary, 0.15), color: theme.colors.primary })
      break
    case 'glass':
      Object.assign(btnStyle, {
        backgroundColor: alpha(theme.colors.primary, 0.15),
        border: `1px solid ${alpha(theme.colors.primary, 0.2)}`,
        color: theme.colors.text,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      })
      break
    case 'shadow':
      Object.assign(btnStyle, {
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
      })
      break
    case 'gradient':
      Object.assign(btnStyle, {
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
        color: theme.colors.onPrimary,
      })
      break
  }

  const badgeColors: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: '#22c55e', text: '#fff', label: 'جدید' },
    special: { bg: '#f59e0b', text: '#fff', label: 'ویژه' },
  }

  const content = (
    <>
      {block.icon && <span style={{ fontSize: 18 }}>{block.icon}</span>}
      <span>{block.title}</span>
      {block.badge && badgeColors[block.badge] && (
        <span
          style={{
            fontSize: 10,
            padding: '1px 8px',
            borderRadius: 9999,
            backgroundColor: badgeColors[block.badge].bg,
            color: badgeColors[block.badge].text,
          }}
        >
          {badgeColors[block.badge].label}
        </span>
      )}
    </>
  )

  const isExternal = block.url && (block.url.startsWith('http://') || block.url.startsWith('https://'))

  if (isExternal) {
    return (
      <a href={block.url} target={block.newTab ? '_blank' : undefined} rel={block.newTab ? 'noopener noreferrer' : undefined} style={btnStyle}>
        {content}
      </a>
    )
  }
  return <button style={btnStyle}>{content}</button>
}

function renderSocial(block: SocialBlock, theme: ThemeConfig, fontFamily: string) {
  const entries = Object.entries(block.platforms).filter(([, v]) => v) as [string, string][]
  if (!entries.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, width: '100%', fontFamily }}>
      {entries.map(([platform, handle]) => {
        const Icon = socialSvgMap[platform]
        if (!Icon) return null
        return (
          <a
            key={platform}
            href={platformUrl(platform, handle)}
            target="_blank"
            rel="noopener noreferrer"
            title={handle}
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.surface,
              border: `1.5px solid ${theme.colors.border}`,
              color: theme.colors.text,
              transition: 'transform 0.2s',
              textDecoration: 'none',
            }}
          >
            <Icon size={18} />
          </a>
        )
      })}
    </div>
  )
}

function renderCard(block: CardInfoBlock, theme: ThemeConfig, fontFamily: string) {
  const formattedCard = block.cardNumber ? formatCardNumber(block.cardNumber) : ''
  const handleCopy = () => {
    if (!block.cardNumber) return
    navigator.clipboard.writeText(block.cardNumber.replace(/\D/g, '')).catch(() => {})
  }
  return (
    <div
      style={{
        width: '100%',
        padding: '16px 20px',
        borderRadius: theme.shape.cardRadius,
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        fontFamily,
      }}
    >
      {formattedCard && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 17,
              letterSpacing: 2,
              color: theme.colors.primary,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              direction: 'ltr',
            }}
          >
            {toPersianDigits(formattedCard)}
          </button>
          <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>
            {toPersianDigits('برای کپی کلیک کنید')}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
        {block.shaba && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: theme.colors.textMuted }}>{toPersianDigits('شبا')}:</span>
            <span style={{ fontFamily: "'Courier New', monospace", direction: 'ltr', fontSize: 12, color: theme.colors.text }}>
              {toPersianDigits(block.shaba)}
            </span>
          </div>
        )}
        {block.accountHolder && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: theme.colors.textMuted }}>{toPersianDigits('صاحب حساب')}:</span>
            <span style={{ color: theme.colors.text }}>{block.accountHolder}</span>
          </div>
        )}
        {block.bankName && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: theme.colors.textMuted }}>{toPersianDigits('بانک')}:</span>
            <span style={{ color: theme.colors.text }}>{block.bankName}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function renderText(block: TextBlock, theme: ThemeConfig, fontFamily: string) {
  const basePx = baseSizePx[theme.typography.baseSize] || 16
  const factor = textSizeFactor[block.fontSize] || 1
  const px = Math.round(basePx * factor)
  const alignMap: Record<string, React.CSSProperties['textAlign']> = { right: 'right', center: 'center', left: 'left' }
  return (
    <div
      style={{
        width: '100%',
        fontSize: px,
        textAlign: alignMap[block.alignment] || 'right',
        color: theme.colors.text,
        lineHeight: 1.7,
        fontFamily,
      }}
    >
      {block.content.split('\n').map((line, i) => (
        <p key={i} style={{ margin: 0 }}>{line || <br />}</p>
      ))}
    </div>
  )
}

function renderDivider(block: DividerBlock, theme: ThemeConfig) {
  if (block.style === 'emoji') {
    return (
      <div style={{ textAlign: 'center', fontSize: 20, padding: '8px 0', width: '100%' }}>
        {block.emoji || '🌸'}
      </div>
    )
  }
  if (block.style === 'space') {
    return <div style={{ height: 16, width: '100%' }} />
  }
  return (
    <div
      style={{
        width: '100%',
        borderTop: `1px ${block.style === 'dashed' ? 'dashed' : 'solid'} ${theme.colors.border}`,
      }}
    />
  )
}

function renderVideo(block: VideoBlock, theme: ThemeConfig) {
  let embedUrl = ''
  if (block.platform === 'youtube') {
    const patterns = [/youtube\.com\/watch\?v=([^&]+)/, /youtu\.be\/([^?]+)/, /youtube\.com\/embed\/([^?]+)/, /youtube\.com\/shorts\/([^?]+)/]
    for (const p of patterns) {
      const m = block.url.match(p)
      if (m) { embedUrl = `https://www.youtube.com/embed/${m[1]}`; break }
    }
  } else if (block.platform === 'aparat') {
    const m = block.url.match(/aparat\.com\/v\/([^/?]+)/)
    if (m) embedUrl = `https://www.aparat.com/video/video/embed/videohash/${m[1]}`
  }
  if (!embedUrl) return null
  return (
    <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: theme.shape.cardRadius, overflow: 'hidden' }}>
      <iframe
        src={embedUrl}
        title="Video"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function renderContact(block: ContactBlock, theme: ThemeConfig, fontFamily: string) {
  const borderRadius = theme.shape.buttonRadius >= 32 ? 9999 : theme.shape.buttonRadius

  function contactStyle() {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '10px 16px',
      borderRadius,
      textDecoration: 'none',
      fontSize: 13,
      transition: 'all 0.2s',
      fontFamily,
    }
    switch (theme.shape.buttonStyle) {
      case 'fill':
        return { ...base, backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }
      case 'outline':
        return { ...base, border: `2px solid ${theme.colors.primary}`, color: theme.colors.primary, backgroundColor: 'transparent' }
      case 'soft':
        return { ...base, backgroundColor: alpha(theme.colors.primary, 0.15), color: theme.colors.primary }
      case 'glass':
        return { ...base, backgroundColor: alpha(theme.colors.primary, 0.15), border: `1px solid ${alpha(theme.colors.primary, 0.2)}`, color: theme.colors.text, backdropFilter: 'blur(12px)' }
      case 'shadow':
        return { ...base, backgroundColor: theme.colors.surface, color: theme.colors.text, boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }
      case 'gradient':
        return { ...base, background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`, color: theme.colors.onPrimary }
      default:
        return base
    }
  }

  const rows: { icon: string; label: string; href: string; value: string }[] = []
  if (block.phone) rows.push({ icon: '📞', label: 'تماس', href: `tel:${block.phone}`, value: block.phone })
  if (block.whatsapp) rows.push({ icon: '💬', label: 'واتساپ', href: `https://wa.me/${block.whatsapp.replace(/[^0-9]/g, '')}${block.whatsappText ? '?text=' + encodeURIComponent(block.whatsappText) : ''}`, value: block.whatsapp })
  if (block.telegram) rows.push({ icon: '✈️', label: 'تلگرام', href: `https://t.me/${block.telegram.replace(/^@/, '')}`, value: block.telegram })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {rows.map(r => (
        <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" style={contactStyle()}>
          <span style={{ fontSize: 18 }}>{r.icon}</span>
          <span style={{ flex: 1 }}>{r.label}</span>
          <span dir="ltr" style={{ opacity: 0.8, fontSize: 12 }}>{toPersianDigits(r.value)}</span>
        </a>
      ))}
    </div>
  )
}

function renderEmail(block: EmailBlock, theme: ThemeConfig, fontFamily: string) {
  const borderRadius = theme.shape.buttonRadius >= 32 ? 9999 : theme.shape.buttonRadius

  function emailStyle(): React.CSSProperties {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: '100%',
      padding: '12px 20px',
      borderRadius,
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500,
      fontFamily,
    }
    switch (theme.shape.buttonStyle) {
      case 'fill':
        return { ...base, backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }
      case 'outline':
        return { ...base, border: `2px solid ${theme.colors.primary}`, color: theme.colors.primary, backgroundColor: 'transparent' }
      case 'soft':
        return { ...base, backgroundColor: alpha(theme.colors.primary, 0.15), color: theme.colors.primary }
      case 'glass':
        return { ...base, backgroundColor: alpha(theme.colors.primary, 0.15), border: `1px solid ${alpha(theme.colors.primary, 0.2)}`, color: theme.colors.text, backdropFilter: 'blur(12px)' }
      case 'shadow':
        return { ...base, backgroundColor: theme.colors.surface, color: theme.colors.text, boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }
      case 'gradient':
        return { ...base, background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`, color: theme.colors.onPrimary }
      default:
        return base
    }
  }

  const mailto = `mailto:${block.email}${block.subject ? '?subject=' + encodeURIComponent(block.subject) : ''}`
  return (
    <a href={mailto} style={emailStyle()}>
      <span style={{ fontSize: 18 }}>📧</span>
      <span>{block.email}</span>
    </a>
  )
}

function renderProduct(block: ProductBlock, theme: ThemeConfig, fontFamily: string) {
  const items = block.items
  if (!items || items.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', color: theme.colors.textMuted, fontSize: 13, fontFamily }}>
        {toPersianDigits('محصولی اضافه نشده')}
      </div>
    )
  }

  const containerStyle: React.CSSProperties = {
    width: '100%',
    fontFamily,
  }

  let gridStyle: React.CSSProperties
  if (block.layout === 'slider') {
    gridStyle = { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollSnapType: 'x mandatory' }
  } else if (block.layout === 'grid') {
    gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
  } else {
    gridStyle = { display: 'flex', flexDirection: 'column', gap: 12 }
  }

  function itemCard(item: typeof items[0]) {
    return (
      <div
        key={item.id}
        style={{
          flex: block.layout === 'slider' ? '0 0 200px' : undefined,
          scrollSnapAlign: block.layout === 'slider' ? 'start' : undefined,
          borderRadius: theme.shape.cardRadius,
          overflow: 'hidden',
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          {item.image && (
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 4 }}>{item.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: theme.colors.primary, fontWeight: 500 }}>
                {toPersianDigits(item.price)} {toPersianDigits('تومان')}
              </span>
              {item.badge && (
                <span
                  style={{
                    fontSize: 10,
                    padding: '1px 8px',
                    borderRadius: 9999,
                    backgroundColor: item.badge === 'sale' ? '#ef4444' : item.badge === 'unavailable' ? '#6b7280' : '#22c55e',
                    color: '#fff',
                  }}
                >
                  {item.badge === 'new' ? 'جدید' : item.badge === 'sale' ? 'حراج' : item.badge === 'unavailable' ? 'ناموجود' : ''}
                </span>
              )}
            </div>
          </div>
        </a>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {items.map(itemCard)}
      </div>
    </div>
  )
}

function renderHours(block: HoursBlock, theme: ThemeConfig, fontFamily: string) {
  const schedule = block.schedule || []
  return (
    <div
      style={{
        width: '100%',
        borderRadius: theme.shape.cardRadius,
        overflow: 'hidden',
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
        fontFamily,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <tbody>
          {schedule.map((d, i) => (
            <tr
              key={i}
              style={{
                borderBottom: i < schedule.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
              }}
            >
              <td
                style={{
                  padding: '8px 14px',
                  color: theme.colors.text,
                  fontWeight: 500,
                  width: '40%',
                }}
              >
                {d.day}
              </td>
              <td
                style={{
                  padding: '8px 14px',
                  textAlign: 'left',
                  direction: 'ltr',
                  color: d.isOff ? theme.colors.textMuted : theme.colors.primary,
                  fontWeight: d.isOff ? 400 : 500,
                }}
              >
                {d.isOff ? toPersianDigits('تعطیل') : `${toPersianDigits(d.open)} - ${toPersianDigits(d.close)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderMap(block: MapBlock, theme: ThemeConfig, fontFamily: string) {
  const btnBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: theme.shape.buttonRadius >= 32 ? 9999 : theme.shape.buttonRadius,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.border}`,
    textDecoration: 'none',
    fontSize: 12,
    fontWeight: 500,
    fontFamily,
    cursor: 'pointer',
  }

  const mapLinks = [
    { label: 'نقشه نشان', url: `https://nshn.ir/${block.lat}_${block.lng}` },
    { label: 'نقشه بلد', url: `https://balad.ir/${block.lat},${block.lng}` },
    { label: 'Google Maps', url: `https://www.google.com/maps?q=${block.lat},${block.lng}` },
  ]

  return (
    <div style={{ width: '100%', fontFamily }}>
      {block.address && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: theme.shape.cardRadius,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.text,
            fontSize: 13,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          📍 {block.address}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {mapLinks.map(link => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={btnBase}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function renderFaq(block: FaqBlock, theme: ThemeConfig, fontFamily: string) {
  const items = block.items || []
  if (!items.length) return null
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6, fontFamily }}>
      {items.map(item => (
        <details
          key={item.id}
          style={{
            borderRadius: theme.shape.cardRadius,
            border: `1px solid ${theme.colors.border}`,
            overflow: 'hidden',
            backgroundColor: theme.colors.surface,
          }}
        >
          <summary
            style={{
              padding: '10px 14px',
              color: theme.colors.text,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: theme.colors.primary, fontSize: 11 }}>▶</span>
            {item.question}
          </summary>
          <div
            style={{
              padding: '8px 14px 12px 14px',
              color: theme.colors.textMuted,
              fontSize: 12,
              lineHeight: 1.7,
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

function renderTestimonial(block: TestimonialBlock, theme: ThemeConfig, fontFamily: string) {
  const items = block.items || []
  if (!items.length) return null
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, fontFamily }}>
      {items.map(item => (
        <div
          key={item.id}
          style={{
            padding: 14,
            borderRadius: theme.shape.cardRadius,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.name}
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: alpha(theme.colors.primary, 0.15),
                  color: theme.colors.primary,
                  fontSize: 16,
                }}
              >
                👤
              </div>
            )}
            <div style={{ fontWeight: 600, fontSize: 13, color: theme.colors.text }}>
              {item.name}
            </div>
          </div>
          <div style={{ fontSize: 12, color: theme.colors.text, lineHeight: 1.6, marginBottom: 6, fontStyle: 'italic' }}>
            "{item.text}"
          </div>
          <div style={{ fontSize: 14, color: '#f59e0b', letterSpacing: 2 }}>
            {'★'.repeat(Math.min(5, Math.max(0, item.rating)))}{'☆'.repeat(5 - Math.min(5, Math.max(0, item.rating)))}
          </div>
        </div>
      ))}
    </div>
  )
}

function renderVcard(block: VcardBlock, theme: ThemeConfig, fontFamily: string) {
  const fields: { icon: string; label: string; value: string }[] = []
  if (block.phone) fields.push({ icon: '📞', label: 'تلفن', value: block.phone })
  if (block.email) fields.push({ icon: '✉️', label: 'ایمیل', value: block.email })
  if (block.org) fields.push({ icon: '🏢', label: 'سازمان', value: block.org })
  if (block.title) fields.push({ icon: '👔', label: 'سمت', value: block.title })
  if (block.address) fields.push({ icon: '📍', label: 'آدرس', value: block.address })

  const handleDownload = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${escapeVcard(block.fullName)}`,
      block.phone ? `TEL:${block.phone}` : '',
      block.email ? `EMAIL:${block.email}` : '',
      block.org ? `ORG:${escapeVcard(block.org)}` : '',
      block.title ? `TITLE:${escapeVcard(block.title)}` : '',
      block.address ? `ADR:;;${escapeVcard(block.address)}` : '',
      'END:VCARD',
    ].filter(Boolean)
    const blob = new Blob([lines.join('\n')], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${block.fullName || 'contact'}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      style={{
        width: '100%',
        padding: 16,
        borderRadius: theme.shape.cardRadius,
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        fontFamily,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.text, marginBottom: 12, textAlign: 'center' }}>
        {block.fullName}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, marginBottom: 14 }}>
        {fields.map(f => (
          <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.colors.text }}>
            <span style={{ fontSize: 16 }}>{f.icon}</span>
            <span style={{ color: theme.colors.textMuted, minWidth: 50 }}>{f.label}:</span>
            <span>{f.value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleDownload}
        style={{
          width: '100%',
          padding: '8px 16px',
          borderRadius: theme.shape.buttonRadius >= 32 ? 9999 : theme.shape.buttonRadius,
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary,
          border: 'none',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        📥 {toPersianDigits('دانلود vCard')}
      </button>
    </div>
  )
}

function renderGallery(block: GalleryBlock, theme: ThemeConfig) {
  const images = block.images || []
  if (!images.length) return null

  const cols = block.columns || 3
  const gap = 6

  if (cols === 3) {
    return (
      <div style={{ width: '100%', columnCount: 3, columnGap: gap }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              width: '100%',
              borderRadius: theme.shape.cardRadius,
              marginBottom: gap,
              display: 'block',
              breakInside: 'avoid',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: theme.shape.cardRadius,
          }}
        />
      ))}
    </div>
  )
}

function fallbackTheme(raw: ThemeConfig): ThemeConfig {
  const r = raw as any
  return {
    ...raw,
    colors: {
      background: { type: 'solid', colors: ['#ffffff'], angle: 0, patternOpacity: 0.2, animated: false },
      surface: '#ffffff', primary: r.primaryColor || '#FDA4AF', onPrimary: '#ffffff',
      text: r.textColor || '#1F2937', textMuted: '#9ca3af', accent: r.accentColor || '#C4B5FD', border: '#e5e7eb',
    },
    typography: {
      fontFamily: r.fontFamily || 'vazirmatn', headingWeight: 700, bodyWeight: 400,
      baseSize: 'md', lineHeight: 'normal', numerals: 'persian', letterSpacing: 0,
    },
    effects: { entrance: r.entrance || 'fade', buttonHover: 'lift', shadowIntensity: 'soft' },
    shape: { buttonRadius: 12, buttonStyle: 'soft', cardRadius: 16, buttonSize: 'normal' },
    showMaddyBioFooter: false,
  }
}

export function BlockPreview({ block, theme: rawTheme }: { block: Block; theme: ThemeConfig }) {
  const theme = rawTheme.typography ? rawTheme : fallbackTheme(rawTheme)
  const fontFamily = fontFamilyMap[theme.typography.fontFamily] || "'Vazirmatn', sans-serif"

  const dataAttrs = {
    'data-block-type': block.type,
    'data-entrance': theme.effects.entrance,
  }

  switch (block.type) {
    case 'profile':
      return <div {...dataAttrs}>{renderProfile(block, theme, fontFamily)}</div>
    case 'link':
      return <div {...dataAttrs}>{renderLink(block, theme, fontFamily)}</div>
    case 'social':
      return <div {...dataAttrs}>{renderSocial(block, theme, fontFamily)}</div>
    case 'card':
      return <div {...dataAttrs}>{renderCard(block, theme, fontFamily)}</div>
    case 'text':
      return <div {...dataAttrs}>{renderText(block, theme, fontFamily)}</div>
    case 'divider':
      return <div {...dataAttrs}>{renderDivider(block, theme)}</div>
    case 'video':
      return <div {...dataAttrs}>{renderVideo(block, theme)}</div>
    case 'contact':
      return <div {...dataAttrs}>{renderContact(block, theme, fontFamily)}</div>
    case 'email':
      return <div {...dataAttrs}>{renderEmail(block, theme, fontFamily)}</div>
    case 'product':
      return <div {...dataAttrs}>{renderProduct(block, theme, fontFamily)}</div>
    case 'hours':
      return <div {...dataAttrs}>{renderHours(block, theme, fontFamily)}</div>
    case 'map':
      return <div {...dataAttrs}>{renderMap(block, theme, fontFamily)}</div>
    case 'faq':
      return <div {...dataAttrs}>{renderFaq(block, theme, fontFamily)}</div>
    case 'testimonial':
      return <div {...dataAttrs}>{renderTestimonial(block, theme, fontFamily)}</div>
    case 'vcard':
      return <div {...dataAttrs}>{renderVcard(block, theme, fontFamily)}</div>
    case 'gallery':
      return <div {...dataAttrs}>{renderGallery(block, theme)}</div>
    default:
      return null
  }
}
