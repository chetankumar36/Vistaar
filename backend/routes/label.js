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
// We'll attempt to import `canvas` lazily inside request handler so startup won't fail

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
    // Try to load canvas lazily (do not fail startup if it's unavailable)
    if (!canvasModule && !canvasError) {
      try {
        const canvas = await import('canvas')
        canvasModule = canvas
        canvasError = null
        console.log('✅ Canvas library loaded successfully')
      } catch (err) {
        canvasModule = null
        canvasError = err
        console.warn('Canvas library not available (will use fallback):', err.message)
      }
    }

    const useCanvas = !!canvasModule && !canvasError

    if (!useCanvas) {
      console.warn('Canvas not available; using PDFKit fallback for label generation')
    }

    const createCanvas = useCanvas ? canvasModule.createCanvas : null
    const loadImage = useCanvas ? canvasModule.loadImage : null

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

    // If canvas is not available, fall back to generating a PDF directly with PDFKit
    if (!useCanvas) {
      try {
        const pdfModule = await import('pdfkit')
        const PDFDocument = pdfModule.default || pdfModule

        const previewDir = path.join(__dirname, '../uploads/previews')
        if (!fs.existsSync(previewDir)) {
          fs.mkdirSync(previewDir, { recursive: true })
        }
        const previewFilename = `preview-${Date.now()}.pdf`
        const previewPath = path.join(previewDir, previewFilename)

        const doc = new PDFDocument({ size: [800, 1000] })
        const writeStream = fs.createWriteStream(previewPath)
        doc.pipe(writeStream)

        // Background
        doc.rect(0, 0, 800, 1000).fill('#FFFFFF')

        // Gold border
        doc.lineWidth(8).strokeColor('#D4AF37').rect(4, 4, 792, 992).stroke()

        let yPos = 50

        // Logo
        if (logoPath && fs.existsSync(logoPath)) {
          try {
            doc.image(logoPath, 50, yPos, { width: 100, height: 100 })
            yPos += 130
          } catch (e) {
            console.error('PDF logo error:', e)
          }
        }

        // Product name
        doc.fillColor('#000000').fontSize(28).text(productName, 50, yPos, { width: 700 })
        yPos += 60

        // Category
        doc.fillColor('#D4AF37').fontSize(18).text(category, 50, yPos)
        yPos += 40

        // Ingredients
        if (ingredients) {
          doc.fillColor('#000000').fontSize(14).text('Ingredients:', 50, yPos)
          yPos += 20
          doc.fontSize(12).text(ingredients, 60, yPos, { width: 680 })
          yPos += 40
        }

        // Nutritional Info
        if (Object.keys(nutritionData).length > 0) {
          doc.fillColor('#000000').fontSize(14).text('Nutrition Facts:', 50, yPos)
          yPos += 20
          Object.entries(nutritionData).forEach(([key, value]) => {
            doc.fontSize(12).text(`${key}: ${value}`, 60, yPos)
            yPos += 18
          })
          yPos += 20
        }

        // QR code
        if (qrCodeDataURL) {
          try {
            const qrBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')
            doc.image(qrBuffer, 50, yPos, { width: 150, height: 150 })
            yPos += 180
          } catch (err) {
            console.error('PDF QR code error:', err)
            yPos += 180
          }
        } else {
          doc.rect(50, yPos, 150, 150).fill('#CCCCCC')
          doc.fillColor('#666666').fontSize(14).text('QR Code', 50, yPos + 65, { width: 150, align: 'center' })
          yPos += 180
        }

        // Footer
        doc.fillColor('#D4AF37').fontSize(12).text('Packaged & Designed by VISTAAR', 0, yPos, { align: 'center' })
        yPos += 20
        doc.fillColor('#000000').fontSize(10).text(`Seller: ${sellerName}`, 0, yPos, { align: 'center' })

        doc.end()

        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve)
          writeStream.on('error', reject)
        })

        const previewUrl = `/uploads/previews/${previewFilename}`
        return res.json({ success: true, previewUrl, message: 'Label generated (PDF fallback)' })
      } catch (pdfErr) {
        console.error('PDF fallback error:', pdfErr)
        return res.status(500).json({ message: 'Failed to generate label: PDF fallback failed', error: pdfErr.message })
      }
    }

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
      // For PDF, we'll use PDFKit to generate PDF (imported as ESM)
      let PDFDocument
      try {
        const pdfModule = await import('pdfkit')
        PDFDocument = pdfModule.default || pdfModule
      } catch (importErr) {
        console.error('PDFKit import failed:', importErr)
        return res.status(500).json({ message: 'PDF generation library not available' })
      }

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

