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
      // Each entry stores: vowelSign (the vowel to add), plus example compound for க்
      { char: 'அ', name: 'a_compound', english: 'a', keyword: 'க (ka) — base form 🐦', example: 'க் + அ = க' },
      { char: 'ஆ', name: 'aa_compound', english: 'aa', keyword: 'கா — long aa 📄', example: 'க் + ஆ = கா' },
      { char: 'இ', name: 'i_compound', english: 'i', keyword: 'கி — short i 🦜', example: 'க் + இ = கி' },
      { char: 'ஈ', name: 'ee_compound', english: 'ee', keyword: 'கீ — long ee 🥬', example: 'க் + ஈ = கீ' },
      { char: 'உ', name: 'u_compound', english: 'u', keyword: 'கு — short u 🐦', example: 'க் + உ = கு' },
      { char: 'ஊ', name: 'oo_compound', english: 'oo', keyword: 'கூ — long oo 🏠', example: 'க் + ஊ = கூ' },
      { char: 'எ', name: 'e_compound', english: 'e', keyword: 'கெ — short e 🏹', example: 'க் + எ = கெ' },
      { char: 'ஏ', name: 'ae_compound', english: 'ae', keyword: 'கே — long ae 🛡️', example: 'க் + ஏ = கே' },
      { char: 'ஐ', name: 'ai_compound', english: 'ai', keyword: 'கை — ai (hand) ✋', example: 'க் + ஐ = கை' },
      { char: 'ஒ', name: 'o_compound', english: 'o', keyword: 'கொ — short o 🏳️', example: 'க் + ஒ = கொ' },
      { char: 'ஓ', name: 'oa_compound', english: 'oa', keyword: 'கோ — long oa 🐔', example: 'க் + ஓ = கோ' },
      { char: 'ஔ', name: 'au_compound', english: 'au', keyword: 'கௌ — au 🐦', example: 'க் + ஔ = கௌ' },
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