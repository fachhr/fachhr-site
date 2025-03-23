# FACH HR Website

![FACH HR](screenshot.png)

A premium recruitment platform connecting Swiss students with employers through AI-driven matching technology.

## 📋 Features

- **Responsive Design:** Mobile-first approach with seamless experience across all devices
- **Modern UI/UX:** Clean aesthetics with smooth animations and interactive elements
- **Performance Optimized:** Lazy loading, code splitting, and resource prioritization
- **Accessibility Compliant:** WCAG 2.1 AA standards for inclusive user experience
- **SEO Ready:** Semantic HTML, meta tags, and structured data

## 🛠️ Tech Stack

- **HTML5:** Semantic markup with modern structure
- **CSS3:** Custom variables, flexbox/grid layouts, and responsive design
- **JavaScript:** Vanilla JS with performance optimizations
- **Netlify:** Hosting and serverless form handling
- **Google Apps Script:** Backend for form processing

## 📂 Project Structure

```
fach-hr-website/
├── index.html              # Main HTML document
├── styles.css              # Main stylesheet
├── netlify.toml            # Netlify configuration
├── favicon.png             # Site favicon
├── README.md               # Project documentation
├── fonts/                  # Typography assets
│   ├── Gilroy-Light.otf    # Primary font (light weight)
│   └── Gilroy-ExtraBold.otf # Primary font (bold weight)
└── images/                 # Image assets
    ├── desk.jpg            # Hero background image
    ├── Asset11.png         # Navigation logo
    └── Asset15.png         # Hero section logo
```

## 🚀 Deployment

This site is configured for one-click deployment to Netlify:

1. **GitHub Preparation:**
   - Fork or clone this repository
   - Ensure all files are in the correct structure
   - Verify fonts are in the `fonts/` directory
   - Check images are properly placed in `images/`

2. **Netlify Deployment:**
   - Sign in to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Select your GitHub repository
   - Use default settings (build command and publish directory)
   - Click "Deploy site"

3. **Verify Deployment:**
   - Check your live site using the provided Netlify URL
   - Test forms functionality
   - Verify mobile responsiveness
   - Check loading performance

## ⚙️ Configuration

### Google Apps Script for Form Handling

The contact form uses Google Apps Script for processing. To update the endpoint:

1. Update the `scriptURL` variable in `index.html`:

```javascript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```

2. Ensure your Google Apps Script has the correct CORS settings:

```javascript
function doGet(e) {
  return HtmlService.createHtmlOutput("Service is running!");
}

function doPost(e) {
  // Add CORS headers
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Process form data
  try {
    // Your processing code here
    
    return output.setContent(JSON.stringify({
      'result': 'success',
      'message': 'Thank you for your message!'
    }));
  } catch(error) {
    return output.setContent(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }));
  }
}
```

### Custom Domain Setup

To use a custom domain:

1. Go to your Netlify site settings
2. Navigate to "Domain settings"
3. Click "Add custom domain"
4. Follow the instructions to configure DNS settings

## 🧪 Testing

The site has been tested on:

- **Browsers:** Chrome, Firefox, Safari, Edge, Opera
- **Devices:** Desktop, Tablet, Mobile (iOS and Android)
- **Screen Sizes:** 320px to 3840px width
- **Connection Speeds:** Fast 5G to slow 3G

## 🔧 Performance Optimizations

- **Image Compression:** All images are optimized for web
- **Font Loading Strategy:** Using `font-display: swap` for better UX
- **Asset Preloading:** Critical assets preloaded for faster rendering
- **Code Minification:** HTML, CSS, and JS minified in production
- **HTTP/2 Ready:** Assets organized for optimal HTTP/2 delivery

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## 📱 Mobile Responsiveness

The site uses a mobile-first approach with specific breakpoints:

- **Mobile:** 320px - 576px
- **Tablet:** 577px - 992px
- **Desktop:** 993px - 1200px
- **Large Desktop:** 1201px+

## 📈 SEO Considerations

- Semantic HTML5 tags
- Proper header hierarchy
- Meta tags for social sharing
- Fast loading times
- Responsive design
- Accessible to all users

## 📄 License

© 2025 FACH HR. All rights reserved.

## 📧 Contact

For questions or support, contact: jobs4you@fach-hr.com