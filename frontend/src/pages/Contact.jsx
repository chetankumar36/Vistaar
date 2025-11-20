import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post('/api/contact', formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="container mx-auto max-w-2xl">
        <motion.h1
          className="text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-vistaar-gold gold-neon"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>

        <motion.div
          className="bg-vistaar-black border-2 border-vistaar-gold rounded-lg p-8 gold-border-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-vistaar-gold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
              />
            </div>

            <div>
              <label className="block text-vistaar-gold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
              />
            </div>

            <div>
              <label className="block text-vistaar-gold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
              />
            </div>

            <div>
              <label className="block text-vistaar-gold mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="text-vistaar-gold text-sm bg-vistaar-gold/10 border border-vistaar-gold/30 rounded-lg p-3">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-vistaar-gold text-vistaar-black font-semibold rounded-lg gold-border-glow hover:bg-vistaar-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-4">Or reach us directly:</p>
          <div className="space-y-2">
            <p className="text-vistaar-gold">Email: Vistaardesignsandlogistics@gmail.com</p>
            <p className="text-vistaar-gold">Phone: +91 8073110116</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

