import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/demo', label: 'Product Demo' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-vistaar-black/95 backdrop-blur-sm border-b border-vistaar-gold/30"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.h1
            className="text-2xl font-serif font-bold text-vistaar-gold gold-glow"
            whileHover={{ scale: 1.05 }}
          >
            VISTAAR
          </motion.h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
            >
              <span className="text-white hover:text-vistaar-gold transition-colors duration-300">
                {item.label}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vistaar-gold gold-glow"
                  layoutId="underline"
                />
              )}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vistaar-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-vistaar-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-vistaar-gold/30 bg-vistaar-black/98"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-vistaar-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

