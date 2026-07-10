// ===== Block Types =====
export type BlockType =
  | 'profile' | 'link' | 'social' | 'card' | 'text' | 'divider'
  | 'video' | 'contact' | 'email'
  | 'product' | 'hours' | 'map' | 'faq' | 'testimonial' | 'vcard' | 'gallery'

export interface BaseBlock {
  id: string
  type: BlockType
  enabled: boolean
}

export interface ProfileBlock extends BaseBlock {
  type: 'profile'
  avatar: string
  avatarShape: 'circle' | 'square' | 'squircle'
  name: string
  title: string
  bio: string
  showBadge: boolean
}

export interface LinkButtonBlock extends BaseBlock {
  type: 'link'
  title: string
  url: string
  icon: string
  badge: '' | 'new' | 'special'
  highlight: boolean
  newTab: boolean
  style: 'fill' | 'outline' | 'soft' | 'glass' | 'shadow' | 'gradient'
}

export interface SocialBlock extends BaseBlock {
  type: 'social'
  platforms: SocialPlatforms
}
export interface SocialPlatforms {
  instagram?: string; telegram?: string; whatsapp?: string
  linkedin?: string; github?: string; youtube?: string; x?: string
  eitaa?: string; bale?: string; rubika?: string
}

export interface CardInfoBlock extends BaseBlock {
  type: 'card'
  cardNumber: string
  shaba: string
  accountHolder: string
  bankName: string
}

export interface TextBlock extends BaseBlock {
  type: 'text'
  content: string
  variant: 'heading' | 'body'
  fontSize: 'sm' | 'md' | 'lg'
  alignment: 'right' | 'center' | 'left'
}

export interface DividerBlock extends BaseBlock {
  type: 'divider'
  style: 'line' | 'dashed' | 'space' | 'emoji'
  emoji?: string
}

export interface VideoBlock extends BaseBlock {
  type: 'video'
  platform: 'aparat' | 'youtube'
  url: string
}

export interface ContactBlock extends BaseBlock {
  type: 'contact'
  phone: string
  whatsapp: string
  whatsappText: string
  telegram: string
}

export interface EmailBlock extends BaseBlock {
  type: 'email'
  email: string
  subject: string
}

// ===== Phase 2 Blocks =====
export interface ProductBlock extends BaseBlock {
  type: 'product'
  items: ProductItem[]
  layout: 'single' | 'grid' | 'slider'
}
export interface ProductItem {
  id: string
  image: string
  name: string
  price: number
  link: string
  badge: '' | 'new' | 'sale' | 'unavailable'
}

export interface HoursBlock extends BaseBlock {
  type: 'hours'
  schedule: DaySchedule[]
}
export interface DaySchedule {
  day: string
  open: string
  close: string
  isOff: boolean
}

export interface MapBlock extends BaseBlock {
  type: 'map'
  address: string
  lat: number
  lng: number
}

export interface FaqBlock extends BaseBlock {
  type: 'faq'
  items: FaqItem[]
}
export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface TestimonialBlock extends BaseBlock {
  type: 'testimonial'
  items: TestimonialItem[]
}
export interface TestimonialItem {
  id: string
  avatar: string
  name: string
  text: string
  rating: number
}

export interface VcardBlock extends BaseBlock {
  type: 'vcard'
  fullName: string
  phone: string
  email: string
  org: string
  title: string
  address: string
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery'
  images: string[]
  columns: 2 | 3
}

export type Block =
  | ProfileBlock | LinkButtonBlock | SocialBlock | CardInfoBlock
  | TextBlock | DividerBlock | VideoBlock | ContactBlock | EmailBlock
  | ProductBlock | HoursBlock | MapBlock | FaqBlock | TestimonialBlock
  | VcardBlock | GalleryBlock

// ===== Theme Config =====
export interface BackgroundConfig {
  type: 'solid' | 'linear-gradient' | 'radial-gradient' | 'pattern'
  colors: string[]
  angle: number
  pattern?: 'dots' | 'waves' | 'hearts' | 'stars' | 'grid'
  patternOpacity: number
  animated: boolean
  image?: string
}

export type FontFamily = 'vazirmatn' | 'estedad' | 'shabnam' | 'sahel' | 'markaziText'
export type BaseSize = 'sm' | 'md' | 'lg'
export type LineHeight = 'tight' | 'normal' | 'loose'

export interface ThemeConfig {
  colors: {
    background: BackgroundConfig
    surface: string
    primary: string
    onPrimary: string
    text: string
    textMuted: string
    accent: string
    border: string
  }
  typography: {
    fontFamily: FontFamily
    headingWeight: number
    bodyWeight: number
    baseSize: BaseSize
    lineHeight: LineHeight
    numerals: 'persian' | 'latin'
    letterSpacing: number
  }
  shape: {
    buttonRadius: number
    buttonStyle: 'fill' | 'outline' | 'soft' | 'glass' | 'shadow' | 'gradient'
    cardRadius: number
    buttonSize: 'compact' | 'normal' | 'large'
  }
  effects: {
    entrance: 'fade' | 'slide-up' | 'pop' | 'none'
    buttonHover: 'lift' | 'glow' | 'scale' | 'none'
    shadowIntensity: 'none' | 'soft' | 'medium'
  }
  showMaddyBioFooter: boolean
}

// ===== Palette =====
export interface Palette {
  id: string
  name: string
  icon: string
  config: ThemeConfig
}

// ===== Template =====
export interface PageTemplate {
  id: string
  name: string
  icon: string
  description: string
  paletteId: string
  blocks: Block[]
}

// ===== Project =====
export interface Project {
  id: string
  name: string
  lastModified: string
  theme: ThemeConfig
  blocks: Block[]
  templateId?: string
}

// ===== UI =====
export type ToastType = 'success' | 'error' | 'info'
export interface ToastMessage {
  id: string
  type: ToastType
  text: string
}
