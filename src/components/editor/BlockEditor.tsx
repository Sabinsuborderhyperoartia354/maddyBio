import { useRef } from 'react'
import { useProjectStore } from '../../store/projectStore'
import type { Block, SocialPlatforms } from '../../types'
import { generateId } from '../../lib/utils'

interface Props { block: Block }

export function BlockEditor({ block }: Props) {
  const updateBlock = useProjectStore(s => s.updateBlock)
  const profileFileRef = useRef<HTMLInputElement>(null)

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>, onBase64: (dataUrl: string) => void) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onBase64(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const inputCls = 'w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200'
  const textareaCls = inputCls + ' resize-none'
  const labelCls = 'text-xs text-gray-500 dark:text-gray-400 mb-1 block'
  const btnBase = 'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors'
  const itemCls = 'p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-2'
  const fieldCls = 'mb-2'

  function activeBtn(active: boolean) {
    return active
      ? 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300'
      : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
  }

  switch (block.type) {
    case 'profile': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>آواتار</label>
            <div className="flex items-center gap-3">
              <input ref={profileFileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileInput(e, dataUrl => updateBlock(block.id, { avatar: dataUrl }))} />
              <button
                onClick={() => profileFileRef.current?.click()}
                className="w-14 h-14 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/20 flex items-center justify-center text-xl hover:border-pink-300 transition-colors overflow-hidden"
              >
                {block.avatar ? <img src={block.avatar} className="w-full h-full object-cover" /> : '📷'}
              </button>
              <button onClick={() => profileFileRef.current?.click()} className={`${btnBase} bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20`}>
                آپلود عکس
              </button>
            </div>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>شکل آواتار</label>
            <div className="flex gap-2">
              {[{ key: 'circle' as const, label: 'دایره' }, { key: 'square' as const, label: 'مربع' }, { key: 'squircle' as const, label: 'اسکوئرکل' }].map(s => (
                <button
                  key={s.key}
                  onClick={() => updateBlock(block.id, { avatarShape: s.key })}
                  className={`${btnBase} ${activeBtn(block.avatarShape === s.key)}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>نام</label>
            <input type="text" value={block.name} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="نام شما" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>عنوان</label>
            <input type="text" value={block.title} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="عنوان یا شغل" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>بیوگرافی</label>
            <textarea value={block.bio} onChange={e => updateBlock(block.id, { bio: e.target.value })} rows={3} className={textareaCls} />
          </div>
          <div className={fieldCls}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={block.showBadge} onChange={e => updateBlock(block.id, { showBadge: e.target.checked })} className="w-4 h-4 rounded border-gray-300 dark:border-white/20" />
              <span className="text-xs text-gray-500 dark:text-gray-400">نمایش نشان تأیید</span>
            </label>
          </div>
        </div>
      )
    }

    case 'link': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>عنوان</label>
            <input type="text" value={block.title} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="متن دکمه" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>آدرس</label>
            <input type="text" value={block.url} onChange={e => updateBlock(block.id, { url: e.target.value })} dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>آیکون (اموجی)</label>
            <input type="text" value={block.icon} onChange={e => updateBlock(block.id, { icon: e.target.value })} placeholder="🔗" maxLength={2} className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={block.highlight} onChange={e => updateBlock(block.id, { highlight: e.target.checked })} className="w-4 h-4 rounded border-gray-300 dark:border-white/20" />
              <span className="text-xs text-gray-500 dark:text-gray-400">پررنگ</span>
            </label>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>نشان</label>
            <div className="flex gap-2">
              {[{ key: '' as const, label: 'بدون' }, { key: 'new' as const, label: 'جدید' }, { key: 'special' as const, label: 'ویژه' }].map(b => (
                <button
                  key={b.key}
                  onClick={() => updateBlock(block.id, { badge: b.key })}
                  className={`${btnBase} ${activeBtn(block.badge === b.key)}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div className={fieldCls}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={block.newTab} onChange={e => updateBlock(block.id, { newTab: e.target.checked })} className="w-4 h-4 rounded border-gray-300 dark:border-white/20" />
              <span className="text-xs text-gray-500 dark:text-gray-400">باز کردن در تب جدید</span>
            </label>
          </div>
        </div>
      )
    }

    case 'social': {
      const b = block
      const platforms: { key: keyof SocialPlatforms; label: string }[] = [
        { key: 'instagram', label: 'اینستاگرام' },
        { key: 'telegram', label: 'تلگرام' },
        { key: 'whatsapp', label: 'واتساپ' },
        { key: 'linkedin', label: 'لینکدین' },
        { key: 'github', label: 'گیت‌هاب' },
        { key: 'youtube', label: 'یوتیوب' },
        { key: 'x', label: 'توییتر/X' },
        { key: 'eitaa', label: 'ایتا' },
        { key: 'bale', label: 'بله' },
        { key: 'rubika', label: 'روبیکا' },
      ]

      function updatePlatform(key: keyof SocialPlatforms, value: string) {
        updateBlock(b.id, { platforms: { ...b.platforms, [key]: value || undefined } })
      }

      return (
        <div dir="rtl">
          {platforms.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">{label}</span>
              <input
                type="text" value={b.platforms[key] || ''}
                onChange={e => updatePlatform(key, e.target.value)}
                placeholder="آیدی یا لینک"
                className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          ))}
        </div>
      )
    }

    case 'card': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>شماره کارت</label>
            <input type="text" value={block.cardNumber} onChange={e => updateBlock(block.id, { cardNumber: e.target.value })} placeholder="XXXX-XXXX-XXXX-XXXX" dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>شبا</label>
            <input type="text" value={block.shaba} onChange={e => updateBlock(block.id, { shaba: e.target.value })} placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxxx" dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>صاحب حساب</label>
            <input type="text" value={block.accountHolder} onChange={e => updateBlock(block.id, { accountHolder: e.target.value })} placeholder="نام و نام خانوادگی" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>نام بانک</label>
            <input type="text" value={block.bankName} onChange={e => updateBlock(block.id, { bankName: e.target.value })} placeholder="مثل: ملت" className={inputCls} />
          </div>
        </div>
      )
    }

    case 'text': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>محتوا</label>
            <textarea value={block.content} onChange={e => updateBlock(block.id, { content: e.target.value })} rows={4} className={textareaCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>اندازه قلم</label>
            <div className="flex gap-2">
              {[{ key: 'sm' as const, label: 'کوچک' }, { key: 'md' as const, label: 'متوسط' }, { key: 'lg' as const, label: 'بزرگ' }].map(f => (
                <button
                  key={f.key}
                  onClick={() => updateBlock(block.id, { fontSize: f.key })}
                  className={`${btnBase} ${activeBtn(block.fontSize === f.key)}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>جهت متن</label>
            <div className="flex gap-2">
              {[{ key: 'right' as const, label: 'راست' }, { key: 'center' as const, label: 'وسط' }, { key: 'left' as const, label: 'چپ' }].map(a => (
                <button
                  key={a.key}
                  onClick={() => updateBlock(block.id, { alignment: a.key })}
                  className={`${btnBase} ${activeBtn(block.alignment === a.key)}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    case 'divider': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>سبک</label>
            <div className="flex gap-2">
              {[{ key: 'line' as const, label: 'خط' }, { key: 'dashed' as const, label: 'خط‌چین' }, { key: 'space' as const, label: 'فضا' }, { key: 'emoji' as const, label: 'اموجی' }].map(s => (
                <button
                  key={s.key}
                  onClick={() => updateBlock(block.id, { style: s.key })}
                  className={`${btnBase} ${activeBtn(block.style === s.key)}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {block.style === 'emoji' && (
            <div className={fieldCls}>
              <label className={labelCls}>اموجی</label>
              <input type="text" value={block.emoji || ''} onChange={e => updateBlock(block.id, { emoji: e.target.value })} placeholder="🌸" maxLength={2} className={inputCls} />
            </div>
          )}
        </div>
      )
    }

    case 'video': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>پلتفرم</label>
            <div className="flex gap-2">
              {[{ key: 'youtube' as const, label: 'یوتیوب' }, { key: 'aparat' as const, label: 'آپارات' }].map(p => (
                <button
                  key={p.key}
                  onClick={() => updateBlock(block.id, { platform: p.key })}
                  className={`${btnBase} ${activeBtn(block.platform === p.key)}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>آدرس ویدیو</label>
            <input type="text" value={block.url} onChange={e => updateBlock(block.id, { url: e.target.value })} placeholder="https://" dir="ltr" className={inputCls} />
          </div>
        </div>
      )
    }

    case 'contact': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>تلفن</label>
            <input type="text" value={block.phone} onChange={e => updateBlock(block.id, { phone: e.target.value })} placeholder="09123456789" dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>واتساپ</label>
            <input type="text" value={block.whatsapp} onChange={e => updateBlock(block.id, { whatsapp: e.target.value })} dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>متن واتساپ</label>
            <input type="text" value={block.whatsappText} onChange={e => updateBlock(block.id, { whatsappText: e.target.value })} placeholder="متن پیش‌فرض پیام" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>تلگرام</label>
            <input type="text" value={block.telegram} onChange={e => updateBlock(block.id, { telegram: e.target.value })} dir="ltr" className={inputCls} />
          </div>
        </div>
      )
    }

    case 'email': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>آدرس ایمیل</label>
            <input type="email" value={block.email} onChange={e => updateBlock(block.id, { email: e.target.value })} placeholder="example@email.com" dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>موضوع</label>
            <input type="text" value={block.subject} onChange={e => updateBlock(block.id, { subject: e.target.value })} placeholder="موضوع پیش‌فرض" className={inputCls} />
          </div>
        </div>
      )
    }

    case 'product': {
      const b = block

      function addItem() {
        updateBlock(b.id, {
          items: [...b.items, { id: generateId(), image: '', name: '', price: 0, link: '', badge: '' as const }],
        })
      }

      function removeItem(id: string) {
        updateBlock(b.id, { items: b.items.filter(i => i.id !== id) })
      }

      function updateItem(id: string, partial: Partial<typeof b.items[0]>) {
        updateBlock(b.id, {
          items: b.items.map(i => i.id === id ? { ...i, ...partial } : i),
        })
      }

      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>چیدمان</label>
            <div className="flex gap-2">
              {[{ key: 'single' as const, label: 'تکی' }, { key: 'grid' as const, label: 'شبکه‌ای' }, { key: 'slider' as const, label: 'اسلایدر' }].map(l => (
                <button
                  key={l.key}
                  onClick={() => updateBlock(b.id, { layout: l.key })}
                  className={`${btnBase} ${activeBtn(b.layout === l.key)}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          {b.items.map(item => (
            <div key={item.id} className={itemCls}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">محصول</span>
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:text-red-600">حذف</button>
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>نام</label>
                <input type="text" value={item.name} onChange={e => updateItem(item.id, { name: e.target.value })} className={inputCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>قیمت</label>
                <input type="number" value={item.price} onChange={e => updateItem(item.id, { price: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>تصویر</label>
                <input type="file" accept="image/*" onChange={e => handleFileInput(e, dataUrl => updateItem(item.id, { image: dataUrl }))} className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 dark:file:bg-white/10 file:text-gray-600 dark:file:text-gray-300" />
                {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg mt-1" />}
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>لینک</label>
                <input type="text" value={item.link} onChange={e => updateItem(item.id, { link: e.target.value })} dir="ltr" className={inputCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>نشان</label>
                <div className="flex gap-2">
                  {[{ key: '' as const, label: 'بدون' }, { key: 'new' as const, label: 'جدید' }, { key: 'sale' as const, label: 'حراج' }, { key: 'unavailable' as const, label: 'نا موجود' }].map(b => (
                    <button
                      key={b.key}
                      onClick={() => updateItem(item.id, { badge: b.key })}
                      className={`${btnBase} ${activeBtn(item.badge === b.key)}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={addItem} className={`${btnBase} w-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20`}>
            افزودن محصول
          </button>
        </div>
      )
    }

    case 'hours': {
      const b = block
      const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

      function updateSchedule(idx: number, partial: Partial<(typeof b.schedule)[0]>) {
        const schedule = b.schedule.map((d, i) => i === idx ? { ...d, ...partial } : d)
        updateBlock(b.id, { schedule })
      }

      return (
        <div dir="rtl">
          {b.schedule.map((day, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">{dayNames[idx]}</span>
              <label className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                <input type="checkbox" checked={!day.isOff} onChange={e => updateSchedule(idx, { isOff: !e.target.checked })} className="w-3.5 h-3.5 rounded border-gray-300 dark:border-white/20" />
                <span className="text-[10px] text-gray-400">فعال</span>
              </label>
              {!day.isOff && (
                <>
                  <input type="time" value={day.open} onChange={e => updateSchedule(idx, { open: e.target.value })} className="flex-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs text-gray-700 dark:text-gray-200" />
                  <span className="text-[10px] text-gray-400">تا</span>
                  <input type="time" value={day.close} onChange={e => updateSchedule(idx, { close: e.target.value })} className="flex-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs text-gray-700 dark:text-gray-200" />
                </>
              )}
            </div>
          ))}
        </div>
      )
    }

    case 'map': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>آدرس</label>
            <textarea value={block.address} onChange={e => updateBlock(block.id, { address: e.target.value })} rows={2} className={textareaCls} />
          </div>
          <div className="flex gap-2">
            <div className={fieldCls + ' flex-1'}>
              <label className={labelCls}>عرض جغرافیایی</label>
              <input type="number" value={block.lat} onChange={e => updateBlock(block.id, { lat: Number(e.target.value) })} step="any" className={inputCls} />
            </div>
            <div className={fieldCls + ' flex-1'}>
              <label className={labelCls}>طول جغرافیایی</label>
              <input type="number" value={block.lng} onChange={e => updateBlock(block.id, { lng: Number(e.target.value) })} step="any" className={inputCls} />
            </div>
          </div>
        </div>
      )
    }

    case 'faq': {
      const b = block

      function addItem() {
        updateBlock(b.id, {
          items: [...b.items, { id: generateId(), question: '', answer: '' }],
        })
      }

      function removeItem(id: string) {
        updateBlock(b.id, { items: b.items.filter(i => i.id !== id) })
      }

      function updateItem(id: string, partial: Partial<(typeof b.items)[0]>) {
        updateBlock(b.id, {
          items: b.items.map(i => i.id === id ? { ...i, ...partial } : i),
        })
      }

      return (
        <div dir="rtl">
          {b.items.map(item => (
            <div key={item.id} className={itemCls}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">سوال</span>
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:text-red-600">حذف</button>
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>سوال</label>
                <input type="text" value={item.question} onChange={e => updateItem(item.id, { question: e.target.value })} placeholder="سوال" className={inputCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>پاسخ</label>
                <textarea value={item.answer} onChange={e => updateItem(item.id, { answer: e.target.value })} rows={2} className={textareaCls} />
              </div>
            </div>
          ))}
          <button onClick={addItem} className={`${btnBase} w-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20`}>
            افزودن سوال
          </button>
        </div>
      )
    }

    case 'testimonial': {
      const b = block

      function addItem() {
        updateBlock(b.id, {
          items: [...b.items, { id: generateId(), avatar: '', name: '', text: '', rating: 5 }],
        })
      }

      function removeItem(id: string) {
        updateBlock(b.id, { items: b.items.filter(i => i.id !== id) })
      }

      function updateItem(id: string, partial: Partial<(typeof b.items)[0]>) {
        updateBlock(b.id, {
          items: b.items.map(i => i.id === id ? { ...i, ...partial } : i),
        })
      }

      return (
        <div dir="rtl">
          {b.items.map(item => (
            <div key={item.id} className={itemCls}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">نظر</span>
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:text-red-600">حذف</button>
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>نام</label>
                <input type="text" value={item.name} onChange={e => updateItem(item.id, { name: e.target.value })} className={inputCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>متن نظر</label>
                <textarea value={item.text} onChange={e => updateItem(item.id, { text: e.target.value })} rows={2} className={textareaCls} />
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>آواتار</label>
                <input type="file" accept="image/*" onChange={e => handleFileInput(e, dataUrl => updateItem(item.id, { avatar: dataUrl }))} className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 dark:file:bg-white/10 file:text-gray-600 dark:file:text-gray-300" />
                {item.avatar && <img src={item.avatar} className="w-12 h-12 object-cover rounded-full mt-1" />}
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>امتیاز (۱-۵)</label>
                <input type="number" min={1} max={5} value={item.rating} onChange={e => updateItem(item.id, { rating: Math.min(5, Math.max(1, Number(e.target.value))) })} className={inputCls} />
              </div>
            </div>
          ))}
          <button onClick={addItem} className={`${btnBase} w-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20`}>
            افزودن نظر
          </button>
        </div>
      )
    }

    case 'vcard': {
      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>نام و نام خانوادگی</label>
            <input type="text" value={block.fullName} onChange={e => updateBlock(block.id, { fullName: e.target.value })} className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>تلفن</label>
            <input type="text" value={block.phone} onChange={e => updateBlock(block.id, { phone: e.target.value })} dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>ایمیل</label>
            <input type="email" value={block.email} onChange={e => updateBlock(block.id, { email: e.target.value })} dir="ltr" className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>سازمان</label>
            <input type="text" value={block.org} onChange={e => updateBlock(block.id, { org: e.target.value })} className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>سمت</label>
            <input type="text" value={block.title} onChange={e => updateBlock(block.id, { title: e.target.value })} className={inputCls} />
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>آدرس</label>
            <textarea value={block.address} onChange={e => updateBlock(block.id, { address: e.target.value })} rows={2} className={textareaCls} />
          </div>
        </div>
      )
    }

    case 'gallery': {
      const b = block

      function addImage() {
        updateBlock(b.id, { images: [...b.images, ''] })
      }

      function removeImage(idx: number) {
        updateBlock(b.id, { images: b.images.filter((_, i) => i !== idx) })
      }

      function updateImage(idx: number, src: string) {
        const images = [...b.images]
        images[idx] = src
        updateBlock(b.id, { images })
      }

      return (
        <div dir="rtl">
          <div className={fieldCls}>
            <label className={labelCls}>ستون‌ها</label>
            <div className="flex gap-2">
              {[{ key: 2 as const, label: '۲ ستون' }, { key: 3 as const, label: '۳ ستون' }].map(c => (
                <button
                  key={c.key}
                  onClick={() => updateBlock(b.id, { columns: c.key })}
                  className={`${btnBase} ${activeBtn(b.columns === c.key)}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          {b.images.map((src, idx) => (
            <div key={idx} className={itemCls}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">تصویر {idx + 1}</span>
                <button onClick={() => removeImage(idx)} className="text-xs text-red-500 hover:text-red-600">حذف</button>
              </div>
              <div className={fieldCls}>
                <label className={labelCls}>تصویر</label>
                <input type="file" accept="image/*" onChange={e => handleFileInput(e, dataUrl => updateImage(idx, dataUrl))} className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 dark:file:bg-white/10 file:text-gray-600 dark:file:text-gray-300" />
                {src && <img src={src} className="w-20 h-20 object-cover rounded-lg mt-1" />}
              </div>
            </div>
          ))}
          <button onClick={addImage} className={`${btnBase} w-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20`}>
            افزودن تصویر
          </button>
        </div>
      )
    }

    default:
      return <div className="text-xs text-gray-400 p-2">نوع بلوک پشتیبانی نمی‌شود</div>
  }
}
