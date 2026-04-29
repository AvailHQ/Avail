import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import JoinPilotProgrammePage from './pages/JoinPilotProgrammePage'

export default function App() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/join-pilot-programme" element={<JoinPilotProgrammePage />} />
      </Routes>
      <Footer />
    </div>
  )
}
