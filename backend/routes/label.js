import express from 'express'
import multer from 'multer'
import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Canvas module - will be loaded dynamically
let canvasModule = null
let canvasError = null

// Try to load canvas module
try {
  const canvas = await import('canvas')
  canvasModule = canvas
  console.log('✅ Canvas library loaded successfully')
} catch (err) {
  canvasError = err
  console.error('❌ Canvas library not available:', err.message)
  console.error('📦 Please install canvas dependencies:')
  console.error('   Windows: npm install --global windows-build-tools')
  console.error('   macOS: xcode-select --install')
  console.error('   Linux: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev')
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads')
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
    // Check if canvas is available
    if (!canvasModule || canvasError) {
      return res.status(500).json({ 
        message: 'Canvas library is not available. Please install canvas dependencies.',
        details: 'Windows: npm install --global windows-build-tools\nmacOS: xcode-select --install\nLinux: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev',
        error: canvasError?.message
      })
    }

    const { createCanvas, loadImage } = canvasModule

    console.log('Label generation request received')
    console.log('Body:', req.body)
    console.log('File:', req.file)

    const { productName, category, ingredients, nutritionalInfo, sellerName } = req.body
    
    // Validate required fields
    if (!productName || !category || !sellerName) {
      return res.status(400).json({ 
        message: 'Missing required fields: productName, category, and sellerName are required' 
      })
    }

    const logoPath = req.file ? req.file.path : null

    // Parse nutritional info
    let nutritionData = {}
    if (nutritionalInfo) {
      try {
        nutritionData = JSON.parse(nutritionalInfo)
      } catch (e) {
        // If not JSON, create a simple object
        nutritionData = { info: nutritionalInfo }
      }
    }

    // Generate QR code
    let qrCodeDataURL
    try {
      const qrData = JSON.stringify({
        product: productName,
        seller: sellerName,
        category: category,
      })
      qrCodeDataURL = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'M' })
      console.log('QR code generated successfully')
    } catch (qrError) {
      console.error('QR code generation error:', qrError)
      // Continue without QR code if it fails
      qrCodeDataURL = null
    }

    // Create canvas for label
    console.log('Creating canvas...')
    const canvas = createCanvas(800, 1000)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 800, 1000)

    // Gold border
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 8
    ctx.strokeRect(4, 4, 792, 992)

    let yPos = 50

    // Logo (if provided)
    if (logoPath && fs.existsSync(logoPath)) {
      try {
        console.log('Loading logo from:', logoPath)
        const logo = await loadImage(logoPath)
        const logoSize = 100
        ctx.drawImage(logo, 50, yPos, logoSize, logoSize)
        yPos += logoSize + 30
        console.log('Logo loaded successfully')
      } catch (logoError) {
        console.error('Logo loading error:', logoError)
        // Continue without logo
      }
    }

    // Product Name (with text wrapping)
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'left'
    const maxWidth = 700
    const productNameLines = wrapText(ctx, productName, maxWidth)
    productNameLines.forEach(line => {
      ctx.fillText(line, 50, yPos)
      yPos += 55
    })
    yPos += 10

    // Category
    ctx.fillStyle = '#D4AF37'
    ctx.font = 'bold 24px Arial'
    ctx.fillText(category, 50, yPos)
    yPos += 50

    // Ingredients
    if (ingredients) {
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 20px Arial'
      ctx.fillText('Ingredients:', 50, yPos)
      yPos += 30
      ctx.font = '16px Arial'
      const ingredientsList = ingredients.split(',').map(i => i.trim())
      ingredientsList.forEach(ingredient => {
        ctx.fillText(`• ${ingredient}`, 70, yPos)
        yPos += 25
      })
      yPos += 20
    }

    // Nutritional Info
    if (Object.keys(nutritionData).length > 0) {
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 20px Arial'
      ctx.fillText('Nutrition Facts:', 50, yPos)
      yPos += 30
      ctx.font = '16px Arial'
      Object.entries(nutritionData).forEach(([key, value]) => {
        ctx.fillText(`${key}: ${value}`, 70, yPos)
        yPos += 25
      })
      yPos += 20
    }

    // QR Code
    if (qrCodeDataURL) {
      try {
        const qrImage = await loadImage(qrCodeDataURL)
        ctx.drawImage(qrImage, 50, yPos, 150, 150)
        yPos += 180
        console.log('QR code added to canvas')
      } catch (err) {
        console.error('QR code image error:', err)
        yPos += 180
      }
    } else {
      // Draw placeholder if QR code failed
      ctx.fillStyle = '#CCCCCC'
      ctx.fillRect(50, yPos, 150, 150)
      ctx.fillStyle = '#666666'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('QR Code', 125, yPos + 75)
      yPos += 180
    }

    // Footer
    ctx.fillStyle = '#D4AF37'
    ctx.font = 'bold 18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Packaged & Designed by VISTAAR', 400, yPos)
    yPos += 30
    ctx.fillStyle = '#000000'
    ctx.font = '14px Arial'
    ctx.fillText(`Seller: ${sellerName}`, 400, yPos)

    // Save preview
    console.log('Saving preview...')
    const previewDir = path.join(__dirname, '../uploads/previews')
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir, { recursive: true })
    }
    const previewFilename = `preview-${Date.now()}.png`
    const previewPath = path.join(previewDir, previewFilename)
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(previewPath, buffer)
    console.log('Preview saved to:', previewPath)

    const previewUrl = `/uploads/previews/${previewFilename}`

    res.json({
      success: true,
      previewUrl,
      message: 'Label generated successfully',
    })
  } catch (error) {
    console.error('Label generation error:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ 
      message: 'Failed to generate label',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Helper function to wrap text
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + ' ' + word).width
    if (width < maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}


// Download endpoint
router.get('/download/:format', async (req, res) => {
  try {
    const { format } = req.params
    const { previewUrl } = req.query

    if (!previewUrl) {
      return res.status(400).json({ message: 'Preview URL required' })
    }

    const previewPath = path.join(__dirname, '../', previewUrl.replace('/uploads/', 'uploads/'))

    if (!fs.existsSync(previewPath)) {
      return res.status(404).json({ message: 'Preview not found' })
    }

    if (format === 'png') {
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Content-Disposition', `attachment; filename="vistaar-label.png"`)
      const fileBuffer = fs.readFileSync(previewPath)
      res.send(fileBuffer)
    } else if (format === 'pdf') {
      // For PDF, we'll use PDFKit to generate PDF
      const PDFDocument = require('pdfkit')
      const doc = new PDFDocument({ size: [800, 1000] })
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename="vistaar-label.pdf"`)
      doc.pipe(res)
      
      // Add image to PDF from file buffer
      try {
        const imageBuffer = fs.readFileSync(previewPath)
        doc.image(imageBuffer, 0, 0, { width: 800, height: 1000 })
      } catch (err) {
        console.error('PDF image error:', err)
      }
      doc.end()
    } else {
      res.status(400).json({ message: 'Invalid format. Use png or pdf' })
    }
  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ message: 'Failed to download label' })
  }
})

export default router

