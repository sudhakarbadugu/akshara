import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'

const ROW_COLORS = [
  '#1e3a5f', // navy
  '#1a4a2e', // forest green
  '#4a1a2e', // maroon
  '#3d2b1f', // brown
  '#2d1f4a', // dark purple
  '#1a3d3d', // teal
  '#3d1a1a', // dark red
  '#1a3d1a', // dark green
]

function AlphabetCell({ char, english, darkMode }: { char: string; english: string; darkMode: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px]">
      <span className="text-2xl font-bold text-white leading-none">{char}</span>
      <span className={`text-[10px] mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{english}</span>
    </div>
  )
}

function AlphabetRow({ chars, bgColor, darkMode }: { chars: { char: string; english: string }[]; bgColor: string; darkMode: boolean }) {
  return (
    <div className="flex" style={{ background: bgColor }}>
      {chars.map((c) => (
        <AlphabetCell key={c.char + c.english} char={c.char} english={c.english} darkMode={darkMode} />
      ))}
    </div>
  )
}

function AlphabetChart({ type, darkMode }: { type: 'vowels' | 'consonants'; darkMode: boolean }) {
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const alphabets = getAlphabets(currentLanguage)
  const group = alphabets[type]
  const chars = group?.chars || []
  const rows: { char: string; english: string }[][] = []
  for (let i = 0; i < chars.length; i += 12) {
    rows.push(chars.slice(i, i + 12))
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)' }}>
      {/* Header */}
      <div className="px-4 py-2" style={{ background: darkMode ? '#1e293b' : '#f1f5f9' }}>
        <span className="font-bold text-sm" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>{group?.name}</span>
      </div>
      {/* Grid rows */}
      {rows.map((row, i) => (
        <AlphabetRow key={i} chars={row} bgColor={ROW_COLORS[i % ROW_COLORS.length]} darkMode={darkMode} />
      ))}
    </div>
  )
}

function GunithaluMatrix({ darkMode }: { darkMode: boolean }) {
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const alphabets = getAlphabets(currentLanguage)
  const consonants = alphabets.consonants?.chars || []
  const gunihalu = alphabets.gunihalu || alphabets.uyirMei
  const vowelModifiers = gunihalu?.chars || []

  // Tamil special: consonant base + vowel diacritic
  const TAMIL_DIACRITICS: Record<string, string> = {
    'அ': '', 'ஆ': 'ா', 'இ': 'ி', 'ஈ': 'ீ', 'உ': 'ு', 'ஊ': 'ூ',
    'எ': 'ெ', 'ஏ': 'ே', 'ஐ': 'ை', 'ஒ': 'ொ', 'ஓ': 'ோ', 'ஔ': 'ௌ',
  }

  const getCompound = (consonant: string, vowelChar: string): string => {
    if (currentLanguage === 'tamil') {
      const base = consonant.replace('்', '')
      return base + (TAMIL_DIACRITICS[vowelChar] || '')
    }
    return consonant + vowelChar
  }

  // Show ALL vowel modifiers
  const displayVowels = vowelModifiers

  // Responsive cell sizing based on number of vowels
  const cellMinWidth = displayVowels.length > 12 ? '45px' : displayVowels.length > 8 ? '55px' : '65px'

  return (
    <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)' }}>
      <div className="px-4 py-2" style={{ background: darkMode ? '#1e293b' : '#f1f5f9' }}>
        <span className="font-bold text-sm" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>
          {gunihalu?.name}
        </span>
        <span className="text-xs ml-2" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
          ({consonants.length} consonants × {displayVowels.length} vowels = {consonants.length * displayVowels.length} combos)
        </span>
      </div>
      {/* Top vowel row header - scrollable horizontally */}
      <div className="overflow-x-auto w-full">
        <div className="flex" style={{ background: '#1e3a5f', minWidth: 'fit-content' }}>
          <div className="sticky left-0 z-10" style={{ minWidth: cellMinWidth, background: '#e0e0e0' }} />
          {displayVowels.map(vm => (
            <div key={vm.char} className="flex flex-col items-center justify-center p-2 text-center" style={{ minWidth: cellMinWidth, flex: '0 0 auto' }}>
              <span className="font-bold text-white" style={{ fontSize: displayVowels.length > 12 ? '15px' : '19px' }}>{vm.char}</span>
              <span className="text-slate-300" style={{ fontSize: displayVowels.length > 12 ? '8px' : '10px' }}>{vm.english}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Consonant rows - scrollable container, no height limit */}
      <div className="overflow-x-auto overflow-y-auto w-full">
        <div className="min-w-fit">
          {/* Show ALL consonants */}
          {consonants.map((con, ci) => (
            <div key={con.char} className="flex" style={{ background: ROW_COLORS[ci % ROW_COLORS.length] }}>
              <div className="sticky left-0 z-10 flex flex-col items-center justify-center p-2 text-center" style={{ minWidth: cellMinWidth, background: ROW_COLORS[ci % ROW_COLORS.length] }}>
                <span className="font-bold text-white" style={{ fontSize: displayVowels.length > 12 ? '15px' : '19px' }}>{con.char}</span>
                <span className="text-slate-300" style={{ fontSize: displayVowels.length > 12 ? '8px' : '10px' }}>{con.english}</span>
              </div>
              {displayVowels.map(vm => (
                <div key={vm.char} className="flex flex-col items-center justify-center p-2 text-center" style={{ minWidth: cellMinWidth, flex: '0 0 auto' }}>
                  <span className="font-bold text-white" style={{ fontSize: displayVowels.length > 12 ? '15px' : '19px' }}>{getCompound(con.char, vm.char)}</span>
                  <span className="text-slate-300" style={{ fontSize: displayVowels.length > 12 ? '8px' : '10px' }}>{con.english.replace(/[0-9]/g, '')}{vm.english.replace(/ sign/g, '').replace(/ /g, '')}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AlphabetChartsPage() {
  const sounds = useSounds()
  const mascot = useMascot()
  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]

  const [chartTab, setChartTab] = useState<'vowels' | 'consonants' | 'matrix'>('matrix')

  const chartTabs = [
    { key: 'matrix', label: currentLanguage === 'tamil' ? 'உயிர் மெய்' : currentLanguage === 'hindi' ? 'मात्राएं' : 'గుణింతాలు', icon: '🔗' },
    { key: 'vowels', label: 'Vowels', icon: '🔤' },
    { key: 'consonants', label: 'Consonants', icon: '🔠' },
  ] as const

  return (
    <div className="w-full space-y-4">
      <SectionHeader
        title={`${langConfig.name} Alphabet Chart`}
        subtitle="247 letters — with English pronunciation"
        icon="📋"
        darkMode={darkMode}
      />

      {/* Tab selector */}
      <div className="flex gap-2">
        {chartTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => { sounds.playClick(); setChartTab(tab.key) }}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
              chartTab === tab.key
                ? 'bg-indigo-500 text-white border-indigo-400'
                : darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-400/40'
                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {chartTab === 'vowels' && <AlphabetChart type="vowels" darkMode={darkMode} />}
      {chartTab === 'consonants' && <AlphabetChart type="consonants" darkMode={darkMode} />}
      {chartTab === 'matrix' && <GunithaluMatrix darkMode={darkMode} />}

      <div className="text-center text-xs" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
        Tap any letter to hear pronunciation · Charts show {currentLanguage === 'tamil' ? 'Uyir Mei (compound letters)' : 'Gunithalu / Matras'}
      </div>
    </div>
  )
}

export default AlphabetChartsPage
