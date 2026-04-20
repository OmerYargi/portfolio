import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './About.css'

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'Sass', 'HTML / CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Fastify', 'REST API', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: '3D & Araçlar',
    items: ['Three.js', 'Figma', 'Git', 'Jira', 'GitLab', 'Pug / EJS'],
  },
]

const highlights = [
  {
    value: '20+',
    label: 'Tamamlanan Proje',
    note: 'Kurumsal, e-ticaret ve SaaS ürünleri',
  },
  {
    value: '3+',
    label: 'Yıl Deneyim',
    note: 'Freelance & tam zamanlı',
  },
  {
    value: '∞',
    label: 'Öğrenme İsteği',
    note: 'Yeni teknolojilere açık',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.about-label, .about-heading, .about-text p', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-intro',
        start: 'top 80%',
      },
    })

    gsap.from('.highlight-card', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-highlights',
        start: 'top 80%',
      },
    })

    gsap.from('.skill-group', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills',
        start: 'top 80%',
      },
    })

    ScrollTrigger.batch('.skill-pill', {
      interval: 0.05,
      batchMax: 6,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
      start: 'top 85%',
    })

    gsap.set('.skill-pill', { y: 20, autoAlpha: 0 })

    // Parallax decoration
    gsap.to('.about-blob', {
      yPercent: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Ghost watermark
    gsap.fromTo('.about-ghost', {
      xPercent: 15,
    }, {
      xPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Floating orbs counter-scroll
    gsap.utils.toArray('.about-float').forEach((el) => {
      const speed = Number(el.dataset.speed) || 0.2
      gsap.to(el, {
        yPercent: -80 * speed,
        xPercent: (Math.random() - 0.5) * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Highlight cards subtle layered parallax
    gsap.utils.toArray('.highlight-card').forEach((card, i) => {
      gsap.to(card, {
        yPercent: (i % 2 === 0 ? -8 : -16),
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-highlights',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Mouse reactive decoration
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const floats = gsap.utils.toArray('.about-float')
    const setters = floats.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.3, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.3, ease: 'power3' }),
    }))

    const onPointer = (e) => {
      const rect = sectionRef.current.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      floats.forEach((el, i) => {
        const depth = Number(el.dataset.depth) || 30
        setters[i].x(nx * depth)
        setters[i].y(ny * depth)
      })
    }

    sectionRef.current.addEventListener('pointermove', onPointer)
    return () => sectionRef.current?.removeEventListener('pointermove', onPointer)
  }, { scope: sectionRef })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section about"
      aria-labelledby="about-heading"
    >
      <div className="about-blob" aria-hidden="true" />
      <span className="ghost-text about-ghost" aria-hidden="true">ABOUT</span>

      <div className="about-float about-float-ring" data-speed="0.3" data-depth="55" aria-hidden="true" />
      <div className="about-float about-float-dot about-float-dot-1" data-speed="0.45" data-depth="70" aria-hidden="true" />
      <div className="about-float about-float-dot about-float-dot-2" data-speed="0.7" data-depth="90" aria-hidden="true" />
      <div className="about-float about-float-square" data-speed="0.2" data-depth="35" aria-hidden="true" />
      <div className="about-float about-float-cross" data-speed="0.35" data-depth="50" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="container">
        <div className="about-intro">
          <span className="section-tag about-label">
            <span>01</span> / Hakkımda
          </span>
          <h2 id="about-heading" className="section-heading about-heading">
            Fikri çalışan bir ürüne dönüştüren{' '}
            <span className="accent">geliştiriciyim</span>.
          </h2>

          <div className="about-text">
            <p>
              Yenilikçi ve çözüm odaklı bir Full Stack Web Developer olarak,
              modern teknolojilerle kullanıcı dostu ve ölçeklenebilir web
              uygulamaları geliştiriyorum. Zaman zaman web tasarımcısı olarak
              da çalışıyor; projelerin analiz ve tasarımından dağıtım ve
              üretime kadar her aşamasında aktif rol alıyorum.
            </p>
            <p>
              Yapay zeka tabanlı platformlar, 3D ürün konfiguratörleri,
              e-ticaret sistemleri ve kurumsal web çözümleri üzerine çalıştım.
              UI/UX kalitesine, performansa ve sürdürülebilir koda önem
              veririm.
            </p>
          </div>
        </div>

        <div className="about-highlights">
          {highlights.map((item) => (
            <div key={item.label} className="highlight-card">
              <span className="highlight-value">{item.value}</span>
              <span className="highlight-label">{item.label}</span>
              <span className="highlight-note">{item.note}</span>
            </div>
          ))}
        </div>

        <div className="skills">
          <div className="skills-head">
            <span className="section-tag">Teknoloji Yığını</span>
            <h3 className="skills-heading">
              Günlük kullandığım araçlar
            </h3>
          </div>

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <h4 className="skill-group-title">
                  <span className="skill-dot" aria-hidden="true" />
                  {group.title}
                </h4>
                <ul className="skill-pills">
                  {group.items.map((skill) => (
                    <li key={skill} className="skill-pill">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
