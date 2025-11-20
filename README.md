# VISTAAR Logistics & Designs

A premium, luxury-branded website for VISTAAR Logistics & Designs - empowering small creators with smart packaging solutions.

## 🎨 Features

- **Premium Black & Gold Theme** - Elegant luxury branding throughout
- **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion powered animations and transitions
- **Product Label Generator** - Generate professional labels with QR codes
- **Contact Form** - Integrated contact form with email notifications
- **Modern Tech Stack** - React + Vite frontend, Node.js + Express backend

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (file uploads)
- Canvas (image generation)
- PDFKit (PDF generation)
- QRCode (QR code generation)
- Nodemailer (email notifications)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd Vistaar
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This will install dependencies for root, frontend, and backend.

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vistaar
   
   # Optional: Email configuration for contact form notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=admin@vistaar.com
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using a local instance:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in `.env`.

## 🎯 Running the Application

### Development Mode (Both Frontend & Backend)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`

### Run Separately

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Production Build

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the backend:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
Vistaar/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── GoldParticles.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ProductDemo.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   │   ├── Contact.js
│   │   └── Seller.js
│   ├── routes/
│   │   ├── contact.js
│   │   ├── label.js
│   │   └── seller.js
│   ├── server.js
│   ├── package.json
│   └── .env (create this)
├── package.json
└── README.md
```

## 🎨 Pages

1. **Home** - Hero section with floating gold particles, services overview
2. **About** - Company story, timeline, and team members
3. **Services** - Detailed service offerings with animations
4. **Product Demo** - Label generation form with preview and download
5. **Contact** - Contact form with email notifications

## 🔌 API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/generate-label` - Generate product label
- `GET /api/download-label/:format` - Download label (PNG/PDF)
- `POST /api/register-seller` - Register a new seller
- `GET /api/health` - Health check

## 🎨 Design Features

- **Gold Particles Animation** - Floating particles on hero and footer
- **Smooth Scroll Animations** - Elements animate on scroll
- **Gold Glow Effects** - Hover effects with gold neon glow
- **Responsive Navbar** - Sticky navbar with gold underline animation
- **Loading Screen** - Elegant gold rotating ring loader
- **Premium Typography** - Playfair Display for headings, Inter for body

## 📝 Notes

- The `canvas` package requires native dependencies. On Windows, you may need to install build tools.
- For email notifications, configure SMTP settings in `.env`. Gmail requires an app-specific password.
- Uploaded files are stored in `backend/uploads/` directory.
- MongoDB connection string can be local or cloud (MongoDB Atlas).

## 🐛 Troubleshooting

**Canvas installation issues:**
```bash
# Windows
npm install --global windows-build-tools

# macOS
xcode-select --install

# Linux
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

**MongoDB connection issues:**
- Ensure MongoDB is running
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

**Port already in use:**
- Change ports in `vite.config.js` (frontend) and `.env` (backend)

## 📄 License

MIT License - feel free to use this project for your startup!

## 🙏 Support

For issues or questions, please contact: info@vistaar.com

---

**Built with ❤️ for VISTAAR Logistics & Designs**

