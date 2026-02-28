'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface CloudsProps {
  id?: string
}

const CLOUD_IMAGES = ['/images/nuvem1.png', '/images/nuvem2.png', '/images/nuvem3.png']

// Clouds spread across entire region (percentage-based Y positions)
const CLOUDS = [
  // === Technology section (0-18%) — MORE clouds here ===
  { x: -10, y: 0,   w: 580, img: 0, speedX: 0.3,   delay: 0,    op: 0.10 },
  { x: 45,  y: 1,   w: 520, img: 2, speedX: -0.22, delay: 0.7,  op: 0.08 },
  { x: 80,  y: 1,   w: 450, img: 1, speedX: -0.18, delay: 1.4,  op: 0.07 },
  { x: 15,  y: 3,   w: 600, img: 1, speedX: 0.18,  delay: 1.5,  op: 0.09 },
  { x: 60,  y: 4,   w: 500, img: 0, speedX: -0.25, delay: 0.3,  op: 0.08 },
  { x: -5,  y: 5,   w: 540, img: 2, speedX: 0.28,  delay: 2.0,  op: 0.10 },
  { x: 35,  y: 7,   w: 480, img: 1, speedX: -0.15, delay: 1.0,  op: 0.07 },
  { x: 72,  y: 8,   w: 550, img: 0, speedX: 0.2,   delay: 0.5,  op: 0.09 },
  { x: 5,   y: 10,  w: 460, img: 2, speedX: 0.25,  delay: 1.8,  op: 0.08 },
  { x: 50,  y: 12,  w: 520, img: 1, speedX: -0.2,  delay: 0.2,  op: 0.07 },
  { x: -8,  y: 14,  w: 580, img: 0, speedX: 0.3,   delay: 1.2,  op: 0.10 },
  { x: 68,  y: 15,  w: 440, img: 2, speedX: -0.28, delay: 0.6,  op: 0.08 },
  { x: 25,  y: 17,  w: 500, img: 1, speedX: 0.15,  delay: 2.2,  op: 0.09 },

  // === Tech→Projects gap (18-32%) ===
  { x: 5,   y: 19,  w: 540, img: 2, speedX: -0.2,  delay: 1.3,  op: 0.08 },
  { x: 55,  y: 21,  w: 480, img: 1, speedX: 0.25,  delay: 0.2,  op: 0.07 },
  { x: -6,  y: 23,  w: 500, img: 0, speedX: 0.3,   delay: 1.8,  op: 0.09 },
  { x: 70,  y: 25,  w: 420, img: 2, speedX: -0.28, delay: 0.6,  op: 0.07 },
  { x: 30,  y: 27,  w: 560, img: 1, speedX: 0.15,  delay: 2.2,  op: 0.08 },
  { x: 80,  y: 30,  w: 450, img: 0, speedX: -0.18, delay: 0.9,  op: 0.07 },

  // === Projects section (32-56%) ===
  { x: -5,  y: 33,  w: 520, img: 2, speedX: 0.22,  delay: 0.4,  op: 0.08 },
  { x: 45,  y: 35,  w: 580, img: 1, speedX: -0.2,  delay: 1.6,  op: 0.09 },
  { x: 15,  y: 37,  w: 440, img: 0, speedX: 0.28,  delay: 0.8,  op: 0.07 },
  { x: 72,  y: 39,  w: 500, img: 2, speedX: -0.25, delay: 2.1,  op: 0.07 },
  { x: 35,  y: 42,  w: 530, img: 1, speedX: 0.18,  delay: 0.1,  op: 0.08 },
  { x: -2,  y: 45,  w: 460, img: 0, speedX: 0.3,   delay: 1.4,  op: 0.09 },
  { x: 60,  y: 48,  w: 490, img: 2, speedX: -0.15, delay: 0.7,  op: 0.07 },
  { x: 25,  y: 51,  w: 550, img: 1, speedX: 0.22,  delay: 1.9,  op: 0.08 },
  { x: 82,  y: 54,  w: 400, img: 0, speedX: -0.28, delay: 0.3,  op: 0.07 },

  // === Projects→Experience gap (56-72%) ===
  { x: 10,  y: 57,  w: 520, img: 2, speedX: 0.25,  delay: 1.1,  op: 0.08 },
  { x: 50,  y: 59,  w: 470, img: 1, speedX: -0.2,  delay: 0.5,  op: 0.07 },
  { x: -7,  y: 62,  w: 560, img: 0, speedX: 0.3,   delay: 2.0,  op: 0.09 },
  { x: 68,  y: 64,  w: 430, img: 2, speedX: -0.22, delay: 0.8,  op: 0.07 },
  { x: 30,  y: 67,  w: 510, img: 1, speedX: 0.18,  delay: 1.5,  op: 0.08 },
  { x: 78,  y: 70,  w: 480, img: 0, speedX: -0.25, delay: 0.2,  op: 0.07 },

  // === Experience section (72-97%) ===
  { x: -4,  y: 73,  w: 540, img: 2, speedX: 0.28,  delay: 1.3,  op: 0.09 },
  { x: 55,  y: 75,  w: 500, img: 1, speedX: -0.18, delay: 0.6,  op: 0.07 },
  { x: 20,  y: 78,  w: 580, img: 0, speedX: 0.22,  delay: 2.2,  op: 0.08 },
  { x: 75,  y: 81,  w: 420, img: 2, speedX: -0.3,  delay: 0.4,  op: 0.07 },
  { x: 40,  y: 84,  w: 530, img: 1, speedX: 0.15,  delay: 1.7,  op: 0.08 },
  { x: -6,  y: 87,  w: 490, img: 0, speedX: 0.25,  delay: 0.9,  op: 0.09 },
  { x: 62,  y: 90,  w: 460, img: 2, speedX: -0.2,  delay: 1.1,  op: 0.07 },
]

const Clouds: React.FC<CloudsProps> = ({ id = 'clouds' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastTime = performance.now()

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now
      timeRef.current += dt

      const viewH = window.innerHeight

      // Animate each cloud with individual scroll-based fade
      const els = container.querySelectorAll<HTMLElement>('.cloud-el')
      els.forEach((el, i) => {
        const c = CLOUDS[i]
        if (!c) return
        const t = timeRef.current + c.delay
        const driftX = Math.sin(t * c.speedX) * 30 + Math.sin(t * c.speedX * 0.5 + i) * 12
        const driftY = Math.cos(t * 0.2 + i * 0.6) * 6
        const breath = 1 + Math.sin(t * 0.18 + i) * 0.03

        // Individual cloud fade based on its position in viewport
        const elRect = el.getBoundingClientRect()
        const elCenter = elRect.top + elRect.height / 2
        const margin = viewH * 0.6
        const fadeZone = viewH * 0.4
        let opacity = c.op

        if (elCenter < -margin) {
          opacity = 0
        } else if (elCenter < -margin + fadeZone) {
          opacity = c.op * ((elCenter + margin) / fadeZone)
        } else if (elCenter > viewH + margin) {
          opacity = 0
        } else if (elCenter > viewH + margin - fadeZone) {
          opacity = c.op * ((viewH + margin - elCenter) / fadeZone)
        }

        // First clouds (Technology): gentle scroll-reveal with parallax
        let parallaxY = 0
        if (c.y <= 18) {
          // How far the cloud center is from the bottom of the viewport (0 = at bottom, 1 = at top)
          const progress = Math.max(0, Math.min(1, (viewH - elCenter) / viewH))
          // Smooth entrance: opacity ramps from 0 → full over the first 60% of travel
          const entrance = Math.min(1, progress / 0.6)
          opacity *= entrance
          // Subtle parallax: cloud drifts up slower, creating depth
          parallaxY = (1 - progress) * 40
        }

        el.style.transform = `translate(${driftX}px, ${driftY + parallaxY}px) scale(${breath})`
        el.style.opacity = `${Math.max(0, opacity)}`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 1 }}
      aria-hidden="true"
    >
      {CLOUDS.map((c, i) => (
        <div
          key={`${id}-${i}`}
          className="cloud-el absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}px`,
            opacity: c.op,
          }}
        >
          <Image
            src={CLOUD_IMAGES[c.img]}
            alt=""
            width={c.w}
            height={Math.round(c.w * 0.5)}
            className="w-full h-auto select-none"
            draggable={false}
            priority={false}
          />
        </div>
      ))}
    </div>
  )
}

export default Clouds