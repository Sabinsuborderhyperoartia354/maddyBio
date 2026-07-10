export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^(\+98|0)?9\d{9}$/.test(phone.replace(/[\s-]/g, ''))
}

export function isValidInstagram(username: string): boolean {
  return /^[a-zA-Z0-9._]{1,30}$/.test(username)
}

export function isValidTelegram(username: string): boolean {
  return /^[a-zA-Z0-9_]{5,32}$/.test(username)
}

export function isValidYoutubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

export function isValidAparatUrl(url: string): boolean {
  return url.includes('aparat.com')
}

export function isValidShaba(shaba: string): boolean {
  return /^IR[0-9]{24}$/.test(shaba.toUpperCase())
}

export function getSocialUrl(platform: string, value: string): string {
  switch (platform) {
    case 'instagram': return `https://instagram.com/${value}`
    case 'telegram': return `https://t.me/${value}`
    case 'whatsapp': return `https://wa.me/${value.replace(/^0/, '98')}`
    case 'eitaa': return `https://eitaa.com/${value}`
    case 'bale': return `https://ble.ir/${value}`
    case 'rubika': return `https://rubika.ir/${value}`
    case 'youtube': return value.startsWith('http') ? value : `https://youtube.com/@${value}`
    case 'linkedin': return `https://linkedin.com/in/${value}`
    case 'github': return `https://github.com/${value}`
    case 'email': return `mailto:${value}`
    case 'phone': return `tel:${value}`
    default: return value
  }
}
