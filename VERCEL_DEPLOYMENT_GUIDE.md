# 🚀 Complete Vercel Deployment Guide

## Phase 1️⃣: Prepare Your Project

### ✅ Check Everything is Committed to GitHub

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"
git status  # Make sure everything is committed
git log --oneline -3  # Check recent commits
```

**Expected Output:**
```
nothing to commit, working tree clean
```

---

## Phase 2️⃣: Deploy BACKEND First ⭐

### Step 1: Go to Vercel
- Open: https://vercel.com
- Sign in with GitHub (if not already)

### Step 2: Create New Project
1. Click **"Add New Project"** (top right)
2. Click **"Import Git Repository"**
3. Paste your repo: `https://github.com/romi83robin-stack/Final_Project`
4. Click **"Import"**

### Step 3: Configure Backend Deployment
1. **Project Name:** `final-project-backend`
2. **Framework:** Select **"Other"** (it's Node.js)
3. **Root Directory:** Change to **`Backend`**
4. Click **"Deploy"** (Don't worry if it fails first time)

### Step 4: Add Environment Variables ⭐ IMPORTANT
After deployment (even if it fails), go to:
1. **Settings** → **Environment Variables**
2. Add these variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname

JWT_SECRET = your_random_secret_key_here

CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name

CLOUDINARY_API_KEY = your_api_key

CLOUDINARY_API_SECRET = your_api_secret

FRONTEND_URL = https://your-frontend.vercel.app
```

3. Click **"Save"**

### Step 5: Redeploy Backend
1. Go to **Deployments** tab
2. Click the three dots on latest deployment
3. Select **"Redeploy"**
4. Click **"Redeploy"** again

**⏳ Wait for deployment to complete (Green checkmark)**

### Step 6: Get Backend URL
- Copy your Backend URL from the browser
- Example: `https://final-project-backend-abc123.vercel.app`
- **Note this down!** You'll need it for Frontend

---

## Phase 3️⃣: Deploy FRONTEND Second

### Step 1: Go to Vercel Dashboard
- Open: https://vercel.com/dashboard

### Step 2: Create New Project
1. Click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Select your repo: `romi83robin-stack/Final_Project`

### Step 3: Configure Frontend Deployment
1. **Project Name:** `final-project-frontend`
2. **Framework:** Select **"Vite"**
3. **Root Directory:** Change to **`Frontend`**
4. **Build Command:** Keep as `npm run build`
5. **Output Directory:** Keep as `dist`

### Step 4: Add Environment Variables ⭐ CRITICAL
Before clicking Deploy, scroll down to **Environment Variables** section:

```
VITE_API_URL = https://final-project-backend-abc123.vercel.app/api
```

*(Replace with your actual Backend URL from Step 6 above)*

### Step 5: Deploy Frontend
1. Click **"Deploy"**
2. **⏳ Wait for deployment** (Should show green checkmark)

---

## Phase 4️⃣: Update Backend CORS Configuration

### Step 1: Update Backend Code
Edit `Backend/server.js` and update CORS origins:

```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://final-project-frontend-xyz789.vercel.app"  // ← Add your actual frontend URL
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

### Step 2: Commit and Push
```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"
git add .
git commit -m "Update: Add production frontend URL to CORS origins"
git push origin main
```

### Step 3: Redeploy Backend
1. Go to Backend project on Vercel
2. **Deployments** → Latest → **"Redeploy"**
3. Wait for green checkmark

---

## 🔗 Test Your Deployment

### Frontend Tests
1. Open your Frontend URL: `https://final-project-frontend-xxx.vercel.app`
2. ✅ Should see your e-commerce site
3. ✅ Try to login/register
4. ✅ Try to add to cart
5. ✅ Check browser console for errors (F12)

### Backend Tests
1. Open: `https://final-project-backend-xxx.vercel.app/api/health`
2. ✅ Should show: `{"message":"Server is running 🚀"}`

### API Connection Test
1. On Frontend, try to add a product to cart
2. ✅ Should work without errors
3. ✅ Check Network tab in DevTools (F12 → Network)

---

## 📋 Deployment URLs Reference

| Service | URL | Type |
|---------|-----|------|
| GitHub | https://github.com/romi83robin-stack/Final_Project | Repository |
| Frontend | https://final-project-frontend-xxx.vercel.app | Live Site |
| Backend API | https://final-project-backend-yyy.vercel.app/api | API Server |
| Vercel Dashboard | https://vercel.com/dashboard | Management |

---

## ❌ Troubleshooting

### Frontend shows blank page
- Check **Network tab** (F12 → Network)
- Look for red errors
- Check if `VITE_API_URL` is set correctly in Vercel

### API calls failing (404 errors)
- Make sure Backend URL in Frontend env vars is correct
- Check Backend deployment succeeded (green checkmark)
- Verify `VITE_API_URL` doesn't have extra `/api` at end

### Backend deployment failed
- Check **Deployments** → **Logs**
- Ensure all required environment variables are set
- Make sure MongoDB URI is correct
- Check that Cloudinary credentials are valid

### Login/Register not working
- Check JWT_SECRET is set in Backend
- Verify MongoDB connection works
- Check CORS is allowing frontend URL

---

## ✅ Final Checklist

- [ ] Backend deployed and running (Green checkmark)
- [ ] Backend environment variables all set
- [ ] Frontend deployed and running (Green checkmark)
- [ ] Frontend VITE_API_URL points to correct Backend
- [ ] Backend CORS updated with Frontend URL
- [ ] Tested login on live site
- [ ] Tested add to cart on live site
- [ ] No errors in browser console
- [ ] GitHub shows latest commits

---

## 🎉 Success!

Your e-commerce site is now **LIVE** and accessible worldwide! 🌍

**Share these URLs:**
- Frontend: `https://final-project-frontend-xxx.vercel.app`
- Backend: `https://final-project-backend-yyy.vercel.app/api`
