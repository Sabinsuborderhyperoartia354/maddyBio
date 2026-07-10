import { useProjectStore } from '../../store/projectStore'
import { BlockPreview } from './BlockPreview'

const DEFAULT_COLORS = {
  background: { type: 'solid' as const, colors: ['#ffffff'], angle: 0, patternOpacity: 0.2, animated: false },
  surface: '#ffffff', primary: '#FDA4AF', onPrimary: '#ffffff', text: '#1f2937', textMuted: '#9ca3af', accent: '#C4B5FD', border: '#e5e7eb',
}
const DEFAULT_TYPOGRAPHY = { fontFamily: 'vazirmatn', headingWeight: 700, bodyWeight: 400, baseSize: 'md' as const, lineHeight: 'normal' as const, numerals: 'persian' as const, letterSpacing: 0 }
const DEFAULT_EFFECTS = { entrance: 'fade' as const, buttonHover: 'lift' as const, shadowIntensity: 'soft' as const }

export function PreviewPanel() {
  const project = useProjectStore(s => s.getCurrentProject())
  if (!project) return null

  const { theme, blocks } = project
  const colors = theme.colors || DEFAULT_COLORS
  const bg = colors.background || DEFAULT_COLORS.background
  const typography = theme.typography || DEFAULT_TYPOGRAPHY
  const effects = theme.effects || DEFAULT_EFFECTS

  let bgStyle: React.CSSProperties = {}
  if (bg.type === 'solid') {
    bgStyle = { backgroundColor: bg.colors[0] || '#ffffff' }
  } else if (bg.type === 'linear-gradient') {
    bgStyle = { backgroundImage: `linear-gradient(${bg.angle}deg, ${bg.colors.join(', ')})` }
  } else if (bg.type === 'radial-gradient') {
    bgStyle = { backgroundImage: `radial-gradient(circle, ${bg.colors.join(', ')})` }
  }

  const animationClass = effects.entrance !== 'none' ? `animate-${effects.entrance}` : ''

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="relative rounded-[2.5rem] border-4 border-gray-800 dark:border-gray-600 bg-gray-800 shadow-2xl overflow-hidden" style={{ maxWidth: 360, minHeight: 600 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-xl z-10" />
          <div className="h-full max-h-[700px] overflow-y-auto rounded-[2.3rem] bg-white" style={{ ...bgStyle, backgroundAttachment: 'local' }}>
            <div className="px-4 py-8 space-y-4" style={{ fontFamily: typography.fontFamily }}>
              {blocks.filter(b => b.enabled).map((block, i) => (
                <div key={block.id} className={animationClass} style={{ animationDelay: `${i * 0.06}s`, animationFillMode: 'backwards' }}>
                  <BlockPreview block={block} theme={theme} />
                </div>
              ))}

              {theme.showMaddyBioFooter !== false && (
                <div className="text-center pt-4 pb-2">
                  <a href="https://maddybio.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: colors.textMuted }}>
                    🌸 ساخته‌شده با maddyBio
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
