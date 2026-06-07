# English Language Content — Audit & Rewrite Roadmap

> **Status:** Post-Merge Audit Complete | **Branch:** `main` (merged `origin/master`)  
> **Date:** 2026-06-07

---

## 1. Executive Summary

The `origin/master` merge brought in **full English language support** as a 4th learnable language. English now has:

| Component | Status | Notes |
|-----------|--------|-------|
| Alphabets (A-Z, digraphs, diphthongs) | ⚠️ Needs fixes | 5 phonetic/phonics errors |
| Lessons (14 categories, ~340 words) | ⚠️ Needs fixes | 4 wrong meanings/labels |
| Sentences (~98 sentences) | ⚠️ Minor fix | 1 missing apostrophe |
| Dialogues (8 scenarios) | ⚠️ Needs fixes | 1 ungrammatical, 1 archaic line |
| Journey (30-day) | 🔴 Incomplete | Only **Day 1** exists |
| GunithaluPage | 🔴 Broken | Empty combos grid for English |
| AlphabetCharts matrix | 🔴 Broken | Empty matrix for English |

**Bottom line:** English data is ~90% complete and functional, but has **content errors**, **template mismatches**, and a **severely incomplete journey**.

---

## 2. Content Mismatch Report — English Data Files

### 2.1 `src/data/alphabets/english.ts` (5 issues)

| Line | Issue | Current | Should Be | Severity |
|------|-------|---------|-----------|----------|
| 11 | Vowel U name | `yu` | `uh` | Medium |
| 18 | C phonics tip | `"C comes before e, i, o. K before a, u."` | `"Sounds like K before a, o, u. Sounds like S before e, i, y."` | 🔴 **High** — actively misleading |
| 60 | EA diphthong name | `ee-uh` | `ee` | Medium |
| 63 | OW diphthong tip | `"Start with the S sound, glide to OH"` | `"Start with OH sound, glide to OO"` | Medium |
| 66 | IE diphthong name | `ee-uh` | `ee` | Medium |

### 2.2 `src/data/lessons/english.ts` (4 issues)

| Line | Issue | Current | Should Be |
|------|-------|---------|-----------|
| 6, 96, 145, 247 | `\u0026` instead of `&` in category names | `Technology \u0026 Communication` | `Technology & Communication` |
| 130 | Grandfather meaning | `"Father parent"` | `"Father's father"` |
| 131 | Grandmother meaning | `"Father mother"` | `"Father's mother"` |
| 337 | Profession label | `"Police"` (refers to force) | `"Police officer"` |

### 2.3 `src/data/sentences/english.ts` (1 issue)

| Line | Issue | Current | Should Be |
|------|-------|---------|-----------|
| 44 | Missing apostrophe | `"six o clock"` | `"six o'clock"` |

### 2.4 `src/data/dialogues/english.ts` (2 issues)

| Line | Issue | Current | Should Be |
|------|-------|---------|-----------|
| 194 | Archaic/stilted | `"This is he."` | `"Speaking."` or `"This is Ravi speaking."` |
| 276 | Ungrammatical | `"Beautiful morning, is not it?"` | `"Beautiful morning, isn't it?"` |

### 2.5 `src/data/journey/english.ts` (Critical — 1 of 30 days)

- **Only Day 1** (Greetings) exists
- Telugu journey has **766 lines** spanning Week 1
- English journey needs **Days 2–30** to reach parity
- Missing `wordByWordBreakdown` in `sentenceOfDay` (optional per type, but educational)

---

## 3. Template Mismatch Report — English in UI

### 3.1 🔴 `GunithaluPage.tsx` — Broken for English

**Problem:** The page expects `alphabets.gunihalu || alphabets.uyirMei` to build consonant+vowel-sign combinations. English alphabet data has **neither** — it has `digraphs` and `diphthongs` instead.

**Result:**
- `vowelModifiers = []` (empty array)
- `totalCombos = 0`
- Progress bar shows `Learned: 0 / 0`
- Combos grid renders **nothing**
- Page shows a consonant selector with no combinations

**Code location:**
```tsx
// Line 97
const gunihaluGroup = alphabets.gunihalu || alphabets.uyirMei
// Line 165-170 — title says "Diphthongs" but UI shows consonants
```

### 3.2 🔴 `AlphabetChartsPage.tsx` — GunithaluMatrix Broken for English

**Problem:** Same root cause — looks for `alphabets.gunihalu || alphabets.uyirMei`, gets `undefined` for English.

**Result:** Empty matrix table with 0 columns.

**Code location:**
```tsx
// Line 62
const gunihalu = alphabets.gunihalu || alphabets.uyirMei
```

### 3.3 ✅ Templates That Work Correctly for English

| Page/Component | Status | Notes |
|----------------|--------|-------|
| HomePage | ✅ | Shows "English Alphabets", "English Gunithalu" |
| PracticePage | ✅ | Has English font fix; tracing works |
| FlashcardPage | ✅ | Generic data structures |
| QuizPage | ✅ | Generic data structures |
| MatchPage | ✅ | Generic data structures |
| SentencesPage | ✅ | Generic data structures |
| DialoguesPage | ✅ | Generic data structures |
| ProfilePage | ✅ | Language-agnostic |
| ProgressPage | ✅ | Language-agnostic |
| ReviewPage | ✅ | Language-agnostic |

---

## 4. English Rewrite Roadmap

### Phase 1: Content Corrections (Data Files)
**Priority:** High | **Effort:** 1–2 hours

- [ ] Fix `alphabets/english.ts` — 5 phonetic/phonics issues
- [ ] Fix `lessons/english.ts` — `\u0026` → `&`, meanings, profession label
- [ ] Fix `sentences/english.ts` — missing apostrophe
- [ ] Fix `dialogues/english.ts` — archaic + ungrammatical lines
- [ ] Run `npm run build` to verify

### Phase 2: Template Fixes (Gunithalu + AlphabetCharts)
**Priority:** High | **Effort:** 2–3 hours

**Option A: Disable Gunithalu for English** (Simplest)
- Hide Gunithalu nav item / card when `currentLanguage === 'english'`
- Redirect or show "Not applicable for English" message

**Option B: Adapt Gunithalu for English Digraphs/Diphthongs** (Better UX)
- Detect English in `GunithaluPage.tsx`
- Show `digraphs` group instead of `gunihalu` group
- Display digraphs/diphthongs as learnable units with examples
- Update `AlphabetChartsPage.tsx` matrix tab similarly

**Option C: Replace Gunithalu with "Letter Blends" page for English** (Best long-term)
- Create English-specific blends page (digraphs + diphthongs)
- Show sound combinations: `CH`, `SH`, `TH`, `AI`, `OW`, etc.
- Include audio + example words

**Recommendation:** Implement **Option B** for minimal intrusion, **Option C** as follow-up.

### Phase 3: Journey Completion
**Priority:** Medium | **Effort:** 6–8 hours

- [ ] Create English Days 2–7 (Week 1) following Telugu pattern
- [ ] Include: vocabulary, learningCard, sentenceOfDay, activities, quiz, realLifeUsage
- [ ] Add `wordByWordBreakdown` to sentences for educational value
- [ ] Build incrementally: 1 week at a time

### Phase 4: Final Verification
**Priority:** High | **Effort:** 1 hour

- [ ] Switch app to English language
- [ ] Walk through every page:
  - Home → Learning Paths
  - Alphabets → Charts → Practice
  - Gunithalu (after fix)
  - Lessons → Flashcards → Match → Quiz
  - Sentences → Dialogues
  - Journey (if built)
- [ ] Verify TTS audio works for English (`en-US`)
- [ ] Run `npm run build` final check

---

## 5. Quick Fixes — Can Apply Immediately

If you want the fastest path to a clean English experience, apply these **3 changes**:

1. **Fix the 5 alphabet phonics issues** (misleading C rule is worst)
2. **Fix the 7 content issues** across lessons/sentences/dialogues
3. **Hide/disable Gunithalu for English** until Phase 2 is implemented

This gets you to ~95% quality with < 2 hours of work.

---

*Audit completed: 2026-06-07*  
*Files audited: `src/data/alphabets/english.ts`, `src/data/lessons/english.ts`, `src/data/sentences/english.ts`, `src/data/dialogues/english.ts`, `src/data/journey/english.ts`, `src/pages/GunithaluPage.tsx`, `src/pages/AlphabetChartsPage.tsx`*
