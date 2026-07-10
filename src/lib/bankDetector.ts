interface BankInfo {
  name: string
  color: string
  logo: string
}

const bankBins: Record<string, BankInfo> = {
  '603799': { name: 'بانک ملی', color: '#0047AB', logo: '🇮🇷' },
  '589210': { name: 'بانک سپه', color: '#0066A1', logo: '🏦' },
  '627353': { name: 'بانک تجارت', color: '#003DA5', logo: '🏛' },
  '585983': { name: 'بانک تجارت', color: '#003DA5', logo: '🏛' },
  '627648': { name: 'بانک صادرات', color: '#004B87', logo: '🏦' },
  '502938': { name: 'بانک صادرات', color: '#004B87', logo: '🏦' },
  '603770': { name: 'بانک کشاورزی', color: '#2E7D32', logo: '🌾' },
  '639217': { name: 'بانک کشاورزی', color: '#2E7D32', logo: '🌾' },
  '628023': { name: 'بانک مسکن', color: '#8B4513', logo: '🏠' },
  '504706': { name: 'بانک شهر', color: '#1A237E', logo: '🏙' },
  '502806': { name: 'بانک شهر', color: '#1A237E', logo: '🏙' },
  '502908': { name: 'بانک توسعه تعاون', color: '#00695C', logo: '🤝' },
  '504172': { name: 'بانک رسالت', color: '#B8860B', logo: '📋' },
  '636214': { name: 'بانک انصار', color: '#2E7D32', logo: '🛡' },
  '505785': { name: 'بانک ایران زمین', color: '#D4A017', logo: '🌍' },
  '622106': { name: 'بانک پارسیان', color: '#E53935', logo: '🔷' },
  '627884': { name: 'بانک پارسیان', color: '#E53935', logo: '🔷' },
  '502229': { name: 'بانک پاسارگاد', color: '#1565C0', logo: '⭐' },
  '502230': { name: 'بانک پاسارگاد', color: '#1565C0', logo: '⭐' },
  '639347': { name: 'بانک پاسارگاد', color: '#1565C0', logo: '⭐' },
  '627412': { name: 'بانک اقتصاد نوین', color: '#FF8F00', logo: '💡' },
  '627488': { name: 'بانک کارآفرین', color: '#00897B', logo: '🚀' },
  '639599': { name: 'بانک قوامین', color: '#B71C1C', logo: '⚖' },
  '639607': { name: 'بانک سامان', color: '#3949AB', logo: '🔷' },
  '639370': { name: 'بانک مهر', color: '#E65100', logo: '🌙' },
  '606256': { name: 'بانک مهر', color: '#E65100', logo: '🌙' },
  '507677': { name: 'بانک مهر', color: '#E65100', logo: '🌙' },
  '606373': { name: 'بانک مهر ایران', color: '#E65100', logo: '🌙' },
}

export function detectBank(cardNumber: string): BankInfo | null {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 6) return null
  const prefix = digits.slice(0, 6)
  return bankBins[prefix] || null
}

export function getBankName(cardNumber: string): string {
  const bank = detectBank(cardNumber)
  return bank ? bank.name : ''
}
