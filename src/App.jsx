import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParallaxBackground from './components/ParallaxBackground'
import Marquee from './components/Marquee'
import './App.css'

export default function App() {
  return (
    <>
      <ParallaxBackground />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Marquee reverse tag="●" />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
