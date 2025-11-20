import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Services = () => {
  const services = [
    {
      title: 'Packaging Design',
      description: 'Our expert designers create custom packaging solutions that perfectly capture your brand identity. From concept to production, we handle every detail to ensure your products stand out.',
      features: [
        'Custom box design',
        'Material selection',
        'Brand color integration',
        '3D mockups',
        'Print-ready files',
      ],
      icon: '📦',
    },
    {
      title: 'Branding & Label Templates',
      description: 'Professional label designs that comply with industry standards. We create templates that are both beautiful and functional, with smart features like QR codes and automated information generation.',
      features: [
        'Custom label design',
        'QR code integration',
        'Nutrition facts generation',
        'Compliance checking',
        'Multiple format exports',
      ],
      icon: '🏷️',
    },
    {
      title: 'Logistics & Shipping Assistance',
      description: 'End-to-end logistics support to ensure your products reach customers safely and on time. We handle everything from packaging optimization to shipping label generation.',
      features: [
        'Shipping optimization',
        'Label printing',
        'Tracking integration',
        'Bulk shipping support',
        'International shipping',
      ],
      icon: '🚚',
    },
  ]

  const ServiceCard = ({ service, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
      <motion.div
        ref={ref}
        className="bg-vistaar-black border-2 border-vistaar-gold/30 rounded-lg p-8 hover:border-vistaar-gold hover:gold-border-glow transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        whileHover={{ y: -10, scale: 1.02 }}
      >
        <div className="text-6xl mb-6">{service.icon}</div>
        <h3 className="text-3xl font-serif font-bold text-vistaar-gold mb-4 gold-neon">
          {service.title}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {service.description}
        </p>
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-400">
              <span className="text-vistaar-gold mr-3">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="container mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-vistaar-gold gold-neon"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Comprehensive solutions for packaging, branding, and logistics
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

