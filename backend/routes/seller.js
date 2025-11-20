import express from 'express'
import multer from 'multer'
import Seller from '../models/Seller.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/sellers')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { sellerName, productName, category, email, phone } = req.body
    const logoUrl = req.file ? `/uploads/sellers/${req.file.filename}` : null

    const seller = new Seller({
      sellerName,
      productName,
      category,
      email,
      phone,
      logoUrl,
    })

    await seller.save()

    res.json({
      success: true,
      message: 'Seller registered successfully',
      sellerId: seller._id,
    })
  } catch (error) {
    console.error('Seller registration error:', error)
    res.status(500).json({ message: 'Failed to register seller' })
  }
})

export default router

