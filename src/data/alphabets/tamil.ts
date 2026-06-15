import type { AlphabetData } from '../../types'

export const tamilAlphabets: AlphabetData = {
  vowels: {
    name: 'உயிர் எழுத்துகள் (Uyir Ezhuthukal) — Vowels',
    chars: [
      { char: 'அ', name: 'a', english: 'a', example: 'அணில்', exampleTamil: 'Anil', emoji: '🐿️' },
      { char: 'ஆ', name: 'aa', english: 'aa', example: 'ஆடு', exampleTamil: 'Aadu', emoji: '🐐' },
      { char: 'இ', name: 'i', english: 'i', example: 'இலை', exampleTamil: 'Ilai', emoji: '🍃' },
      { char: 'ஈ', name: 'ee', english: 'ee', example: 'ஈ', exampleTamil: 'Ee', emoji: '🪰' },
      { char: 'உ', name: 'u', english: 'u', example: 'உடம்பு', exampleTamil: 'Udambu', emoji: '🧍' },
      { char: 'ஊ', name: 'oo', english: 'oo', example: 'ஊசி', exampleTamil: 'Oosi', emoji: '🪡' },
      { char: 'எ', name: 'e', english: 'e', example: 'எலி', exampleTamil: 'Eli', emoji: '🐭' },
      { char: 'ஏ', name: 'ae', english: 'ae', example: 'ஏணி', exampleTamil: 'Aeni', emoji: '🪜' },
      { char: 'ஐ', name: 'ai', english: 'ai', example: 'ஐந்து', exampleTamil: 'Aindhu', emoji: '5️⃣' },
      { char: 'ஒ', name: 'o', english: 'o', example: 'ஒட்டகம்', exampleTamil: 'Ottagam', emoji: '🐫' },
      { char: 'ஓ', name: 'oa', english: 'oa', example: 'ஓடு', exampleTamil: 'Odu', emoji: '🦪' },
      { char: 'ஔ', name: 'au', english: 'au', example: 'ஔவை', exampleTamil: 'Auvai', emoji: '📚' },
    ]
  },
  consonants: {
    name: 'மெய் எழுத்துகள் (Mei Ezhuthukal) — Consonants',
    chars: [
      { char: 'க்', name: 'k', english: 'k', example: 'காகம்', exampleTamil: 'Kaagam', emoji: '🐦‍⬛' },
      { char: 'ங்', name: 'ng', english: 'ng', example: 'ஆங்கிலம்', exampleTamil: 'Aangilam', emoji: '🔤' },
      { char: 'ச்', name: 's', english: 's', example: 'சிறகு', exampleTamil: 'Siragu', emoji: '🪶' },
      { char: 'ஞ்', name: 'nj', english: 'nj', example: 'ஞாயிறு', exampleTamil: 'Naayinaru', emoji: '☀️' },
      { char: 'ட்', name: 't', english: 't', example: 'டயர்', exampleTamil: 'Tayar', emoji: '🛞' },
      { char: 'ண்', name: 'N', english: 'N', example: 'வண்டி', exampleTamil: 'Vandi', emoji: '🛺' },
      { char: 'த்', name: 'th', english: 'th', example: 'தேள்', exampleTamil: 'Thel', emoji: '🦂' },
      { char: 'ந்', name: 'n', english: 'n', example: 'நாய்', exampleTamil: 'Naai', emoji: '🐕' },
      { char: 'ப்', name: 'p', english: 'p', example: 'பாம்பு', exampleTamil: 'Paambu', emoji: '🐍' },
      { char: 'ம்', name: 'm', english: 'm', example: 'மரம்', exampleTamil: 'Maram', emoji: '🌳' },
      { char: 'ய்', name: 'y', english: 'y', example: 'யானை', exampleTamil: 'Yaanai', emoji: '🐘' },
      { char: 'ர்', name: 'r', english: 'r', example: 'ரயில்', exampleTamil: 'Rail', emoji: '🚂' },
      { char: 'ல்', name: 'l', english: 'l', example: 'லாரி', exampleTamil: 'Laari', emoji: '🚚' },
      { char: 'வ்', name: 'v', english: 'v', example: 'வாத்து', exampleTamil: 'Vaathu', emoji: '🦆' },
      { char: 'ழ்', name: 'zh', english: 'zh', example: 'கழு', exampleTamil: 'Kalhu', emoji: '🪵' },
      { char: 'ள்', name: 'L', english: 'L', example: 'பள்ளி', exampleTamil: 'Palli', emoji: '🏫' },
      { char: 'ற்', name: 'rr', english: 'rr', example: 'நெற்றி', exampleTamil: 'Netri', emoji: '🟰' },
      { char: 'ன்', name: 'nn', english: 'nn', example: 'மான்', exampleTamil: 'Maan', emoji: '🦌' },
    ]
  },
  uyirMei: {
    name: 'உயிர் மெய் எழுத்துகள் (Uyir Mei) — Compound Letters',
    chars: [
      { char: 'அ', name: 'base', english: 'base', keyword: 'க — base form', tip: 'க் + அ = க', example: 'கல்', exampleTamil: 'Kal', emoji: '🪨' },
      { char: 'ஆ', name: 'aa', english: 'aa (ா)', keyword: 'கா — long aa', tip: 'க் + ஆ = கா', example: 'காகம்', exampleTamil: 'Kaagam', emoji: '🐦‍⬛' },
      { char: 'இ', name: 'i', english: 'i (ி)', keyword: 'கி — short i', tip: 'க் + இ = கி', example: 'கிளி', exampleTamil: 'Kili', emoji: '🦜' },
      { char: 'ஈ', name: 'ee', english: 'ee (ீ)', keyword: 'கீ — long ee', tip: 'க் + ஈ = கீ', example: 'கீரை', exampleTamil: 'Keerai', emoji: '🥬' },
      { char: 'உ', name: 'u', english: 'u (ு)', keyword: 'கு — short u', tip: 'க் + உ = கு', example: 'குரங்கு', exampleTamil: 'Kurangu', emoji: '🐒' },
      { char: 'ஊ', name: 'oo', english: 'oo (ூ)', keyword: 'கூ — long oo', tip: 'க் + ஊ = கூ', example: 'கூடு', exampleTamil: 'Koodu', emoji: '🪺' },
      { char: 'எ', name: 'e', english: 'e (ெ)', keyword: 'கெ — short e', tip: 'க் + எ = கெ', example: 'கெண்டி', exampleTamil: 'Kendi', emoji: '🥥' },
      { char: 'ஏ', name: 'ae', english: 'ae (ே)', keyword: 'கே — long ae', tip: 'க் + ஏ = கே', example: 'கேரட்', exampleTamil: 'Keerat', emoji: '🥕' },
      { char: 'ஐ', name: 'ai', english: 'ai (ை)', keyword: 'கை — ai (hand)', tip: 'க் + ஐ = கை', example: 'கை', exampleTamil: 'Kai', emoji: '✋' },
      { char: 'ஒ', name: 'o', english: 'o (ொ)', keyword: 'கொ — short o', tip: 'க் + ஒ = கொ', example: 'கொய்யா', exampleTamil: 'Koyyaa', emoji: '🍐' },
      { char: 'ஓ', name: 'oa', english: 'oa (ோ)', keyword: 'கோ — long oa', tip: 'க் + ஓ = கோ', example: 'கோழி', exampleTamil: 'Kolhi', emoji: '🐓' },
      { char: 'ஔ', name: 'au', english: 'au (ௌ)', keyword: 'கௌ — au', tip: 'க் + ஔ = கௌ', example: 'கௌதமி', exampleTamil: 'Gaudhami', emoji: '🌿' },
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
