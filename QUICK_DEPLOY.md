# ⚡ Quick Vercel Deployment Commands

## Step 1: Verify Everything is Pushed

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"
git status
git log --oneline -1
```

**Expected:** 
```
On branch main
Your branch is up to date with 'origin/main'.

HEAD is at 1532b6d Docs: Add comprehensive deployment ready checklist
```

---

## Step 2: Build Frontend Locally (Optional - to test)

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Frontend"
npm install
npm run build
```

**If successful, you should see:**
```
✓ built in 45.23s
```

---

## Step 3: Test Backend Locally (Optional - to test)

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Backend"
npm install
npm start
```

**If successful, you should see:**
```
✅ MongoDB connected
Server running on port 3000
```

Press `Ctrl+C` to stop.

---

## Step 4: Deploy to Vercel

### ✅ Backend Deployment

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy Backend
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Backend"
vercel --prod
```

**When asked:**
```
? Set up and deploy "C:\...\Backend"? [Y/n] → Y
? Which scope do you want to deploy to? → Your Account
? Link to existing project? [y/N] → N
? What's your project's name? → final-project-backend
? In which directory is your code located? → .
```

**Copy the URL it gives you!** (e.g., `https://final-project-backend-abc123.vercel.app`)

---

### ✅ Frontend Deployment

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Frontend"
vercel --prod
```

**When asked:**
```
? Set up and deploy? [Y/n] → Y
? Which scope? → Your Account
? Link to existing project? [y/N] → N
? What's your project's name? → final-project-frontend
? In which directory is your code located? → .
? Auto-detected project settings. OK? [y/N] → Y
```

---

## Step 5: Set Environment Variables on Vercel Dashboard

### Backend Environment Variables
1. Go: https://vercel.com/dashboard
2. Click "final-project-backend"
3. Settings → Environment Variables
4. Add:
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRET` = Any random secret key
   - `CLOUDINARY_CLOUD_NAME` = Your cloud name
   - `CLOUDINARY_API_KEY` = Your API key
   - `CLOUDINARY_API_SECRET` = Your API secret
   - `FRONTEND_URL` = Your Frontend URL

### Frontend Environment Variables
1. Click "final-project-frontend"
2. Settings → Environment Variables
3. Add:
   - `VITE_API_URL` = https://final-project-backend-xxx.vercel.app/api

---

## Step 6: Update Backend CORS & Redeploy

Edit `Backend/server.js`:

```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://final-project-frontend-xxx.vercel.app"  // ← Add this
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

Then:

```powershell
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"
git add .
git commit -m "Update: Add production Frontend URL to CORS"
git push origin main

# Redeploy Backend
cd Backend
vercel --prod
```

---

## 🧪 Test Your Live Site

```powershell
# Frontend is live at:
https://final-project-frontend-xxx.vercel.app

# Backend API is live at:
https://final-project-backend-yyy.vercel.app/api

# Check backend health:
https://final-project-backend-yyy.vercel.app/api/health
```

---

## 📱 Success Indicators

✅ Frontend loads without errors
✅ Can login/register (API call succeeds)
✅ Can add to cart (POST request works)
✅ Can view products (GET request works)
✅ Browser console has no red errors
✅ Network tab shows 200/201 responses

---

## 🚨 If Something Fails

### Check Logs
```powershell
# Backend logs
vercel logs final-project-backend --prod

# Frontend logs
vercel logs final-project-frontend --prod
```

### Common Issues

**Issue:** 404 errors on API calls
**Fix:** Check `VITE_API_URL` is correct in Frontend settings

**Issue:** MongoDB connection error
**Fix:** Check `MONGODB_URI` is correct and IP whitelisted

**Issue:** CORS error
**Fix:** Update Backend `server.js` with your Frontend URL

**Issue:** Cloudinary upload fails
**Fix:** Verify Cloudinary credentials in Backend env vars

---

## 🎉 Done!

Your project is now **LIVE on Vercel**! 🚀

Share these links:
- **Frontend:** https://final-project-frontend-xxx.vercel.app
- **Backend:** https://final-project-backend-yyy.vercel.app/api
