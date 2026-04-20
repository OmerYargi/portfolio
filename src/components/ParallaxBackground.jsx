import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './ParallaxBackground.css'

export default function ParallaxBackground() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const layers = gsap.utils.toArray('.bg-layer', rootRef.current)

    layers.forEach((layer) => {
      const speed = Number(layer.dataset.speed) || 0.2
      gsap.to(layer, {
        yPercent: -60 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })

    const setters = layers.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.3, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.3, ease: 'power3' }),
    }))

    const handlePointer = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      layers.forEach((el, i) => {
        const depth = Number(el.dataset.depth) || 20
        setters[i].x(nx * depth)
        setters[i].y(ny * depth)
      })
    }

    window.addEventListener('pointermove', handlePointer)

    gsap.to('.bg-aurora', {
      backgroundPosition: '200% 0%',
      duration: 30,
      repeat: -1,
      ease: 'none',
    })

    gsap.to('.bg-nebula-1', {
      x: '+=30',
      y: '+=20',
      duration: 9,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.bg-nebula-2', {
      x: '-=40',
      y: '-=28',
      duration: 11,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.bg-nebula-3', {
      x: '+=22',
      y: '-=18',
      duration: 13,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      window.removeEventListener('pointermove', handlePointer)
    }
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className="parallax-bg" aria-hidden="true">
      <div className="bg-aurora" />
      <div className="bg-layer bg-grid" data-speed="0.1" data-depth="12" />
      <div className="bg-layer bg-nebula bg-nebula-1" data-speed="0.25" data-depth="40" />
      <div className="bg-layer bg-nebula bg-nebula-2" data-speed="0.45" data-depth="70" />
      <div className="bg-layer bg-nebula bg-nebula-3" data-speed="0.15" data-depth="26" />
      <div className="bg-layer bg-stars bg-stars-1" data-speed="0.3" data-depth="55" />
      <div className="bg-layer bg-stars bg-stars-2" data-speed="0.55" data-depth="85" />
      <div className="bg-layer bg-stars bg-stars-3" data-speed="0.85" data-depth="120" />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  )
}
