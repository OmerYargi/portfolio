import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initial state for dramatic entry
    gsap.set('.hero-name .char', {
      yPercent: 130,
      rotateX: -80,
      scale: 0.6,
      filter: 'blur(14px)',
      transformOrigin: '50% 100% -40px',
    })
    gsap.set('.hero-name-shine', {
      xPercent: -120,
      skewX: -18,
    })
    gsap.set('.hero-title .word', {
      yPercent: 110,
      rotate: 4,
      filter: 'blur(8px)',
    })
    gsap.set('.hero-title .word.hl', {
      '--hl-fill': '0%',
    })

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: reduced ? 0 : 0.9 },
      delay: reduced ? 0 : 0.25,
    })

    tl.from('.hero-tag', {
        y: 20,
        autoAlpha: 0,
        filter: 'blur(6px)',
        duration: 0.7,
      })
      .to('.hero-name .char', {
        yPercent: 0,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: {
          each: 0.04,
          from: 'start',
        },
        duration: 1.4,
        ease: 'expo.out',
      }, '-=0.3')
      .to('.hero-name .line:last-child .char:last-child', {
        keyframes: [
          { scale: 1.25, rotate: -8, duration: 0.25, ease: 'back.out(3)' },
          { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        ],
      }, '-=0.3')
      .to('.hero-name-shine', {
        xPercent: 220,
        duration: 1.3,
        ease: 'power2.inOut',
      }, '-=0.9')
      .to('.hero-title .word', {
        yPercent: 0,
        rotate: 0,
        filter: 'blur(0px)',
        stagger: 0.065,
        duration: 1,
        ease: 'expo.out',
      }, '-=1.0')
      .to('.hero-title .word.hl', {
        '--hl-fill': '100%',
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.inOut',
      }, '-=0.7')
      .from('.hero-desc', {
        y: 24,
        autoAlpha: 0,
        filter: 'blur(6px)',
        duration: 0.9,
      }, '-=0.9')
      .from('.hero-ctas > *', {
        y: 28,
        autoAlpha: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.6)',
      }, '-=0.6')
      .from('.hero-meta-item', {
        autoAlpha: 0,
        y: 18,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.4')
      .from('.hero-aside > *', {
        autoAlpha: 0,
        x: 60,
        rotateY: -15,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=1.2')
      .from('.hero-scroll', {
        autoAlpha: 0,
        y: -12,
        duration: 0.5,
      }, '-=0.2')

    if (!reduced) {
      // Repeating shine sweep across the name
      gsap.to('.hero-name-shine', {
        xPercent: 220,
        repeat: -1,
        repeatDelay: 5,
        duration: 1.8,
        ease: 'power2.inOut',
        delay: 3,
      })

      // Idle subtle float on the last accent char (the dot)
      gsap.to('.hero-name .line:last-child .char:last-child', {
        y: -6,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      })

      // Hover interaction: each char lifts + accent color
      const chars = gsap.utils.toArray('.hero-name .char')
      chars.forEach((ch) => {
        ch.addEventListener('pointerenter', () => {
          gsap.to(ch, {
            y: -14,
            scale: 1.15,
            color: '#a78bfa',
            duration: 0.4,
            ease: 'back.out(2)',
            overwrite: true,
          })
        })
        ch.addEventListener('pointerleave', () => {
          gsap.to(ch, {
            y: 0,
            scale: 1,
            color: '',
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            overwrite: true,
          })
        })
      })
    }

    if (reduced) return

    // Parallax background
    gsap.to('.hero-grid', {
      yPercent: 35,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.shape-orb-1', {
      yPercent: 90,
      xPercent: -25,
      rotate: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to('.shape-orb-2', {
      yPercent: 140,
      xPercent: 20,
      rotate: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to('.shape-line', {
      yPercent: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    gsap.to('.hero-content', {
      yPercent: 14,
      autoAlpha: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Ghost watermark drifts and slightly rotates on scroll
    gsap.fromTo('.hero-ghost', {
      xPercent: -10,
    }, {
      xPercent: 25,
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Aside cards subtle counter-parallax
    gsap.to('.hero-aside', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Continuous floating
    gsap.to('.shape-orb-1', {
      y: '+=18',
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.shape-orb-2', {
      y: '-=24',
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Mouse-reactive parallax shapes
    const floats = gsap.utils.toArray('.hero-float')
    const setters = floats.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3' }),
    }))

    // 3D tilt for the code window
    const codeWindow = heroRef.current.querySelector('.code-window')
    const tiltX = codeWindow ? gsap.quickTo(codeWindow, 'rotationY', { duration: 0.8, ease: 'power3' }) : null
    const tiltY = codeWindow ? gsap.quickTo(codeWindow, 'rotationX', { duration: 0.8, ease: 'power3' }) : null
    const tiltZ = codeWindow ? gsap.quickTo(codeWindow, 'y', { duration: 0.8, ease: 'power3' }) : null

    const handlePointer = (e) => {
      const rect = heroRef.current.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      floats.forEach((el, i) => {
        const depth = Number(el.dataset.depth) || 40
        setters[i].x(nx * depth)
        setters[i].y(ny * depth)
      })
      if (tiltX) {
        tiltX(nx * 14)
        tiltY(-ny * 10)
        tiltZ(ny * 6)
      }
    }

    window.addEventListener('pointermove', handlePointer)

    // Idle breathing drift so shapes feel alive without a pointer
    floats.forEach((el, i) => {
      gsap.to(el, {
        rotate: i % 2 === 0 ? '+=14' : '-=14',
        duration: 6 + (i % 4),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    // Entry fade for the decorative shapes
    gsap.from('.hero-float', {
      autoAlpha: 0,
      scale: 0.6,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    })

    return () => {
      window.removeEventListener('pointermove', handlePointer)
    }

    // Scroll indicator
    gsap.to('.scroll-track-line', {
      scaleY: 1,
      transformOrigin: 'top',
      duration: 1.6,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
    })
  }, { scope: heroRef })

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="char" aria-hidden="true">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <section id="home" ref={heroRef} className="hero" aria-label="Giriş">
      <span className="ghost-text hero-ghost" aria-hidden="true">PORTFOLIO</span>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-radial" />
        <div className="shape-orb shape-orb-1" />
        <div className="shape-orb shape-orb-2" />
        <div className="shape-line shape-line-1" />
        <div className="shape-line shape-line-2" />

        <div className="hero-float hero-float-orb hf-magenta" data-depth="70" />
        <div className="hero-float hero-float-orb hf-blue" data-depth="95" />
        <div className="hero-float hero-float-ring" data-depth="55" />
        <div className="hero-float hero-float-square" data-depth="45" />
        <div className="hero-float hero-float-dot hf-dot-1" data-depth="110" />
        <div className="hero-float hero-float-dot hf-dot-2" data-depth="130" />
        <div className="hero-float hero-float-plus" data-depth="80">
          <span />
          <span />
        </div>
        <div className="hero-float hero-float-triangle" data-depth="60">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <polygon points="20,4 36,34 4,34" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-tag section-tag">
            <span className="tag-dot" aria-hidden="true" />
            Full Stack Developer / İstanbul
          </span>

          <h1 className="hero-name">
            <span className="sr-only">Ömer Yargı</span>
            <span className="line">
              <span className="line-inner">{splitText('ÖMER')}</span>
            </span>
            <span className="line">
              <span className="line-inner">{splitText('YARGI.')}</span>
            </span>
            <span className="hero-name-shine" aria-hidden="true" />
          </h1>

          <p className="hero-title" aria-label="Modern web deneyimleri tasarlıyor ve geliştiriyorum.">
            <span className="word-wrap"><span className="word">Modern</span></span>{' '}
            <span className="word-wrap"><span className="word">web</span></span>{' '}
            <span className="word-wrap"><span className="word">deneyimleri</span></span>{' '}
            <span className="word-wrap"><span className="word hl" data-text="tasarlıyor">tasarlıyor</span></span>{' '}
            <span className="word-wrap"><span className="word">ve</span></span>{' '}
            <span className="word-wrap"><span className="word hl" data-text="geliştiriyorum">geliştiriyorum</span></span>
            <span className="word-wrap"><span className="word">.</span></span>
          </p>

          <p className="hero-desc">
            React, Next.js ve Node.js ekosisteminde, yapay zeka ve 3D
            teknolojileri entegre eden ölçeklenebilir ürünler inşa ediyorum.
            Fikirden canlıya, tüm süreci tek elden yönetiyorum.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              <span>Projelerimi Gör</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost">
              <span>İletişime Geç</span>
            </a>
          </div>

          <dl className="hero-meta">
            <div className="hero-meta-item">
              <dt>Durum</dt>
              <dd className="meta-status">
                <span className="status-dot" aria-hidden="true" />
                Freelance projelere açık
              </dd>
            </div>
            <div className="hero-meta-item">
              <dt>Deneyim</dt>
              <dd>2+ yıl profesyonel</dd>
            </div>
            <div className="hero-meta-item">
              <dt>Odak</dt>
              <dd>React · Next · Node · Three.js</dd>
            </div>
          </dl>
        </div>

        <aside className="hero-aside" aria-hidden="true">
          <div className="code-window">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="code-filename">developer.ts</span>
            </div>
            <pre className="code-body">
<span className="c-keyword">const</span> <span className="c-var">omer</span> = {'{'}
  <span className="c-prop">name</span>: <span className="c-str">'Ömer Yargı'</span>,
  <span className="c-prop">role</span>: <span className="c-str">'Full Stack Dev'</span>,
  <span className="c-prop">stack</span>: [<span className="c-str">'React'</span>, <span className="c-str">'Node'</span>, <span className="c-str">'Three'</span>],
  <span className="c-prop">available</span>: <span className="c-bool">true</span>,
  <span className="c-prop">contact</span>() {'{'}
    <span className="c-keyword">return</span> <span className="c-str">'omeryargi34@gmail.com'</span>;
  {'}'}
{'}'};
            </pre>
          </div>

          <div className="stat-card">
            <span className="stat-number">3+</span>
            <span className="stat-label">Yıl Deneyim</span>
          </div>
          <div className="stat-card stat-card-2">
            <span className="stat-number">20+</span>
            <span className="stat-label">Tamamlanan Proje</span>
          </div>
        </aside>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Aşağı kaydır">
        <span className="scroll-label">Kaydır</span>
        <span className="scroll-track" aria-hidden="true">
          <span className="scroll-track-line" />
        </span>
      </a>
    </section>
  )
}
