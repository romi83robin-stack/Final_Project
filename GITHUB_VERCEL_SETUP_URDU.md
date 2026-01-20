# 🚀 GitHub Push اور Vercel Deployment - مکمل گائیڈ

## ⚠️ اہم: پہلے Git انسٹال کریں

### Git انسٹال کرنے کے اقدامات (Windows):

1. **Download Git:**
   - یہاں جائیں: https://git-scm.com/download/win
   - انسٹالر ڈاؤن لوڈ کریں

2. **انسٹال کریں:**
   - انسٹالر کو چلائیں
   - تمام default options قبول کریں
   - **اہم:** "Use Git from Windows Command Prompt" select کریں
   - انسٹال مکمل کریں

3. **PowerShell/CMD دوبارہ کھولیں:**
   - تمام کھول ہوئے windows بند کریں
   - نیا PowerShell/CMD کھولیں

4. **تصدیق کریں:**
   ```powershell
   git --version
   ```
   اگر ورژن دکھائی دے تو Git صحیح انسٹال ہو گیا ہے

---

## ✅ ہمارے نے جو کچھ تیار کیا ہے:

### 1. URLs تبدیل کیے گئے ✅
- `Frontend/src/services/api.js` → اب environment variable استعمال کرتا ہے
- `.env.local` فائلیں بنائی گئیں

### 2. Configuration فائلیں تیار ✅
- `Backend/vercel.json` → Vercel کے لیے
- `Frontend/vercel.json` → Vercel کے لیے
- `.gitignore` → Git کے لیے

---

## 📝 GitHub اور Vercel Setup - مکمل اقدامات

### Step 1: GitHub پر Repository بنائیں
1. https://github.com/new پر جائیں
2. Repository name: `Final_Project_For_Submit` (بالکل یہی نام)
3. Description: "Baroque Dresses E-commerce Project"
4. **Public** select کریں
5. README, .gitignore, license شامل نہ کریں (ہم نے پہلے بنایا ہے)
6. **Create Repository** کلک کریں

### Step 2: Git Setup اور Push کریں (Git انسٹال کے بعد)

```powershell
# اپنے project folder میں جائیں
cd "c:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"

# Git initialize کریں
git init

# اپنا نام اور ای میل set کریں (ایک بار ہی)
git config user.name "آپ کا نام"
git config user.email "آپ کی ای میل"

# تمام فائلیں add کریں
git add .

# Commit کریں
git commit -m "Initial commit - Baroque Dresses E-commerce Project"

# Remote add کریں (اپنی GitHub username اور repo نام ڈالیں)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Final_Project_For_Submit.git

# Branch کا نام change کریں
git branch -M main

# Push کریں
git push -u origin main
```

**اہم:** `YOUR_GITHUB_USERNAME` کی جگہ اپنا GitHub username ڈالیں

---

## 🚀 Vercel پر Deploy کریں

### Backend Deploy کریں

1. https://vercel.com پر جائیں
2. **GitHub سے Sign Up/Login کریں**
3. **"New Project"** کلک کریں
4. اپنا repo select کریں: `Final_Project_For_Submit`
5. **Framework Preset:** Node.js select کریں
6. **Root Directory:** `Backend` لکھیں
7. **Build Command:** `npm install` لکھیں
8. **Environment Variables** شامل کریں:
   ```
   MONGODB_URI = آپ کا MongoDB connection string
   JWT_SECRET = کوئی بھی strong key (مثال: my_secret_key_12345)
   CLOUDINARY_CLOUD_NAME = آپ کا Cloudinary cloud name
   CLOUDINARY_API_KEY = آپ کا Cloudinary API key
   CLOUDINARY_API_SECRET = آپ کا Cloudinary API secret
   ```
9. **"Deploy"** کلک کریں
10. **Deploy مکمل ہونے کا انتظار کریں** (2-3 منٹ)
11. **اپنا Backend URL copy کریں** (مثال: `https://final-project-for-submit-backend.vercel.app`)

### Frontend Deploy کریں

1. https://vercel.com پر جائیں
2. **"New Project"** کلک کریں
3. اپنا repo select کریں: `Final_Project_For_Submit`
4. **Framework Preset:** Vite select کریں
5. **Root Directory:** `Frontend` لکھیں
6. **Build Command:** `npm run build` (پہلے سے ٹھیک ہے)
7. **Environment Variables** شامل کریں:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app/api
   ```
   (Backend URL کو اپنے Deploy کردہ Backend URL سے replace کریں)
8. **"Deploy"** کلک کریں
9. **Deploy مکمل ہونے کا انتظار کریں**

---

## ✨ مکمل ہوا!

جب دونوں Deploy ہو جائیں تو:

- **Frontend URL:** آپ کا Vercel frontend URL (کھولیں اور استعمال کریں)
- **Backend URL:** خود بخود Frontend سے connect ہو جائے گا

---

## 📝 اہم نوٹس

1. **.env.local files** GitHub پر push نہ ہوں (`.gitignore` نے محفوظ رکھا ہے)
2. **Vercel** میں Environment Variables خود ڈالنے ہیں
3. اگر images load نہ ہوں تو Cloudinary settings چیک کریں
4. اگر API error آئے تو Backend URL correct ہے یا نہیں چیک کریں

---

## 🆘 اگر مسائل ہوں

- **Git نہیں ملا:** https://git-scm.com/download/win سے انسٹال کریں
- **Push fail ہو:** GitHub token بنائیں: https://github.com/settings/tokens
- **Vercel errors:** Vercel dashboard میں logs دیکھیں

**تیار ہیں؟ Git انسٹال کریں اور command run کریں!** 🎉
