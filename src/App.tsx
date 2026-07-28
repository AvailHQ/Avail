import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import ConsentAwareVercelAnalytics from './components/ConsentAwareVercelAnalytics'

import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import JoinPilotProgrammePage from './pages/JoinPilotProgrammePage'
import PrivacyPage from './pages/PrivacyPage'

export default function App() {
  return (
    <div className="overflow-x-clip">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/join-pilot-programme" element={<JoinPilotProgrammePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
      <CookieConsent />
      <ConsentAwareVercelAnalytics />
    </div>
  )
}
