import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Marquee.css'

const words = [
  'React',
  'Next.js',
  'Node',
  'Three.js',
  'TypeScript',
  'GSAP',
  'MongoDB',
  'PostgreSQL',
  'AI',
  'WebGL',
  'UI / UX',
]

export default function Marquee({ reverse = false, tag = '✦' }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const track = rootRef.current.querySelector('.marquee-track')
    const dir = reverse ? 1 : -1

    const base = gsap.to(track, {
      xPercent: dir * 50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    if (reduced) return

    // Scroll-velocity reactive skew + speed boost
    let lastScroll = 0
    let baseTimeScale = 1

    const onScroll = () => {
      const vel = ScrollTrigger.getScrollFunc()() - lastScroll
      lastScroll = ScrollTrigger.getScrollFunc()()
      gsap.to(track, {
        skewX: gsap.utils.clamp(-10, 10, vel * 0.12 * dir),
        duration: 0.4,
        ease: 'power3',
        overwrite: true,
      })
      const targetScale = 1 + Math.min(Math.abs(vel) * 0.02, 4)
      gsap.to(base, { timeScale: targetScale, duration: 0.25, overwrite: true })
      gsap.to(base, { timeScale: baseTimeScale, duration: 1.2, delay: 0.25, overwrite: 'auto' })
    }

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: onScroll,
    })

    return () => {
      st.kill()
      base.kill()
    }
  }, { scope: rootRef })

  const items = [...words, ...words, ...words]

  return (
    <div ref={rootRef} className={`marquee ${reverse ? 'is-reverse' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {items.map((word, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-word">{word}</span>
            <span className="marquee-sep">{tag}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
