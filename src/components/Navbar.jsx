import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Navbar.css'

const navLinks = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'Deneyim', href: '#experience' },
  { label: 'Projeler', href: '#projects' },
  { label: 'İletişim', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -60,
      autoAlpha: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    })

    ScrollTrigger.create({
      start: 60,
      onEnter: () => navRef.current?.classList.add('is-scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('is-scrolled'),
    })
  }, { scope: navRef })

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  const handleNavClick = (event, href) => {
    event.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header ref={navRef} className="navbar" role="banner">
        <div className="container navbar-inner">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Ana sayfaya git"
          >
            <span className="logo-mark">ÖY</span>
            <span className="logo-dot" aria-hidden="true" />
          </a>

          <nav className="navbar-links" aria-label="Ana navigasyon">
            <ul>
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span className="link-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <a
              href="#contact"
              className="navbar-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Çalışalım</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <button
              type="button"
              className={`menu-trigger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="menu-trigger-label">
                <span className="trigger-text-open">Menü</span>
                <span className="trigger-text-close">Kapat</span>
              </span>
              <span className="menu-trigger-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ───── Mobile fullscreen overlay ───── */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigasyon menüsü"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-glow" aria-hidden="true" />

        <div className="mobile-menu-inner">
          <div className="mobile-menu-head">
            <span className="mobile-menu-eyebrow">
              <span className="eyebrow-dot" /> Navigasyon
            </span>
            <span className="mobile-menu-count" aria-hidden="true">
              0{navLinks.length}
            </span>
          </div>

          <nav aria-label="Mobil ana navigasyon">
            <ul className="mobile-menu-list">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="mobile-menu-item"
                  style={{ '--i': index }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="mobile-menu-link"
                  >
                    <span className="mobile-link-num" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="mobile-link-text">{link.label}</span>
                    <span className="mobile-link-arrow" aria-hidden="true">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <a
              href="#contact"
              className="mobile-menu-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Birlikte çalışalım</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <div className="mobile-menu-meta">
              <div className="meta-row">
                <span className="meta-label">E-posta</span>
                <a
                  className="meta-value"
                  href="mailto:omer.yargi@senatech.com.tr"
                >
                  omer.yargi@senatech.com.tr
                </a>
              </div>
              <div className="meta-row">
                <span className="meta-label">Konum</span>
                <span className="meta-value">İstanbul, TR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
