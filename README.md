<div dir="rtl" align="center">

# 🌸 maddyBio

**ساخت صفحه لینک در بایو حرفه‌ای با قابلیت سفارشی‌سازی کامل**

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Zustand-5-6B3FA0?logo=react" alt="Zustand 5" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa" alt="PWA Ready" />
</p>

[🇬🇧 English](#english) • [گزارش باگ](https://github.com/Maddyrampant/maddyBio/issues) • [درخواست ویژگی](https://github.com/Maddyrampant/maddyBio/issues)

</div>

---

<div dir="rtl">

## ✨ ویژگی‌ها

**maddyBio** یک ابزار قدرتمند و رایگان برای ساخت صفحه لینک در بایو (bio link page) است. بدون نیاز به دانش فنی، صفحه‌ای زیبا و حرفه‌ای بسازید.

### 🎯 ۱۶ نوع بلوک متنوع

| بلوک | توضیحات |
|------|---------|
| **👤 پروفایل** | نمایش تصویر، نام، عنوان و بیوگرافی |
| **🔗 لینک** | دکمه‌های لینک با ۶ استایل مختلف (fill, outline, soft, glass, shadow, gradient) |
| **🌐 شبکه‌های اجتماعی** | آیکون اینستاگرام، تلگرام، واتساپ، لینکدین، گیت‌هاب، یوتیوب، ایکس، ایتا، بله، روبیکا |
| **💳 کارت بانکی** | نمایش شماره کارت، شبا، صاحب حساب و نام بانک |
| **📝 متن** | تیتر و پاراگراف با تنظیم اندازه و تراز |
| **➖ خط جداکننده** | خط، خط‌چین، فاصله یا ایموجی |
| **🎬 ویدیو** | جاسازی ویدیو از آپارات یا یوتیوب |
| **📞 تماس** | شماره تماس، واتساپ و تلگرام |
| **📧 ایمیل** | لینک ایمیل قابل کلیک |
| **🛍 محصول** | نمایش محصول با تصویر، قیمت و لینک خرید |
| **🕒 ساعات کاری** | جدول روزهای هفته با ساعات کاری |
| **📍 نقشه** | نمایش موقعیت با آدرس و مختصات |
| **❓ پرسش‌های متداول** | آکاردئون سوال و جواب |
| **⭐ نظرات** | نمایش نظرات کاربران |
| **📇 کارت ویزیت** | کارت ویزیت دیجیتال با مشخصات کامل |
| **🖼 گالری** | نمایش تصاویر در ستون‌های قابل تنظیم |

### 🎨 سیستم تم حرفه‌ای

- **۴۲ پالت رنگی** آماده با دسته‌بندی: پاستلی، نئون، کلاسیک، مینیمال، طبیعت، مدرن
- **تم تاریک (دارک مود)** با پشتیبانی کامل
- **۲۸ قالب آماده** برای شروع سریع
- **تنظیمات کامل تایپوگرافی**: فونت (۷ فونت فارسی)، اندازه، وزن، ارتفاع خط
- **نوع‌های پس‌زمینه**: ساده، گرادینت خطی، گرادینت شعاعی
- **افکت‌های ورود**: محو شدن، اسلاید از پایین، مقیاس
- **سایه و گردی گوشه** قابل تنظیم
- **اعداد فارسی** خودکار در کل صفحه

### 🛠 ویژگی‌های فنی

- **✅ PWA** — نصب روی موبایل و دسکتاپ
- **📱 واکنش‌گرا** — نمایش عالی در تمام دستگاه‌ها
- **↩️ Undo/Redo** — تاریخچه تغییرات کامل
- **📤 خروجی HTML** — دانلود صفحه به صورت فایل استاتیک
- **🎉 Confetti** — انیمیشن جشن پس از ساخت
- **🔄 Drag & Drop** — جابجایی بلوک‌ها با کشیدن
- **💾 ذخیره خودکار** — ذخیره لحظه‌ای در localStorage
- **⚡ سریع و سبک** — ساخته شده با Vite + React 19

</div>

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Maddyrampant/maddyBio.git
cd maddyBio

# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

## 🏗 Architecture

```
maddyBio/
├── src/
│   ├── components/
│   │   ├── editor/        # Editor panel (drag & drop, block cards, add menu)
│   │   ├── preview/       # Phone preview (BlockPreview, PreviewPanel)
│   │   ├── theme/         # Theme panel (colors, typography, effects, templates)
│   │   └── ui/            # Shared UI components (Toast, etc.)
│   ├── exporters/         # HTML export engine (static page generator)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions (persian helpers, etc.)
│   ├── store/             # Zustand store (project state, undo/redo, persist)
│   ├── themes/            # Palettes (42 color palettes) & templates (28 presets)
│   ├── types/             # TypeScript types & interfaces
│   └── utils/             # Color utils, Persian digits, etc.
├── public/                # Static assets (favicon, fonts)
└── dist/                  # Build output
```

## 🌐 Supported Platforms

| Platform | Support |
|----------|---------|
| Instagram | ✅ |
| Telegram | ✅ |
| WhatsApp | ✅ |
| LinkedIn | ✅ |
| GitHub | ✅ |
| YouTube | ✅ |
| X (Twitter) | ✅ |
| Eitaa | ✅ |
| Bale | ✅ |
| Rubika | ✅ |

---

<div dir="rtl" align="center">

ساخته شده با ❤️ در ایران 🇮🇷

</div>

---

<a name="english"></a>

# 🌸 maddyBio

**Build a professional bio link page with full customization**

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Zustand-5-6B3FA0?logo=react" alt="Zustand 5" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa" alt="PWA Ready" />
</p>

[🇮🇷 فارسی](#) • [Report Bug](https://github.com/Maddyrampant/maddyBio/issues) • [Request Feature](https://github.com/Maddyrampant/maddyBio/issues)

---

## ✨ Features

**maddyBio** is a powerful, free tool for creating bio link pages. No coding required — build a beautiful, professional page in minutes.

### 🎯 16 Block Types

| Block | Description |
|-------|-------------|
| **👤 Profile** | Avatar, name, title & bio |
| **🔗 Link** | Link buttons with 6 styles (fill, outline, soft, glass, shadow, gradient) |
| **🌐 Social** | Instagram, Telegram, WhatsApp, LinkedIn, GitHub, YouTube, X, Eitaa, Bale, Rubika |
| **💳 Bank Card** | Card number, IBAN (Shaba), account holder & bank name |
| **📝 Text** | Heading & paragraph with size & alignment control |
| **➖ Divider** | Line, dashed, space or emoji |
| **🎬 Video** | Embed from Aparat or YouTube |
| **📞 Contact** | Phone, WhatsApp & Telegram |
| **📧 Email** | Clickable email link |
| **🛍 Product** | Product with image, price & buy link |
| **🕒 Hours** | Weekly schedule table |
| **📍 Map** | Location with address & coordinates |
| **❓ FAQ** | Accordion Q&A |
| **⭐ Testimonial** | Customer reviews |
| **📇 VCard** | Digital business card |
| **🖼 Gallery** | Image grid with configurable columns |

### 🎨 Theme System

- **42 color palettes** categorized: Pastel, Neon, Classic, Minimal, Nature, Modern
- **Dark mode** with full support
- **28 ready templates** for quick start
- **Full typography control**: 7 Persian fonts, size, weight, line height
- **Background types**: Solid, linear gradient, radial gradient
- **Entrance animations**: Fade, slide-up, scale
- **Customizable** shadow & border radius
- **Auto Persian numerals** across the page

### 🛠 Tech Features

- **✅ PWA** — Install on mobile & desktop
- **📱 Responsive** — Looks great on all devices
- **↩️ Undo/Redo** — Full change history
- **📤 HTML Export** — Download as static HTML file
- **🎉 Confetti** — Celebration animation on export
- **🔄 Drag & Drop** — Reorder blocks easily
- **💾 Auto-save** — Persisted to localStorage
- **⚡ Fast & Lightweight** — Built with Vite + React 19

## 🚀 Quick Start

```bash
git clone https://github.com/Maddyrampant/maddyBio.git
cd maddyBio
npm install
npm run dev
```

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

## 🏗 Architecture

```
maddyBio/
├── src/
│   ├── components/
│   │   ├── editor/        # Editor panel (drag & drop, block cards, add menu)
│   │   ├── preview/       # Phone preview (BlockPreview, PreviewPanel)
│   │   ├── theme/         # Theme panel (colors, typography, effects, templates)
│   │   └── ui/            # Shared UI components (Toast, etc.)
│   ├── exporters/         # HTML export engine (static page generator)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions (Persian helpers, etc.)
│   ├── store/             # Zustand store (project state, undo/redo, persist)
│   ├── themes/            # Palettes (42 color palettes) & templates (28 presets)
│   ├── types/             # TypeScript types & interfaces
│   └── utils/             # Color utils, Persian digits, etc.
├── public/                # Static assets (favicon, fonts)
└── dist/                  # Build output
```

## 🌐 Supported Platforms

| Platform | Support |
|----------|---------|
| Instagram | ✅ |
| Telegram | ✅ |
| WhatsApp | ✅ |
| LinkedIn | ✅ |
| GitHub | ✅ |
| YouTube | ✅ |
| X (Twitter) | ✅ |
| Eitaa | ✅ |
| Bale | ✅ |
| Rubika | ✅ |

---

<div align="center">

Made with ❤️ in Iran 🇮🇷

</div>
