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
      { char: 'ऋ', name: 'ri', english: 'ri' },
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
      // Ka-varga (क वर्ग)
      { char: 'क', name: 'ka', english: 'k' },
      { char: 'ख', name: 'kha', english: 'kh' },
      { char: 'ग', name: 'ga', english: 'g' },
      { char: 'घ', name: 'gha', english: 'gh' },
      { char: 'ङ', name: 'nga', english: 'ṅ' },
      // Cha-varga (च वर्ग)
      { char: 'च', name: 'cha', english: 'ch' },
      { char: 'छ', name: 'chha', english: 'chh' },
      { char: 'ज', name: 'ja', english: 'j' },
      { char: 'झ', name: 'jha', english: 'jh' },
      { char: 'ञ', name: 'nya', english: 'ñ' },
      // Ta-varga (ट वर्ग — retroflex)
      { char: 'ट', name: 'tta', english: 'ṭ' },
      { char: 'ठ', name: 'ttha', english: 'ṭh' },
      { char: 'ड', name: 'dda', english: 'ḍ' },
      { char: 'ढ', name: 'ddha', english: 'ḍh' },
      { char: 'ण', name: 'nna', english: 'ṇ' },
      // Ta-varga (त वर्ग — dental)
      { char: 'त', name: 'ta', english: 't' },
      { char: 'थ', name: 'tha', english: 'th' },
      { char: 'द', name: 'da', english: 'd' },
      { char: 'ध', name: 'dha', english: 'dh' },
      { char: 'न', name: 'na', english: 'n' },
      // Pa-varga (प वर्ग)
      { char: 'प', name: 'pa', english: 'p' },
      { char: 'फ', name: 'pha', english: 'ph' },
      { char: 'ब', name: 'ba', english: 'b' },
      { char: 'भ', name: 'bha', english: 'bh' },
      { char: 'म', name: 'ma', english: 'm' },
      // Semi-vowels (अन्तःस्थ)
      { char: 'य', name: 'ya', english: 'y' },
      { char: 'र', name: 'ra', english: 'r' },
      { char: 'ल', name: 'la', english: 'l' },
      { char: 'व', name: 'va', english: 'v' },
      // Sibilants (उष्म)
      { char: 'श', name: 'sha', english: 'ś' },
      { char: 'ष', name: 'ssa', english: 'ṣ' },
      { char: 'स', name: 'sa', english: 's' },
      // Aspirant
      { char: 'ह', name: 'ha', english: 'h' },
      // Conjuncts (संयुक्ताक्षर)
      { char: 'क्ष', name: 'ksha', english: 'kṣ' },
      { char: 'त्र', name: 'tra', english: 'tr' },
      { char: 'ज्ञ', name: 'gya', english: 'jñ' },
      { char: 'श्र', name: 'shra', english: 'śr' },
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
      { char: 'ृ', name: 'ri_matra', english: 'ri sign', example: 'क + ृ = कृ', keyword: 'कृपा (kṛpā) - grace 🙏' },
      { char: 'े', name: 'e_matra', english: 'e sign', example: 'क + े = के', keyword: 'केला (kelā) - banana 🍌' },
      { char: 'ै', name: 'ai_matra', english: 'ai sign', example: 'क + ै = कै', keyword: 'कैद (kaid) - prison 🔒' },
      { char: 'ो', name: 'o_matra', english: 'o sign', example: 'क + ो = को', keyword: 'कोयल (koyal) - cuckoo 🐦' },
      { char: 'ौ', name: 'au_matra', english: 'au sign', example: 'क + ौ = कौ', keyword: 'कौशल (kaushal) - skill 🎯' },
      { char: 'ं', name: 'an_matra', english: 'anusvār', example: 'क + ं = कं', keyword: 'कंघी (kaṅghī) - comb 🪮' },
      { char: 'ः', name: 'ah_matra', english: 'visarga', example: 'क + ः = कः', keyword: 'विसर्ग (visarg) - breath 🌬️' },
      { char: 'ँ', name: 'chandrabindu', english: 'candrabindu', example: 'क + ँ = कँ', keyword: 'अँगूर (aṅgūr) - grape 🍇' },
    ]
  }
}

export default hindiAlphabets