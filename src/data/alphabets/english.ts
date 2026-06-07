import type { AlphabetData } from '../../types'

export const englishAlphabets: AlphabetData = {
  vowels: {
    name: 'Vowels — a e i o u',
    chars: [
      { char: 'A', name: 'ae', english: 'A as in "apple"', keyword: 'apple', emoji: '🍎', example: 'A for Apple', tip: 'Open your mouth wide for this vowel sound' },
      { char: 'E', name: 'ee', english: 'E as in "elephant"', keyword: 'elephant', emoji: '🐘', example: 'E for Elephant', tip: 'Smile a little when you say this sound' },
      { char: 'I', name: 'ai', english: 'I as in "igloo"', keyword: 'igloo', emoji: '🏠', example: 'I for Igloo', tip: 'Your mouth opens quite wide for this sound' },
      { char: 'O', name: 'oh', english: 'O as in "orange"', keyword: 'orange', emoji: '🍊', example: 'O for Orange', tip: 'Round your lips like you\'re blowing a kiss' },
      { char: 'U', name: 'yu', english: 'U as in "umbrella"', keyword: 'umbrella', emoji: '☂️', example: 'U for Umbrella', tip: 'Your jaw drops and lips open wide' },
    ]
  },
  consonants: {
    name: 'Consonants — b c d f g h j k l m n p q r s t v w x y z',
    chars: [
      { char: 'B', name: 'bee', english: 'B as in "ball"', keyword: 'ball', emoji: '⚽', example: 'B for Ball', tip: 'Press your lips together tightly, then release' },
      { char: 'C', name: 'see', english: 'C as in "cat"', keyword: 'cat', emoji: '🐱', example: 'C for Cat', tip: 'Same sound as K. C comes before e, i, o. K before a, u.' },
      { char: 'D', name: 'dee', english: 'D as in "dog"', keyword: 'dog', emoji: '🐕', example: 'D for Dog', tip: 'Touch the roof of your mouth with your tongue tip' },
      { char: 'F', name: 'ef', english: 'F as in "fish"', keyword: 'fish', emoji: '🐟', example: 'F for Fish', tip: 'Touch your top teeth with your bottom lip and blow' },
      { char: 'G', name: 'jee', english: 'G as in "gate"', keyword: 'gate', emoji: '🚪', example: 'G for Gate', tip: 'Press the back of your tongue to the roof of your mouth' },
      { char: 'H', name: 'aitch', english: 'H as in "hat"', keyword: 'hat', emoji: '🎩', example: 'H for Hat', tip: 'Open your mouth and let out a gentle breath' },
      { char: 'J', name: 'jay', english: 'J as in "jump"', keyword: 'jump', emoji: '⬆️', example: 'J for Jump', tip: 'Touch the roof of your mouth and push air out firmly' },
      { char: 'K', name: 'kay', english: 'K as in "kite"', keyword: 'kite', emoji: '🪁', example: 'K for Kite', tip: 'Press the back of your tongue to the roof of your mouth' },
      { char: 'L', name: 'el', english: 'L as in "lion"', keyword: 'lion', emoji: '🦁', example: 'L for Lion', tip: 'Touch your tongue tip to the ridge behind your top teeth' },
      { char: 'M', name: 'em', english: 'M as in "moon"', keyword: 'moon', emoji: '🌙', example: 'M for Moon', tip: 'Close your lips and hum like a bee' },
      { char: 'N', name: 'en', english: 'N as in "nest"', keyword: 'nest', emoji: '🪺', example: 'N for Nest', tip: 'Press your tongue tip to the roof of your mouth' },
      { char: 'P', name: 'pee', english: 'P as in "pen"', keyword: 'pen', emoji: '🖊️', example: 'P for Pen', tip: 'Press your lips together tightly, then push air out' },
      { char: 'Q', name: 'cue', english: 'Q as in "queen"', keyword: 'queen', emoji: '👑', example: 'Q for Queen', tip: 'Made with a K sound, then a small WOO sound' },
      { char: 'R', name: 'ar', english: 'R as in "rabbit"', keyword: 'rabbit', emoji: '🐰', example: 'R for Rabbit', tip: 'Curl your tongue up and back in your mouth' },
      { char: 'S', name: 'es', english: 'S as in "sun"', keyword: 'sun', emoji: '☀️', example: 'S for Sun', tip: 'Hold your tongue low and push air between your teeth' },
      { char: 'T', name: 'tee', english: 'T as in "tree"', keyword: 'tree', emoji: '🌳', example: 'T for Tree', tip: 'Touch your tongue tip to the ridge behind your top teeth' },
      { char: 'V', name: 'vee', english: 'V as in "van"', keyword: 'van', emoji: '🚐', example: 'V for Van', tip: 'Touch your top teeth with your bottom lip and blow' },
      { char: 'W', name: 'double-yoo', english: 'W as in "water"', keyword: 'water', emoji: '💧', example: 'W for Water', tip: 'Round your lips and say OO, then quickly change to UH' },
      { char: 'X', name: 'ex', english: 'X as in "box"', keyword: 'box', emoji: '📦', example: 'X for Box', tip: 'Two sounds combined: K + S. Say K then S fast' },
      { char: 'Y', name: 'why', english: 'Y as in "yellow"', keyword: 'yellow', emoji: '🌼', example: 'Y for Yellow', tip: 'Can say YUH or EE. Say it like you\'re greeting someone' },
      { char: 'Z', name: 'zee', english: 'Z as in "zebra"', keyword: 'zebra', emoji: '🦓', example: 'Z for Zebra', tip: 'Like S but with voice vibrating. Hold your throat while saying it' },
    ]
  },
  digraphs: {
    name: 'Digraphs — two letters, one sound',
    chars: [
      { char: 'CH', name: 'ch', english: 'CH as in "chair"', keyword: 'chair', emoji: '🪑', example: 'CH in Chair', tip: 'Two sounds: C + H. Press tongue back then release air' },
      { char: 'SH', name: 'sh', english: 'SH as in "ship"', keyword: 'ship', emoji: '🚢', example: 'SH in Ship', tip: 'Push your tongue back and blow air gently' },
      { char: 'TH', name: 'th', english: 'TH as in "thumb"', keyword: 'thumb', emoji: '👍', example: 'TH in Thumb', tip: 'Stick your tongue out between your teeth and blow' },
      { char: 'WH', name: 'w-h', english: 'WH as in "wheel"', keyword: 'wheel', emoji: '🎡', example: 'WH in Wheel', tip: 'Start with W shape then add a small breath' },
      { char: 'PH', name: 'f', english: 'PH as in "phone"', keyword: 'phone', emoji: '📱', example: 'PH in Phone', tip: 'Makes the F sound. F and PH sound exactly the same' },
      { char: 'CK', name: 'k', english: 'CK as in "duck"', keyword: 'duck', emoji: '🦆', example: 'CK in Duck', tip: 'Makes the K sound at end of syllables' },
      { char: 'NG', name: 'ng', english: 'NG as in "ring"', keyword: 'ring', emoji: '💍', example: 'NG in Ring', tip: 'Press the back of your tongue up and hum through your nose' },
      { char: 'GH', name: 'f', english: 'GH as in "laugh"', keyword: 'laugh', emoji: '😄', example: 'GH in Laugh', tip: 'Often silent at start, or makes F sound at end' },
      { char: 'WR', name: 'r', english: 'WR as in "write"', keyword: 'write', emoji: '✏️', example: 'WR in Write', tip: 'The W is silent. Say only the R part' },
      { char: 'KN', name: 'n', english: 'KN as in "knight"', keyword: 'knight', emoji: '⚔️', example: 'KN in Knight', tip: 'The K is silent. Say only the N part' },
    ]
  },
  diphthongs: {
    name: 'Diphthongs — gliding vowel sounds',
    chars: [
      { char: 'AI', name: 'ae-i', english: 'AI as in "rain"', keyword: 'rain', emoji: '🌧️', example: 'AI in Rain', tip: 'Start with A sound, glide to EE — like a falling note' },
      { char: 'AU', name: 'ah-oo', english: 'AU as in "audience"', keyword: 'audience', emoji: '🎭', example: 'AU in Audience', tip: 'Start with AH sound, glide to OO — your mouth opens then closes' },
      { char: 'EA', name: 'ee-uh', english: 'EA as in "read"', keyword: 'read', emoji: '📖', example: 'EA in Read', tip: 'Usually says EE. Start with EE, slightly open at end' },
      { char: 'EE', name: 'ee', english: 'EE as in "feet"', keyword: 'feet', emoji: '🦶', example: 'EE in Feet', tip: 'Smile wide and hold this long vowel sound' },
      { char: 'OO', name: 'oo', english: 'OO as in "moon"', keyword: 'moon', emoji: '🌙', example: 'OO in Moon', tip: 'Round your lips like you\'re blowing through a straw' },
      { char: 'OW', name: 'ow', english: 'OW as in "snow"', keyword: 'snow', emoji: '❄️', example: 'OW in Snow', tip: 'Start with the S sound, glide to OH — your jaw drops' },
      { char: 'OI', name: 'oy', english: 'OI as in "coin"', keyword: 'coin', emoji: '🪙', example: 'OI in Coin', tip: 'Start with OH, glide to EE — like a surprised sound' },
      { char: 'AW', name: 'aw', english: 'AW as in "saw"', keyword: 'saw', emoji: '🪚', example: 'AW in Saw', tip: 'Open your mouth wide and say AW — like being amazed' },
      { char: 'IE', name: 'ee-uh', english: 'IE as in "field"', keyword: 'field', emoji: '🌾', example: 'IE in Field', tip: 'Start EE and open slightly — makes a falling sound' },
      { char: 'OU', name: 'ow', english: 'OU as in "house"', keyword: 'house', emoji: '🏠', example: 'OU in House', tip: 'Start with AH, glide to OO — like looking at something big' },
    ]
  },
}