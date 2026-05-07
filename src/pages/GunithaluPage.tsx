import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SpeechButton } from '../components/SpeechButton'
import { useSounds } from '../hooks/useSounds'
import { useMascot } from '../hooks/useMascot'
import { LANGUAGES } from '../i18n/languages'
import type { AlphabetChar } from '../types'

interface ComboItem {
  compound: string
  consonant: string
  vowelSign: string
  translit: string
  example?: string
  keyword?: string
}

// Build combos for Telugu/Hindi: consonant + vowel sign
function buildCombosIndic(consonant: string, vowelModifiers: AlphabetChar[]): ComboItem[] {
  return vowelModifiers.map(vm => {
    const compound = consonant + vm.char
    return {
      compound,
      consonant,
      vowelSign: vm.char,
      translit: vm.english.replace(' sign', '').replace(' (anusvār)', '').replace(' (visarga)', ''),
      example: vm.example?.replace('क', consonant),
      keyword: vm.keyword?.replace('क', consonant),
    }
  })
}

// Build combos for Tamil: consonant (with pulli) + vowel = compound (pulli removed)
// Tamil compounds are NOT simple concatenation: க் + அ = க (not க்அ)
function buildCombosTamil(consonant: string, vowelModifiers: AlphabetChar[]): ComboItem[] {
  // Tamil consonants have pulli (்). We need to remove pulli and add vowel.
  // The vowelModifiers.char contains the FULL vowel (அ, ஆ, இ, etc.)
  // For Tamil, we need a mapping table since compounds are irregular
  const consonantBase = consonant.replace('்', '') // Remove pulli: க் → க
  
  return vowelModifiers.map(vm => {
    // For Tamil, we use a special mapping based on the consonant base
    // The compound is stored in a lookup or computed via rules
    // For simplicity, we'll use the example from the data if available
    // Otherwise fall back to concatenation (won't be perfect but works for demo)
    let compound: string
    
    // Tamil compound formation rules (simplified):
    // க் + அ = க, க் + ஆ = கா, க் + இ = கி, etc.
    // The vowel sign REPLACES the pulli
    if (vm.char === 'அ') {
      compound = consonantBase // க் + அ = க
    } else if (vm.char === 'ஆ') {
      compound = consonantBase + 'ா' // க் + ஆ = கா
    } else if (vm.char === 'இ') {
      compound = consonantBase + 'ி' // க் + இ = கி
    } else if (vm.char === 'ஈ') {
      compound = consonantBase + 'ீ' // க் + ஈ = கீ
    } else if (vm.char === 'உ') {
      compound = consonantBase + 'ு' // க் + உ = கு
    } else if (vm.char === 'ஊ') {
      compound = consonantBase + 'ூ' // க் + ஊ = கூ
    } else if (vm.char === 'எ') {
      compound = consonantBase + 'ெ' // க் + எ = கெ
    } else if (vm.char === 'ஏ') {
      compound = consonantBase + 'ே' // க் + ஏ = கே
    } else if (vm.char === 'ஐ') {
      compound = consonantBase + 'ை' // க் + ஐ = கை
    } else if (vm.char === 'ஒ') {
      compound = consonantBase + 'ொ' // க் + ஒ = கொ
    } else if (vm.char === 'ஓ') {
      compound = consonantBase + 'ோ' // க் + ஓ = கோ
    } else if (vm.char === 'ஔ') {
      compound = consonantBase + 'ௌ' // க் + ஔ = கௌ
    } else {
      compound = consonantBase + vm.char // Fallback
    }
    
    return {
      compound,
      consonant,
      vowelSign: vm.char,
      translit: vm.english.replace('_compound', ''),
      example: vm.example?.replace('க்', consonant).replace('க', consonantBase),
      keyword: vm.keyword?.replace('க', consonantBase),
    }
  })
}

export function GunithaluPage() {
  const sounds = useSounds()
  const mascot = useMascot()

  const darkMode = useAppStore(s => s.darkMode)
  const addXp = useAppStore(s => s.addXp)
  const learnedGunithalu = useAppStore(s => s.learnedGunithalu)
  const markGunithaluLearned = useAppStore(s => s.markGunithaluLearned)
  const currentLanguage = useAppStore(s => s.currentLanguage)

  const alphabets = getAlphabets(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]

  // Get consonants and gunihalu/vowel modifiers
  const consonantGroup = alphabets.consonants
  const gunihaluGroup = alphabets.gunihalu || alphabets.uyirMei

  const consonants = consonantGroup?.chars || []
  const vowelModifiers = gunihaluGroup?.chars || []

  // Use consonant CHAR (not index) as the key to avoid stale data
  const [selectedConsonantChar, setSelectedConsonantChar] = useState<string>(consonants[0]?.char || '')
  const [showBreakdown, setShowBreakdown] = useState<string | null>(null)

  // Convert learnedGunithalu array to Set for O(1) lookup
  const learnedSet = new Set(learnedGunithalu)

  // Find the selected consonant object by char
  const selectedConsonant = consonants.find(c => c.char === selectedConsonantChar)

  // Build combos using the CURRENT selected consonant
  const combos = useMemo(() => {
    if (!selectedConsonant) return []
    
    // Tamil needs special handling
    if (currentLanguage === 'tamil') {
      return buildCombosTamil(selectedConsonant.char, vowelModifiers)
    }
    // Telugu and Hindi use standard concatenation
    return buildCombosIndic(selectedConsonant.char, vowelModifiers)
  }, [selectedConsonant, vowelModifiers, currentLanguage])

  const selectedConsonantIdx = consonants.findIndex(c => c.char === selectedConsonantChar)

  // Reset learned state when language changes
  useEffect(() => {
    if (consonants.length > 0) {
      setSelectedConsonantChar(consonants[0].char)
    }
  }, [currentLanguage, consonants.length])

  const handleMarkLearned = (compound: string) => {
    if (!learnedSet.has(compound)) {
      markGunithaluLearned(compound)
      sounds.playCorrect()
      mascot.celebrate()
    }
  }

  const handleSelectConsonant = (char: string) => {
    setSelectedConsonantChar(char)
    setShowBreakdown(null)
    sounds.playClick()
  }

  const handlePrev = () => {
    const idx = consonants.findIndex(c => c.char === selectedConsonantChar)
    const prev = consonants[Math.max(0, idx - 1)]
    if (prev) handleSelectConsonant(prev.char)
  }

  const handleNext = () => {
    const idx = consonants.findIndex(c => c.char === selectedConsonantChar)
    const next = consonants[Math.min(consonants.length - 1, idx + 1)]
    if (next) handleSelectConsonant(next.char)
  }

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'

  const pageTitle = currentLanguage === 'telugu' ? 'Gunithalu'
    : currentLanguage === 'tamil' ? 'Uyir Mei'
    : 'Matras'
  const pageSubtitle = currentLanguage === 'telugu' ? 'గుణింతాలు — Compound Letters'
    : currentLanguage === 'tamil' ? 'உயிர் மெய் — Compound Letters'
    : 'मात्राएं — Compound Letters'

  const totalCombos = consonants.length * vowelModifiers.length
  const learnedCount = Array.from(learnedSet).filter(c => 
    consonants.some(con => c.startsWith(con.char + '_'))
  ).length
  const progressPct = totalCombos > 0 ? Math.round((learnedCount / totalCombos) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader title={pageTitle} subtitle={pageSubtitle} icon="🔣" darkMode={darkMode} />

      {/* Progress bar */}
      <div className="rounded-xl p-3 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: textSecondary }}>Learned: {learnedCount} / {totalCombos}</span>
          <span className="font-bold text-indigo-400">{progressPct}%</span>
        </div>
        <div className="h-2 bg-slate-700/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }}
            animate={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Consonant selector */}
      <div className="rounded-xl p-3 border" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
        <div className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
          {consonants.length} Consonants — Click to see combinations
        </div>
        <div className="flex flex-wrap gap-1.5">
          {consonants.map((c) => (
            <motion.button
              key={c.char}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelectConsonant(c.char)}
              aria-label={`Select consonant ${c.char}`}
              className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center border transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedConsonantChar === c.char
                  ? 'bg-indigo-500 text-white border-indigo-400 ring-2 ring-indigo-400/50'
                  : darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-400/40'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
              }`}
            >{c.char}</motion.button>
          ))}
        </div>
      </div>

      {/* Selected consonant info */}
      {selectedConsonant && (
        <div className="rounded-xl p-4 border text-center" style={{ background: bgCard, borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
          <div className="text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider">Selected Consonant</div>
          <div
            className="text-5xl font-black mb-1"
            style={{ fontFamily: `"Noto Sans ${langConfig.name}", serif`, color: '#fbbf24' }}
          >{selectedConsonant.char}</div>
          <div className="text-sm font-bold text-indigo-300">{selectedConsonant.english}</div>
          <div className="text-xs" style={{ color: textSecondary }}>Sound: "{selectedConsonant.name}"</div>
        </div>
      )}

      {/* Combinations grid */}
      {selectedConsonant && (
        <>
          <div className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
            {selectedConsonant.char} + {vowelModifiers.length} vowel signs = {vowelModifiers.length} compounds
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {combos.map((combo, i) => {
              const compoundKey = `${selectedConsonant.char}_${combo.vowelSign}_${i}`
              const isLearned = learnedSet.has(compoundKey)
              return (
                <motion.div
                  key={`${selectedConsonant.char}_${combo.vowelSign}_${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  className={`rounded-xl p-2.5 border transition-all min-h-[120px] flex flex-col ${
                    isLearned
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : darkMode
                      ? 'border-slate-700 bg-slate-800/60 hover:border-indigo-400/40'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className="font-black"
                      style={{
                        fontFamily: `"Noto Sans ${langConfig.name}", serif`,
                        fontSize: '1.4rem',
                        color: '#fbbf24',
                        lineHeight: '1.1',
                        wordBreak: 'break-word',
                        maxWidth: '70%',
                      }}
                    >
                      {combo.compound}
                    </span>
                    <div className="flex-shrink-0 ml-1">
                      <SpeechButton text={combo.compound} lang={langConfig.voiceLang} size="sm" />
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-indigo-300 leading-tight line-clamp-1">{combo.translit}</div>
                  <div className="text-[9px] text-slate-400 leading-tight line-clamp-1">{combo.vowelSign}</div>

                  {/* Breakdown */}
                  <AnimatePresence>
                    {showBreakdown === `${selectedConsonant.char}_${i}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 pt-1 border-t border-slate-700/50"
                      >
                        <div className="text-[9px] text-amber-400 font-bold text-center">
                          {combo.consonant} + {combo.vowelSign} = {combo.compound}
                        </div>
                        {combo.example && <div className="text-[8px] text-slate-400 text-center">{combo.example}</div>}
                        {combo.keyword && <div className="text-[8px] text-slate-400 text-center">{combo.keyword}</div>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto pt-1 flex items-center justify-between">
                    <button
                      onClick={() => setShowBreakdown(showBreakdown === `${selectedConsonant.char}_${i}` ? null : `${selectedConsonant.char}_${i}`)}
                      className="text-[8px] text-amber-400 hover:text-amber-300 font-bold"
                    >{showBreakdown === `${selectedConsonant.char}_${i}` ? 'Hide' : 'Show'} 🔍</button>
                    {!isLearned && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMarkLearned(compoundKey)}
                        className="py-1 px-2 rounded-lg text-[9px] font-bold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                      >✓ Done</motion.button>
                    )}
                    {isLearned && <div className="text-[9px] font-bold text-emerald-400">✓</div>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handlePrev}
          disabled={selectedConsonantIdx <= 0}
          aria-label="Previous consonant"
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-sm disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >← Prev</button>
        <div className="flex items-center text-sm px-4 py-2 rounded-xl bg-slate-800/50" style={{ color: textSecondary }}>
          {selectedConsonantIdx + 1} / {consonants.length}
        </div>
        <button
          onClick={handleNext}
          disabled={selectedConsonantIdx >= consonants.length - 1}
          aria-label="Next consonant"
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-sm disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >Next →</button>
      </div>
    </div>
  )
}

export default GunithaluPage