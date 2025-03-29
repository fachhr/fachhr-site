// Function to set CSS custom property for the real viewport height
function setRealViewportHeight() {
    // Get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Also set a data attribute on body to help with debugging
    document.body.setAttribute('data-viewport-height', window.innerHeight);
}

// Set the height initially when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    setRealViewportHeight();
    
    // Update on resize with debounce for better performance
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setRealViewportHeight, 100);
    });
    
    // Update on orientation change
    window.addEventListener('orientationchange', function() {
        // Add small delay to ensure the browser has completed the orientation change
        setTimeout(setRealViewportHeight, 200);
    });
    
    // Handle iOS Safari bottom bar issues specifically
    if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream) {
        // Add a class to the body for iOS-specific fixes
        document.body.classList.add('ios-device');
        
        // Handle the fact that iOS Safari can hide/show the address bar when scrolling
        let lastScrollPosition = 0;
        window.addEventListener('scroll', function() {
            // Check for significant scroll change which might indicate the address bar hiding/showing
            if (Math.abs(window.scrollY - lastScrollPosition) > 50) {
                // Small delay to ensure the browser UI has settled
                setTimeout(setRealViewportHeight, 100);
                lastScrollPosition = window.scrollY;
            }
        });
    }
    
    // Special handling for Chrome on Android
    if (/Android/.test(navigator.userAgent) && /Chrome\/[.0-9]*/.test(navigator.userAgent)) {
        document.body.classList.add('android-chrome');
        
        // Chrome on Android can change the viewport when the address bar hides/shows
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(setRealViewportHeight, 100);
        });
    }
    
    // Force an update after page has fully loaded (including images)
    window.addEventListener('load', function() {
        // Small delay to ensure everything is rendered
        setTimeout(setRealViewportHeight, 300);
    });
});