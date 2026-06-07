# Journey Generation Notes

## Week 1 Generation
- Generated Days 1-7 for all 4 languages (English, Tamil, Hindi, Telugu)
- All vocabulary sourced from respective lessons files
- Verified with vitest, tsc, eslint, and npm build

## Week 2 Uncertainties

### Tamil
1. **Day 8 sentence pronunciation**: "Enakku kan matrum kaadhu ullathu" - simplified structure; native speakers might use slightly different phrasing
2. **Day 9 "Belt" pronunciation**: "Iduppupattai" is a compound word; some dialects may use simpler terms
3. **Day 11 "Sunday"**: Full form "Gnaayitru kizhamai" is quite long; colloquial usage often shortens to "Gnaayiru"
4. **Day 12 "Rain falls"**: "Vaanathilirundhu vizhugiradhu" - formal written form; spoken Tamil may differ

### Hindi
1. **Day 8 sentence**: "Mere paas aankh aur kaan hai" - uses singular "hai"; plural "hain" is also acceptable
2. **Day 9 "Saree"**: "Saadi" pronunciation varies by region (some say "SaaDi" with emphasis)
3. **Day 10 "Dosa"**: While commonly used in Hindi, it's originally a South Indian word; some may use local equivalents
4. **Day 13 "Bed"**: "Palang" is traditional; modern usage often uses "Bistar" or English "Bed"

### Telugu
1. **Day 8 sentence structure**: "Naa dagara" for "I have" - alternative "Naaku ... unnayi" is also common
2. **Day 9 "Cap"**: "Kyaap" is anglicized; traditional Telugu might use "Topi" (borrowed from Hindi/Urdu)
3. **Day 11 "Sunday"**: "Aadivaaram" is standard; some dialects use "Aadiwaar"
4. **Day 14 "Sleep"**: "Nidrapo" used for consistency; "Nidra po" or "Padukonu" are alternatives

### English
1. **No uncertainties** - English content was pre-existing and verified
2. All vocabulary matches the lessons file exactly

## General Notes
- All `native` field values are copied verbatim from the source lessons files
- Pronunciations are taken directly from lessons files without modification
- Sentences are constructed to be simple and educational, prioritizing clarity over idiomatic perfection
- Revision words reference actual `native` values from earlier days in Week 2
- All files pass vitest (5 tests), tsc, eslint (0 errors), and npm build

## Verification Status
✅ vitest: 5/5 tests passing
✅ tsc: No TypeScript errors
✅ eslint: 0 errors (3 pre-existing warnings in test file)
✅ npm build: Success
