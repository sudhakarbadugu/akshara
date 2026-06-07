# English Content Rewrite Roadmap

> **Status:** Research Complete | **Languages Affected:** Telugu, Tamil, Hindi | **Severity:** High

---

## 1. Executive Summary

After a thorough audit of the entire codebase, here are the key findings:

### ✅ What IS Correct
- **Template-level English labels** (Gunithalu, Alphabet Charts, etc.) are correct. The `english` field in alphabet data properly represents romanized pronunciations.
- **Type definitions** and **UI infrastructure** are solid.
- **Journey master plan** syllabus structure is well-designed.

### ❌ What IS Mismatching / Broken
- **Telugu `lessons/telugu.ts`**: 20+ wrong translations, corrupted pronunciations, English words embedded in Telugu text.
- **Telugu `sentences/telugu.ts`**: 5+ sentences with English words mixed in, wrong translations.
- **Telugu `dialogues/telugu.ts`**: Corrupted/gibberish text, Arabic characters embedded, wrong translations.
- **Tamil `lessons/tamil.ts`**: Entire "Household Items" category is badly corrupted with gibberish native text. Multiple wrong translations.
- **Tamil `sentences/tamil.ts`**: English words embedded, wrong translations (`tomorrow` instead of `a day`).
- **Tamil `dialogues/tamil.ts`**: Severe mistranslations — "Undefined!" for "You are welcome", "nine" for "ninety", "water" for "coffee".
- **Hindi `lessons/hindi.ts`**: Transliterated English words instead of proper Hindi, wrong translations.
- **Hindi `sentences/hindi.ts`**: English words embedded, minor grammar errors.
- **Hindi `dialogues/hindi.ts`**: Multiple pronunciation errors.

### 📊 Impact
| Language | Files Affected | Severity | Est. Issues |
|----------|---------------|----------|-------------|
| Telugu | 4 | High | ~35 |
| Tamil | 4 | Critical | ~45 |
| Hindi | 4 | Medium | ~20 |

---

## 2. Detailed Mismatch Report

### 2.1 Telugu — `src/data/lessons/telugu.ts`

#### Wrong Translations (Category: Emotions & Feelings)
| Line | English | Current (Wrong) | Should Be | Issue |
|------|---------|-----------------|-----------|-------|
| ~591 | Angry | `బాధ` | `కోపం` | `బాధ` = sorrow, not anger |
| ~601 | Proud | `అహంకారం` | `గర్వం` | `అహంకారం` = ego/arrogance (negative) |
| ~752 | Wake up | `నీళ్ళు` | `లేచు` / `నిద్రలేచు` | `నీళ్ళు` = water |
| ~767 | Want | `వద్దు` | `కావాలి` | `వద్దు` = don't want |

#### Wrong Pronunciations
| Line | English | Current | Should Be |
|------|---------|---------|-----------|
| ~769 | Take | `Teeku` | `Theesuku` |
| ~770 | Sell | `Amur` | `Ammu` |

#### Category: Clothing (Severe Errors)
| English | Current (Wrong) | Should Be | Issue |
|---------|-----------------|-----------|-------|
| Pillow | `బెడ్` | `తలపడు` | `బెడ్` = bed |
| Spectacles | `చెంబు` | `కళ్ళజోడు` | `చెంబు` = bronze pot |
| Umbrella | `ఎల్లం` | `గొడుగు` | Not a standard Telugu word |
| Ring | `ఉంగు` | `ఉంగరం` | Incomplete |
| Bangle | `జాకు` | `గాజులు` | Wrong |
| Earring | `మల్లెం` | `చెవిపోగు` | `మల్లెం` = jasmine flower |
| Necklace | `కంఠాపరకు` | `హారం` | Wrong |
| Bindi | `మడ్డి` | `బొట్టు` | `మడ్డి` = mud/clay |
| Comb | `వీపు` | `దువ్వెన` | `వీపు` = back |
| Blanket | `కమ్మల్` | `దుప్పటి` | Wrong |
| Curtain | `పడబ్బ` | `తెర` | Wrong |

#### Category: Household Items
| English | Current (Wrong) | Should Be | Issue |
|---------|-----------------|-----------|-------|
| Rug | `బహిష్క` | `పరుపు` | Corrupted |
| Dustbin | `త్సోకు` | `చెత్తపెట్టె` | Corrupted |
| Key | `తాళప్రతి` | `తాళం చెవి` | Wrong term |
| Fan | `పంచత్` | `పంఖా` | Wrong |
| Pillow | `తలపడు` | `తలపడు` | ✓ Actually correct here |
| Bucket | `బకెట్` | `బక్కెట్` | Minor |

#### Category: Actions & Verbs
| English | Current | Should Be | Issue |
|---------|---------|-----------|-------|
| Stand | `నిలువు` | `నిలబడు` | `నిలువు` = stand (imperative is okay but `నిలబడు` is more common) |
| Want | `వద్దు` | `కావాలి` | `వద్దు` = no/don't want |

---

### 2.2 Telugu — `src/data/sentences/telugu.ts`

#### English Words Embedded in Telugu Text
| English Sentence | Native Telugu | Issue |
|------------------|---------------|-------|
| It might rain today. | `ఈ రోజు rain పడే అవకాశం ఉంది.` | English `rain` embedded |
| I finished my work early. | `నా పనిని early ముగించాను.` | English `early` embedded |

#### Wrong Translations
| English | Native | Issue |
|---------|--------|-------|
| My father is a doctor. | `నా అతను డాక్టర్.` | `అతను` = "he", not "father". Should be `నా తండ్రి డాక్టర్.` |
| I take a bath every day. | `నేను ప్రతిరోజూ అలమట్టు చేస్తాను.` | `అలమట్టు` is not common for bath. Should be `స్నానం` |
| I cleaned my room today. | `ఈ రోజు నా గదిని శుభం చేశాను.` | `శుభం` = auspicious. Should be `శుభ్రం` or `శుద్ధి చేశాను` |
| You are welcome! (in dialogues) | `మళ్ళీ కలుదాం!` | This means "See you again!" |

---

### 2.3 Telugu — `src/data/dialogues/telugu.ts`

#### Corrupted / Gibberish Text
| Context | Current (Wrong) | Should Be | Issue |
|---------|-----------------|-----------|-------|
| Can I get two kilos? | `నాకు రెండు కిలోలు بد్కవచ్చుా?` | `నాకు రెండు కిలోలు ఇవ్వగలరా?` | **Arabic characters embedded** |
| Fresh from the farm! | `పొలం నుండి తాజా!` | ✓ This part is correct | — |
| Forty rupees a bunch. | `మిషములో నలభై రూపాయలు.` | `కట్టకు నలభై రూపాయలు.` | `మిషములో` is gibberish |
| I started a new job last month. | `తివారం నెలనాడు...` | `గత నెలలో...` | `తివారం` is corrupted |
| Please open your mouth. | `చిన్ బిగువుండి.` | `నోరు తెరవండి.` | Complete gibberish |
| You are welcome! | `మళ్ళీ కలుదాం!` | `మీకు స్వాగతం!` | Wrong phrase entirely |

---

### 2.4 Tamil — `src/data/lessons/tamil.ts`

#### Category: Household Items (CRITICAL — Mostly Corrupted)
| English | Current (Wrong) | Should Be |
|---------|-----------------|-----------|
| Table | `மசு` | `மேசை` (mesai) |
| Chair | `நாசகாலி` | `நாற்காலி` (nārkāli) |
| Pillow | `த஻ாமோட` | `தலையணை` (talaiyaṇai) |
| Blanket | `போரை` | `போர்வை` (pōrvai) |
| Soap | `சவர` | `சோப்பு` (sōppu) |
| Toothbrush | `பலி துரந்` | `பல் துலக்கும் துணி` |
| Bucket | `சஎம்` | `வாளி` (vāḷi) |
| Broom | `துடாப்` | `துடைப்பம்` (tūṭaippam) |
| Plate | `தட்` | `தட்டு` (taṭṭu) |
| Knife | `கத்ி` | `கத்தி` (katti) |
| Kettle | `பாநயோம்` | `பானை` (pāṉai) |
| Pan | `வெண்ணாலி` | `வாணலி` (vāṇali) |
| Lamp | `விழக்கு` | `விளக்கு` (viḷakku) |

#### Wrong Translations
| English | Current | Should Be | Issue |
|---------|---------|-----------|-------|
| Paternal grandfather | `பாட்டி` | `தாத்தா` | `பாட்டி` = grandmother |
| Hot (weather) | `காற்று` | `வெப்பம்` | `காற்று` = wind |
| Midnight | Pronunciation `Nadunisi` | `Nalliravu` | `Nadunisi` = midday nap |
| Fly (insect) | `பற` | `ஈ` (ee) | Incomplete verb root |
| Mug | `கிண்ணம்` | `குவளை` | `கிண்ணம்` = bowl |

#### Transliterated English (Instead of Native Words)
| English | Current | Should Be |
|---------|---------|-----------|
| Carrot | `காரட்` | `காரட்` (common, acceptable but noted) |
| Beans | `பீன்ஸ்` | `பீன்ஸ்` (common, acceptable but noted) |
| Glass | `கழாஸ்` | `கண்ணாடி` (kannaadi) |

---

### 2.5 Tamil — `src/data/sentences/tamil.ts`

#### English Words Embedded
| English Sentence | Native Tamil |
|------------------|--------------|
| I finished my work early. | `நான் என் வேலையை early முடித்தேன்.` |
| Can you charge my phone? | `என் தொலைபேசியை charge செய்ய முடியுமா?` |
| Send me the file via email. | `கோப்பை email மூலம் அனுப்புங்கள்.` |
| I wake up early every morning. | `நான் ஒவ்வொரு காலையும் early எழுகிறேன்.` |

#### Wrong Translations
| English | Native | Issue |
|---------|--------|-------|
| I am just looking. | `நான் வேண்டாம் பார்க்கிறேன்` | Means "I don't want, I am looking" |
| Take this medicine twice a day. | `இந்த மருந்தை நாளை இருமுறை சாப்பிடவும்` | `நாளை` = tomorrow, not "a day" |

---

### 2.6 Tamil — `src/data/dialogues/tamil.ts`

#### Severe Mistranslations
| English | Current (Wrong) | Should Be | Issue |
|---------|-----------------|-----------|-------|
| I am very well, thank you! | `நான் மிகவும் நன்றி, நன்றி!` | `நான் மிகவும் நன்றாக இருக்கிறேன், நன்றி!` | Says "I am very thanks, thanks!" |
| Here you are. Fresh from the farm! | `பச்சதையில் இருந்து வந்தது!` | `பண்ணையில் இருந்து வந்தது!` | `பச்சதையில்` is gibberish |
| Do you also have carrots? | `நீங்கள் கேரட் மாடுவீர்களா?` | `உங்களிடம் கேரட் இருக்கிறதா?` | `மாடுவீர்களா` = "Will you make?" |
| Alright, I will have one dosai and a coffee. | `ஒரு தோசை ஒன்றும் ஒரு குடிநீரும் வேண்டும்` | `ஒரு தோசையும் ஒரு காபியும் வேண்டும்` | `குடிநீர்` = drinking water |
| Sure! That will be ninety rupees. | `அதை ஒன்பது ரூபாய்` | `அது தொண்ணூறு ரூபாய்` | `ஒன்பது` = nine, not ninety |
| You are welcome! | `வரையறுக்கப் படாத!` | `நல்வரவு!` | Means **"Undefined!"** |

#### English Words in Native Text
| English | Native Tamil |
|---------|--------------|
| I would like to order something. | `நான் ஏதாவது ஒன்றை ஆர்டர் செய்ய விரும்புகிறேன்.` |
| Here is the menu. | `இதோ மெனு.` |
| Good morning doctor. | `காலை வணக்கம் டாக்டர்.` |

---

### 2.7 Hindi — `src/data/lessons/hindi.ts`

#### Wrong Translations / Transliterations
| English | Current (Wrong) | Should Be | Issue |
|---------|-----------------|-----------|-------|
| Bored | `बोर` | `उबा हुआ` / `ऊब` | Just transliterated English |
| Dawn | `तड़का` | `भोर` | `तड़का` = tempering (cooking) |
| Grey | `ग्रे` | `धूसर` / `स्लेटी` | Transliterated English |

#### Pronunciation Errors
| English | Native | Current Pronunciation | Should Be |
|---------|--------|----------------------|-----------|
| Please | `कृपया` | `Kripya` | `Kripaya` |

---

### 2.8 Hindi — `src/data/sentences/hindi.ts`

#### English Words Embedded
| English Sentence | Native Hindi |
|------------------|--------------|
| The meeting starts at ten. | `मीटिंग दस बजे शुरू होती है।` |
| Where is the train station? | `रेलवे स्टेशन कहाँ है?` |
| The bus stop is over there. | `बस स्टॉप वहाँ है।` |
| I am a software engineer. | `मैं एक सॉफ्टवेयर इंजीनियर हूँ।` |

#### Grammar Error
| English | Native | Issue |
|---------|--------|-------|
| It is very cold tonight. | `आज रात बहुत ठंडा है।` | `ठंडा` is masculine; should be `ठंडी` (feminine to agree with `रात`) |

---

### 2.9 Hindi — `src/data/dialogues/hindi.ts`

#### Pronunciation Errors
| English | Native | Current | Should Be |
|---------|--------|---------|-----------|
| How much for these tomatoes? | `कीमत कितनी` | `kiti` | `kitni` |
| It is very exciting! | `रोमांचक` | `romantic` | `romanchak` |
| I have a headache and fever... | `बुखार` | `buqhaar` | `bukhaar` |
| Let me check your temperature. | `तापमान` | `taamaan` | `taapmaan` |
| Please open your mouth. | `कृपया` | `Kritpaa` | `kripaya` |

---

## 3. Template Verification

### ✅ Gunithalu Page — CORRECT
**File:** `src/pages/GunithaluPage.tsx`

The English content in the Gunithalu template is **correct**:
- Page title adapts correctly per language: `Gunithalu` (Telugu) / `Uyir Mei` (Tamil) / `Matras` (Hindi)
- Subtitles are accurate: `గుణింతాలు — Compound Letters`, `உயிர் மெய் — Compound Letters`, `मात्राएं — Compound Letters`
- The `english` field from `AlphabetChar` is used correctly to display romanized pronunciation (`translit`)
- The `example` and `keyword` fields from alphabet data are displayed accurately
- No logic errors in compound letter generation

**Verdict:** No rewrite needed for Gunithalu template. The data it consumes (from `alphabets/*.ts`) is also correct.

### ✅ Other Verified Templates
- `AlphabetChartsPage.tsx` — English labels correct
- `FlashcardMode.tsx` — Uses `english` field correctly
- `QuizPage.tsx` — `showEnglishInAlphaQuiz` toggle works correctly
- All reusable UI components (`SpeechButton`, `SectionHeader`, etc.) — English labels correct

---

## 4. English Rewrite Roadmap

### Goal
Fix all incorrect English→Native mappings, corrupted text, embedded English words, and pronunciation errors across all three languages' data files.

### Phase 1: Telugu Data Cleanup
**Priority:** High (most complete language, most users likely)
**Files:**
- `src/data/lessons/telugu.ts`
- `src/data/sentences/telugu.ts`
- `src/data/dialogues/telugu.ts`
- `src/data/journey/telugu.ts`

**Tasks:**
1. [ ] Fix all wrong translations in `lessons/telugu.ts` (Emotions, Clothing, Household, Verbs categories)
2. [ ] Fix all wrong pronunciations
3. [ ] Remove English words embedded in native text (`rain`, `early`)
4. [ ] Fix sentence translations (`sentences/telugu.ts`)
5. [ ] Fix dialogue corrupted text and remove Arabic characters (`dialogues/telugu.ts`)
6. [ ] Verify journey data consistency against fixed lessons/sentences

**Estimated effort:** 4-6 hours

---

### Phase 2: Tamil Data Cleanup
**Priority:** Critical (worst corruption, especially Household Items)
**Files:**
- `src/data/lessons/tamil.ts`
- `src/data/sentences/tamil.ts`
- `src/data/dialogues/tamil.ts`
- `src/data/journey/tamil.ts`

**Tasks:**
1. [ ] **Completely rewrite** Household Items category in `lessons/tamil.ts` (12+ corrupted entries)
2. [ ] Fix wrong translations (Paternal grandfather, Hot, Midnight, Fly, Mug)
3. [ ] Remove English words embedded in native text (`early`, `charge`, `email`)
4. [ ] Fix sentence translations (`sentences/tamil.ts`)
5. [ ] **Completely rewrite** multiple dialogue lines (`dialogues/tamil.ts`) — especially:
   - "Undefined!" → "Welcome!"
   - "nine" → "ninety"
   - "water" → "coffee"
   - Gibberish farm text
6. [ ] Create Tamil journey data (currently empty)

**Estimated effort:** 6-8 hours

---

### Phase 3: Hindi Data Cleanup
**Priority:** Medium (fewer issues, mostly transliterations and pronunciations)
**Files:**
- `src/data/lessons/hindi.ts`
- `src/data/sentences/hindi.ts`
- `src/data/dialogues/hindi.ts`
- `src/data/journey/hindi.ts`

**Tasks:**
1. [ ] Fix transliterated English words (Bored → `उबा हुआ`, Dawn → `भोर`, Grey → `धूसर`)
2. [ ] Fix pronunciation errors (`Kripya` → `Kripaya`, `kiti` → `kitni`, etc.)
3. [ ] Remove English words embedded in native text (`मीटिंग`, `रेलवे स्टेशन`, `स्टॉप`, `सॉफ्टवेयर`)
4. [ ] Fix grammar error (`ठंडा` → `ठंडी` for feminine `रात`)
5. [ ] Create Hindi journey data (currently empty)

**Estimated effort:** 3-4 hours

---

### Phase 4: Content Consistency Audit
**Priority:** High
**Scope:** Cross-reference all data files

**Tasks:**
1. [ ] Ensure vocabulary words used in Journey match `lessons/*.ts`
2. [ ] Ensure sentences in Journey match `sentences/*.ts`
3. [ ] Ensure dialogues in Journey match `dialogues/*.ts`
4. [ ] Verify no duplicate or conflicting translations across files
5. [ ] Run `npm run build` to ensure TypeScript compiles after all changes

**Estimated effort:** 2-3 hours

---

### Phase 5: Automated Quality Checks
**Priority:** Medium
**Goal:** Prevent future mismatches

**Tasks:**
1. [ ] Create a validation script that:
   - Detects Latin characters inside native script fields
   - Flags words that look like transliterated English
   - Checks for suspiciously short native text
2. [ ] Add a pre-commit hook or CI step to run validation
3. [ ] Create a glossary of "verified correct" translations per language

**Estimated effort:** 3-4 hours

---

## 5. Quick Reference: Fix Priority Matrix

| Issue | Count | Priority | Phase |
|-------|-------|----------|-------|
| Corrupted/gibberish native text | ~15 | 🔴 P0 | Phase 2 (Tamil) |
| Wrong translations | ~25 | 🔴 P0 | Phase 1, 2, 3 |
| English words embedded | ~20 | 🟡 P1 | Phase 1, 2, 3 |
| Wrong pronunciations | ~15 | 🟡 P1 | Phase 1, 3 |
| Grammar errors | ~5 | 🟢 P2 | Phase 3 |
| Missing journey data | 2 files | 🟡 P1 | Phase 2, 3 |

---

## 6. Recommended Next Steps

1. **Start with Phase 2 (Tamil)** — It has the most severe corruption and affects user trust the most.
2. **Use native speaker verification** — For each language, have a native speaker review the corrected data.
3. **Fix in small PRs** — One file per PR to make review manageable.
4. **Add validation before merge** — Implement Phase 5 validation script early to catch new issues.

---

---

## 7. ✅ Completion Status

| Phase | File | Status | Build Verified |
|-------|------|--------|----------------|
| 1 | `src/data/lessons/telugu.ts` | ✅ Fixed | ✅ |
| 1 | `src/data/sentences/telugu.ts` | ✅ Fixed | ✅ |
| 1 | `src/data/dialogues/telugu.ts` | ✅ Fixed | ✅ |
| 2 | `src/data/lessons/tamil.ts` | ✅ Fixed | ✅ |
| 2 | `src/data/sentences/tamil.ts` | ✅ Fixed | ✅ |
| 2 | `src/data/dialogues/tamil.ts` | ✅ Fixed | ✅ |
| 3 | `src/data/lessons/hindi.ts` | ✅ Fixed | ✅ |
| 3 | `src/data/sentences/hindi.ts` | ✅ Fixed | ✅ |
| 3 | `src/data/dialogues/hindi.ts` | ✅ Fixed | ✅ |

**Total fixes applied:** 60+ incorrect translations, corrupted text entries, embedded English words, and pronunciation errors across all 3 languages.

**All builds passing:** ✅ `npm run build` successful after every file edit.

*Roadmap created: 2026-06-07*
*Fixes completed: 2026-06-07*
*Based on audit of: `src/data/lessons/*`, `src/data/sentences/*`, `src/data/dialogues/*`, `src/data/journey/*`, `src/pages/GunithaluPage.tsx`*
