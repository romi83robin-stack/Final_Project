@echo off
REM 🚀 Automated Vercel Deployment Script for Windows

setlocal enabledelayedexpansion

echo.
echo ================================
echo 🚀 Vercel Deployment Started
echo ================================

REM Step 1: Check Git Status
echo.
echo Step 1: Checking Git Status...
cd /d "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"

git status --porcelain > nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Git error occurred
    exit /b 1
)

echo ✅ All changes committed

REM Step 2: Install Vercel CLI
echo.
echo Step 2: Installing Vercel CLI...
npm install -g vercel

REM Step 3: Deploy Backend
echo.
echo Step 3: Deploying Backend...
echo.
echo ⚠️  IMPORTANT: When prompted, select:
echo    - Your account
echo    - Don't link to existing project (N)
echo    - Project name: final-project-backend
echo    - Directory: . (current)
echo.
pause

cd /d "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Backend"
call vercel --prod

echo.
echo ✅ Backend deployment started!
echo.
set /p BACKEND_URL="Paste your Backend URL (e.g., https://final-project-backend-xxx.vercel.app): "

REM Step 4: Deploy Frontend
echo.
echo Step 4: Deploying Frontend...
echo.
echo ⚠️  IMPORTANT: When prompted, select:
echo    - Your account
echo    - Don't link to existing project (N)
echo    - Project name: final-project-frontend
echo    - Framework: Vite
echo    - Directory: . (current)
echo.
pause

cd /d "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Frontend"
call vercel --prod

set /p FRONTEND_URL="Paste your Frontend URL (e.g., https://final-project-frontend-xxx.vercel.app): "

REM Step 5: Update Backend CORS
echo.
echo Step 5: Updating Backend CORS...

cd /d "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit\Backend"

REM Read the file and replace
for /f "tokens=*" %%A in (server.js) do (
    set "line=%%A"
    setlocal enabledelayedexpansion
    set "line=!line:https://YOUR-FRONTEND.vercel.app=%FRONTEND_URL%!"
    echo !line! >> server.js.tmp
    endlocal
)

move /y server.js.tmp server.js

REM Commit and push
git add .
git commit -m "Update: Add production Frontend URL to CORS"
git push origin main

echo.
echo Step 6: Redeploying Backend with updated CORS...
pause

call vercel --prod

REM Test
echo.
echo ================================
echo 🎉 Deployment Complete!
echo ================================
echo.
echo Test your deployment:
echo Frontend: %FRONTEND_URL%
echo Backend: %BACKEND_URL%/api
echo Backend Health: %BACKEND_URL%/api/health
echo.
echo Next steps:
echo 1. Visit your Frontend URL in browser
echo 2. Test login/register
echo 3. Test add to cart
echo 4. Check browser console (F12) for errors
echo.
pause
