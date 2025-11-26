# Troubleshooting Guide - Label Generation

## Common Issues and Solutions

### Issue: "Failed to generate label" Error

#### 1. Canvas Library Not Installed

**Symptoms:**
- Error message: "Failed to generate label"
- Backend console shows: "Cannot find module 'canvas'"

**Solution:**

The `canvas` package requires native dependencies. Install them based on your OS:

**Windows:**
```bash
npm install --global windows-build-tools
cd backend
npm install canvas
```

**macOS:**
```bash
xcode-select --install
cd backend
npm install canvas
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
cd backend
npm install canvas
```

**Linux (Fedora/RHEL):**
```bash
sudo yum install cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
cd backend
npm install canvas
```

#### 2. Check Backend Console

The backend now logs detailed information. Check your terminal where the backend is running:

```bash
# You should see logs like:
Label generation request received
Body: { productName: '...', category: '...', ... }
Creating canvas...
QR code generated successfully
Preview saved to: ...
```

If you see errors, they will help identify the issue.

#### 3. Missing Required Fields

**Error:** "Missing required fields: productName, category, and sellerName are required"

**Solution:** Make sure all required fields in the form are filled:
- Product Name ✓
- Category ✓
- Seller Name ✓

#### 4. File Upload Issues

**Symptoms:**
- Logo upload fails
- Error when processing logo

**Solution:**
- Check that `backend/uploads/` directory exists and is writable
- Try without logo first to isolate the issue
- Ensure logo file is a valid image format (PNG, JPG, etc.)

#### 5. MongoDB Connection Issues

**Symptoms:**
- Backend won't start
- Database errors

**Solution:**
- Ensure MongoDB is running
- Check `backend/.env` has correct `MONGODB_URI`
- For MongoDB Atlas, whitelist your IP address

### Debugging Steps

1. **Check Backend Logs**
   ```bash
   cd backend
   npm run dev
   ```
   Look for error messages in the console.

2. **Test API Directly**
   Use Postman or curl to test the endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/generate-label \
     -F "productName=Test Product" \
     -F "category=Food" \
     -F "sellerName=Test Seller"
   ```

3. **Check Frontend Console**
   Open browser DevTools (F12) and check the Console tab for errors.

4. **Verify Dependencies**
   ```bash
   cd backend
   npm list canvas qrcode pdfkit
   ```
   All should be listed without errors.

### Quick Fix Checklist

- [ ] Canvas library installed with native dependencies
- [ ] Backend server is running on port 5000
- [ ] MongoDB is running and connected
- [ ] All required form fields are filled
- [ ] `backend/uploads/` directory exists
- [ ] Check browser console for frontend errors
- [ ] Check backend terminal for server errors

### Still Not Working?

1. **Clear and Reinstall:**
   ```bash
   cd backend
   rm -rf node_modules
   npm install
   ```

2. **Check Node Version:**
   ```bash
   node --version
   ```
   Should be v18 or higher.

3. **Try Minimal Test:**
   Create a simple test file `backend/test-canvas.js`:
   ```javascript
   import { createCanvas } from 'canvas'
   const canvas = createCanvas(200, 200)
   console.log('Canvas works!')
   ```
   Run: `node backend/test-canvas.js`

If this fails, canvas is not properly installed.

### Getting Help

When reporting issues, include:
1. Operating System (Windows/macOS/Linux)
2. Node.js version (`node --version`)
3. Backend console error messages
4. Browser console error messages
5. Steps you've already tried









