# Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service: `mongod`
- No `.env` changes needed (uses default: `mongodb://localhost:27017/vistaar`)

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get connection string
- Update `backend/.env`:
  ```
  MONGODB_URI=your-mongodb-atlas-connection-string
  ```

### Step 3: Create Backend .env File
```bash
cd backend
cp env.example .env
# Edit .env with your settings (optional: email config)
cd ..
```

### Step 4: Start Development Servers
```bash
npm run dev
```

That's it! 🎉

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📧 Email Setup (Optional)

To enable contact form email notifications:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate app password: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Update `backend/.env`:
     ```
     SMTP_USER=your-email@gmail.com
     SMTP_PASS=your-app-password
     ADMIN_EMAIL=admin@vistaar.com
     ```

2. **Other Email Providers:**
   - Update `SMTP_HOST` and `SMTP_PORT` in `.env`
   - Use appropriate credentials

---

## 🐛 Common Issues

### Canvas Package Installation Fails

**Windows:**
```bash
npm install --global windows-build-tools
npm install
```

**macOS:**
```bash
xcode-select --install
npm install
```

**Linux:**
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
npm install
```

### Port Already in Use

Change ports in:
- `frontend/vite.config.js` (frontend port)
- `backend/.env` (backend port)

### MongoDB Connection Error

- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: whitelist your IP address

---

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js`:
- `vistaar-black`: `#000000`
- `vistaar-gold`: `#D4AF37`

### Fonts
Already configured:
- Headings: Playfair Display
- Body: Inter

Change in `frontend/index.html` and `frontend/tailwind.config.js`

---

## 📦 Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

Frontend build will be in `frontend/dist/`

---

Need help? Check the main [README.md](README.md) for detailed documentation.

