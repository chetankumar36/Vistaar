import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const ProductDemo = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    ingredients: '',
    nutritionalInfo: '',
    sellerName: '',
    logo: null,
  })
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = ['Sweet', 'Resin Art', 'Candle', 'Food', 'Beverage', 'Cosmetic', 'Other']

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'logo' && files[0]) {
      setFormData({ ...formData, logo: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        if (key === 'logo' && formData.logo) {
          formDataToSend.append('logo', formData.logo)
        } else {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await axios.post('/api/generate-label', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data.success && response.data.previewUrl) {
        setPreview(response.data.previewUrl)
      } else {
        setError(response.data.message || 'Failed to generate label')
      }
    } catch (err) {
      console.error('Label generation error:', err)
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Failed to generate label. Please check the console for details.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format) => {
    if (!preview) return

    try {
      const response = await axios.get(`/api/generate-label/download/${format}`, {
        params: { previewUrl: preview },
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `vistaar-label.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      setError('Failed to download label')
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        <motion.h1
          className="text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-vistaar-gold gold-neon"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Product Demo
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="bg-vistaar-black border-2 border-vistaar-gold/30 rounded-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-serif font-bold text-vistaar-gold mb-6">
              Upload Product Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-vistaar-gold mb-2">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
                />
              </div>

              <div>
                <label className="block text-vistaar-gold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-vistaar-gold mb-2">Ingredients</label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
                  placeholder="List ingredients separated by commas"
                />
              </div>

              <div>
                <label className="block text-vistaar-gold mb-2">Nutritional Info (JSON format)</label>
                <textarea
                  name="nutritionalInfo"
                  value={formData.nutritionalInfo}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow font-mono text-sm"
                  placeholder='{"calories": 100, "protein": "5g", "carbs": "20g", "fat": "2g"}'
                />
              </div>

              <div>
                <label className="block text-vistaar-gold mb-2">Seller Name *</label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white focus:border-vistaar-gold focus:outline-none focus:gold-border-glow"
                />
              </div>

              <div>
                <label className="block text-vistaar-gold mb-2">Logo (Optional)</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full px-4 py-2 bg-vistaar-black border border-vistaar-gold/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-vistaar-black file:bg-vistaar-gold file:cursor-pointer hover:file:bg-vistaar-gold-light"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-vistaar-gold text-vistaar-black font-semibold rounded-lg gold-border-glow hover:bg-vistaar-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Label Preview'}
              </button>
            </form>
          </motion.div>

          {/* Preview */}
          <motion.div
            className="bg-vistaar-black border-2 border-vistaar-gold/30 rounded-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-serif font-bold text-vistaar-gold mb-6">
              Label Preview
            </h2>
            {preview ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border-2 border-vistaar-gold">
                  <img src={preview} alt="Label Preview" className="w-full rounded" />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload('png')}
                    className="flex-1 px-4 py-2 bg-vistaar-gold text-vistaar-black font-semibold rounded-lg hover:bg-vistaar-gold-light transition-colors"
                  >
                    Download PNG
                  </button>
                  <button
                    onClick={() => handleDownload('pdf')}
                    className="flex-1 px-4 py-2 bg-vistaar-gold text-vistaar-black font-semibold rounded-lg hover:bg-vistaar-gold-light transition-colors"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-vistaar-gold/30 rounded-lg">
                <p className="text-gray-500">Submit the form to generate a label preview</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDemo

