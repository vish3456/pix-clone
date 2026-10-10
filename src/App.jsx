import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

// Lazy-load below-fold sections for faster initial paint
const Showcase = lazy(() => import('./components/Showcase'))
const AboutIntro = lazy(() => import('./components/AboutIntro'))
const DigitalServices = lazy(() => import('./components/DigitalServices'))
const RecentProjects = lazy(() => import('./components/RecentProjects'))
const AgencyVision = lazy(() => import('./components/AgencyVision'))
const Counters = lazy(() => import('./components/Counters'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const BrandMarquee = lazy(() => import('./components/BrandMarquee'))
const HowWeWork = lazy(() => import('./components/HowWeWork'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const BlogSection = lazy(() => import('./components/BlogSection'))
const Awards = lazy(() => import('./components/Awards'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Showcase />
          <AboutIntro />
          <DigitalServices />
          <RecentProjects />
          <AgencyVision />
          <Counters />
          <Testimonials />
          <BrandMarquee />
          <HowWeWork />
          <TeamSection />
          <BlogSection />
          <Awards />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
