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
    <div className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[80px] min-h-[80px] m-1"
         style={{ background: darkMode ? 'rgba(30,41,59,0.6)' : 'rgba(241,245,249,0.8)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)'}` }}>
      <span className="text-3xl font-bold leading-none" style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>{char}</span>
      <span className={`text-xs mt-1 font-medium`} style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{english}</span>
    </div>
  )
}

function AlphabetChart({ type, darkMode }: { type: 'vowels' | 'consonants'; darkMode: boolean }) {
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const alphabets = getAlphabets(currentLanguage)
  const group = alphabets[type]
  const chars = group?.chars || []
  
  // Use CSS Grid instead of flex rows
  const cols = type === 'vowels' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'

  return (
    <div className="w-full rounded-xl overflow-hidden border p-4" style={{ borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)', background: darkMode ? '#0f172a' : '#ffffff' }}>
      {/* Header */}
      <div className="px-4 py-3 mb-4 rounded-lg" style={{ background: darkMode ? '#1e293b' : '#f1f5f9' }}>
        <span className="font-bold text-base" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>{group?.name}</span>
        <span className="text-sm ml-2" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>({chars.length} letters)</span>
      </div>
      {/* Grid */}
      <div className={`grid ${cols} gap-3`}>
        {chars.map((c, i) => (
          <AlphabetCell key={`${type}-${c.char}-${i}`} char={c.char} english={c.english} darkMode={darkMode} />
        ))}
      </div>
    </div>
  )
}

function GunithaluMatrix({ darkMode }: { darkMode: boolean }) {
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const alphabets = getAlphabets(currentLanguage)
  const consonants = alphabets.consonants?.chars || []
  const gunihalu = alphabets.gunihalu || alphabets.uyirMei
  const vowelModifiers = gunihalu?.chars || []

  // For Tamil, show the compound (e.g., கா) in the header instead of just the vowel
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

  // For Tamil, use க் as model consonant to show compound examples in header
  const modelConsonant = consonants[0]?.char || 'க்'

  return (
    <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)', background: darkMode ? '#0f172a' : '#ffffff' }}>
      <div className="px-4 py-3" style={{ background: darkMode ? '#1e293b' : '#f1f5f9' }}>
        <span className="font-bold text-base" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>
          {gunihalu?.name}
        </span>
        <span className="text-sm ml-2" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>
          ({consonants.length} consonants × {displayVowels.length} vowels = {consonants.length * displayVowels.length} combos)
        </span>
      </div>
      
      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header row with vowels */}
          <thead>
            <tr>
              <th className="p-3 text-center sticky left-0 z-10"
                  style={{ background: '#0f172a', minWidth: '70px', borderBottom: `1px solid ${darkMode ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.2)'}` }}>
                <span className="text-xs font-bold text-amber-400">Consonant</span>
              </th>
              {displayVowels.map((vm, i) => {
                // For Tamil, show the compound example in header (e.g., கா) instead of just the vowel (ஆ)
                const headerCompound = currentLanguage === 'tamil' ? getCompound(modelConsonant, vm.char) : vm.char
                return (
                  <th key={`header-${vm.char}-${i}`} className="p-3 text-center"
                      style={{ background: '#1e3a5f', minWidth: '70px', borderBottom: `1px solid ${darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)'}` }}>
                    <span className="text-lg font-bold text-white">{headerCompound}</span>
                    <span className="text-xs block text-slate-300">{vm.english.replace(/[()]/g, '')}</span>
                  </th>
                )
              })}
            </tr>
          </thead>
          {/* Body rows */}
          <tbody>
            {consonants.map((con, ci) => (
              <tr key={`row-${con.char}-${ci}`} style={{ background: ROW_COLORS[ci % ROW_COLORS.length] }}>
                <td className="p-3 text-center sticky left-0 z-10" 
                    style={{ background: ROW_COLORS[ci % ROW_COLORS.length], minWidth: '70px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
                  <span className="text-xl font-bold text-white">{con.char}</span>
                  <span className="text-xs block text-slate-300">{con.english}</span>
                </td>
                {displayVowels.map((vm, vi) => (
                  <td key={`cell-${ci}-${vi}`} className="p-3 text-center" 
                      style={{ minWidth: '70px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
                    <span className="text-xl font-bold text-white">{getCompound(con.char, vm.char)}</span>
                    <span className="text-xs block text-slate-300">
                      {con.english.replace(/[0-9]/g, '')}{vm.english.replace(/ sign/g, '').replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '')}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
        subtitle="Complete alphabet with English pronunciation"
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
