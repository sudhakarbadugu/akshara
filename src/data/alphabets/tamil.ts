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
      { char: 'ஏ', name: 'ae', english: 'ae' },
      { char: 'ஐ', name: 'ai', english: 'ai' },
      { char: 'ஒ', name: 'o', english: 'o' },
      { char: 'ஓ', name: 'oa', english: 'oa' },
      { char: 'ஔ', name: 'au', english: 'au' },
    ]
  },
  consonants: {
    name: 'மெய் எழுத்துகள் (Mei Ezhuthukal) — Consonants',
    chars: [
      { char: 'க்', name: 'k', english: 'k' },
      { char: 'ங்', name: 'ng', english: 'ng' },
      { char: 'ச்', name: 's', english: 's' },
      { char: 'ஞ்', name: 'nj', english: 'nj' },
      { char: 'ட்', name: 't', english: 't' },
      { char: 'ண்', name: 'N', english: 'N' },
      { char: 'த்', name: 'th', english: 'th' },
      { char: 'ந்', name: 'n', english: 'n' },
      { char: 'ப்', name: 'p', english: 'p' },
      { char: 'ம்', name: 'm', english: 'm' },
      { char: 'ய்', name: 'y', english: 'y' },
      { char: 'ர்', name: 'r', english: 'r' },
      { char: 'ல்', name: 'l', english: 'l' },
      { char: 'வ்', name: 'v', english: 'v' },
      { char: 'ழ்', name: 'zh', english: 'zh' },
      { char: 'ள்', name: 'L', english: 'L' },
      { char: 'ற்', name: 'rr', english: 'rr' },
      { char: 'ன்', name: 'nn', english: 'nn' },
    ]
  },
  uyirMei: {
    name: 'உயிர் மெய் எழுத்துகள் (Uyir Mei) — Compound Letters',
    chars: [
      { char: 'அ', name: 'base', english: 'base', keyword: 'க — base form', tip: 'க் + அ = க' },
      { char: 'ஆ', name: 'aa', english: 'aa (ா)', keyword: 'கா — long aa', tip: 'க் + ஆ = கா' },
      { char: 'இ', name: 'i', english: 'i (ி)', keyword: 'கி — short i', tip: 'க் + இ = கி' },
      { char: 'ஈ', name: 'ee', english: 'ee (ீ)', keyword: 'கீ — long ee', tip: 'க் + ஈ = கீ' },
      { char: 'உ', name: 'u', english: 'u (ு)', keyword: 'கு — short u', tip: 'க் + உ = கு' },
      { char: 'ஊ', name: 'oo', english: 'oo (ூ)', keyword: 'கூ — long oo', tip: 'க் + ஊ = கூ' },
      { char: 'எ', name: 'e', english: 'e (ெ)', keyword: 'கெ — short e', tip: 'க் + எ = கெ' },
      { char: 'ஏ', name: 'ae', english: 'ae (ே)', keyword: 'கே — long ae', tip: 'க் + ஏ = கே' },
      { char: 'ஐ', name: 'ai', english: 'ai (ை)', keyword: 'கை — ai (hand)', tip: 'க் + ஐ = கை' },
      { char: 'ஒ', name: 'o', english: 'o (ொ)', keyword: 'கொ — short o', tip: 'க் + ஒ = கொ' },
      { char: 'ஓ', name: 'oa', english: 'oa (ோ)', keyword: 'கோ — long oa', tip: 'க் + ஓ = கோ' },
      { char: 'ஔ', name: 'au', english: 'au (ௌ)', keyword: 'கௌ — au', tip: 'க் + ஔ = கௌ' },
    ]
  },
  chillu: {
    name: 'சிறப்பு எழுத்துகள் (Special Letters)',
    chars: [
      { char: 'ஂ', name: 'anusvara', english: 'anusvara (ஂ)' },
      { char: 'ஃ', name: 'aytham', english: 'aytham (ஃ)' },
      { char: '்', name: 'pulli', english: 'pulli (்) — virama' },
    ]
  }
}

export default tamilAlphabets
