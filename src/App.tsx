import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'

// Inner pages are split into separate chunks so the home page loads fast on mobile networks.
const AboutPage = lazy(() => import('./pages/AboutPage'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })))
const IndustryDetailPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustryDetailPage })))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CapabilitiesPage = lazy(() => import('./pages/CapabilitiesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Animation features load after first paint; content renders immediately without them.
const loadMotionFeatures = () => import('./utils/motionFeatures').then((m) => m.default)

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="industries" element={<IndustriesPage />} />
              <Route path="industries/:slug" element={<IndustryDetailPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="capabilities" element={<CapabilitiesPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  )
}
