import type { AlphabetData } from '../../types'

export const teluguAlphabets: AlphabetData = {
  vowels: {
    name: 'అచ్చులు (Achchulu) — Vowels',
    chars: [
      { char: 'అ', name: 'a', english: 'a' },
      { char: 'ఆ', name: 'aa', english: 'aa' },
      { char: 'ఇ', name: 'i', english: 'i' },
      { char: 'ఈ', name: 'ee', english: 'ee' },
      { char: 'ఉ', name: 'u', english: 'u' },
      { char: 'ఊ', name: 'oo', english: 'oo' },
      { char: 'ఎ', name: 'e', english: 'e' },
      { char: 'ఏ', name: 'ae', english: 'ae' },
      { char: 'ఐ', name: 'ai', english: 'ai' },
      { char: 'ఒ', name: 'o', english: 'o' },
      { char: 'ఓ', name: 'oa', english: 'oa' },
      { char: 'ఔ', name: 'au', english: 'au' },
      { char: 'అం', name: 'am', english: 'am' },
      { char: 'అః', name: 'ah', english: 'ah' },
    ]
  },
  consonants: {
    name: 'హల్లులు (Hallulu) — Consonants',
    chars: [
      { char: 'క', name: 'ka', english: 'k' },
      { char: 'ఖ', name: 'kha', english: 'kh' },
      { char: 'గ', name: 'ga', english: 'g' },
      { char: 'ఘ', name: 'gha', english: 'gh' },
      { char: 'ఙ', name: 'nga', english: 'ng' },
      { char: 'చ', name: 'cha', english: 'ch' },
      { char: 'ఛ', name: 'chha', english: 'chh' },
      { char: 'జ', name: 'ja', english: 'j' },
      { char: 'ఝ', name: 'jha', english: 'jh' },
      { char: 'ఞ', name: 'nya', english: 'ny' },
      { char: 'ట', name: 'ta', english: 't' },
      { char: 'ఠ', name: 'tha', english: 'th' },
      { char: 'డ', name: 'da', english: 'd' },
      { char: 'ఢ', name: 'dha', english: 'dh' },
      { char: 'ణ', name: 'na', english: 'n' },
      { char: 'త', name: 'ta2', english: 't' },
      { char: 'థ', name: 'tha2', english: 'th' },
      { char: 'ద', name: 'da2', english: 'd' },
      { char: 'ధ', name: 'dha2', english: 'dh' },
      { char: 'న', name: 'na2', english: 'n' },
      { char: 'ప', name: 'pa', english: 'p' },
      { char: 'ఫ', name: 'pha', english: 'ph' },
      { char: 'బ', name: 'ba', english: 'b' },
      { char: 'భ', name: 'bha', english: 'bh' },
      { char: 'మ', name: 'ma', english: 'm' },
      { char: 'య', name: 'ya', english: 'y' },
      { char: 'ర', name: 'ra', english: 'r' },
      { char: 'ల', name: 'la', english: 'l' },
      { char: 'వ', name: 'va', english: 'v' },
      { char: 'శ', name: 'sha', english: 'sh' },
      { char: 'ష', name: 'ssa', english: 'ss' },
      { char: 'స', name: 'sa', english: 's' },
      { char: 'హ', name: 'ha', english: 'h' },
      { char: 'ళ', name: 'lla', english: 'll' },
      { char: 'క్ష', name: 'ksha', english: 'ksh' },
      { char: 'ఱ', name: 'rra', english: 'rr' },
    ]
  },
  // Vowel modifier signs (gunithalu) — these are the SIGNS only
  // Concatenating consonant + sign produces the compound: క + ా = కా
  gunihalu: {
    name: 'గుణింతాలు (Gunithalu) — Vowel Signs',
    chars: [
      { char: 'ా', name: 'aa_sign', english: 'aa (ా)', keyword: 'కాకి (kāki) - crow 🐦' },
      { char: 'ి', name: 'i_sign', english: 'i (ి)', keyword: 'కిరణం (kiraṇaṁ) - ray ☀️' },
      { char: 'ీ', name: 'ee_sign', english: 'ee (ీ)', keyword: 'కీర్తి (kīrti) - fame ⭐' },
      { char: 'ు', name: 'u_sign', english: 'u (ు)', keyword: 'కుక్క (kukka) - dog 🐕' },
      { char: 'ూ', name: 'oo_sign', english: 'oo (ూ)', keyword: 'కూర (kūra) - vegetable 🥬' },
      { char: 'ృ', name: 'ru_sign', english: 'ru (ృ)', keyword: 'కృషి (kr̥ṣi) - farming 🌾' },
      { char: 'ౄ', name: 'roo_sign', english: 'roo (ౄ)', keyword: 'కౄర (krūra) - cruel 😈' },
      { char: 'ె', name: 'e_sign', english: 'e (ె)', keyword: 'కెల్లి (kelli) - net 🕸️' },
      { char: 'ే', name: 'ae_sign', english: 'ae (ే)', keyword: 'కేక (kēka) - scream 📢' },
      { char: 'ై', name: 'ai_sign', english: 'ai (ై)', keyword: 'కైవారం (kaivāraṁ) - responsibility 💪' },
      { char: 'ొ', name: 'o_sign', english: 'o (ొ)', keyword: 'కొండ (koṇḍa) - hill ⛰️' },
      { char: 'ో', name: 'oa_sign', english: 'oa (ో)', keyword: 'కోడి (kōḍi) - hen 🐔' },
      { char: 'ౌ', name: 'au_sign', english: 'au (ౌ)', keyword: 'కౌగిలి (kaugili) - hug 🤗' },
      { char: 'ం', name: 'anusvara', english: 'am (ం)', keyword: 'కంచు (kañcu) - bronze 🥉' },
      { char: 'ః', name: 'visarga', english: 'ah (ః)', keyword: 'విసర్గ (visarga) - breath 🌬️' },
    ]
  }
}

export default teluguAlphabets