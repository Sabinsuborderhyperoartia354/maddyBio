const persianDigits: Record<string, string> = {
  '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
  '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹',
}

export function toPersianDigits(num: number | string): string {
  return String(num).replace(/[0-9]/g, d => persianDigits[d] || d)
}

const englishDigits: Record<string, string> = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
}

export function toEnglishDigits(str: string): string {
  return str.replace(/[۰-۹]/g, d => englishDigits[d] || d)
}

export function formatCardNumber(value: string): string {
  const digits = toEnglishDigits(value).replace(/\D/g, '')
  const parts: string[] = []
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    parts.push(digits.slice(i, i + 4))
  }
  return parts.join('-')
}

export function getCardNumberDigits(value: string): string {
  return toEnglishDigits(value).replace(/\D/g, '')
}
