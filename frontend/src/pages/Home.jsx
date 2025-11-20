import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GoldParticles from '../components/GoldParticles'

const Home = () => {
  const services = [
    {
      title: 'Custom Packaging',
      description: 'Tailored packaging solutions that reflect your brand identity',
      icon: '📦',
    },
    {
      title: 'Smart Label Design',
      description: 'Professional labels with QR codes and smart features',
      icon: '🏷️',
    },
    {
      title: 'Nutrition/Info Auto-Generator',
      description: 'Automated generation of nutrition facts and product information',
      icon: '📊',
    },
    {
      title: 'Logistics & Delivery Support',
      description: 'End-to-end logistics solutions for seamless delivery',
      icon: '🚚',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <GoldParticles count={30} />
        <div className="absolute inset-0 bg-gradient-to-b from-vistaar-black via-vistaar-black to-vistaar-black/80" />
        
        <motion.div
          className="text-center z-10 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 text-gold-gradient gold-neon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            VISTAAR
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-vistaar-gold mb-4 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering Small Creators with Smart Packaging
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Design • Packaging • Logistics
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/services"
              className="inline-block px-8 py-4 bg-vistaar-gold text-vistaar-black font-semibold rounded-lg gold-border-glow hover:bg-vistaar-gold-light transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-vistaar-gold gold-neon"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-vistaar-black border-2 border-vistaar-gold/30 rounded-lg p-6 hover:border-vistaar-gold hover:gold-border-glow transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-serif font-bold text-vistaar-gold mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

