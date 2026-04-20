import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Footer.css'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/omeryargi/',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/omeryargi',
  },
  {
    label: 'E-posta',
    href: 'mailto:omeryargi34@gmail.com',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const rootRef = useRef(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.fromTo('.footer-mega', {
      yPercent: 20,
      xPercent: -8,
    }, {
      yPercent: -6,
      xPercent: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    gsap.from('.footer-mega span', {
      yPercent: 100,
      stagger: 0.05,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 90%',
      },
    })
  }, { scope: rootRef })

  const brand = 'OMER YARGI.'

  return (
    <footer ref={rootRef} className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#home" className="footer-logo" aria-label="Ana sayfaya dön">
            <span className="logo-mark">ÖY.</span>
          </a>
          <p className="footer-tagline">
            Full Stack Web Developer. İstanbul, TR.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Sosyal bağlantılar">
          <ul>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-mega-wrap" aria-hidden="true">
        <div className="footer-mega">
          {brand.split('').map((ch, i) => (
            <span key={i}>{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} Ömer Yargı. Tüm hakları saklıdır.</p>
        <p className="footer-built">
          <span className="built-dot" aria-hidden="true" />
          React + GSAP ile inşa edildi
        </p>
      </div>
    </footer>
  )
}
