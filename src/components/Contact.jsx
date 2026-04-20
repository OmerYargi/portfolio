import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './Contact.css'

const channels = [
  {
    label: 'E-posta',
    value: 'omeryargi34@gmail.com',
    href: 'mailto:omeryargi34@gmail.com',
  },
  {
    label: 'Telefon',
    value: '+90 540 256 50 00',
    href: 'tel:+905402565000',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/omeryargi',
    href: 'https://www.linkedin.com/in/omeryargi/',
  },
  {
    label: 'Konum',
    value: 'İstanbul, Türkiye',
    href: null,
  },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-card',
        start: 'top 80%',
      },
    })

    tl.from('.contact-label, .contact-heading, .contact-sub', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    })
      .from('.contact-cta-primary', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.channel-item', {
        x: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.6')

    // Multi-layer parallax
    gsap.to('.contact-orb', {
      yPercent: -45,
      xPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.contact-orb-2', {
      yPercent: -70,
      xPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.fromTo('.contact-ghost', {
      xPercent: -15,
    }, {
      xPercent: 20,
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Card subtle tilt
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const card = sectionRef.current.querySelector('.contact-card')
    if (!card) return
    card.style.transformStyle = 'preserve-3d'
    card.style.transformPerspective = '1400'
    const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.9, ease: 'power3' })
    const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.9, ease: 'power3' })

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      rotY(nx * 5)
      rotX(-ny * 3)
    }
    const onLeave = () => {
      rotY(0)
      rotX(0)
    }
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
  }, { scope: sectionRef })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact-orb" aria-hidden="true" />
      <div className="contact-orb contact-orb-2" aria-hidden="true" />
      <span className="ghost-text contact-ghost" aria-hidden="true">LET'S TALK</span>

      <div className="container">
        <div className="contact-card">
          <div className="contact-content">
            <span className="section-tag contact-label">
              <span>04</span> / İletişim
            </span>
            <h2 id="contact-heading" className="section-heading contact-heading">
              Bir sonraki projeni{' '}
              <span className="accent">birlikte inşa edelim</span>.
            </h2>
            <p className="contact-sub">
              Freelance proje, tam zamanlı pozisyon veya sadece bir merhaba
              için çekinmeden yazabilirsin. Genellikle 24 saat içinde dönüş
              yaparım.
            </p>

            <a
              href="mailto:omeryargi34@gmail.com"
              className="btn btn-primary contact-cta-primary"
            >
              <span>E-posta Gönder</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <aside className="contact-channels" aria-label="İletişim kanalları">
            <h3 className="channels-title">Kanallar</h3>
            <ul>
              {channels.map((channel) => (
                <li key={channel.label} className="channel-item">
                  <span className="channel-label">{channel.label}</span>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="channel-value"
                    >
                      {channel.value}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </a>
                  ) : (
                    <span className="channel-value is-plain">{channel.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
