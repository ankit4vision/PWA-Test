# Hostinger Deployment Guide - StaffPortal App

## 📋 Overview

This guide will help you deploy your StaffPortal application to Hostinger hosting. The app is a static website (HTML, CSS, JavaScript) that doesn't require any server-side processing, making it perfect for Hostinger's shared hosting.

## ✅ Pre-Deployment Checklist

- [ ] All files are saved and tested locally
- [ ] You have your Hostinger account credentials
- [ ] You have FTP/cPanel access to your Hostinger account
- [ ] Domain is configured and pointing to Hostinger

---

## 🚀 Deployment Methods

### Method 1: Using cPanel File Manager (Easiest)

1. **Log in to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Log in with your credentials

2. **Access File Manager**
   - Click on "File Manager" in the control panel
   - Navigate to `public_html` folder (this is your website root)

3. **Upload Files**
   - Delete any default files in `public_html` (like index.html, if you want to replace it)
   - Click "Upload" button
   - Select ALL files and folders from your local project:
     - `index.html`
     - `dashboard.html`
     - `contact.html`
     - `directors-lounge.html`
     - `event-details.html`
     - `events.html`
     - `forms.html`
     - `resources.html`
     - `assets/` folder (entire folder)
     - `components/` folder (entire folder)
     - `.htaccess` file (created for you)
   - Wait for upload to complete

4. **Verify Structure**
   Your `public_html` should look like this:
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
   ```

5. **Test Your Website**
   - Visit your domain: `https://yourdomain.com`
   - Test the login page and navigation

---

### Method 2: Using FTP Client (FileZilla, WinSCP, etc.)

1. **Get FTP Credentials**
   - In Hostinger hPanel, go to "FTP Accounts"
   - Note your FTP host, username, and password
   - Or use your main FTP account credentials

2. **Connect via FTP**
   - Open your FTP client (FileZilla, WinSCP, etc.)
   - Enter:
     - **Host:** ftp.yourdomain.com (or IP provided by Hostinger)
     - **Username:** Your FTP username
     - **Password:** Your FTP password
     - **Port:** 21 (or 22 for SFTP)

3. **Navigate to Website Root**
   - Connect and navigate to `/public_html` folder

4. **Upload Files**
   - Upload all files and folders from your local project
   - Maintain the folder structure exactly as it is locally
   - Make sure to upload the `.htaccess` file

5. **Set Permissions** (if needed)
   - Files: 644
   - Folders: 755
   - `.htaccess`: 644

---

## 📁 Files to Upload

### Required Files (Upload ALL of these):

**Root HTML Files:**
- `index.html`
- `dashboard.html`
- `contact.html`
- `directors-lounge.html`
- `event-details.html`
- `events.html`
- `forms.html`
- `resources.html`

**Folders:**
- `assets/` (entire folder with all subfolders)
  - `assets/css/`
  - `assets/js/`
  - `assets/data/`
  - `assets/img/`
- `components/` (entire folder)
  - `components/header.html`
  - `components/bottom-nav.html`

**Configuration:**
- `.htaccess` (for proper routing and security)

### Files NOT to Upload:

- `server.js` (only for local development)
- `start-server.bat` (only for local development)
- `start-server.ps1` (only for local development)
- `README-SERVER.md` (documentation only)
- `IMPLEMENTATION_PLAN.md` (documentation only)
- `HOSTINGER_DEPLOYMENT.md` (this file - optional to upload)
- `desktop.ini` (Windows system file)
- `.git/` folder (if present)

---

## ⚙️ Configuration

### .htaccess File

A `.htaccess` file has been created for you with:
- Proper MIME types
- Security headers
- Clean URLs (optional)
- Error page handling

Make sure this file is uploaded to your `public_html` root directory.

### Domain Configuration

1. **Point Domain to Hostinger**
   - If using Hostinger's nameservers, they should already be configured
   - If using external DNS, point A record to Hostinger's IP

2. **SSL Certificate**
   - Hostinger provides free SSL certificates
   - Enable SSL in hPanel under "SSL" section
   - Your site will be accessible via `https://yourdomain.com`

---

## 🧪 Post-Deployment Testing

After uploading, test the following:

1. **Homepage**
   - [ ] Visit `https://yourdomain.com` - should show login page
   - [ ] Login form displays correctly
   - [ ] Bootstrap CSS loads (check styling)

2. **Login**
   - [ ] Use demo credentials: `director@onebeat.com` / `demo123`
   - [ ] Should redirect to dashboard

3. **Navigation**
   - [ ] Bottom navigation works
   - [ ] All pages load correctly
   - [ ] Images display properly

4. **Data Loading**
   - [ ] JSON data files load (check browser console for errors)
   - [ ] Events display on dashboard
   - [ ] Resources page works
   - [ ] Forms page works

5. **Mobile Responsiveness**
   - [ ] Test on mobile device or browser dev tools
   - [ ] Navigation works on mobile
   - [ ] Pages are responsive

---

## 🔧 Troubleshooting

### Issue: 404 Errors on Pages

**Solution:**
- Check that `.htaccess` file is uploaded
- Verify file names match exactly (case-sensitive on Linux servers)
- Check file permissions (should be 644 for files, 755 for folders)

### Issue: CSS/JS Not Loading

**Solution:**
- Check browser console for 404 errors
- Verify `assets/` folder structure is correct
- Ensure file paths are relative (they should be)
- Clear browser cache

### Issue: JSON Data Not Loading

**Solution:**
- Check browser console for CORS or 404 errors
- Verify `assets/data/` folder is uploaded
- Check that JSON files have correct permissions (644)
- Ensure JSON files are valid (no syntax errors)

### Issue: Images Not Displaying

**Solution:**
- Verify `assets/img/` folder is uploaded
- Check image file names match exactly (case-sensitive)
- Ensure image files have correct permissions (644)

### Issue: Components Not Loading

**Solution:**
- Verify `components/` folder is uploaded
- Check browser console for errors
- Ensure `components.js` is loading correctly

### Issue: HTTPS Mixed Content Warnings

**Solution:**
- All external resources (Bootstrap CDN) should use `https://`
- Check that all links in your code use `https://`
- The app already uses CDN links with HTTPS, so this shouldn't be an issue

---

## 🔒 Security Recommendations

1. **Protect Sensitive Files**
   - Consider password-protecting admin areas
   - Don't expose API keys or sensitive data in client-side code

2. **Regular Updates**
   - Keep Bootstrap and other CDN resources updated
   - Monitor for security updates

3. **Backup**
   - Regularly backup your files via cPanel or FTP
   - Hostinger provides automatic backups (check your plan)

---

## 📱 Mobile App Experience (PWA - Future)

If you plan to add PWA features later:
- You'll need a `manifest.json` file
- Service worker for offline support
- These can be added later without affecting current deployment

---

## 🆘 Support

### Hostinger Support
- **Live Chat:** Available in hPanel
- **Knowledge Base:** https://support.hostinger.com
- **Email:** support@hostinger.com

### Common Hostinger Features
- **File Manager:** Manage files via web interface
- **FTP Access:** Upload files via FTP client
- **SSL Certificate:** Free SSL included
- **Backup:** Automatic backups (check your plan)
- **PHP Version:** Can be changed in hPanel (not needed for this static site)

---

## ✅ Final Checklist

Before going live:

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is in root directory
- [ ] Domain is pointing to Hostinger
- [ ] SSL certificate is enabled
- [ ] Tested login functionality
- [ ] Tested all pages and navigation
- [ ] Tested on mobile device
- [ ] Checked browser console for errors
- [ ] Verified all images load
- [ ] Verified JSON data loads
- [ ] Removed any test/debug code

---

## 🎉 You're Done!

Your StaffPortal app should now be live at `https://yourdomain.com`

If you encounter any issues, refer to the Troubleshooting section above or contact Hostinger support.

---

**Last Updated:** 2024
**App Version:** Based on IMPLEMENTATION_PLAN.md

