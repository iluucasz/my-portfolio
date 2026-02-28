'use client'
import { useEffect, useRef, useCallback } from 'react'

// Deterministic pseudo-random
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface Star {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
  driftX: number
  driftY: number
}

const STAR_COUNT = 150
const CONNECT_DIST = 120    // px – max distance for star↔star lines
const MOUSE_RADIUS = 180    // px – cursor attraction radius
const LINE_OPACITY = 0.12   // base opacity of connection lines

function createStars(w: number, h: number): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = seededRandom(i * 3 + 1) * w
    const y = seededRandom(i * 3 + 2) * h
    stars.push({
      x, y, baseX: x, baseY: y,
      size: seededRandom(i * 3 + 3) * 2 + 0.5,
      opacity: seededRandom(i * 7 + 4) * 0.5 + 0.15,
      twinkleSpeed: seededRandom(i * 7 + 5) * 0.003 + 0.001,
      twinkleOffset: seededRandom(i * 7 + 6) * Math.PI * 2,
      driftX: (seededRandom(i * 5 + 7) - 0.5) * 0.15,
      driftY: (seededRandom(i * 5 + 8) - 0.5) * 0.1,
    })
  }
  return stars
}

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)
  const shipImgRef = useRef<HTMLImageElement | null>(null)
  const moonImgRef = useRef<HTMLImageElement | null>(null)
  const sunImgRef = useRef<HTMLImageElement | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const stars = starsRef.current
    const mouse = mouseRef.current
    const now = timeRef.current

    // Scroll-based fade: stars visible at top, fade as scroll increases
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min(scrollRef.current / docHeight, 1) : 0
    const starsAlpha = Math.max(0, 1 - progress * 2.5)
    const sunriseAlpha = Math.min(1, Math.max(0, (progress - 0.3) * 1.8)) * 0.12

    ctx.clearRect(0, 0, w, h)

    if (starsAlpha > 0.01) {
      ctx.globalAlpha = starsAlpha

      // Drift stars gently
      for (const star of stars) {
        star.x = star.baseX + Math.sin(now * star.driftX + star.twinkleOffset) * 8
        star.y = star.baseY + Math.cos(now * star.driftY + star.twinkleOffset) * 5
      }

      // Draw connections (star↔star near mouse)
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i]
        const distToMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (distToMouse > MOUSE_RADIUS * 1.5) continue // skip far-off stars

        // Line to cursor
        if (distToMouse < MOUSE_RADIUS) {
          const fade = 1 - distToMouse / MOUSE_RADIUS
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(255,255,255,${fade * LINE_OPACITY * 0.7})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Lines between nearby stars (only those close to mouse zone)
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > CONNECT_DIST) continue

          // Both stars should be somewhat near the mouse
          const bDistToMouse = Math.hypot(b.x - mouse.x, b.y - mouse.y)
          if (bDistToMouse > MOUSE_RADIUS * 1.8) continue

          const fade = 1 - dist / CONNECT_DIST
          const mouseFade = 1 - Math.min(distToMouse, bDistToMouse) / (MOUSE_RADIUS * 1.8)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(255,255,255,${fade * mouseFade * LINE_OPACITY})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      }

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(now * star.twinkleSpeed * 1000 + star.twinkleOffset) * 0.5 + 0.5
        const alpha = star.opacity * (0.5 + twinkle * 0.5)

        // Glow for bigger stars
        if (star.size > 1.5) {
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
          grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.25})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Star dot
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 0.6, 0, Math.PI * 2)
        ctx.fill()

        // Slight boost near mouse
        const distToMouse = Math.hypot(star.x - mouse.x, star.y - mouse.y)
        if (distToMouse < MOUSE_RADIUS) {
          const boost = (1 - distToMouse / MOUSE_RADIUS) * 0.4
          ctx.fillStyle = `rgba(255,255,255,${boost})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ── Moon image (top-right, fades on scroll) ──
      const moonImg = moonImgRef.current
      const moonFade = Math.max(0, 1 - progress * 3)
      if (moonImg && moonImg.complete && moonImg.naturalWidth > 0 && moonFade > 0.01) {
        const mA = starsAlpha * moonFade
        const mr = Math.min(w, h) * 0.2
        const mx = w * 0.85
        const my = h * 0.35

        ctx.save()

        // Soft outer glow halo
        ctx.globalAlpha = mA * 0.1
        const halo = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 2.8)
        halo.addColorStop(0, 'rgba(200,215,240,0.35)')
        halo.addColorStop(0.3, 'rgba(180,195,220,0.1)')
        halo.addColorStop(1, 'rgba(150,165,190,0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(mx, my, mr * 2.8, 0, Math.PI * 2)
        ctx.fill()

        // Inner warm glow (subtle pulse)
        const glowPulse = 0.9 + Math.sin(now * 0.8) * 0.1
        ctx.globalAlpha = mA * 0.06 * glowPulse
        const innerGlow = ctx.createRadialGradient(mx, my, mr * 0.3, mx, my, mr * 1.6)
        innerGlow.addColorStop(0, 'rgba(230,220,200,0.4)')
        innerGlow.addColorStop(0.5, 'rgba(210,200,180,0.1)')
        innerGlow.addColorStop(1, 'rgba(190,180,160,0)')
        ctx.fillStyle = innerGlow
        ctx.beginPath()
        ctx.arc(mx, my, mr * 1.6, 0, Math.PI * 2)
        ctx.fill()

        // Draw the moon image with subtle shadow glow
        ctx.globalAlpha = mA * 0.9
        ctx.shadowColor = 'rgba(200,210,235,0.3)'
        ctx.shadowBlur = mr * 0.4
        ctx.drawImage(moonImg, mx - mr, my - mr, mr * 2, mr * 2)
        ctx.shadowBlur = 0

        // Light reflection edge (crescent highlight)
        ctx.globalAlpha = mA * 0.08
        ctx.strokeStyle = 'rgba(230,240,255,0.4)'
        ctx.lineWidth = mr * 0.03
        ctx.beginPath()
        ctx.arc(mx, my, mr * 0.92, -Math.PI * 0.7, Math.PI * 0.15)
        ctx.stroke()

        ctx.restore()
      }
    }

    // ── Ship image (alternating directions, wraps around) ──
    const shipImg = shipImgRef.current
    const shipFade = Math.max(0, 1 - progress * 3)
    if (shipImg && shipImg.complete && shipImg.naturalWidth > 0 && shipFade > 0.01) {
      const sA = starsAlpha * shipFade
      const shipH = Math.min(w, h) * 0.12
      const shipAspect = shipImg.naturalWidth / shipImg.naturalHeight
      const shipW = shipH * shipAspect
      const totalDist = w + shipW * 2
      const speed = 22

      // Determine which pass we're on (each pass = one full crossing)
      const rawProgress = (now * speed) % (totalDist * 5) // cycle over 5 passes
      const passIndex = Math.floor(rawProgress / totalDist)
      const passProgress = (rawProgress % totalDist) / totalDist // 0→1 within current pass

      // Each pass has different direction, Y position and tilt
      const passes = [
        { dir: 1,  yPos: 0.28, tilt: -0.12 },  // left→right, upper, slight up
        { dir: -1, yPos: 0.45, tilt: 0.08 },    // right→left, middle, slight down
        { dir: 1,  yPos: 0.18, tilt: -0.2 },    // left→right, high, steeper up  
        { dir: -1, yPos: 0.35, tilt: 0.15 },    // right→left, upper-mid, angled down
        { dir: 1,  yPos: 0.52, tilt: -0.05 },   // left→right, lower, nearly flat
      ]
      const pass = passes[passIndex % passes.length]

      let shipX: number
      if (pass.dir === 1) {
        // Left to right
        shipX = -shipW + passProgress * totalDist
      } else {
        // Right to left
        shipX = (w + shipW) - passProgress * totalDist
      }
      const shipY = h * pass.yPos + Math.sin(now * 0.4) * 8
      const tiltAngle = pass.tilt

      ctx.save()
      ctx.translate(shipX + shipW / 2, shipY)
      ctx.rotate(tiltAngle)
      // Flip horizontally when going right→left
      if (pass.dir === -1) {
        ctx.scale(-1, 1)
      }

      // ── Speed streaks (subtle animated lines behind the ship) ──
      const streakCount = 8
      for (let s = 0; s < streakCount; s++) {
        const baseSy = (seededRandom(s * 7 + 50) - 0.5) * shipH * 0.7
        const baseLen = shipW * (0.4 + seededRandom(s * 7 + 51) * 1.0)
        const streakSpeed = 0.5 + seededRandom(s * 7 + 56) * 0.8
        const streakCycle = (now * streakSpeed + seededRandom(s * 7 + 57) * 10) % 3
        const streakLife = streakCycle / 3
        const fadeIn = Math.min(1, streakLife * 4)
        const fadeOut = Math.max(0, 1 - (streakLife - 0.5) * 2)
        const streakVis = fadeIn * fadeOut
        if (streakVis < 0.01) continue
        const slideOffset = streakLife * shipW * 0.5
        const sy = baseSy + Math.sin(now * 0.4 + s) * shipH * 0.03
        const sLen = baseLen * (0.3 + streakVis * 0.5)
        ctx.globalAlpha = sA * streakVis * (0.04 + seededRandom(s * 7 + 53) * 0.05)
        ctx.strokeStyle = `rgba(220,230,255,${0.15 + seededRandom(s * 7 + 54) * 0.15})`
        ctx.lineWidth = 0.3 + seededRandom(s * 7 + 55) * 0.5
        ctx.beginPath()
        ctx.moveTo(-shipW * 0.3 - slideOffset, sy)
        ctx.lineTo(-shipW * 0.3 - slideOffset - sLen, sy)
        ctx.stroke()
      }

      // ── Ghost trail (soft fading copies) ──
      const ghostCount = 4
      for (let g = ghostCount; g >= 1; g--) {
        const ghostPulse = 0.95 + Math.sin(now * 1.2 + g * 0.7) * 0.05
        const ghostOffset = g * shipW * 0.08 * ghostPulse
        const ghostAlpha = sA * (0.06 - g * 0.012) * (0.9 + Math.sin(now * 1.5 + g) * 0.1)
        if (ghostAlpha > 0) {
          ctx.globalAlpha = ghostAlpha
          ctx.drawImage(shipImg, -shipW / 2 - ghostOffset, -shipH / 2, shipW, shipH)
        }
      }

      // ── Soft warm exhaust trail (gentle flicker) ──
      const exhaustFlicker = 0.9 + Math.sin(now * 2.5) * 0.1
      ctx.globalAlpha = sA * 0.035 * exhaustFlicker
      const trailLen = shipW * 2
      const trail = ctx.createLinearGradient(-shipW * 0.3, 0, -shipW * 0.3 - trailLen, 0)
      trail.addColorStop(0, 'rgba(255,200,150,0.35)')
      trail.addColorStop(0.2, 'rgba(255,160,100,0.12)')
      trail.addColorStop(0.5, 'rgba(200,140,100,0.03)')
      trail.addColorStop(1, 'rgba(150,120,100,0)')
      ctx.fillStyle = trail
      ctx.beginPath()
      ctx.moveTo(-shipW * 0.3, -shipH * 0.06)
      ctx.lineTo(-shipW * 0.3 - trailLen, 0)
      ctx.lineTo(-shipW * 0.3, shipH * 0.06)
      ctx.closePath()
      ctx.fill()

      // ── Tiny warm glow at exhaust point (gentle pulse) ──
      const glowPulse = 0.8 + Math.sin(now * 3.5) * 0.2
      ctx.globalAlpha = sA * 0.05 * glowPulse
      const exR = shipH * (0.12 + Math.sin(now * 2.5) * 0.02)
      const exGlow = ctx.createRadialGradient(-shipW * 0.35, 0, 0, -shipW * 0.35, 0, exR)
      exGlow.addColorStop(0, 'rgba(255,220,180,0.4)')
      exGlow.addColorStop(0.5, 'rgba(255,180,120,0.1)')
      exGlow.addColorStop(1, 'rgba(255,150,100,0)')
      ctx.fillStyle = exGlow
      ctx.beginPath()
      ctx.arc(-shipW * 0.35, 0, shipH * 0.15, 0, Math.PI * 2)
      ctx.fill()

      // ── Draw the ship ──
      ctx.globalAlpha = sA * 0.85
      ctx.drawImage(shipImg, -shipW / 2, -shipH / 2, shipW, shipH)

      ctx.restore()
    }

    // ── Sunrise / Sun image at bottom ──
    // Phase 1: subtle warm ambient glow (starts at 30% scroll)
    if (sunriseAlpha > 0.005) {
      ctx.globalAlpha = sunriseAlpha * 0.5
      const grad = ctx.createLinearGradient(0, h * 0.75, 0, h)
      grad.addColorStop(0, 'rgba(255,140,50,0)')
      grad.addColorStop(0.5, 'rgba(220,80,60,0.15)')
      grad.addColorStop(1, 'rgba(255,160,60,0.25)')
      ctx.fillStyle = grad
      ctx.fillRect(0, h * 0.7, w, h * 0.3)
    }

    // Phase 2: Sun image peeks from very bottom (starts at ~70% scroll)
    const sunProgress = Math.min(1, Math.max(0, (progress - 0.7) / 0.3))
    const sunImg = sunImgRef.current
    if (sunProgress > 0.01) {
      const sunRadius = Math.min(w, h) * 0.18
      const sunCenterX = w * 0.85
      const sunCenterY = h * (0.85 - sunProgress * 0.18)

      // Outer heat haze corona
      const heatPulse = 0.85 + Math.sin(now * 0.6) * 0.15
      ctx.save()
      ctx.globalAlpha = sunProgress * 0.06 * heatPulse
      const corona = ctx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.3, sunCenterX, sunCenterY, sunRadius * 3.5)
      corona.addColorStop(0, 'rgba(255,200,80,0.6)')
      corona.addColorStop(0.2, 'rgba(255,140,50,0.25)')
      corona.addColorStop(0.5, 'rgba(220,60,30,0.08)')
      corona.addColorStop(1, 'rgba(200,40,20,0)')
      ctx.fillStyle = corona
      ctx.beginPath()
      ctx.arc(sunCenterX, sunCenterY, sunRadius * 3.5, 0, Math.PI * 2)
      ctx.fill()

      // Inner warm glow (pulsing)
      const innerPulse = 0.9 + Math.sin(now * 1.2) * 0.1
      ctx.globalAlpha = sunProgress * 0.08 * innerPulse
      const innerGlow = ctx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.4, sunCenterX, sunCenterY, sunRadius * 2)
      innerGlow.addColorStop(0, 'rgba(255,230,150,0.7)')
      innerGlow.addColorStop(0.4, 'rgba(255,180,80,0.3)')
      innerGlow.addColorStop(1, 'rgba(255,100,40,0)')
      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(sunCenterX, sunCenterY, sunRadius * 2, 0, Math.PI * 2)
      ctx.fill()

      // Soft light beams (smooth elliptical glows)
      const rayCount = 10
      for (let r = 0; r < rayCount; r++) {
        const angle = (r / rayCount) * Math.PI * 2 + now * 0.02
        const rayPulse = 0.6 + Math.sin(now * 0.5 + r * 1.3) * 0.4
        const rayLen = sunRadius * (1.5 + Math.sin(now * 0.35 + r * 0.8) * 0.4) * rayPulse
        const rayX = sunCenterX + Math.cos(angle) * (sunRadius * 0.6 + rayLen * 0.5)
        const rayY = sunCenterY + Math.sin(angle) * (sunRadius * 0.6 + rayLen * 0.5)
        ctx.globalAlpha = sunProgress * (0.025 + Math.sin(now * 0.6 + r) * 0.012)
        ctx.save()
        ctx.translate(rayX, rayY)
        ctx.rotate(angle)
        const beamW = rayLen * 0.9
        const beamH = sunRadius * 0.12
        const beamGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, beamW * 0.5)
        beamGrd.addColorStop(0, 'rgba(255,200,100,0.35)')
        beamGrd.addColorStop(0.4, 'rgba(255,150,60,0.12)')
        beamGrd.addColorStop(1, 'rgba(255,100,40,0)')
        ctx.fillStyle = beamGrd
        ctx.beginPath()
        ctx.ellipse(0, 0, beamW * 0.5, beamH, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Organic thin spikes (irregular, not perfect triangles)
      const spikeCount = 16
      for (let s = 0; s < spikeCount; s++) {
        const sSeed = s * 23 + 777
        // Irregular spacing — not evenly distributed
        const baseAngle = (s / spikeCount) * Math.PI * 2
        const angleJitter = (seededRandom(sSeed) - 0.5) * 0.3
        const sAngle = baseAngle + angleJitter + now * 0.015 + Math.sin(now * 0.2 + s * 0.7) * 0.05
        const sPulse = 0.3 + Math.sin(now * (0.8 + seededRandom(sSeed + 1) * 1.2) + s * 1.7) * 0.7
        if (sPulse < 0.15) continue
        const sLen = sunRadius * (0.8 + seededRandom(sSeed + 2) * 1.8) * sPulse
        // Very thin but with irregular width — thicker at base, wispy at tip
        const baseWidth = sunRadius * (0.008 + seededRandom(sSeed + 3) * 0.012)
        // Slight curve offset so they're not perfectly straight
        const curveOff = (seededRandom(sSeed + 4) - 0.5) * sunRadius * 0.06

        ctx.save()
        ctx.translate(sunCenterX, sunCenterY)
        ctx.rotate(sAngle)
        ctx.globalAlpha = sunProgress * (0.06 + sPulse * 0.08) * (0.8 + Math.sin(now * 2.5 + s) * 0.2)

        const sGrd = ctx.createLinearGradient(sunRadius * 0.7, 0, sunRadius * 0.7 + sLen, 0)
        sGrd.addColorStop(0, 'rgba(255,210,100,0.6)')
        sGrd.addColorStop(0.25, 'rgba(255,160,50,0.35)')
        sGrd.addColorStop(0.6, 'rgba(255,100,30,0.1)')
        sGrd.addColorStop(1, 'rgba(255,80,20,0)')
        ctx.fillStyle = sGrd

        // Organic path with bezier curves — not a straight triangle
        ctx.beginPath()
        ctx.moveTo(sunRadius * 0.7, -baseWidth)
        ctx.bezierCurveTo(
          sunRadius * 0.7 + sLen * 0.3, -baseWidth * 0.7 + curveOff,
          sunRadius * 0.7 + sLen * 0.7, -baseWidth * 0.15 + curveOff * 0.5,
          sunRadius * 0.7 + sLen, 0
        )
        ctx.bezierCurveTo(
          sunRadius * 0.7 + sLen * 0.7, baseWidth * 0.15 - curveOff * 0.3,
          sunRadius * 0.7 + sLen * 0.3, baseWidth * 0.7 - curveOff * 0.6,
          sunRadius * 0.7, baseWidth
        )
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // Draw sun image
      if (sunImg && sunImg.complete && sunImg.naturalWidth > 0) {
        ctx.globalAlpha = sunProgress * 0.95
        ctx.shadowColor = 'rgba(255,180,60,0.5)'
        ctx.shadowBlur = sunRadius * 0.6
        ctx.drawImage(sunImg, sunCenterX - sunRadius, sunCenterY - sunRadius, sunRadius * 2, sunRadius * 2)
        ctx.shadowBlur = 0

        // ── INTENSE burning ember effect ON the sun surface ──
        const emberOnSunCount = 35
        for (let e = 0; e < emberOnSunCount; e++) {
          const eSeed = e * 17 + 99
          const eAngle = seededRandom(eSeed) * Math.PI * 2 + now * (0.15 + seededRandom(eSeed + 1) * 0.25)
          const eDist = seededRandom(eSeed + 2) * sunRadius * 1.1
          const ex = sunCenterX + Math.cos(eAngle) * eDist
          const ey = sunCenterY + Math.sin(eAngle) * eDist
          const eFlicker = 0.5 + Math.sin(now * (3 + seededRandom(eSeed + 3) * 5) + e * 1.5) * 0.5
          const eSize = sunRadius * (0.06 + seededRandom(eSeed + 4) * 0.12) * eFlicker
          const eAlpha = sunProgress * (0.35 + seededRandom(eSeed + 5) * 0.4) * eFlicker
          if (eAlpha < 0.01) continue

          ctx.globalAlpha = eAlpha
          const eGrd = ctx.createRadialGradient(ex, ey, 0, ex, ey, eSize)
          const r = 255
          const g = Math.floor(100 + seededRandom(eSeed + 6) * 120)
          const b = Math.floor(10 + seededRandom(eSeed + 7) * 40)
          eGrd.addColorStop(0, `rgba(255,255,220,1)`)
          eGrd.addColorStop(0.2, `rgba(${r},${g},${b},0.8)`)
          eGrd.addColorStop(0.6, `rgba(${r},${Math.floor(g * 0.5)},${b},0.3)`)
          eGrd.addColorStop(1, `rgba(200,40,10,0)`)
          ctx.fillStyle = eGrd
          ctx.beginPath()
          ctx.arc(ex, ey, eSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // ── Intense fire ring around the sun ──
        const fireRingLayers = 3
        for (let fl = 0; fl < fireRingLayers; fl++) {
          const ringRadius = sunRadius * (1.05 + fl * 0.15)
          const ringPulse = 0.6 + Math.sin(now * (2.0 + fl * 0.5)) * 0.4
          ctx.globalAlpha = sunProgress * (0.25 - fl * 0.06) * ringPulse
          const ringGrd = ctx.createRadialGradient(sunCenterX, sunCenterY, ringRadius * 0.85, sunCenterX, sunCenterY, ringRadius * 1.3)
          ringGrd.addColorStop(0, 'rgba(255,200,50,0.6)')
          ringGrd.addColorStop(0.3, 'rgba(255,120,30,0.4)')
          ringGrd.addColorStop(0.6, 'rgba(255,60,10,0.15)')
          ringGrd.addColorStop(1, 'rgba(200,30,5,0)')
          ctx.fillStyle = ringGrd
          ctx.beginPath()
          ctx.arc(sunCenterX, sunCenterY, ringRadius * 1.3, 0, Math.PI * 2)
          ctx.fill()
        }

        // ── Solar fire blobs around the sun (smooth round shapes) ──
        const blobCount = 14
        for (let bl = 0; bl < blobCount; bl++) {
          const blSeed = bl * 19 + 300
          const blAngle = (bl / blobCount) * Math.PI * 2 + now * 0.06 + Math.sin(now * 0.3 + bl) * 0.25
          const blPulse = 0.4 + Math.sin(now * (1.2 + seededRandom(blSeed) * 1.5) + bl * 2) * 0.6
          const blDist = sunRadius * (1.0 + seededRandom(blSeed + 1) * 0.35) + blPulse * sunRadius * 0.2
          const blSize = sunRadius * (0.15 + seededRandom(blSeed + 2) * 0.2) * (0.6 + blPulse * 0.4)
          const bx = sunCenterX + Math.cos(blAngle) * blDist
          const by = sunCenterY + Math.sin(blAngle) * blDist
          ctx.globalAlpha = sunProgress * (0.15 + blPulse * 0.12)
          const blGrd = ctx.createRadialGradient(bx, by, 0, bx, by, blSize)
          blGrd.addColorStop(0, 'rgba(255,220,80,0.7)')
          blGrd.addColorStop(0.3, 'rgba(255,140,40,0.4)')
          blGrd.addColorStop(0.6, 'rgba(255,70,15,0.12)')
          blGrd.addColorStop(1, 'rgba(200,30,5,0)')
          ctx.fillStyle = blGrd
          ctx.beginPath()
          ctx.arc(bx, by, blSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Bright burning edge glow on the sun (INTENSE)
        const edgePulse = 0.6 + Math.sin(now * 1.8) * 0.4
        ctx.globalAlpha = sunProgress * 0.35 * edgePulse
        ctx.strokeStyle = 'rgba(255,160,30,0.6)'
        ctx.lineWidth = sunRadius * 0.1
        ctx.shadowColor = 'rgba(255,100,20,0.8)'
        ctx.shadowBlur = sunRadius * 0.4
        ctx.beginPath()
        ctx.arc(sunCenterX, sunCenterY, sunRadius * 0.95, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Heat shimmer waves (rising from sun)
      for (let hw = 0; hw < 6; hw++) {
        const waveY = sunCenterY - sunRadius * (0.8 + hw * 0.5) - Math.sin(now * 0.5 + hw * 1.1) * sunRadius * 0.15
        const waveWidth = sunRadius * (2.5 - hw * 0.2)
        const waveAlpha = sunProgress * (0.02 - hw * 0.003) * (0.8 + Math.sin(now * 0.8 + hw) * 0.2)
        if (waveAlpha < 0.001) continue
        ctx.globalAlpha = waveAlpha
        const shimmer = ctx.createLinearGradient(sunCenterX - waveWidth, waveY, sunCenterX + waveWidth, waveY)
        shimmer.addColorStop(0, 'rgba(255,200,100,0)')
        shimmer.addColorStop(0.3, 'rgba(255,180,80,0.3)')
        shimmer.addColorStop(0.5, 'rgba(255,160,60,0.4)')
        shimmer.addColorStop(0.7, 'rgba(255,180,80,0.3)')
        shimmer.addColorStop(1, 'rgba(255,200,100,0)')
        ctx.fillStyle = shimmer
        const thickness = sunRadius * 0.04
        ctx.fillRect(sunCenterX - waveWidth, waveY - thickness, waveWidth * 2, thickness * 2)
      }

      ctx.restore()

      // ── Fire particles at footer (INTENSE) ──
      const fireCount = 50
      for (let f = 0; f < fireCount; f++) {
        const seed = f * 13 + 7
        const fireSpeed = 0.3 + seededRandom(seed) * 0.7
        const cycle = ((now * fireSpeed + seededRandom(seed + 1) * 20) % 3.5) / 3.5
        const fireX = w * seededRandom(seed + 2)
        const fireBaseY = h - seededRandom(seed + 3) * 5
        const fireY = fireBaseY - cycle * h * 0.2
        const wobble = Math.sin(now * (2.5 + seededRandom(seed + 13) * 2) + seededRandom(seed + 4) * 10) * 20
        const fireSize = (3 + seededRandom(seed + 5) * 7) * (1 - cycle * 0.5)
        const fadeIn = Math.min(1, cycle * 5)
        const fadeOut = Math.max(0, 1 - (cycle - 0.35) * 1.6)
        const fireAlpha = sunProgress * fadeIn * fadeOut * (0.35 + seededRandom(seed + 6) * 0.35)
        if (fireAlpha < 0.005) continue

        ctx.globalAlpha = fireAlpha
        const colors = [
          `rgba(255,${80 + Math.floor(seededRandom(seed + 7) * 60)},${10 + Math.floor(seededRandom(seed + 8) * 20)},1)`,
          `rgba(255,${140 + Math.floor(seededRandom(seed + 9) * 60)},${20 + Math.floor(seededRandom(seed + 10) * 30)},1)`,
          `rgba(255,${200 + Math.floor(seededRandom(seed + 11) * 50)},${40 + Math.floor(seededRandom(seed + 12) * 40)},1)`,
        ]
        const color = colors[f % 3]
        const grd = ctx.createRadialGradient(fireX + wobble, fireY, 0, fireX + wobble, fireY, fireSize)
        grd.addColorStop(0, 'rgba(255,255,200,0.9)')
        grd.addColorStop(0.2, color)
        grd.addColorStop(0.6, color.replace(',1)', ',0.3)'))
        grd.addColorStop(1, 'rgba(255,60,10,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(fireX + wobble, fireY, fireSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Rising embers from bottom (INTENSE) ──
      const emberCount = 60
      for (let eb = 0; eb < emberCount; eb++) {
        const ebSeed = eb * 11 + 200
        const ebSpeed = 0.15 + seededRandom(ebSeed) * 0.4
        const ebCycle = ((now * ebSpeed + seededRandom(ebSeed + 1) * 30) % 5) / 5
        const ebX = seededRandom(ebSeed + 2) * w
        const ebBaseY = h + 10
        const ebY = ebBaseY - ebCycle * h * 0.45
        const ebWobble = Math.sin(now * (1.5 + seededRandom(ebSeed + 3) * 2.5) + eb * 0.8) * (10 + seededRandom(ebSeed + 4) * 18)
        const ebSize = (2 + seededRandom(ebSeed + 5) * 5) * (1 - ebCycle * 0.4)
        const ebFadeIn = Math.min(1, ebCycle * 5)
        const ebFadeOut = Math.max(0, 1 - (ebCycle - 0.3) * 1.5)
        const ebAlpha = sunProgress * ebFadeIn * ebFadeOut * (0.4 + seededRandom(ebSeed + 6) * 0.35)
        if (ebAlpha < 0.005) continue

        ctx.globalAlpha = ebAlpha
        const ebR = 255
        const ebG = Math.floor(60 + seededRandom(ebSeed + 7) * 160)
        const ebB = Math.floor(5 + seededRandom(ebSeed + 8) * 35)
        const ebGrd = ctx.createRadialGradient(ebX + ebWobble, ebY, 0, ebX + ebWobble, ebY, ebSize * 2.5)
        ebGrd.addColorStop(0, `rgba(255,255,200,1)`)
        ebGrd.addColorStop(0.15, `rgba(${ebR},${ebG},${ebB},0.8)`)
        ebGrd.addColorStop(0.5, `rgba(${ebR},${Math.floor(ebG * 0.4)},${ebB},0.3)`)
        ebGrd.addColorStop(1, 'rgba(200,30,5,0)')
        ctx.fillStyle = ebGrd
        ctx.beginPath()
        ctx.arc(ebX + ebWobble, ebY, ebSize * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.globalAlpha = ebAlpha * 1.5
        ctx.fillStyle = `rgba(255,250,200,${0.7 + Math.sin(now * 6 + eb) * 0.3})`
        ctx.beginPath()
        ctx.arc(ebX + ebWobble, ebY, ebSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── MASSIVE footer fire glow ──
      ctx.globalAlpha = sunProgress * 0.3 * (0.8 + Math.sin(now * 1.5) * 0.2)
      const fireGlow = ctx.createLinearGradient(0, h - 150, 0, h)
      fireGlow.addColorStop(0, 'rgba(255,80,20,0)')
      fireGlow.addColorStop(0.2, 'rgba(255,100,30,0.1)')
      fireGlow.addColorStop(0.5, 'rgba(255,70,15,0.3)')
      fireGlow.addColorStop(0.8, 'rgba(255,50,10,0.5)')
      fireGlow.addColorStop(1, 'rgba(255,40,5,0.6)')
      ctx.fillStyle = fireGlow
      ctx.fillRect(0, h - 150, w, 150)

      // Second layer - orange/yellow fire glow
      ctx.globalAlpha = sunProgress * 0.2 * (0.75 + Math.sin(now * 2.2 + 1) * 0.25)
      const fireGlow2 = ctx.createLinearGradient(0, h - 100, 0, h)
      fireGlow2.addColorStop(0, 'rgba(255,160,40,0)')
      fireGlow2.addColorStop(0.4, 'rgba(255,140,30,0.15)')
      fireGlow2.addColorStop(0.7, 'rgba(255,120,20,0.3)')
      fireGlow2.addColorStop(1, 'rgba(255,100,10,0.4)')
      ctx.fillStyle = fireGlow2
      ctx.fillRect(0, h - 100, w, 100)

      // Soft horizon light band
      ctx.globalAlpha = sunProgress * 0.06
      const horizonGrad = ctx.createLinearGradient(0, h * 0.88, 0, h)
      horizonGrad.addColorStop(0, 'rgba(255,200,120,0)')
      horizonGrad.addColorStop(0.3, 'rgba(255,160,80,0.15)')
      horizonGrad.addColorStop(0.6, 'rgba(255,120,50,0.25)')
      horizonGrad.addColorStop(1, 'rgba(255,100,40,0.35)')
      ctx.fillStyle = horizonGrad
      ctx.fillRect(0, h * 0.88, w, h * 0.12)
    }

    ctx.globalAlpha = 1
  }, [])

  const animate = useCallback((timestamp: number) => {
    timeRef.current = timestamp / 1000
    draw()
    rafRef.current = requestAnimationFrame(animate)
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = createStars(canvas.width, canvas.height)
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY

      // Parallax orbs
      if (containerRef.current) {
        const orbs = containerRef.current.querySelectorAll<HTMLElement>('.parallax-orb')
        orbs.forEach((orb) => {
          const speed = parseFloat(orb.dataset.speed || '0.05')
          orb.style.transform = `translateY(${window.scrollY * speed}px)`
        })
      }
    }

    // Load ship image
    const shipImg = new Image()
    shipImg.src = '/images/nave.png'
    shipImgRef.current = shipImg

    // Load moon image
    const moonImg = new Image()
    moonImg.src = '/images/lua.png'
    moonImgRef.current = moonImg

    // Load sun image
    const sunImage = new Image()
    sunImage.src = '/images/sol.png'
    sunImgRef.current = sunImage

    resize()
    handleScroll()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Interactive star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* ── Parallax orbs (mid-page atmosphere) ── */}
      <div
        className="parallax-orb absolute -left-32 top-[30%] h-[400px] w-[400px] rounded-full bg-indigo-900/[0.03] blur-[120px]"
        data-speed="-0.03"
      />
      <div
        className="parallax-orb absolute -right-24 top-[50%] h-[350px] w-[350px] rounded-full bg-red-900/[0.03] blur-[100px]"
        data-speed="0.05"
      />
      <div
        className="parallax-orb absolute left-[20%] top-[70%] h-[300px] w-[300px] rounded-full bg-rose-900/[0.025] blur-[110px]"
        data-speed="-0.04"
      />
      <div
        className="parallax-orb absolute right-[10%] top-[85%] h-[350px] w-[350px] rounded-full bg-amber-900/[0.02] blur-[100px]"
        data-speed="0.045"
      />

      {/* ── Subtle noise overlay ── */}
      <div className="absolute inset-0 opacity-[0.012]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }} />
    </div>
  )
}

export default BackgroundEffects
