import { useProjectStore } from '../../store/projectStore'
import { palettes, fontFamilyNames } from '../../themes/palettes'
import { getPastelColors } from '../../utils/color'
import type { BackgroundConfig, ThemeConfig, Palette } from '../../types'

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-1.5">
      <span>{icon}</span>
      <span>{label}</span>
    </h3>
  )
}

function BtnGroup<T extends string>({ options, value, onChange }: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
            o.value === value
              ? 'bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700 text-pink-700 dark:text-pink-300'
              : 'bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function ThemePanel() {
  const project = useProjectStore(s => s.getCurrentProject())
  const updateTheme = useProjectStore(s => s.updateTheme)
  const applyPalette = useProjectStore(s => s.applyPalette)
  const theme = project?.theme
  if (!theme) return null

  const pastelColors = getPastelColors()

  const updateColors = (patch: Partial<ThemeConfig['colors']>) => {
    updateTheme({ colors: { ...theme.colors, ...patch } })
  }

  const updateBackground = (patch: Partial<BackgroundConfig>) => {
    updateColors({ background: { ...theme.colors.background, ...patch } })
  }

  const updateTypography = (patch: Partial<ThemeConfig['typography']>) => {
    updateTheme({ typography: { ...theme.typography, ...patch } })
  }

  const updateShape = (patch: Partial<ThemeConfig['shape']>) => {
    updateTheme({ shape: { ...theme.shape, ...patch } })
  }

  const updateEffects = (patch: Partial<ThemeConfig['effects']>) => {
    updateTheme({ effects: { ...theme.effects, ...patch } })
  }

  const isActivePalette = (p: Palette) =>
    p.config.colors.primary === theme.colors.primary &&
    p.config.colors.background.type === theme.colors.background.type &&
    p.config.colors.background.colors[0] === theme.colors.background.colors[0]

  const bgColorCount =
    theme.colors.background.type === 'solid' ? 1 :
    theme.colors.background.type === 'linear-gradient' ? 2 :
    theme.colors.background.type === 'radial-gradient' ? 3 : 1

  const simpleColors: [keyof ThemeConfig['colors'], string][] = [
    ['surface', 'سطح کارت‌ها'],
    ['onPrimary', 'متن روی اصلی'],
    ['text', 'متن'],
    ['textMuted', 'متن کمرنگ'],
    ['accent', 'اکسنت'],
    ['border', 'حاشیه'],
  ]

  return (
    <div className="h-full overflow-y-auto space-y-4 p-4" dir="rtl">
      {/* Palette Selector */}
      <div>
        <SectionHeading icon="🎨" label="پالت‌های رنگی" />
        <div className="grid grid-cols-2 gap-2">
          {palettes.map(p => (
            <button
              key={p.id}
              onClick={() => applyPalette(p.id)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-xs transition-all ${
                isActivePalette(p)
                  ? 'border-pink-pastel bg-pink-50 dark:bg-pink-900/20'
                  : 'border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <span className="text-base">{p.icon}</span>
              <span className="text-gray-700 dark:text-gray-300">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="border-b border-gray-200 dark:border-white/10 pb-4">
        <SectionHeading icon="🎨" label="رنگ‌ها" />

        {/* Background */}
        <div className="space-y-3 mb-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">نوع پس‌زمینه</label>
          <BtnGroup
            options={[
              { value: 'solid', label: 'تک‌رنگ' },
              { value: 'linear-gradient', label: 'خطی' },
              { value: 'radial-gradient', label: 'شعاعی' },
              { value: 'pattern', label: 'الگو' },
            ]}
            value={theme.colors.background.type}
            onChange={v => updateBackground({ type: v as BackgroundConfig['type'] })}
          />

          {theme.colors.background.type !== 'pattern' && (
            Array.from({ length: bgColorCount }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.colors.background.colors[i] || '#ffffff'}
                  onChange={e => {
                    const colors = [...theme.colors.background.colors]
                    colors[i] = e.target.value
                    updateBackground({ colors })
                  }}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer shrink-0"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">رنگ {i + 1}</span>
              </div>
            ))
          )}

          {theme.colors.background.type === 'linear-gradient' && (
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">زاویه: {theme.colors.background.angle}°</label>
              <input
                type="range"
                min={0}
                max={360}
                value={theme.colors.background.angle}
                onChange={e => updateBackground({ angle: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          )}

          {(theme.colors.background as BackgroundConfig).type === 'pattern' && (
            <>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">نوع الگو</label>
                <BtnGroup
                  options={[
                    { value: 'dots', label: 'نقاط' },
                    { value: 'waves', label: 'امواج' },
                    { value: 'hearts', label: 'قلب' },
                    { value: 'stars', label: 'ستاره' },
                    { value: 'grid', label: 'شطرنجی' },
                  ]}
                  value={theme.colors.background.pattern || 'dots'}
                  onChange={v => updateBackground({ pattern: v as NonNullable<BackgroundConfig['pattern']> })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">شفافیت الگو: {Math.round(theme.colors.background.patternOpacity * 100)}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(theme.colors.background.patternOpacity * 100)}
                  onChange={e => updateBackground({ patternOpacity: Number(e.target.value) / 100 })}
                  className="w-full"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bg-animated"
              checked={theme.colors.background.animated}
              onChange={e => updateBackground({ animated: e.target.checked })}
              className="rounded border-gray-300 dark:border-white/10"
            />
            <label htmlFor="bg-animated" className="text-xs text-gray-500 dark:text-gray-400">پس‌زمینه متحرک</label>
          </div>
        </div>

        {/* Primary Color */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={theme.colors.primary}
              onChange={e => updateColors({ primary: e.target.value })}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400">رنگ اصلی</div>
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">{theme.colors.primary}</div>
            </div>
          </div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">رنگ‌های پیشنهادی</label>
          <div className="flex gap-1.5 flex-wrap">
            {pastelColors.slice(0, 8).map(c => (
              <button
                key={c}
                onClick={() => updateColors({ primary: c })}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  c === theme.colors.primary ? 'border-gray-800 scale-110 dark:border-white' : 'border-white dark:border-gray-600'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Other Colors */}
        {simpleColors.map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={theme.colors[key] as string}
              onChange={e => updateColors({ [key]: e.target.value })}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">{theme.colors[key] as string}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Typography Section */}
      <div className="border-b border-gray-200 dark:border-white/10 pb-4">
        <SectionHeading icon="🔤" label="تایپوگرافی" />

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">فونت</label>
            <select
              value={theme.typography.fontFamily}
              onChange={e => updateTypography({ fontFamily: e.target.value as ThemeConfig['typography']['fontFamily'] })}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm"
            >
              {Object.entries(fontFamilyNames).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">ضخامت عنوان</label>
            <select
              value={theme.typography.headingWeight}
              onChange={e => updateTypography({ headingWeight: Number(e.target.value) })}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm"
            >
              {[400, 500, 700, 800].map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">ضخامت بدنه</label>
            <select
              value={theme.typography.bodyWeight}
              onChange={e => updateTypography({ bodyWeight: Number(e.target.value) })}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm"
            >
              {[300, 400, 500].map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">اندازه پایه</label>
            <BtnGroup
              options={[
                { value: 'sm', label: 'کوچک' },
                { value: 'md', label: 'متوسط' },
                { value: 'lg', label: 'بزرگ' },
              ]}
              value={theme.typography.baseSize}
              onChange={v => updateTypography({ baseSize: v as ThemeConfig['typography']['baseSize'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">فاصله خطوط</label>
            <BtnGroup
              options={[
                { value: 'tight', label: 'کم' },
                { value: 'normal', label: 'معمولی' },
                { value: 'loose', label: 'زیاد' },
              ]}
              value={theme.typography.lineHeight}
              onChange={v => updateTypography({ lineHeight: v as ThemeConfig['typography']['lineHeight'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">اعداد</label>
            <BtnGroup
              options={[
                { value: 'persian', label: 'فارسی' },
                { value: 'latin', label: 'لاتین' },
              ]}
              value={theme.typography.numerals}
              onChange={v => updateTypography({ numerals: v as ThemeConfig['typography']['numerals'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">فاصله حروف: {theme.typography.letterSpacing.toFixed(2)}</label>
            <input
              type="range"
              min={-2}
              max={5}
              step={1}
              value={Math.round(theme.typography.letterSpacing * 100)}
              onChange={e => updateTypography({ letterSpacing: Number(e.target.value) / 100 })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Shape Section */}
      <div className="border-b border-gray-200 dark:border-white/10 pb-4">
        <SectionHeading icon="📐" label="اشکال" />

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              گردی دکمه: {theme.shape.buttonRadius >= 32 ? 'بیضی' : `${theme.shape.buttonRadius}px`}
            </label>
            <input
              type="range"
              min={0}
              max={32}
              value={theme.shape.buttonRadius}
              onChange={e => updateShape({ buttonRadius: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">سبک دکمه</label>
            <BtnGroup
              options={[
                { value: 'fill', label: 'پر' },
                { value: 'outline', label: 'حاشیه' },
                { value: 'soft', label: 'نرم' },
                { value: 'glass', label: 'شیشه‌ای' },
                { value: 'shadow', label: 'سایه' },
                { value: 'gradient', label: 'گرادینت' },
              ]}
              value={theme.shape.buttonStyle}
              onChange={v => updateShape({ buttonStyle: v as ThemeConfig['shape']['buttonStyle'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              گردی کارت: {theme.shape.cardRadius >= 32 ? 'بیضی' : `${theme.shape.cardRadius}px`}
            </label>
            <input
              type="range"
              min={0}
              max={32}
              value={theme.shape.cardRadius}
              onChange={e => updateShape({ cardRadius: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">اندازه دکمه</label>
            <BtnGroup
              options={[
                { value: 'compact', label: 'کوچک' },
                { value: 'normal', label: 'معمولی' },
                { value: 'large', label: 'بزرگ' },
              ]}
              value={theme.shape.buttonSize}
              onChange={v => updateShape({ buttonSize: v as ThemeConfig['shape']['buttonSize'] })}
            />
          </div>
        </div>
      </div>

      {/* Effects Section */}
      <div className="border-b border-gray-200 dark:border-white/10 pb-4">
        <SectionHeading icon="✨" label="افکت‌ها" />

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">انیمیشن ورود</label>
            <BtnGroup
              options={[
                { value: 'fade', label: 'محو' },
                { value: 'slide-up', label: 'بالا' },
                { value: 'pop', label: 'ظهور' },
                { value: 'none', label: 'بدون' },
              ]}
              value={theme.effects.entrance}
              onChange={v => updateEffects({ entrance: v as ThemeConfig['effects']['entrance'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">هاور دکمه</label>
            <BtnGroup
              options={[
                { value: 'lift', label: 'بالا' },
                { value: 'glow', label: 'درخشش' },
                { value: 'scale', label: 'بزرگ' },
                { value: 'none', label: 'بدون' },
              ]}
              value={theme.effects.buttonHover}
              onChange={v => updateEffects({ buttonHover: v as ThemeConfig['effects']['buttonHover'] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">شدت سایه</label>
            <BtnGroup
              options={[
                { value: 'none', label: 'بدون' },
                { value: 'soft', label: 'نرم' },
                { value: 'medium', label: 'متوسط' },
              ]}
              value={theme.effects.shadowIntensity}
              onChange={v => updateEffects({ shadowIntensity: v as ThemeConfig['effects']['shadowIntensity'] })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-footer"
              checked={theme.showMaddyBioFooter}
              onChange={e => updateTheme({ showMaddyBioFooter: e.target.checked })}
              className="rounded border-gray-300 dark:border-white/10"
            />
            <label htmlFor="show-footer" className="text-xs text-gray-500 dark:text-gray-400">نمایش فوتر maddyBio</label>
          </div>
        </div>
      </div>
    </div>
  )
}
