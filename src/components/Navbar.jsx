import { useRef, useState } from 'react'
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

  const handleNavClick = (event, href) => {
    event.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
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

        <nav
          className={`navbar-links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Ana navigasyon"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="link-number" aria-hidden="true">
                    0{navLinks.indexOf(link) + 1}
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
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
