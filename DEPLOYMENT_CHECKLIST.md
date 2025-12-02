# Hostinger Deployment Checklist

Use this checklist to ensure a smooth deployment of your StaffPortal app to Hostinger.

## 📋 Pre-Deployment

- [ ] Tested app locally and everything works
- [ ] All files saved and committed (if using version control)
- [ ] Reviewed which files to upload and which to exclude
- [ ] Have Hostinger account credentials ready
- [ ] Have FTP/cPanel access information ready

## 📤 File Upload

- [ ] Uploaded `index.html` to root
- [ ] Uploaded all HTML pages:
  - [ ] `dashboard.html`
  - [ ] `contact.html`
  - [ ] `directors-lounge.html`
  - [ ] `event-details.html`
  - [ ] `events.html`
  - [ ] `forms.html`
  - [ ] `resources.html`
- [ ] Uploaded `assets/` folder with all subfolders:
  - [ ] `assets/css/theme.css`
  - [ ] `assets/js/` (all JS files)
  - [ ] `assets/data/` (all JSON files)
  - [ ] `assets/img/` (all images)
- [ ] Uploaded `components/` folder:
  - [ ] `components/header.html`
  - [ ] `components/bottom-nav.html`
- [ ] Uploaded `.htaccess` file to root
- [ ] Verified folder structure matches local structure

## ⚙️ Configuration

- [ ] Domain is pointing to Hostinger
- [ ] SSL certificate is enabled (HTTPS)
- [ ] File permissions are correct:
  - [ ] Files: 644
  - [ ] Folders: 755
  - [ ] `.htaccess`: 644

## 🧪 Testing

### Homepage & Login
- [ ] Homepage loads at `https://yourdomain.com`
- [ ] Login page displays correctly
- [ ] Bootstrap CSS loads (check styling)
- [ ] Bootstrap Icons load
- [ ] Custom CSS loads (`theme.css`)

### Authentication
- [ ] Can login with demo credentials
- [ ] Login redirects to dashboard
- [ ] Session persists (refresh stays logged in)
- [ ] Logout works correctly

### Navigation
- [ ] Bottom navigation displays
- [ ] All navigation items work
- [ ] Active state highlights correct page
- [ ] Director's Lounge only shows for directors

### Pages
- [ ] Dashboard (My Events) loads
- [ ] Events list displays
- [ ] Event details page works
- [ ] Resources page loads
- [ ] Forms page loads
- [ ] Contact page loads
- [ ] Director's Lounge loads (for directors)

### Data Loading
- [ ] Events data loads from JSON
- [ ] Resources data loads
- [ ] Forms data loads
- [ ] Contact data loads
- [ ] No 404 errors in browser console
- [ ] No CORS errors in browser console

### Functionality
- [ ] Event cards are clickable
- [ ] Event details display correctly
- [ ] Resource links open in new tab
- [ ] Form modals open correctly
- [ ] Contact buttons work (tel: and mailto:)
- [ ] Maps links open correctly
- [ ] Accordion sections expand/collapse

### Images & Assets
- [ ] Logo displays
- [ ] Team member images display
- [ ] Background images load
- [ ] Icons display correctly

### Mobile Testing
- [ ] Tested on mobile device or browser dev tools
- [ ] Navigation works on mobile
- [ ] Pages are responsive
- [ ] Touch interactions work
- [ ] Bottom nav is accessible on mobile

### Browser Compatibility
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari (if possible)
- [ ] Tested in Edge (if possible)

## 🔒 Security

- [ ] HTTPS is enabled and working
- [ ] No mixed content warnings
- [ ] Security headers are set (check `.htaccess`)
- [ ] Sensitive files are protected

## 📱 Performance

- [ ] Pages load quickly
- [ ] Images are optimized
- [ ] No console errors
- [ ] CDN resources load (Bootstrap, Icons)

## ✅ Final Verification

- [ ] All features work as expected
- [ ] No broken links
- [ ] No console errors
- [ ] No 404 errors
- [ ] Mobile experience is good
- [ ] Ready for production use

## 📝 Notes

Add any notes or issues encountered during deployment:

```
[Add your notes here]
```

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Domain:** _______________
**Status:** [ ] Success [ ] Issues Encountered

