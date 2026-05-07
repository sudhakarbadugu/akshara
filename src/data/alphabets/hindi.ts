import type { AlphabetData } from '../../types'

export const hindiAlphabets: AlphabetData = {
  vowels: {
    name: 'स्वर (Swar) — Vowels',
    chars: [
      { char: 'अ', name: 'a', english: 'a' },
      { char: 'आ', name: 'aa', english: 'aa' },
      { char: 'इ', name: 'i', english: 'i' },
      { char: 'ई', name: 'ee', english: 'ee' },
      { char: 'उ', name: 'u', english: 'u' },
      { char: 'ऊ', name: 'oo', english: 'oo' },
      { char: 'ए', name: 'e', english: 'e' },
      { char: 'ऐ', name: 'ai', english: 'ai' },
      { char: 'ओ', name: 'o', english: 'o' },
      { char: 'औ', name: 'au', english: 'au' },
      { char: 'अं', name: 'an', english: 'an' },
      { char: 'अः', name: 'ah', english: 'ah' },
    ]
  },
  consonants: {
    name: 'व्यंजन (Vyanjan) — Consonants',
    chars: [
      { char: 'क', name: 'ka', english: 'k' },
      { char: 'ख', name: 'kha', english: 'kh' },
      { char: 'ग', name: 'ga', english: 'g' },
      { char: 'घ', name: 'gha', english: 'gh' },
      { char: 'ङ', name: 'nga', english: 'ng' },
      { char: 'च', name: 'cha', english: 'ch' },
      { char: 'छ', name: 'chha', english: 'chh' },
      { char: 'ज', name: 'ja', english: 'j' },
      { char: 'झ', name: 'jha', english: 'jh' },
      { char: 'ञ', name: 'nya', english: 'ny' },
      { char: 'ट', name: 'ta', english: 't' },
      { char: 'ठ', name: 'tha', english: 'th' },
      { char: 'ड', name: 'da', english: 'd' },
      { char: 'ढ', name: 'dha', english: 'dh' },
      { char: 'ण', name: 'na', english: 'n' },
      { char: 'त', name: 'ta2', english: 't' },
      { char: 'थ', name: 'tha2', english: 'th' },
      { char: 'द', name: 'da2', english: 'd' },
      { char: 'ध', name: 'dha2', english: 'dh' },
      { char: 'न', name: 'na2', english: 'n' },
      { char: 'प', name: 'pa', english: 'p' },
      { char: 'फ', name: 'pha', english: 'ph' },
      { char: 'ब', name: 'ba', english: 'b' },
      { char: 'भ', name: 'bha', english: 'bh' },
      { char: 'म', name: 'ma', english: 'm' },
      { char: 'य', name: 'ya', english: 'y' },
      { char: 'र', name: 'ra', english: 'r' },
      { char: 'ल', name: 'la', english: 'l' },
      { char: 'व', name: 'va', english: 'v' },
      { char: 'श', name: 'sha', english: 'sh' },
      { char: 'ष', name: 'ssa', english: 'ss' },
      { char: 'स', name: 'sa', english: 's' },
      { char: 'ह', name: 'ha', english: 'h' },
      { char: 'क्ष', name: 'ksha', english: 'ksh' },
      { char: 'त्र', name: 'tra', english: 'tr' },
      { char: 'ज्ञ', name: 'gya', english: 'gy' },
    ]
  },
  gunihalu: {
    name: 'मात्राएं (Matras) — Vowel Signs',
    chars: [
      { char: 'ा', name: 'aa_matra', english: 'aa sign', example: 'क + ा = का', keyword: 'कागज़ (kāgaz) - paper 📄' },
      { char: 'ि', name: 'i_matra', english: 'i sign', example: 'क + ि = कि', keyword: 'किरण (kiraṇ) - ray ☀️' },
      { char: 'ी', name: 'ee_matra', english: 'ee sign', example: 'क + ी = की', keyword: 'कीर्ति (kīrti) - fame ⭐' },
      { char: 'ु', name: 'u_matra', english: 'u sign', example: 'क + ु = कु', keyword: 'कुत्ता (kuttā) - dog 🐕' },
      { char: 'ू', name: 'oo_matra', english: 'oo sign', example: 'क + ू = कू', keyword: 'कूदना (kūdnā) - jump 🦘' },
      { char: 'े', name: 'e_matra', english: 'e sign', example: 'क + े = के', keyword: 'केला (kelā) - banana 🍌' },
      { char: 'ै', name: 'ai_matra', english: 'ai sign', example: 'क + ै = कै', keyword: 'कैद (kaid) - prison 🔒' },
      { char: 'ो', name: 'o_matra', english: 'o sign', example: 'क + ो = को', keyword: 'कोयल (koyal) - cuckoo 🐦' },
      { char: 'ौ', name: 'au_matra', english: 'au sign', example: 'क + ौ = कौ', keyword: 'कौशल (kaushal) - skill 🎯' },
      { char: 'ं', name: 'an_matra', english: 'anusvār', example: 'क + ं = कं', keyword: 'कंघी (kaṅghī) - comb 🪮' },
      { char: 'ः', name: 'ah_matra', english: 'visarga', example: 'क + ः = कः', keyword: 'विसर्ग (visarg) - breath 🌬️' },
    ]
  }
}

export default hindiAlphabets
