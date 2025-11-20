import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ProductDemo from './pages/ProductDemo'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { useState, useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-vistaar-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/demo" element={<ProductDemo />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

