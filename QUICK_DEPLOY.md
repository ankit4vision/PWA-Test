# Quick Deploy Guide - Hostinger

## 🚀 Fast Deployment Steps

### 1. Prepare Files
- ✅ All your files are ready (HTML, CSS, JS, JSON, images)
- ✅ `.htaccess` file is included in your project

### 2. Upload to Hostinger

**Option A: cPanel File Manager**
1. Log in to Hostinger hPanel
2. Open "File Manager"
3. Go to `public_html` folder
4. Upload ALL files and folders (maintain structure)
5. Make sure `.htaccess` is in root

**Option B: FTP**
1. Connect via FTP to `public_html`
2. Upload all files maintaining folder structure
3. Set permissions: Files=644, Folders=755

### 3. Files to Upload

**Upload These:**
- ✅ All `.html` files (index, dashboard, contact, etc.)
- ✅ `assets/` folder (entire folder)
- ✅ `components/` folder (entire folder)
- ✅ `.htaccess` file

**Don't Upload:**
- ❌ `server.js` (local dev only)
- ❌ `start-server.bat` / `start-server.ps1` (local dev only)
- ❌ Documentation files (optional)

### 4. Test

1. Visit: `https://yourdomain.com`
2. Test login: `director@onebeat.com` / `demo123`
3. Check all pages work
4. Test on mobile

### 5. Done! 🎉

Your app should now be live!

---

## 📁 Folder Structure on Hostinger

```
public_html/
├── index.html
├── dashboard.html
├── contact.html
├── directors-lounge.html
├── event-details.html
├── events.html
├── forms.html
├── resources.html
├── .htaccess
├── assets/
│   ├── css/
│   ├── js/
│   ├── data/
│   └── img/
└── components/
    ├── header.html
    └── bottom-nav.html
```

---

## ⚠️ Common Issues

**404 Errors?**
- Check `.htaccess` is uploaded
- Verify file names match exactly

**CSS/JS Not Loading?**
- Check `assets/` folder structure
- Clear browser cache

**Need Help?**
- See `HOSTINGER_DEPLOYMENT.md` for detailed guide
- Use `DEPLOYMENT_CHECKLIST.md` for step-by-step verification

