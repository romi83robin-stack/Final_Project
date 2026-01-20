#!/bin/bash

# 🚀 Automated Vercel Deployment Script

echo "================================"
echo "🚀 Vercel Deployment Started"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Verify Git Status
echo -e "\n${YELLOW}Step 1: Checking Git Status...${NC}"
cd "C:\Users\Rehman Hassan\Desktop\Final_Project_For_Submit"

if git diff --quiet; then
    echo -e "${GREEN}✅ All changes committed${NC}"
else
    echo -e "${RED}❌ Uncommitted changes found!${NC}"
    echo "Run: git add . && git commit -m 'Your message'"
    exit 1
fi

# Step 2: Install Vercel CLI
echo -e "\n${YELLOW}Step 2: Installing Vercel CLI...${NC}"
npm install -g vercel

# Step 3: Deploy Backend
echo -e "\n${YELLOW}Step 3: Deploying Backend...${NC}"
cd Backend
vercel --prod --yes

# Get Backend URL (extract from Vercel output)
echo -e "\n${YELLOW}Backend deployed! Copy the URL shown above.${NC}"
echo -e "${YELLOW}Example: https://final-project-backend-xxx.vercel.app${NC}"
read -p "Paste your Backend URL here: " BACKEND_URL

# Step 4: Deploy Frontend
echo -e "\n${YELLOW}Step 4: Deploying Frontend...${NC}"
cd ../Frontend
vercel --prod --yes --env VITE_API_URL="${BACKEND_URL}/api"

# Step 5: Update Backend CORS
echo -e "\n${YELLOW}Step 5: Updating Backend CORS...${NC}"
read -p "Paste your Frontend URL here (e.g., https://final-project-frontend-xxx.vercel.app): " FRONTEND_URL

# Update server.js
cd ../Backend
sed -i "s|https://YOUR-FRONTEND.vercel.app|${FRONTEND_URL}|g" server.js

# Commit and redeploy
git add .
git commit -m "Update: Add production Frontend URL to CORS"
git push origin main

echo -e "\n${YELLOW}Redeploying Backend with updated CORS...${NC}"
vercel --prod --yes

# Step 6: Test
echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "\n${YELLOW}Test your deployment:${NC}"
echo -e "Frontend: ${FRONTEND_URL}"
echo -e "Backend: ${BACKEND_URL}/api"
echo -e "Backend Health: ${BACKEND_URL}/api/health"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Visit your Frontend URL in browser"
echo "2. Test login/register"
echo "3. Test add to cart"
echo "4. Check browser console (F12) for errors"
