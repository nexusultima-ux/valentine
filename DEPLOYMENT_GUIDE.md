# Valentine Platform - Render Deployment Guide

**Date:** January 16, 2026  
**Status:** All tiers ready for deployment  

---

## 🚀 Quick Deployment Commands

### Push to GitHub First
```bash
# Navigate to valentine root directory
cd c:\Users\nccdi\Documents\templates\valentine

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Complete Valentine platform with three tiers - ready for deployment"

# Push to main branch
git push origin main
```

---

## 📋 Render Deployment Setup

### Tier 1: Ask (Already Deployed ✅)
- **Live URL:** https://valentine-ask.onrender.com
- **Status:** Production ready

### Tier 2: Happy Valentine
1. **Create New Render Service**
   - Go to https://render.com/dashboard
   - Click "New +" → "Web Service"
   - Connect GitHub: `nexusultima-ux/valentine`
   - **Build Command:** `cd happy-valentine/v1/happy-valentine-main && npm install && npm run build`
   - **Start Command:** `cd happy-valentine/v1/happy-valentine-main && npm start`
   - **Environment:** Node.js
   - **Service Name:** `valentine-happy-valentine`

2. **Expected URL:** https://valentine-happy-valentine.onrender.com

### Tier 3: Personalized
1. **Create New Render Service**
   - Go to https://render.com/dashboard
   - Click "New +" → "Web Service"
   - Connect GitHub: `nexusultima-ux/valentine`
   - **Build Command:** `cd personalized/v1/personalized-main && npm install && npm run build`
   - **Start Command:** `cd personalized/v1/personalized-main && npm start`
   - **Environment:** Node.js
   - **Service Name:** `valentine-personalized`

2. **Expected URL:** https://valentine-personalized.onrender.com

---

## 🔧 Technical Configuration

### Build Settings (All Tiers)
```yaml
# Render automatically detects these from package.json
buildCommand: npm run build
startCommand: npm start
nodeVersion: 18
```

### Environment Variables (Optional)
```bash
# Add if needed for each service
NODE_ENV=production
PORT=10000
```

---

## ✅ Pre-Deployment Checklist

### For All Tiers:
- [ ] Code pushed to GitHub main branch
- [ ] All dependencies in package.json
- [ ] Build runs locally: `npm run build`
- [ ] Server starts locally: `npm start`
- [ ] No TypeScript errors
- [ ] Responsive design tested

### Tier 2 (Happy Valentine):
- [ ] Config file paths correct
- [ ] Image directory exists: `/public/valentine-images/`
- [ ] Animations working smoothly

### Tier 3 (Personalized):
- [ ] Form validation working
- [ ] URL encoding/decoding tested
- [ ] Data schema complete
- [ ] All sections render correctly

---

## 🧪 Testing After Deployment

### Tier 1: Ask
1. Visit: https://valentine-ask.onrender.com
2. Test complete 6-moment flow
3. Verify confetti on "yes"
4. Check responsive design

### Tier 2: Happy Valentine
1. Visit: https://valentine-happy-valentine.onrender.com (after deployment)
2. Test landing → experience → message flow
3. Verify image fallbacks work
4. Check theme color application

### Tier 3: Personalized
1. Visit: https://valentine-personalized.onrender.com (after deployment)
2. Test form submission
3. Verify URL parameter handling
4. Test with minimal data (empty sections)
5. Test with full data (all sections populated)

---

## 🔍 Troubleshooting

### Common Issues & Solutions:

#### Build Failures:
```bash
# Check if dependencies are installed
cd happy-valentine/v1/happy-valentine-main
npm install

# Check TypeScript compilation
npm run build
```

#### Server Start Issues:
```bash
# Verify server.js exists and is correct
ls -la server.js

# Check if port conflicts exist
netstat -an | grep :3000
```

#### Static Asset Issues:
```bash
# Ensure paper-texture.jpg is in /public/ not /src/assets/
ls -la public/paper-texture.jpg
```

#### Route Issues (Tier 2 & 3):
```bash
# Verify React Router setup
cat src/App.tsx
```

---

## 📊 Deployment URLs Summary

| Tier | Path | Build Command | Start Command | Expected URL |
|------|-------|---------------|----------------|---------------|
| Ask | `ask/v1/xoxovalentine-main/` | `cd ask/v1/xoxovalentine-main && npm install && npm run build` | `cd ask/v1/xoxovalentine-main && npm start` | https://valentine-ask.onrender.com ✅ |
| Happy Valentine | `happy-valentine/v1/happy-valentine-main/` | `cd happy-valentine/v1/happy-valentine-main && npm install && npm run build` | `cd happy-valentine/v1/happy-valentine-main && npm start` | https://valentine-happy-valentine.onrender.com |
| Personalized | `personalized/v1/personalized-main/` | `cd personalized/v1/personalized-main && npm install && npm run build` | `cd personalized/v1/personalized-main && npm start` | https://valentine-personalized.onrender.com |

---

## 🎯 Post-Deployment Actions

1. **Test All Live URLs**
2. **Update Documentation** with live URLs
3. **Create Partner Landing Page** (if needed)
4. **Set Up Analytics** (optional)
5. **Monitor Build Logs** on Render dashboard

---

## 📞 Support

### Render Documentation:
- https://render.com/docs

### GitHub Repository:
- https://github.com/nexusultima-ux/valentine

### Build Logs Location:
- Render Dashboard → Your Service → Builds tab

---

## 🎉 Success Criteria

Deployment is successful when:
- [ ] All three tiers are accessible via their URLs
- [ ] No build errors in Render dashboard
- [ ] All interactive elements work correctly
- [ ] Mobile responsive design functions
- [ ] No console errors in browser

---

**Ready for launch! 🚀**
