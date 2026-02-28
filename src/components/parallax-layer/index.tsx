'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

const ParallaxLayer = ({ children, speed = 0.1, className = '' }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewCenter = window.innerHeight / 2
      const offset = (center - viewCenter) * speed
      ref.current.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

export default ParallaxLayer
