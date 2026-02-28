'use client'
import { useCallback, useEffect, useState, useRef } from 'react'

const SECTIONS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'skills', label: 'Skills' },
  { id: 'contato', label: 'Contato' },
]

const SectionTimeline = () => {
  const [activeIdx, setActiveIdx] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Detect which section is currently in the viewport centre
  const updateActive = useCallback(() => {
    const midY = window.innerHeight / 2
    let closest = -1
    let closestDist = Infinity

    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const sectionMid = rect.top + rect.height / 2
      const dist = Math.abs(sectionMid - midY)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    }
    setActiveIdx(closest)
  }, [])

  // Show after scrolling past 400px
  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 400)

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateActive)
  }, [updateActive])

  useEffect(() => {
    // hide on screens < 720px via JS as well (CSS also hides)
    const mq = window.matchMedia('(min-width: 720px)')
    if (!mq.matches) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <nav
      className={`section-timeline fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden min-[720px]:flex flex-col items-end gap-0 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
      aria-label="Navegação por seções"
    >
      {/* Vertical line */}
      <div className="absolute right-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {SECTIONS.map((section, i) => {
        const isActive = i === activeIdx

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center gap-3 py-3 pr-0 pl-4 outline-none"
            aria-label={`Ir para ${section.label}`}
          >
            {/* Label */}
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'text-red-400 opacity-100 translate-x-0'
                  : 'text-gray-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-300'
              }`}
            >
              {section.label}
            </span>

            {/* Dot */}
            <span className="relative flex items-center justify-center">
              {/* Active ring */}
              <span
                className={`absolute h-4 w-4 rounded-full border transition-all duration-500 ${
                  isActive
                    ? 'border-red-500/50 scale-100 opacity-100'
                    : 'border-transparent scale-0 opacity-0'
                }`}
              />
              {/* Core dot */}
              <span
                className={`relative h-[7px] w-[7px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-red-500 shadow-[0_0_8px_2px_rgba(220,38,38,0.4)]'
                    : 'bg-white/20 group-hover:bg-white/50 group-hover:shadow-[0_0_4px_1px_rgba(255,255,255,0.1)]'
                }`}
              />
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default SectionTimeline
