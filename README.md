# 🌐 Language Learning — Interactive Multi-Language Web App

A multi-sensory language learning platform for beginners and kids. Supports **Tamil**, **Hindi**, and **Telugu**. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2.4-06B6D4?logo=tailwindcss)

---

## ✨ Features

### 🌐 Multi-Language Support
- **Tamil** (தமிழ்) — 549 words across 19 vocabulary categories
- **Hindi** (हिन्दी) — 537 words across 19 vocabulary categories
- **Telugu** (తెలుగు) — 476 words across 19 vocabulary categories
- Language switcher in header — instantly switches alphabets, lessons, TTS voice, sentences, and dialogues
- Fonts: Noto Sans Tamil, Noto Sans Devanagari, Noto Sans Telugu

### 🗣️ Speech & Audio
- **Text-to-Speech (TTS)** — Native pronunciation via Web Speech API (auto-detects voice per language)
- **Speech-to-Text (STT)** — Mic button validates pronunciation with fuzzy matching
- **Sound Effects** — Web Audio API–generated chimes, boops, and fanfares
- **Mute Toggle** — Master mute/unmute in the header

### 🎴 Learning Modes
- **Flashcards** — Flip cards showing letter → word → image + audio playback
- **Match Game** — Pair letters with emoji images in a timed grid
- **Quiz Mode** — MCQ with visual images; score tracking and streaks
- **Trace/Write Mode** — Canvas letter tracing with guide overlay
- **Alphabet Browse** — Navigate vowels, consonants, and compound letters
- **Sentences** — Browse full sentences grouped by category with native script, English, pronunciation, and meaning
- **Dialogues** — Read conversation scenarios with speaker A/B roles and audio playback

### 🦜 Mascot (Parrot 🦜)
- Draggable emoji in the bottom-left corner with speech bubble
- Reacts to quiz answers — celebrates 🎉 on correct, encourages 💪 on wrong
- Auto-tips on first visit

### 🧩 Gamification
- **XP System** — Earn points for lessons, quizzes, and correct answers
- **Levels** — Progress from Letter Learner → Language Pro (6 levels)
- **Daily Streak** 🔥 — Tracks consecutive learning days
- **Achievements** — Badges for milestones (First Letter, Vowel Master, Week Warrior, etc.)

### 🎨 UI/UX
- **Dark Mode** — Soft dark theme with indigo/amber accents (default)
- **Framer Motion Animations** — Smooth page transitions, card flips, confetti bursts
- **Kid-Friendly** — Big buttons, bright colors, minimal text, instant feedback
- **Adaptive Learning** — Tracks weak letters and prioritizes them in quizzes

---

## 🚀 Quick Start

```bash
# Navigate to project
cd /root/Projects/language-learning

# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

> **Dev server:** `http://localhost:5173`  
> **Base path:** `/language-learning/` (configured for nginx deployment)

---

## 📁 Project Structure

```
src/
├── App.tsx                     # Main app — routing with React Router
├── main.tsx                    # React entry point
├── vite-env.d.ts               # TypeScript env + Speech API declarations
├── types/
│   └── index.ts                # All TypeScript interfaces & types
├── i18n/
│   └── languages.ts            # Language configs (BCP-47, native names, flags)
├── store/
│   └── useAppStore.ts          # Zustand store (state, actions, persistence)
├── hooks/
│   ├── useAdaptiveLearning.ts   # Weak letter tracking + quiz history
│   ├── useMascot.ts            # Mascot state, messages, emotions
│   ├── useSounds.ts            # Web Audio API sound effects
│   └── useSpeech.ts            # TTS + STT speech hooks
├── data/
│   ├── alphabets/
│   │   ├── index.ts            # Alphabet registry + helper functions
│   │   ├── tamil.ts            # Tamil alphabet data (vowels, consonants, etc.)
│   │   ├── hindi.ts            # Hindi alphabet data (swar, vyanjan)
│   │   └── telugu.ts           # Telugu alphabet data (achchulu, hallulu)
│   └── lessons/
│   │   ├── index.ts            # Lesson registry + helper functions
│   │   ├── tamil.ts            # Tamil vocabulary (19 categories, 549 words)
│   │   ├── hindi.ts            # Hindi vocabulary (19 categories, 537 words)
│   │   └── telugu.ts           # Telugu vocabulary (19 categories, 476 words)
│   ├── sentences/
│   │   ├── index.ts            # Sentence registry + helper functions
│   │   ├── tamil.ts            # Tamil sentences (98 across 16 categories)
│   │   ├── hindi.ts            # Hindi sentences (98 across 16 categories)
│   │   └── telugu.ts           # Telugu sentences (98 across 16 categories)
│   └── dialogues/
│       ├── index.ts            # Dialogue registry + helper functions
│       ├── tamil.ts            # Tamil dialogues (5 scenarios)
│       ├── hindi.ts            # Hindi dialogues (5 scenarios)
│       └── telugu.ts           # Telugu dialogues (5 scenarios)
├── components/
│   ├── ErrorBoundary.tsx       # React error boundary with recovery UI
│   ├── AnimatedFeedback.tsx    # Correct/wrong feedback + shake animations
│   ├── FlashcardMode.tsx       # Flip-card learning mode
│   ├── MatchGame.tsx           # Letter↔image matching game
│   ├── SpeechButton.tsx        # TTS + STT button with mic
│   ├── Layout.tsx              # App shell (header, nav, mascot, language switcher)
│   └── ui/
│       ├── BottomNav.tsx       # Mobile navigation bar
│       ├── Confetti.tsx        # Confetti burst + level-up modal
│       ├── Gamification.tsx    # XP, streak, level badges
│       ├── LearningCard.tsx    # Learning path card with progress
│       ├── Mascot.tsx          # Draggable emoji mascot + speech bubble
│       └── SectionHeader.tsx   # Section titles + continue banner
└── pages/
    ├── HomePage.tsx            # Hero + learning paths + achievements
    ├── PracticePage.tsx        # Trace letters on canvas
    ├── FlashcardPage.tsx       # Flashcard learning
    ├── MatchPage.tsx           # Letter↔image game
    ├── QuizPage.tsx            # Test your knowledge
    ├── ProgressPage.tsx        # Stats + achievements
    └── ProfilePage.tsx         # XP, streak, level, reset
```

---

## 🎯 Vocabulary Categories (per language)

| Category | Tamil | Hindi | Telugu |
|----------|-------|-------|--------|
| 🔤 Alphabets | Vowels, Consonants, Compounds | Swar, Vyanjan | Achchulu, Hallulu |
| 👋 Greetings & Basics | ✅ | ✅ | ✅ |
| 🔢 Numbers 1–100 | ✅ | ✅ | ✅ |
| 🔢 Numbers 1K–100K | ✅ | ✅ | ✅ |
| 👨‍👩‍👧‍👦 Family Words | ✅ | ✅ | ✅ |
| 🍛 Food & Drinks | ✅ | ✅ | ✅ |
| 🎨 Colors | ✅ | ✅ | ✅ |
| 📅 Days & Time | ✅ | ✅ | ✅ |
| 💬 Common Phrases | ✅ | ✅ | ✅ |
| 🦴 Body Parts | ✅ | ✅ | ✅ |
| 🏠 Places & Travel | ✅ | ✅ | ✅ |
| 🌦️ Weather & Nature | ✅ | ✅ | ✅ |
| 🐦 Animals & Birds | ✅ | ✅ | ✅ |
| 👕 Clothing | ✅ | ✅ | ✅ |
| 💼 Occupations | ✅ | ✅ | ✅ |
| 😊 Emotions & Feelings | ✅ | ✅ | ✅ |
| 🏠 Household Items | ✅ | ✅ | ✅ |
| 💻 Technology & Communication | ✅ | ✅ | ✅ |
| ⏰ Time & Dates | ✅ | ✅ | ✅ |
| 🏃 Actions & Verbs | ✅ | ✅ | ✅ |

**Total words:** Tamil (549) · Hindi (537) · Telugu (476)

## 💬 Sentences & Dialogues

### Sentences
- 98 sentences per language across 16+ categories
- Each sentence: native script, English, pronunciation, meaning
- Grouped by category with speech playback

### Dialogues
- 5 conversation scenarios per language
- Scenarios: At the Market, Meeting a Friend, At the Restaurant, At the Doctor, Asking for Directions
- Each dialogue: 4–6 alternating lines (speaker A/B) with audio playback

---

## 📦 Tech Stack

| Layer | Technology |
|------|------------|
| Language | TypeScript 5.8 |
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Animations | Framer Motion 12 |
| Icons | Lucide React 1.14 |
| Routing | React Router DOM 7 |
| State | Zustand 5 (with persist middleware) |
| Speech | Web Speech API (TTS + STT) |
| Audio | Web Audio API (synthesized sounds) |
| Fonts | Noto Sans Tamil, Devanagari, Telugu |
| Storage | localStorage (progress + preferences) |

---

## 🌐 Adding a New Language

1. **Create alphabet data** — Add `src/data/alphabets/<language>.ts`:
   ```typescript
   import type { AlphabetData } from '../../types'
   export const kannadaAlphabets: AlphabetData = {
     vowels: { name: 'ಸ್ವರ (Swar) — Vowels', chars: [...] },
     consonants: { name: 'ವ್ಯಂಜನ (Vyanjan) — Consonants', chars: [...] },
   }
   ```

2. **Create lesson data** — Add `src/data/lessons/<language>.ts`:
   ```typescript
   import type { LessonCategory } from '../../types'
   export const kannadaLessons: LessonCategory[] = [
     { id: 1, category: 'Greetings', words: [...] },
     ...
   ]
   ```

3. **Register in index files** — Add to `data/alphabets/index.ts` and `data/lessons/index.ts`

4. **Add language config** — Update `src/i18n/languages.ts`:
   ```typescript
   kannada: { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'ltr', flag: '🇮🇳', voiceLang: 'kn-IN' }
   ```

5. **Update types** — Add `'kannada'` to the `Language` union type in `src/types/index.ts`

6. **Add font** — Import the Noto Sans font in `src/index.css`

---

## 🚀 Build & Deploy to Nginx

The app is deployed on this server via **nginx** at `/language-learning/`. Here's the workflow:

### Build & Deploy

```bash
cd /root/Projects/language-learning

# Build for production (outputs to dist/)
npm run build

# Deploy to nginx
rm -rf /var/www/apps/language-learning/*
cp -r dist/* /var/www/apps/language-learning/

# Reload nginx
systemctl reload nginx
```

### Nginx Configuration

The app is served by nginx at **`/language-learning/`** under a multi-app setup:

```
/etc/nginx/sites-available/apps.conf   ← main config (all apps)
/var/www/apps/                          ← app build files
  ├── index.html                        ← apps portal landing page
  └── language-learning/                ← this app
```

Key nginx features:
- **SPA routing** — all paths under `/language-learning/` fall back to `index.html`
- **Gzip compression** — enabled for JS, CSS, fonts, SVG
- **Asset caching** — 1 year for `/assets/`, no-cache for service workers
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### Adding a New App to Nginx

1. Build your app with `base: "/<app-name>/"` in `vite.config.ts`
2. Deploy: `cp -r dist/* /var/www/apps/<app-name>/`
3. Add a `location` block in `/etc/nginx/sites-available/apps.conf`
4. `systemctl reload nginx`

### Access URLs

| Route | Description |
|-------|-------------|
| `/` | Apps portal landing page |
| `/language-learning/` | Language Learning App |
| `/language-learning/practice` | Practice page (SPA route) |
| `/language-learning/quiz` | Quiz page (SPA route) |

### Public Tunnel (ngrok)

```bash
# Start ngrok tunnel to nginx port 80
ngrok http 80
```

This gives a public HTTPS URL (e.g., `https://<random>.ngrok-free.dev`) that routes to nginx on port 80. The app will be accessible at the same `/language-learning/` path.

---

## 🔧 Development

### Type Checking

```bash
npx tsc --noEmit
```

### Tunnel for Dev Server

```bash
# Option 1: ngrok
ngrok http 5173

# Option 2: cloudflare
cloudflared tunnel --url http://localhost:5173
```

---

## 📱 Navigation

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/language-learning/` | Hero + learning paths + daily goal |
| ✍️ Practice | `/language-learning/practice` | Trace letters on canvas |
| 🃏 Flashcard | `/language-learning/flashcard` | Flip-card learning |
| 🧩 Match | `/language-learning/match` | Letter↔image game |
| 📝 Quiz | `/language-learning/quiz` | Test your knowledge |
| 📊 Progress | `/language-learning/progress` | Stats + achievements |
| 👤 Profile | `/language-learning/profile` | XP, streak, level, reset |
| 💬 Sentences | `/language-learning/sentences` | Browse sentences by category |
| 🗨️ Dialogues | `/language-learning/dialogues` | Read conversation scenarios |

---

## 🎨 Color Palette (Dark Mode Default)

| Element | Color |
|--------|-------|
| Background | `#0f172a` (slate-900) |
| Card BG | `rgba(30,41,59,0.7)` |
| Accent Primary | `#6366f1` (indigo-500) |
| Accent Secondary | `#8b5cf6` (violet-500) |
| Letter Highlight | `#fbbf24` (amber-400) |
| Success | `#10b981` (emerald-500) |
| Error | `#ef4444` (red-500) |

---

## 🧠 Adaptive Learning System

- Tracks wrong answers per letter in `localStorage`
- Letters answered incorrectly 2+ times are flagged as "weak"
- Quiz prioritizes weak letters for intelligent practice
- Session persistence — picks up where you left off
- Accuracy % tracked per character over time

---

## 📄 License

Private — built for language learning 🌊