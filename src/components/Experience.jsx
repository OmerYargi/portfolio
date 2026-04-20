import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './Experience.css'

const experiences = [
  {
    company: 'Senatech',
    role: 'Full Stack Web Developer & Web Designer',
    period: '07.2023 — Şu an',
    location: 'İstanbul, TR',
    status: 'Aktif',
    description: 'Yapay zeka tabanlı dinamik fiyatlandırma sistemine sahip akıllı telefon satış platformunu baştan sona geliştirdim. DIA ERP, Ticimax ve Entegra entegrasyonlarını hayata geçirdim.',
    highlights: [
      'AI tabanlı fiyatlandırma platformu geliştirme',
      'ERP ve e-ticaret entegrasyonları (DIA, Ticimax, Entegra)',
      'E-ticaret web siteleri',
      'Kamera kayıt sistemleri',
      'Performans ve responsive odaklı kurumsal web siteleri',
      'Figma ile UI/UX tasarım süreçleri',
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'Fastify', 'MongoDB', 'PostgreSQL', 'MariaDB', 'Go Lang', 'Figma'],
  },
  {
    company: 'Ovesis',
    role: 'Full Stack Web Developer & Web Designer',
    period: '09.2023 — 11.2024',
    location: 'İstanbul, TR',
    status: 'Tamamlandı',
    description: 'Three.js tabanlı bir 3D ürün görüntüleme ve konfigürasyon platformu tasarladım ve geliştirdim. Müşterilerin ürünleri özelleştirip kendi sitelerine gömmesine olanak tanıyan gömülebilir bir sistem kurdum.',
    highlights: [
      '3D ürün konfigüratörü (Three.js)',
      'Embeddable widget mimarisi',
      'Performans ve responsive odaklı kurumsal web siteleri',
      'Figma ile UI/UX tasarım süreçleri',
    ],
    stack: ['Three.js', 'React', 'WebGL', 'Node.js', 'PostgreSQL'],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.exp-label, .exp-heading, .exp-sub', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-head',
        start: 'top 80%',
      },
    })

    gsap.utils.toArray('.exp-item').forEach((item) => {
      gsap.from(item, {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
        },
      })

      gsap.from(item.querySelectorAll('.exp-highlight-item'), {
        x: -15,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
        },
      })
    })

    // Progress line
    gsap.to('.exp-line-progress', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.exp-list',
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: true,
      },
    })

    // Comet that travels the timeline on scroll
    gsap.fromTo('.exp-comet', {
      top: '0%',
    }, {
      top: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.exp-list',
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: true,
      },
    })

    // Ghost watermark
    gsap.fromTo('.exp-ghost', {
      xPercent: -20,
    }, {
      xPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Card subtle scroll parallax
    gsap.utils.toArray('.exp-card').forEach((card, i) => {
      gsap.to(card, {
        yPercent: i % 2 === 0 ? -6 : -14,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Floating blobs parallax
    gsap.utils.toArray('.exp-blob').forEach((el) => {
      const speed = Number(el.dataset.speed) || 0.25
      gsap.to(el, {
        yPercent: -60 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // 3D tilt on experience cards
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.utils.toArray('.exp-card').forEach((card) => {
      const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' })
      const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' })
      card.style.transformStyle = 'preserve-3d'
      card.style.transformPerspective = '1000'

      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        rotY(nx * 6)
        rotX(-ny * 4)
      }
      const onLeave = () => {
        rotY(0)
        rotX(0)
      }
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
    })
  }, { scope: sectionRef })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section experience"
      aria-labelledby="experience-heading"
    >
      <span className="ghost-text exp-ghost" aria-hidden="true">JOURNEY</span>
      <div className="exp-blob exp-blob-1" data-speed="0.4" aria-hidden="true" />
      <div className="exp-blob exp-blob-2" data-speed="0.25" aria-hidden="true" />

      <div className="container">
        <div className="exp-head">
          <span className="section-tag exp-label">
            <span>02</span> / Deneyim
          </span>
          <h2 id="experience-heading" className="section-heading exp-heading">
            Ürünler inşa ettiğim{' '}
            <span className="accent">şirketler</span>.
          </h2>
          <p className="exp-sub">
            Startuplardan kurumsal şirketlere kadar farklı ölçeklerde
            projelerde yer aldım.
          </p>
        </div>

        <ol className="exp-list" role="list">
          <div className="exp-line" aria-hidden="true">
            <div className="exp-line-progress" />
            <span className="exp-comet" />
          </div>

          {experiences.map((exp) => (
            <li key={exp.company} className="exp-item">
              <div className="exp-marker" aria-hidden="true">
                <span className="marker-ring" />
                <span className="marker-dot" />
              </div>

              <article className="exp-card">
                <header className="exp-card-head">
                  <div className="exp-meta-row">
                    <span className="exp-period">{exp.period}</span>
                    <span
                      className={`exp-status ${
                        exp.status === 'Aktif' ? 'is-active' : ''
                      }`}
                    >
                      {exp.status === 'Aktif' && (
                        <span className="pulse-dot" aria-hidden="true" />
                      )}
                      {exp.status}
                    </span>
                  </div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company-row">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </header>

                <p className="exp-desc">{exp.description}</p>

                <ul className="exp-highlights">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="exp-highlight-item">
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
                        <polyline points="9 11 12 14 20 6" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-stack">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="exp-stack-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
