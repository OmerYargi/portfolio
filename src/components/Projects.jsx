import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './Projects.css'

const projects = [
  {
    index: '01',
    title: 'AI Fiyatlandırma Platformu',
    subtitle: 'Senatech / 2024',
    description:
      'Kullanıcıların akıllı telefonlarını satabileceği yapay zeka tabanlı dinamik fiyatlandırma platformu. Cihaz durumuna göre anlık değerleme.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI'],
    color: 'violet',
    href: '#',
  },
  {
    index: '02',
    title: '3D Ürün Konfigüratörü',
    subtitle: 'Ovesis / 2024',
    description:
      'Three.js ile geliştirilen, ürünlerin 3D özelleştirilmesine ve müşteri sitelerine gömülmesine olanak tanıyan embeddable platform.',
    tags: ['Three.js', 'React', 'WebGL'],
    color: 'cyan',
    href: '#',
  },
  {
    index: '03',
    title: 'E-Ticaret & ERP Entegrasyonu',
    subtitle: 'Senatech / 2023 — 2024',
    description:
      'DIA ERP, Ticimax ve Entegra sistemleri ile e-ticaret platformlarını konuşturan entegrasyon katmanı. Stok, sipariş, fatura senkronizasyonu.',
    tags: ['Next.js', 'Fastify', 'PostgreSQL'],
    color: 'pink',
    href: '#',
  },
  {
    index: '04',
    title: 'Kurumsal Web Çözümleri',
    subtitle: 'Çeşitli / 2023 — Şu an',
    description:
      'Performans, erişilebilirlik ve modern UI/UX odaklı kurumsal ve tanıtım web siteleri. Figma\'dan canlıya tüm süreç.',
    tags: ['React', 'Figma', 'Tailwind'],
    color: 'amber',
    href: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.proj-label, .proj-heading, .proj-sub', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.proj-head',
        start: 'top 80%',
      },
    })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      })

      // Inner art parallax
      gsap.to(card.querySelector('.project-art'), {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Giant index counter-parallax inside the art
      gsap.to(card.querySelector('.art-big-index'), {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Grid layer parallax
      gsap.to(card.querySelector('.art-grid'), {
        yPercent: -30,
        xPercent: i % 2 === 0 ? 10 : -10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Card-level vertical float offset based on scroll
      gsap.to(card, {
        yPercent: i % 2 === 0 ? -4 : -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (reduced) return

      // 3D tilt on hover
      card.style.transformStyle = 'preserve-3d'
      card.style.transformPerspective = '1000'
      const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3' })
      const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3' })
      const glow = card.querySelector('.art-glow')
      const glowX = glow ? gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power3' }) : null
      const glowY = glow ? gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power3' }) : null

      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        rotY(nx * 10)
        rotX(-ny * 8)
        if (glowX) {
          glowX(nx * 60)
          glowY(ny * 40)
        }
      }

      const onLeave = () => {
        rotY(0)
        rotX(0)
        if (glowX) {
          glowX(0)
          glowY(0)
        }
      }

      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
    })

    // Ghost watermark
    gsap.fromTo('.proj-ghost', {
      xPercent: 10,
    }, {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Footer CTA
    gsap.from('.proj-cta', {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.proj-cta',
        start: 'top 85%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section projects"
      aria-labelledby="projects-heading"
    >
      <span className="ghost-text proj-ghost" aria-hidden="true">WORKS</span>

      <div className="container">
        <div className="proj-head">
          <span className="section-tag proj-label">
            <span>03</span> / Projeler
          </span>
          <h2 id="projects-heading" className="section-heading proj-heading">
            Üzerinde çalıştığım{' '}
            <span className="accent">seçili işler</span>.
          </h2>
          <p className="proj-sub">
            Farklı sektörlerden, farklı ölçeklerde projeler. Her biri,
            kullanıcı deneyimi ve iş değerine odaklanılarak geliştirildi.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              key={project.index}
              className={`project-card color-${project.color}`}
              data-color={project.color}
            >
              <div className="project-art" aria-hidden="true">
                <div className="art-grid" />
                <div className="art-glow" />
                <span className="art-big-index">{project.index}</span>
                <span className="art-index">{project.index}</span>
              </div>

              <div className="project-body">
                <span className="project-subtitle">{project.subtitle}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="project-arrow" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="proj-cta">
          <p>Başka projeler ve detaylar için doğrudan iletişime geçin.</p>
          <a href="#contact" className="btn btn-ghost">
            <span>Benimle iletişime geç</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
