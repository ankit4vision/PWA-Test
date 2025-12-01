/**
 * Event Details Page - Static demo page
 */

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Wait for app.js functions to be available
        let retries = 0;
        while (typeof isLoggedIn === 'undefined' && retries < 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        }

        // Check if user is logged in
        if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
            window.location.href = 'index.html';
            return;
        }

        // Load components
        if (window.componentLoader) {
            await window.componentLoader.loadComponents([
                { name: 'header', target: '#header-container' },
                { name: 'bottom-nav', target: '#bottom-nav-container' }
            ]);
        }

        // Set active navigation item
        if (typeof setActiveNavItem === 'function') {
            setActiveNavItem('events');
        }
        
        // Update page title
        if (typeof updatePageTitle === 'function') {
            updatePageTitle('Event Details');
        }

        // Initialize page
        initEventDetailsPage();
    } catch (error) {
        console.error('Error initializing event details page:', error);
    }
});

/**
 * Initialize Event Details Page
 */
function initEventDetailsPage() {
    // For demo purposes, this is a static page
    // In production, this would load data based on URL parameter
    console.log('Event Details page loaded (static demo)');
}

