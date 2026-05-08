import type { AlphabetData } from '../../types'

export const tamilAlphabets: AlphabetData = {
  vowels: {
    name: 'உயிர் எழுத்துகள் (Uyir Ezhuthukal) — Vowels',
    chars: [
      { char: 'அ', name: 'a', english: 'a' },
      { char: 'ஆ', name: 'aa', english: 'aa' },
      { char: 'இ', name: 'i', english: 'i' },
      { char: 'ஈ', name: 'ee', english: 'ee' },
      { char: 'உ', name: 'u', english: 'u' },
      { char: 'ஊ', name: 'oo', english: 'oo' },
      { char: 'எ', name: 'e', english: 'e' },
      { char: 'ஏ', name: 'ee2', english: 'ae' },
      { char: 'ஐ', name: 'ai', english: 'ai' },
      { char: 'ஒ', name: 'o', english: 'o' },
      { char: 'ஓ', name: 'oo2', english: 'oa' },
      { char: 'ஔ', name: 'au', english: 'au' },
    ]
  },
  consonants: {
    name: 'மெய் எழுத்துகள் (Mei Ezhuthukal) — Consonants',
    chars: [
      { char: 'க்', name: 'ka', english: 'k' },
      { char: 'ச்', name: 'sa', english: 's' },
      { char: 'ட்', name: 'ta', english: 't' },
      { char: 'த்', name: 'tha', english: 'th' },
      { char: 'ப்', name: 'pa', english: 'p' },
      { char: 'ஜ்', name: 'ja', english: 'j' },
      { char: 'ஞ்', name: 'na2', english: 'n~' },
      { char: 'ழ்', name: 'zha', english: 'zh' },
      { char: 'ல்', name: 'la', english: 'l' },
      { char: 'ண்', name: 'nna', english: 'N' },
      { char: 'ன்', name: 'na', english: 'n' },
      { char: 'ர்', name: 'ra', english: 'r' },
      { char: 'ற்', name: 'rra', english: 'rr' },
      { char: 'வ்', name: 'va', english: 'v' },
      { char: 'ஷ்', name: 'ssha', english: 'sh' },
      { char: 'ஸ்', name: 'sa2', english: 's2' },
      { char: 'ஹ்', name: 'ha', english: 'h' },
      { char: 'அம்', name: 'aum', english: 'aum' },
    ]
  },
  // Tamil uyir-mei vowel signs
  // Tamil is special: vowels don't use diacritical marks like Indic scripts.
  // Instead, the compound form replaces the pulli (dot) with the full vowel character.
  // We store the VOWEL characters here since Tamil compounds are consonant+vowel.
  uyirMei: {
    name: 'உயிர் மெய் எழுத்துகள் (Uyir Mei) — Compound Letters',
    chars: [
      { char: 'க', name: 'ka', english: 'ka', keyword: 'க — base form 🐦', tip: 'க் + அ = க' },
      { char: 'கா', name: 'kaa', english: 'kaa', keyword: 'கா — long aa 📄', tip: 'க் + ஆ = கா' },
      { char: 'கி', name: 'ki', english: 'ki', keyword: 'கி — short i 🦜', tip: 'க் + இ = கி' },
      { char: 'கீ', name: 'kee', english: 'kee', keyword: 'கீ — long ee 🥬', tip: 'க் + ஈ = கீ' },
      { char: 'கு', name: 'ku', english: 'ku', keyword: 'கு — short u 🐦', tip: 'க் + உ = கு' },
      { char: 'கூ', name: 'koo', english: 'koo', keyword: 'கூ — long oo 🏠', tip: 'க் + ஊ = கூ' },
      { char: 'கெ', name: 'ke', english: 'ke', keyword: 'கெ — short e 🏹', tip: 'க் + எ = கெ' },
      { char: 'கே', name: 'kae', english: 'kae', keyword: 'கே — long ae 🛡️', tip: 'க் + ஏ = கே' },
      { char: 'கை', name: 'kai', english: 'kai', keyword: 'கை — ai (hand) ✋', tip: 'க் + ஐ = கை' },
      { char: 'கொ', name: 'ko', english: 'ko', keyword: 'கொ — short o 🏳️', tip: 'க் + ஒ = கொ' },
      { char: 'கோ', name: 'koa', english: 'koa', keyword: 'கோ — long oa 🐔', tip: 'க் + ஓ = கோ' },
      { char: 'கௌ', name: 'kau', english: 'kau', keyword: 'கௌ — au 🐦', tip: 'க் + ஔ = கௌ' },
    ]
  },
  chillu: {
    name: 'சில்லு எழுத்துகள் (Chillu) — Special Letters',
    chars: [
      { char: 'ஂ', name: 'ann', english: 'an' },
      { char: 'ஃ', name: 'ah', english: 'ah' },
      { char: '்', name: 'pulli', english: 'pulli (virama)' },
    ]
  }
}

export default tamilAlphabets