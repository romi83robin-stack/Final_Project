# 🚀 GitHub Push & Vercel Deployment Guide

## STEP 1: Install Git (Windows)
1. Download from: https://git-scm.com/download/win
2. Run the installer and complete setup
3. Restart PowerShell/CMD after installation
4. Verify: `git --version`

---

## STEP 2: Setup GitHub Repository

### Option A: If repo already exists on GitHub
```powershell
cd "c:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"

# Initialize git (if not already initialized)
git init

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/Final_Project_For_Submit.git

# Configure git user (one time only)
git config user.name "Your Name"
git config user.email "your_email@gmail.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit - Baroque Dresses E-commerce Project"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: If repo doesn't exist yet
1. Go to https://github.com/new
2. Create new repository with name: `Final_Project_For_Submit`
3. Don't initialize with README
4. Then run the commands above

---

## STEP 3: Update Backend Configuration for Vercel

The backend needs to be configured properly. Update your server.js to support Vercel:

**Backend/server.js - Update CORS:**
```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://YOUR-FRONTEND-DOMAIN.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

---

## STEP 4: Environment Variables Setup

### Create Backend/.env
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=production
```

### Backend/package.json - Ensure these scripts exist:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## STEP 5: Deploy Backend to Vercel

1. **Go to https://vercel.com**
2. **Sign up with GitHub** (recommended)
3. Click **"New Project"**
4. Select your GitHub repo **Final_Project_For_Submit**
5. **Configure:**
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Output Directory: (leave empty)
   - Environment Variables: Add all variables from .env file
     - MONGODB_URI
     - JWT_SECRET
     - CLOUDINARY_CLOUD_NAME
     - CLOUDINARY_API_KEY
     - CLOUDINARY_API_SECRET
6. Click **"Deploy"**
7. **Copy your Backend URL** (e.g., `https://final-project-for-submit-backend.vercel.app`)

---

## STEP 6: Update Frontend for Vercel

### Update API URLs in Frontend

Replace `http://localhost:3000` with your Vercel backend URL in:
- **Frontend/src/services/api.js**
- **Frontend/src/components/ProductComponents/ProductForm.jsx**
- **Frontend/src/pages/** (all pages using axios)
- **Frontend/src/components/** (all components using axios)

**Find & Replace:**
- Find: `http://localhost:3000`
- Replace with: `https://your-backend-url.vercel.app` (from Step 5)

Or use environment variables:

### Create Frontend/.env
```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

### Update Frontend/src/services/api.js
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
```

---

## STEP 7: Deploy Frontend to Vercel

1. **Go to https://vercel.com**
2. Click **"New Project"**
3. Select your GitHub repo **Final_Project_For_Submit**
4. **Configure:**
   - Root Directory: `Frontend`
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: 
     - `VITE_API_BASE_URL` = your backend URL
5. Click **"Deploy"**
6. **Your Frontend URL** will be shown (e.g., `https://final-project-for-submit.vercel.app`)

---

## STEP 8: Final Updates

### Update Backend CORS with Frontend URL
In Backend/server.js:
```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://final-project-for-submit.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

Then:
```powershell
git add Backend/server.js
git commit -m "Update CORS for production frontend URL"
git push
```

---

## STEP 9: Test Your Live Project

1. Open: `https://your-frontend-url.vercel.app`
2. Test all features:
   - Login/Signup
   - Add products (admin)
   - View products
   - Add to cart
   - Checkout

---

## 🆘 Troubleshooting

### Images not loading
- Ensure Cloudinary URLs are correct in product data
- Check Cloudinary credentials in environment variables

### API errors
- Verify backend URL in frontend .env
- Check Vercel backend logs
- Ensure CORS is properly configured

### Auth errors
- Clear browser cookies/localStorage
- Check JWT_SECRET matches between local and Vercel

### Database connection errors
- Verify MONGODB_URI is correct
- Ensure MongoDB Atlas allows Vercel IP (0.0.0.0/0)

---

## ✅ Summary of All Commands

```powershell
# 1. Initialize & Push to GitHub
cd "c:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"
git init
git config user.name "Your Name"
git config user.email "your_email@gmail.com"
git add .
git commit -m "Initial commit - Baroque Dresses E-commerce"
git remote add origin https://github.com/YOUR_USERNAME/Final_Project_For_Submit.git
git branch -M main
git push -u origin main

# 2. Deploy Backend
# - Go to Vercel.com > New Project > Select repo > Root: Backend > Deploy

# 3. Deploy Frontend  
# - Go to Vercel.com > New Project > Select repo > Root: Frontend > Deploy

# Done! 🎉
```

---

**Need help?** Let me know the specific error you're facing!
