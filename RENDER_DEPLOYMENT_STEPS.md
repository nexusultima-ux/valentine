# QUICK DEPLOYMENT GUIDE - Render.com

## Prerequisites
- GitHub account (already have - nexusultima-ux/valentine repo)
- Render.com account (free tier is fine)
- Be logged into Render.com

---

## TIER 2: Happy Valentine Deployment

### Step 1: Create New Web Service
1. Go to https://render.com/dashboard
2. Click **"New +"** → Select **"Web Service"**
3. Connect GitHub (if not already connected):
   - Click "GitHub" 
   - Authorize Render to access your repos
   - Select: `nexusultima-ux/valentine`

### Step 2: Configure Service
Fill in these exact values:

**Name:** `valentine-happy`

**GitHub Repository:** `nexusultima-ux/valentine`

**Branch:** `main`

**Runtime:** `Node`

**Build Command:**
```
cd happy-valentine/v1/happy-valentine-main && npm install && npm run build
```

**Start Command:**
```
cd happy-valentine/v1/happy-valentine-main && npm start
```

**Plan:** Free (or Starter if you want faster builds)

### Step 3: Add Environment Variables (Optional)
Skip this for now - not needed for MVP

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes)
3. Check logs for any errors
4. Once live, you'll get a URL like: `https://valentine-happy.onrender.com`

### Step 5: Test
- Visit the URL
- Click "Open My Gift" 
- Verify experience flows through all 3 pages (landing → experience → message)
- Click "Start Over" - should return to landing

---

## TIER 3: Personalized Deployment

### Step 1: Create Another Web Service
1. Go to https://render.com/dashboard
2. Click **"New +"** → Select **"Web Service"**
3. Select GitHub repo: `nexusultima-ux/valentine`

### Step 2: Configure Service
Fill in these exact values:

**Name:** `valentine-personalized`

**GitHub Repository:** `nexusultima-ux/valentine`

**Branch:** `main`

**Runtime:** `Node`

**Build Command:**
```
cd personalized/v1/personalized-main && npm install && npm run build
```

**Start Command:**
```
cd personalized/v1/personalized-main && npm start
```

**Plan:** Free

### Step 3: Deploy
1. Click **"Create Web Service"**
2. Wait for build to complete
3. You'll get a URL like: `https://valentine-personalized.onrender.com`

### Step 4: Test
1. Visit the URL
2. Fill in form:
   - Your Name: "Test Sender"
   - Their Name: "Test Recipient"
   - Message: "You are awesome! 💕"
3. Click "Create Gift"
4. Verify the URL has `?data=...` parameter
5. Verify names appear in the experience dynamically
6. Complete the experience
7. Copy the generated URL and test in incognito (should show same personalized content)

---

## Expected URLs After Deployment

- **Tier 1 (Already Live):** https://valentine-ask.onrender.com
- **Tier 2 (Deploying):** https://valentine-happy.onrender.com
- **Tier 3 (Deploying):** https://valentine-personalized.onrender.com

---

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Common issue: Path incorrect in build command
- Verify folder names match exactly: `happy-valentine`, `personalized`, `xoxovalentine-main`

### Site Shows "Cannot GET /"
- Likely Start Command is wrong
- Double-check server.js is in the tier folder
- Verify path in Build/Start commands

### Loads but CSS broken
- Usually a build cache issue
- In Render dashboard: Click menu (top right) → "Clear Build Cache" → Redeploy

### Image (paper texture) not loading
- Verify `/public/paper-texture.jpg` exists in tier folder
- Server.js serves `/public` as static - should work

---

## After Both Are Deployed

You'll have:
✅ Tier 1 (Ask): https://valentine-ask.onrender.com
✅ Tier 2 (Happy Valentine): https://valentine-happy.onrender.com  
✅ Tier 3 (Personalized): https://valentine-personalized.onrender.com

All ready for partner sharing! Each tier is independent and can be shared as a unique product.

---

## Cost Estimate
- Free tier Render: Spins down after 15 minutes of inactivity
- Paid tier: $7/month per service to keep always running
- Current plan: Deploy on free, upgrade to paid when you get paying partners
