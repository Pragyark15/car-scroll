import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import car from './assets/car.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stats = [
  { value: '58%', text: 'Increase in pick up point use' },
  { value: '23%', text: 'Decrease in customer phone calls' },
  { value: '27%', text: 'Increase in pick up point use' },
  { value: '40%', text: 'Decrease in customer phone calls' },
]

// Direction the car's nose faces while driving DOWN.
// If the car looks like it drives backwards, change 90 to -90.
const HEADING = 90

export default function App() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.set('.car-wrap', { xPercent: -50, yPercent: -50, rotate: HEADING })

      // Intro on load: car fades in at the top
      gsap.from('.car', { opacity: 0, scale: 0.85, duration: 1.2, ease: 'power3.out' })

      // Scroll sequence, tied to scroll progress
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=400%',
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      scrollTl
        // Step 1: car drives from top down to the middle
        .fromTo(
          '.car-wrap',
          { y: '-38vh', scale: 0.8 },
          { y: '0vh', scale: 1, ease: 'none', duration: 3 }
        )
        // Step 2: headline appears
        .fromTo(
          '.headline-wrap',
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 1 }
        )
        // Step 3: stats appear one by one
        .fromTo(
          '.stat',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 1, stagger: 1 }
        )
    },
    { scope: root }
  )

  return (
    <main ref={root}>
      <section className="hero relative h-screen overflow-hidden bg-[#05060f] text-white">
        {/* Background glow: purple center, warm orange bottom */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.22),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.18),transparent_55%)]" />

        {/* Car: sized by screen height so it never overlaps the text */}
        <div className="car-wrap absolute left-1/2 top-1/2 z-0 w-[min(30rem,38vh)] will-change-transform">
          <img src={car} alt="Car top view" className="car car-glow w-full" />
        </div>

        {/* Headline (above the car) */}
        <div className="headline-wrap absolute top-8 z-10 w-full will-change-transform md:top-10">
          <h1 className="headline headline-gradient font-display text-center text-xl font-black tracking-[0.35em] md:text-5xl md:tracking-[0.5em]">
            WELCOME ITZFIZZ
          </h1>
        </div>

        {/* Stats (above the car) */}
        <div className="stats-wrap absolute bottom-6 z-10 w-full md:bottom-8">
          <div className="grid grid-cols-2 gap-3 px-4 text-center md:grid-cols-4 md:gap-6 md:px-16">
            {stats.map((s) => (
              <div
                key={s.text + s.value}
                className="stat rounded-2xl border border-amber-300/20 bg-white/5 px-3 py-3 backdrop-blur-sm will-change-transform"
              >
                <p className="stat-gradient font-display text-2xl font-black md:text-4xl">
                  {s.value}
                </p>
                <p className="font-body mt-1 text-sm font-medium tracking-wide text-slate-300 md:text-base">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}