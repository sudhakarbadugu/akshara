const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = '/root/Projects/language-learning/public/images/alphabets'

const ROW_COLORS = [
  '#1a365d', '#1a4a2e', '#4a1a2e', '#3d2b1f',
  '#2d1f4a', '#1a3d3d', '#3d1a1a', '#1a3d1a',
  '#1a2a3d', '#3d2a1a', '#2a1a3d', '#1a3d2a',
]

function generateHindiHTML() {
  // Complete Hindi vowels (13)
  const vowels = [
    { char: 'अ', en: 'a' }, { char: 'आ', en: 'aa' }, { char: 'इ', en: 'i' },
    { char: 'ई', en: 'ee' }, { char: 'उ', en: 'u' }, { char: 'ऊ', en: 'oo' },
    { char: 'ऋ', en: 'ri' }, { char: 'ए', en: 'e' }, { char: 'ऐ', en: 'ai' },
    { char: 'ओ', en: 'o' }, { char: 'औ', en: 'au' }, { char: 'अं', en: 'an' },
    { char: 'अः', en: 'ah' },
  ]

  // Complete Hindi consonants (36)
  const consonants = [
    { char: 'क', en: 'ka' }, { char: 'ख', en: 'kha' }, { char: 'ग', en: 'ga' },
    { char: 'घ', en: 'gha' }, { char: 'ङ', en: 'nga' },
    { char: 'च', en: 'cha' }, { char: 'छ', en: 'chha' }, { char: 'ज', en: 'ja' },
    { char: 'झ', en: 'jha' }, { char: 'ञ', en: 'nya' },
    { char: 'ट', en: 'ta' }, { char: 'ठ', en: 'tha' }, { char: 'ड', en: 'da' },
    { char: 'ढ', en: 'dha' }, { char: 'ण', en: 'na' },
    { char: 'त', en: 'ta' }, { char: 'थ', en: 'tha' }, { char: 'द', en: 'da' },
    { char: 'ध', en: 'dha' }, { char: 'न', en: 'na' },
    { char: 'प', en: 'pa' }, { char: 'फ', en: 'pha' }, { char: 'ब', en: 'ba' },
    { char: 'भ', en: 'bha' }, { char: 'म', en: 'ma' },
    { char: 'य', en: 'ya' }, { char: 'र', en: 'ra' }, { char: 'ल', en: 'la' },
    { char: 'व', en: 'va' },
    { char: 'श', en: 'sha' }, { char: 'ष', en: 'ssa' }, { char: 'स', en: 'sa' },
    { char: 'ह', en: 'ha' },
    { char: 'क्ष', en: 'ksh' }, { char: 'त्र', en: 'tr' }, { char: 'ज्ञ', en: 'gy' },
    { char: 'श्र', en: 'shr' },
  ]

  // Complete matras (13)
  const diacritics = ['ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','ं','ः','ँ']
  const diacEn = ['aa','i','ee','u','oo','ri','e','ai','o','au','am','ah','am']

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      font-family: 'Noto Sans Devanagari', sans-serif;
      background: #f5f5f0;
    }
    .header {
      background: #2d5016;
      color: white;
      text-align: center;
      padding: 24px 10px;
    }
    .header h1 { font-size: 48px; margin-bottom: 10px; font-weight: 700; }
    .header .subtitle { font-size: 22px; opacity: 0.9; }
    .info-bar {
      display: flex;
      background: #f0ad4e;
      justify-content: space-around;
      padding: 10px 0;
      font-size: 15px;
      font-weight: 700;
      color: #333;
    }
    .chart-container { display: flex; flex-direction: column; }
    .vowel-header {
      display: flex;
      background: #1a365d;
      color: white;
      font-size: 18px;
      font-weight: 700;
    }
    .vowel-header .corner { width: 70px; background: #e0e0e0; }
    .vowel-cell {
      flex: 1;
      text-align: center;
      padding: 8px 2px;
      border-right: 1px solid rgba(255,255,255,0.1);
    }
    .vowel-cell .char { font-size: 28px; font-weight: 700; }
    .vowel-cell .en { font-size: 12px; opacity: 0.8; }
    .row {
      display: flex;
      font-size: 16px;
    }
    .consonant-label {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      background: #e0e0e0;
      color: #333;
      font-weight: 700;
      border-bottom: 1px solid #ccc;
    }
    .consonant-label .char { font-size: 26px; }
    .consonant-label .en { font-size: 11px; }
    .cell {
      flex: 1;
      text-align: center;
      padding: 6px 2px;
      color: white;
      font-weight: 700;
      border-right: 1px solid rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .cell .char { font-size: 26px; line-height: 1.2; }
    .cell .en { font-size: 11px; opacity: 0.85; margin-top: 2px; }
    .footer {
      background: #2d5016;
      color: white;
      text-align: center;
      padding: 12px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>हिंदी वर्णमाला - Hindi Alphabet Chart</h1>
    <div class="subtitle">With English Pronunciation</div>
  </div>
  <div class="info-bar">
    <span>स्वर (Vowels) - 13</span>
    <span>व्यंजन (Consonants) - 36</span>
    <span>मात्राएं (Matras) - 13</span>
  </div>
  <div class="chart-container">
    <div class="vowel-header">
      <div class="corner"></div>
      ${diacritics.slice(0,10).map((d, i) => `<div class="vowel-cell"><div class="char">${d}</div><div class="en">${diacEn[i]}</div></div>`).join('')}
    </div>
    ${consonants.map((c, ci) => {
      const bg = ROW_COLORS[ci % ROW_COLORS.length]
      return `<div class="row" style="background:${bg}">
        <div class="consonant-label"><div class="char">${c.char}</div><div class="en">${c.en}</div></div>
        ${diacritics.slice(0,10).map((d, di) => {
          const compound = c.char + d
          const en = c.en.replace(/[0-9]/g, '') + diacEn[di]
          return `<div class="cell"><div class="char">${compound}</div><div class="en">${en}</div></div>`
        }).join('')}
      </div>`
    }).join('')}
  </div>
  <div class="footer">
    Hindi Alphabet Chart · हिंदी वर्णमाला चार्ट · Educational Reference · Complete with all vowels, consonants, and matras
  </div>
</body>
</html>`

  return html
}

function generateTeluguHTML() {
  // Complete Telugu vowels (18)
  const vowels = [
    { char: 'అ', en: 'a' }, { char: 'ఆ', en: 'aa' }, { char: 'ఇ', en: 'i' },
    { char: 'ఈ', en: 'ee' }, { char: 'ఉ', en: 'u' }, { char: 'ఊ', en: 'oo' },
    { char: 'ఋ', en: 'ru' }, { char: 'ౠ', en: 'ruu' }, { char: 'ఌ', en: 'lu' },
    { char: 'ౡ', en: 'luu' }, { char: 'ఎ', en: 'e' }, { char: 'ఏ', en: 'ae' },
    { char: 'ఐ', en: 'ai' }, { char: 'ఒ', en: 'o' }, { char: 'ఓ', en: 'oa' },
    { char: 'ఔ', en: 'au' }, { char: 'అం', en: 'am' }, { char: 'అః', en: 'ah' },
  ]

  // Complete Telugu consonants (36)
  const consonants = [
    { char: 'క', en: 'ka' }, { char: 'ఖ', en: 'kha' }, { char: 'గ', en: 'ga' },
    { char: 'ఘ', en: 'gha' }, { char: 'ఙ', en: 'nga' },
    { char: 'చ', en: 'cha' }, { char: 'ఛ', en: 'chha' }, { char: 'జ', en: 'ja' },
    { char: 'ఝ', en: 'jha' }, { char: 'ఞ', en: 'nya' },
    { char: 'ట', en: 'ta' }, { char: 'ఠ', en: 'tha' }, { char: 'డ', en: 'da' },
    { char: 'ఢ', en: 'dha' }, { char: 'ణ', en: 'na' },
    { char: 'త', en: 'ta' }, { char: 'థ', en: 'tha' }, { char: 'ద', en: 'da' },
    { char: 'ధ', en: 'dha' }, { char: 'న', en: 'na' },
    { char: 'ప', en: 'pa' }, { char: 'ఫ', en: 'pha' }, { char: 'బ', en: 'ba' },
    { char: 'భ', en: 'bha' }, { char: 'మ', en: 'ma' },
    { char: 'య', en: 'ya' }, { char: 'ర', en: 'ra' }, { char: 'ఱ', en: 'rra' },
    { char: 'ల', en: 'la' }, { char: 'ళ', en: 'lla' }, { char: 'ఴ', en: 'zha' },
    { char: 'వ', en: 'va' },
    { char: 'శ', en: 'sha' }, { char: 'ష', en: 'ssa' }, { char: 'స', en: 'sa' },
    { char: 'హ', en: 'ha' },
    { char: 'క్ష', en: 'ksha' }, { char: 'జ్ఞ', en: 'gna' },
  ]

  // Complete Telugu gunithalu (17)
  const diacritics = ['ా','ి','ీ','ు','ూ','ృ','ౄ','ె','ే','ై','ొ','ో','ౌ','ౢ','ౣ','ం','ః']
  const diacEn = ['aa','i','ee','u','oo','ru','ruu','e','ae','ai','o','oa','au','lu','llu','am','ah']

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1400px;
      font-family: 'Noto Sans Telugu', sans-serif;
      background: #f5f5f0;
    }
    .header {
      background: #8B0000;
      color: white;
      text-align: center;
      padding: 24px 10px;
    }
    .header h1 { font-size: 48px; margin-bottom: 10px; font-weight: 700; }
    .header .subtitle { font-size: 22px; opacity: 0.9; }
    .info-bar {
      display: flex;
      background: #f0ad4e;
      justify-content: space-around;
      padding: 10px 0;
      font-size: 15px;
      font-weight: 700;
      color: #333;
    }
    .chart-container { display: flex; flex-direction: column; }
    .vowel-header {
      display: flex;
      background: #1a365d;
      color: white;
      font-size: 18px;
      font-weight: 700;
    }
    .vowel-header .corner { width: 70px; background: #e0e0e0; }
    .vowel-cell {
      flex: 1;
      text-align: center;
      padding: 8px 2px;
      border-right: 1px solid rgba(255,255,255,0.1);
    }
    .vowel-cell .char { font-size: 28px; font-weight: 700; }
    .vowel-cell .en { font-size: 12px; opacity: 0.8; }
    .row {
      display: flex;
      font-size: 16px;
    }
    .consonant-label {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      background: #e0e0e0;
      color: #333;
      font-weight: 700;
      border-bottom: 1px solid #ccc;
    }
    .consonant-label .char { font-size: 26px; }
    .consonant-label .en { font-size: 11px; }
    .cell {
      flex: 1;
      text-align: center;
      padding: 6px 2px;
      color: white;
      font-weight: 700;
      border-right: 1px solid rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .cell .char { font-size: 26px; line-height: 1.2; }
    .cell .en { font-size: 11px; opacity: 0.85; margin-top: 2px; }
    .footer {
      background: #8B0000;
      color: white;
      text-align: center;
      padding: 12px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>తెలుగు అక్షరమాల - Telugu Alphabet Chart</h1>
    <div class="subtitle">With English Pronunciation</div>
  </div>
  <div class="info-bar">
    <span>అచ్చులు (Vowels) - 18</span>
    <span>హల్లులు (Consonants) - 36</span>
    <span>గుణింతాలు (Gunithalu) - 17</span>
  </div>
  <div class="chart-container">
    <div class="vowel-header">
      <div class="corner"></div>
      ${diacritics.slice(0,10).map((d, i) => `<div class="vowel-cell"><div class="char">${d}</div><div class="en">${diacEn[i]}</div></div>`).join('')}
    </div>
    ${consonants.map((c, ci) => {
      const bg = ROW_COLORS[ci % ROW_COLORS.length]
      return `<div class="row" style="background:${bg}">
        <div class="consonant-label"><div class="char">${c.char}</div><div class="en">${c.en}</div></div>
        ${diacritics.slice(0,10).map((d, di) => {
          const compound = c.char + d
          const en = c.en + diacEn[di]
          return `<div class="cell"><div class="char">${compound}</div><div class="en">${en}</div></div>`
        }).join('')}
      </div>`
    }).join('')}
  </div>
  <div class="footer">
    Telugu Alphabet Chart · తెలుగు అక్షరమాల చార్ట్ · Educational Reference · Complete with all vowels, consonants, and gunithalu
  </div>
</body>
</html>`

  return html
}

async function generateImages() {
  console.log('Starting alphabet chart generation...')

  // Generate Hindi chart
  console.log('Generating Hindi chart...')
  await nodeHtmlToImage({
    output: path.join(OUTPUT_DIR, 'hindi-alphabet-chart.png'),
    html: generateHindiHTML(),
    puppeteerArgs: {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    waitUntil: 'networkidle0',
  })
  console.log('✓ Hindi chart generated')

  // Generate Telugu chart
  console.log('Generating Telugu chart...')
  await nodeHtmlToImage({
    output: path.join(OUTPUT_DIR, 'telugu-alphabet-chart.png'),
    html: generateTeluguHTML(),
    puppeteerArgs: {
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    waitUntil: 'networkidle0',
  })
  console.log('✓ Telugu chart generated')

  console.log('All charts generated!')
}

generateImages().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
