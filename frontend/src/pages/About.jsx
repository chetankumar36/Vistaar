import { motion } from 'framer-motion'

const About = () => {
  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'VISTAAR was founded with a vision to empower small creators and home businesses.',
    },
    {
      year: '2021',
      title: 'First Milestone',
      description: 'Launched our custom packaging design service, helping 100+ creators.',
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Introduced smart label generation and automated nutrition fact creation.',
    },
    {
      year: '2023',
      title: 'Logistics Integration',
      description: 'Added end-to-end logistics and delivery support for our clients.',
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Serving thousands of creators with premium packaging and logistics solutions.',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: '👨‍🎨',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Logistics Director',
      image: '👩‍💻',
    },
    {
      name: 'David Kim',
      role: 'Tech Lead',
      image: '👨‍💻',
    },
  ]

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="container mx-auto">
        {/* Story Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-vistaar-gold gold-neon">
            Our Story
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              VISTAAR Logistics & Designs was born from a simple observation: small creators and home businesses 
              struggle to compete with established brands due to lack of professional packaging and logistics support.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We believe that every creator deserves access to premium packaging solutions that reflect their 
              brand's unique identity. Our mission is to democratize professional packaging design and logistics, 
              making it accessible and affordable for everyone.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Today, VISTAAR empowers thousands of creators across the globe, helping them present their products 
              with the same level of sophistication as major brands, while maintaining their authentic voice and vision.
            </p>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-vistaar-gold gold-neon">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-vistaar-gold/30" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-20 pb-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute left-6 w-4 h-4 bg-vistaar-gold rounded-full gold-glow" />
                <div className="bg-vistaar-black border-l-2 border-vistaar-gold/30 pl-6 py-4 rounded-r-lg hover:border-vistaar-gold transition-colors">
                  <div className="text-vistaar-gold font-bold text-lg mb-2">{item.year}</div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-vistaar-gold gold-neon">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-vistaar-black border-2 border-vistaar-gold/30 rounded-lg p-6 text-center hover:border-vistaar-gold hover:gold-border-glow transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-serif font-bold text-vistaar-gold mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About

