import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { getAlphabets } from '../data/alphabets'
import { SectionHeader } from '../components/ui/SectionHeader'
import { LANGUAGES } from '../i18n/languages'
import { Layers, Copy, Grid3X3, Eye, EyeOff, Printer, Hash } from 'lucide-react'
import type { AlphabetChar, Language } from '../types'

export function HomeworkPage() {
  const darkMode = useAppStore(s => s.darkMode)
  const currentLanguage = useAppStore(s => s.currentLanguage)
  const learnedAlphabets = useAppStore(s => s.learnedAlphabets)

  const alphabets = getAlphabets(currentLanguage)
  const langConfig = LANGUAGES[currentLanguage]
  const printRef = useRef<HTMLDivElement>(null)

  const [showPrefill, setShowPrefill] = useState(true)
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [selectedGroup, setSelectedGroup] = useState<string>('vowels')
  const [practiceRows, setPracticeRows] = useState<number>(3)

  const bgCard = darkMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.9)'
  const textPrimary = darkMode ? '#f8fafc' : '#0f172a'
  const textSecondary = darkMode ? '#94a3b8' : '#475569'
  const borderColor = darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'

  const gridCellSize = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-16 h-16 text-3xl',
    large: 'w-20 h-20 text-4xl',
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-5xl mx-auto print:max-w-none">
      {/* Header - hidden on print */}
      <div className="print:hidden">
        <SectionHeader 
          title="Homework Copy" 
          subtitle={`Practice ${langConfig.name} letters`} 
          icon="📝" 
          darkMode={darkMode} 
        />

        {/* Configuration Card */}
        <div className="rounded-2xl border overflow-hidden mb-6" style={{ background: bgCard, borderColor }}>
          {/* Card Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Layers size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold" style={{ color: textPrimary }}>Worksheet Settings</h2>
                <p className="text-xs" style={{ color: textSecondary }}>Customize your practice sheet</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/25"
            >
              <Printer size={16} />
              Print / PDF
            </motion.button>
          </div>

          {/* Card Body - Grid Layout */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Group Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: textSecondary }}>
                <Copy size={14} />
                Letters Group
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(alphabets).slice(0, 3).map(([key, group]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGroup(key)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-1 min-w-[70px] ${
                      selectedGroup === key
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {group.name.split('—')[0].trim().split(' ')[0]}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGroup('all')}
                className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all mt-1 ${
                  selectedGroup === 'all'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : darkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                📚 All Letters
              </motion.button>
            </div>

            {/* Grid Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: textSecondary }}>
                <Grid3X3 size={14} />
                Cell Size
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'small', label: 'S', size: 'w-8 h-8' },
                  { value: 'medium', label: 'M', size: 'w-10 h-10' },
                  { value: 'large', label: 'L', size: 'w-12 h-12' },
                ].map(opt => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGridSize(opt.value as any)}
                    className={`rounded-lg text-sm font-bold transition-all flex items-center justify-center ${
                      gridSize === opt.value
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`border-2 rounded ${gridSize === opt.value ? 'border-white/50' : 'border-current'}`}>
                      <div className={opt.size} />
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="text-[10px]" style={{ color: textSecondary }}>
                Current: <span className="font-bold">{gridSize.charAt(0).toUpperCase() + gridSize.slice(1)}</span>
              </div>
            </div>

            {/* Tracing Guide */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: textSecondary }}>
                <Eye size={14} />
                Tracing Guide
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPrefill(true)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    showPrefill
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Eye size={16} />
                  <span>With Guide</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPrefill(false)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    !showPrefill
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <EyeOff size={16} />
                  <span>Empty</span>
                </motion.button>
              </div>
              <div className="text-[10px] text-center" style={{ color: textSecondary }}>
                {showPrefill ? '✨ Light guide for tracing' : '⬜ Blank boxes'}
              </div>
            </div>

            {/* Practice Rows */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: textSecondary }}>
                <Hash size={14} />
                Practice Rows
              </label>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPracticeRows(num)}
                    className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                      practiceRows === num
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
              <div className="text-[10px] text-center" style={{ color: textSecondary }}>
                {practiceRows} row{practiceRows > 1 ? 's' : ''} per letter
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: textSecondary }}>
              <span className="px-2 py-1 rounded-md" style={{ background: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
                📄 A4 Size
              </span>
              <span className="px-2 py-1 rounded-md" style={{ background: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)' }}>
                🖨️ Print-Friendly
              </span>
            </div>
            <div className="text-xs" style={{ color: textSecondary }}>
              💡 Use browser's "Save as PDF" to download
            </div>
          </div>
        </div>
      </div>

      {/* Homework Sheet - printable area */}
      <div
        ref={printRef}
        className="rounded-2xl border bg-white print:border-0 print:rounded-none"
        style={{ borderColor }}
      >
        {/* Print header */}
        <div className="hidden print:block mb-6 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2">{langConfig.name} Practice</h1>
          <p className="text-gray-600">
            {alphabets[selectedGroup]?.name || 'All Letters'}
            {selectedGroup !== 'all' && ` — ${alphabets[selectedGroup]?.chars.length} letters`}
          </p>
          <div className="mt-4 flex justify-center gap-8 text-sm text-gray-500">
            <span>Date: _______________</span>
            <span>Name: _______________</span>
          </div>
        </div>

        {/* Letter grids */}
        <div className="p-6 print:p-0">
          {selectedGroup === 'all' ? (
            // All letters in one big grid
            <div className="space-y-6">
              {Object.entries(alphabets).map(([key, group]) => (
                <div key={key} className="print:break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 print:text-black">
                    {group.name.split('—')[0].trim()}
                  </h3>
                  {/* Main letter grid */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {group.chars.map((char: AlphabetChar, i: number) => (
                      <div
                        key={i}
                        className={`${gridCellSize[gridSize]} rounded-lg border-2 flex items-center justify-center relative overflow-hidden print:border-gray-400`}
                        style={{ borderColor: darkMode ? '#475569' : '#cbd5e1' }}
                      >
                        {showPrefill && (
                          <span
                            className="absolute inset-0 flex items-center justify-center opacity-20 print:opacity-15"
                            style={{ 
                              fontFamily: `"Noto Sans ${langConfig.name}", serif`,
                              color: '#6366f1',
                            }}
                          >
                            {char.char}
                          </span>
                        )}
                        {!showPrefill && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full border border-dashed border-gray-300 print:border-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Practice rows for this group */}
                  <div className="space-y-2">
                    {Array.from({ length: practiceRows }).map((_, row) => (
                      <div key={row} className="flex flex-wrap gap-1">
                        {group.chars.map((char: AlphabetChar, i: number) => (
                          <div
                            key={`${row}-${i}`}
                            className={`${gridCellSize[gridSize]} rounded-lg border-2 flex items-center justify-center print:border-gray-400`}
                            style={{ borderColor: darkMode ? '#475569' : '#cbd5e1' }}
                          >
                            <div className="w-full h-full border border-dashed border-gray-300 print:border-gray-400" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single group grid
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1">
                {alphabets[selectedGroup]?.chars.map((char: AlphabetChar, i: number) => (
                  <div
                    key={i}
                    className={`${gridCellSize[gridSize]} rounded-lg border-2 flex items-center justify-center relative overflow-hidden print:border-gray-400`}
                    style={{ borderColor: darkMode ? '#475569' : '#cbd5e1' }}
                  >
                    {showPrefill && (
                      <span
                        className="absolute inset-0 flex items-center justify-center opacity-20 print:opacity-15"
                        style={{ 
                          fontFamily: `"Noto Sans ${langConfig.name}", serif`,
                          color: '#6366f1',
                        }}
                      >
                        {char.char}
                      </span>
                    )}
                    {!showPrefill && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full border border-dashed border-gray-300 print:border-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Practice rows - extra empty grids for writing practice */}
              <div className="pt-6 print:pt-4">
                <h3 className="text-sm font-bold text-gray-600 mb-3 print:text-black">
                  Practice Writing (repeat each letter {practiceRows} time{practiceRows > 1 ? 's' : ''})
                </h3>
                <div className="space-y-3">
                  {Array.from({ length: practiceRows }).map((_, row) => (
                    <div key={row} className="flex flex-wrap gap-1">
                      {alphabets[selectedGroup]?.chars.map((char: AlphabetChar, i: number) => (
                        <div
                          key={`${row}-${i}`}
                          className={`${gridCellSize[gridSize]} rounded-lg border-2 flex items-center justify-center print:border-gray-400`}
                          style={{ borderColor: darkMode ? '#475569' : '#cbd5e1' }}
                        >
                          <div className="w-full h-full border border-dashed border-gray-300 print:border-gray-400" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
          <p>Generated from Language Learning App • {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:border-0 {
            border: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }
          .print\\:text-black {
            color: #000 !important;
          }
          .print\\:opacity-15 {
            opacity: 0.15 !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  )
}

export default HomeworkPage
