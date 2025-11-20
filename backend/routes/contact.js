import express from 'express'
import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

const router = express.Router()

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    })
    await contact.save()

    // Send email notification
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }

      await transporter.sendMail(mailOptions)
    }

    res.json({ success: true, message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
})

export default router

