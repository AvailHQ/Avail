import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import BookDemoPage from './pages/BookDemoPage'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-demo" element={<BookDemoPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
