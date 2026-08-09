# 🎂 Happy Birthday, kuchupuchuu — Premium Romantic Birthday Website

A fully responsive, premium, romantic-luxury birthday website built for
**kuchupuchuu 😘😗**, celebrating **10th August**. Soft pink, white, and gold
palette, glassmorphism cards, and a long list of interactive surprises —
built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

---

## ✨ Features

- Cinematic loading screen with animated heart + progress bar
- Animated gradient background, floating hearts, falling roses, butterflies,
  fireflies, twinkling stars, a soft glowing moon, and occasional shooting
  stars
- Sparkle cursor glow, mouse-trail hearts, and click-anywhere heart bursts
- Hero section with an animated headline, mini birthday cake, rising
  balloons, and a glowing "Open Your Surprise" call to action
- The birthday message, preserved exactly as written, in a glass card
- Live **Love Counter** (days / hours / minutes / seconds to the next
  10th August)
- "Reasons You're Special" cards, floating love notes, and a sequential
  birthday-wishes reveal
- Interactive **surprise gift box** that opens on tap/click
- Interactive **cake cutting**: candles blow out automatically, then the
  cake "cuts," with a wish message and fireworks
- **Balloon Burst** mini-game with confetti on every pop
- Photo **gallery with a lightbox** (placeholder frames — see
  `images/gallery/README.txt` to add real photos)
- Love-journey **timeline**
- Full-screen, dark-romantic **finale** with fireworks and a glowing message
- Background music with a mute/unmute toggle that auto-pauses when the tab
  is inactive (see `music/README.txt` to add a real track)
- **Dark / light / system theme** toggle, saved to `localStorage`
- Scroll progress bar, animated scroll-to-top button
- A single floating Share button (Web Share API with clipboard fallback) —
  no promotional/social-account buttons on the live page by design
- **"Download This Memory"** button that saves the finale section as a PNG
  (via `html2canvas`, loaded on demand)
- Time-of-day dynamic greeting on the hero section
- Hidden secret message (tap the name in the top-left corner 🤫)
- Installable **PWA**: manifest, service worker, offline app-shell caching,
  custom icons
- Scroll-reveal animations throughout, `prefers-reduced-motion` respected,
  keyboard-accessible interactive elements, visible focus states

---

## 📂 Folder Structure

```
Birthday-Website/
│── index.html            → all markup, links style.css + script.js
│── style.css              → all styling (tokens, layout, animations, dark mode)
│── script.js               → all interactivity (wrapped in DOMContentLoaded)
│── manifest.json          → PWA manifest
│── sw.js                  → service worker (offline app-shell caching)
│── robots.txt
│── sitemap.xml
│── favicon.ico
│── README.md               → this file
│── music/
│     └── README.txt        → where to drop your instrumental track
│── images/
│     └── gallery/
│           └── README.txt  → how to wire real photos into the gallery
│── fonts/
│     └── README.md         → notes on the Google Fonts CDN / self-hosting
│── assets/
      └── icons/
            ├── icon-192.png
            ├── icon-512.png
            └── apple-touch-icon.png
```

---

## ▶️ How to Run

No build tools, no dependencies, no install step.

**Option 1 — just open it**
Double-click `index.html`. Everything works except the service worker
(browsers restrict service workers to `http://`/`https://` origins, not
`file://`).

**Option 2 — local server (recommended, enables the PWA/offline features)**
From inside the `Birthday-Website/` folder, run any of:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080` in your browser.

**Option 3 — deploy**
Push the whole `Birthday-Website/` folder to GitHub Pages, Netlify, or
Vercel. No configuration needed — it's a static site.

---

## 🎨 Customization Guide

- **Music** — add `romantic-birthday-instrumental.mp3` to `music/` (see
  `music/README.txt`).
- **Photos** — add images to `images/gallery/` and swap them into the
  gallery frames in `index.html` (see `images/gallery/README.txt`).
- **Colors** — every color is a CSS variable at the top of `style.css`
  under `:root` (e.g. `--rose-600`, `--gold-500`); change them once and the
  whole site updates.
- **Message / wishes / timeline / reasons** — plain text inside
  `index.html`; edit directly, no build step needed.
- **Countdown target date** — see the `nextBirthday()` function in
  `script.js` if you ever need to change the month/day (currently
  August 10th).
- **Domain for SEO files** — update the placeholder URLs in `robots.txt`
  and `sitemap.xml` once you know the final deployed URL.

---

## 🙌 Credits

Crafted by **Sourya**
📷 Instagram: [sourya791m](https://www.instagram.com/sourya791m)
💬 Telegram: [sourya791m](https://t.me/sourya791m)
🌐 Website: [sourya791m.github.io/sourya791m](https://sourya791m.github.io/sourya791m)

Fonts via Google Fonts (Playfair Display, Cormorant Garamond, Quicksand).
Optional screenshot export powered by [html2canvas](https://html2canvas.hertzen.com/)
(loaded from CDN only when the "Download This Memory" button is used).

---

## 📄 License

Made as a personal gift. Free to use, adapt, and re-gift for your own
celebrations — a credit back to Sourya is appreciated but not required.
