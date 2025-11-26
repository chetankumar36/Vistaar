import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'
import labelRoutes from './routes/label.js'
import sellerRoutes from './routes/seller.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
const frontendDistPath = path.join(__dirname, '../frontend/dist')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// Serve frontend static files
app.use(express.static(frontendDistPath))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vistaar'
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/generate-label', labelRoutes)
app.use('/api/register-seller', sellerRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VISTAAR API is running' })
})

// Fallback: serve index.html for client-side routing (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

