import { motion } from 'framer-motion'
import GoldParticles from './GoldParticles'

const Footer = () => {
  return (
    <footer className="relative bg-vistaar-black border-t border-vistaar-gold/30 mt-20 overflow-hidden">
      <GoldParticles count={15} />
      
      {/* Gold Wave Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vistaar-gold to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-vistaar-gold gold-glow mb-4">
              VISTAAR
            </h3>
            <p className="text-gray-400 text-sm">
              Empowering Small Creators with Smart Packaging
            </p>
          </div>
          
          <div>
            <h4 className="text-vistaar-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-vistaar-gold transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-vistaar-gold transition-colors">About</a></li>
              <li><a href="/services" className="hover:text-vistaar-gold transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-vistaar-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-vistaar-gold font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: Vistaardesignsandlogistics@gmail.com</li>
              <li>Phone: +91 8073110116</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-vistaar-gold/20 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} VISTAAR Logistics & Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

