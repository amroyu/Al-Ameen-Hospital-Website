# Hostinger Deployment Guide

## Pre-deployment Checklist
1. ✅ Build the project using `npm run build`
2. ✅ Prepare .htaccess file (see hostinger.htaccess)
3. ✅ Ensure all environment variables are set in Hostinger's control panel

## Deployment Steps

### 1. Upload Files
1. Log in to Hostinger control panel
2. Navigate to File Manager
3. Upload the contents of the `build` directory to your public_html folder:
   - index.html
   - static/
   - images/
   - manifest.json
   - robots.txt
   - sitemap.xml
   - All other files from build directory

### 2. Configure .htaccess
1. Copy the contents of `hostinger.htaccess` to `.htaccess` in your public_html folder
2. Ensure the file permissions are set to 644

### 3. Configure SSL
1. Enable SSL certificate in Hostinger control panel
2. Force HTTPS redirection is already configured in .htaccess

### 4. DNS Configuration
1. Point your domain to Hostinger nameservers
2. Configure A record to point to your Hostinger IP
3. Add www CNAME record if needed

### 5. Post-deployment Checks
1. Visit your website and verify:
   - Homepage loads correctly
   - All routes work (try navigating to different pages)
   - Images and assets load
   - Forms work correctly
   - No console errors
   - SSL is working (green padlock in browser)

### 6. Common Issues & Solutions
1. If routes don't work:
   - Verify .htaccess is properly uploaded
   - Check .htaccess permissions (644)
   - Ensure mod_rewrite is enabled

2. If assets don't load:
   - Check file permissions (644 for files, 755 for directories)
   - Verify paths in the build files
   - Clear browser cache and CDN cache

3. If SSL issues:
   - Verify SSL is properly installed
   - Check for mixed content warnings
   - Clear browser cache

## Important Notes
- Keep a backup of your files before deployment
- Monitor error logs after deployment
- Test the website in multiple browsers
- Check mobile responsiveness
- Verify all forms and interactive features

## Support
If you encounter any issues, contact Hostinger support or refer to their documentation at https://www.hostinger.com/tutorials/
