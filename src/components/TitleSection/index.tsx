'use client'
import React, { useEffect, useRef, useState } from 'react';

interface ITitleSectionProps {
    name?: string;
}

export const TitleSection: React.FC<ITitleSectionProps> = ({ name }) => {
    const titleRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const el = titleRef.current
        if (!el) return

        // IntersectionObserver for reveal animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )
        observer.observe(el)

        // Scroll-driven parallax + 3D
        const handleScroll = () => {
            const rect = el.getBoundingClientRect()
            const viewH = window.innerHeight
            const ratio = (rect.top + rect.height / 2 - viewH / 2) / (viewH / 2)
            const clampedRatio = Math.max(-1, Math.min(1, ratio))

            const inner = el.querySelector<HTMLElement>('.parallax-title-inner')
            if (inner) {
                const translateY = clampedRatio * 50
                const rotateX = clampedRatio * 18
                const translateZ = (1 - Math.abs(clampedRatio)) * 25
                inner.style.transform = `perspective(600px) translateY(${translateY}px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`
            }

            // Animate individual letters' depth on scroll
            const letters = el.querySelectorAll<HTMLElement>('.title-letter')
            letters.forEach((letter, i) => {
                const delay = i * 0.03
                const wave = Math.sin((clampedRatio * Math.PI) + (i * 0.4)) * 8
                letter.style.transform = `translateZ(${20 + wave}px) translateY(${wave * 0.5}px)`
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Split name into individual letters for per-character animation
    const renderLetters = (text: string) => {
        return text.split('').map((char, i) => (
            <span
                key={i}
                className="title-letter inline-block"
                style={{
                    transition: `transform 0.1s ease-out, opacity 0.6s ease-out ${i * 0.05}s, filter 0.6s ease-out ${i * 0.05}s`,
                    opacity: isVisible ? 1 : 0,
                    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                    transformStyle: 'preserve-3d',
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))
    }

    return (
        <div
            ref={titleRef}
            className="relative w-full flex flex-col items-center mb-12"
            style={{ perspective: '800px' }}
        >
            <div
                className="parallax-title-inner flex flex-col items-center gap-4"
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.2s ease-out',
                }}
            >
                {/* Top decorative line — reveal from center */}
                <div
                    className="flex items-center gap-4 w-full max-w-md"
                    style={{
                        transform: 'translateZ(-20px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                        opacity: isVisible ? 1 : 0,
                        ...(isVisible ? {} : { transform: 'translateZ(-20px) scaleX(0)' }),
                    }}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/40 to-red-500/60" />
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500/40 shadow-[0_0_4px_rgba(239,68,68,0.3)]" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-red-500/40 to-red-500/60" />
                </div>

                {/* Title — 3D with per-letter animation */}
                <div className="relative" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
                    {/* Main visible text */}
                    <h2 className="text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-[0.2em] uppercase text-white" style={{ transformStyle: 'preserve-3d', textShadow: '0 0 10px rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.4)' }}>
                        <span
                            className="inline-block text-red-500 mr-1"
                            style={{
                                transition: 'opacity 0.4s ease-out, transform 0.5s ease-out, filter 0.5s ease-out, text-shadow 0.5s ease-out',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0) translateZ(15px)' : 'translateX(-20px) translateZ(15px)',
                                filter: isVisible ? 'blur(0px) drop-shadow(0 0 8px rgba(239,68,68,0.4))' : 'blur(6px)',
                            }}
                        >../</span>
                        {name && renderLetters(name)}
                    </h2>

                    {/* 3D extruded shadow layers for depth */}
                    {[1, 2, 3, 4].map(layer => (
                        <h2
                            key={layer}
                            className="absolute inset-0 text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-[0.2em] uppercase pointer-events-none select-none"
                            aria-hidden="true"
                            style={{
                                transform: `translateZ(${-layer * 6}px) translateY(${layer * 1.5}px)`,
                                color: `rgba(200, 30, 30, ${0.08 - layer * 0.015})`,
                                filter: `blur(${layer * 0.6}px)`,
                                transition: 'opacity 0.8s ease-out',
                                opacity: isVisible ? 1 : 0,
                            }}
                        >
                            <span className="mr-1">../</span>{name}
                        </h2>
                    ))}

                    {/* Front glow layer */}
                    <h2
                        className="absolute inset-0 text-lg md:text-xl lg:text-2xl font-mono font-bold tracking-[0.2em] uppercase text-white/[0.06] blur-md pointer-events-none select-none"
                        aria-hidden="true"
                        style={{
                            transform: 'translateZ(15px)',
                            transition: 'opacity 1s ease-out',
                            opacity: isVisible ? 1 : 0,
                        }}
                    >
                        <span className="mr-1">../</span>{name}
                    </h2>
                </div>

                {/* Bottom accent — reveal */}
                <div
                    className="flex items-center gap-3"
                    style={{
                        transform: 'translateZ(-10px)',
                        transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
                        opacity: isVisible ? 1 : 0,
                        ...(isVisible ? {} : { transform: 'translateZ(-10px) scaleX(0)' }),
                    }}
                >
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/30" />
                    <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-red-500/40 to-red-600/20 shadow-[0_0_6px_rgba(239,68,68,0.15)]" />
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/30" />
                </div>
            </div>
        </div>
    );
};

