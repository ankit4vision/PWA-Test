/**
 * StaffPortal - Main Application JavaScript
 */

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for dataService to be available (loaded via script tag)
    if (typeof window.dataService !== 'undefined') {
        initApp();
    } else {
        // Wait a bit for script to load, then initialize
        setTimeout(function() {
            if (typeof window.dataService !== 'undefined') {
                initApp();
            } else {
                console.error('dataService not loaded. Please ensure data-service.js is included before app.js');
            }
        }, 100);
    }
});

/**
 * Initialize the application
 */
function initApp() {
    // Wait for components to load if using component system
    if (typeof componentLoader !== 'undefined') {
        document.addEventListener('componentLoaded', function(e) {
            if (e.detail.componentName === 'bottom-nav') {
                initBottomNav();
            }
            if (e.detail.componentName === 'header') {
                initLogout();
            }
        });
    } else {
        // Direct initialization if not using components
        initBottomNav();
        initLogout();
    }
    
    // Initialize login form
    initLoginForm();
    
    // Initialize dashboard if on dashboard page
    if (document.querySelector('.dashboard-container')) {
        initDashboard();
    }
    
    // Set current page title
    const currentPage = getCurrentPage();
    const pageTitles = {
        'events': 'My Events',
        'resources': 'My Resources',
        'directors-lounge': 'Director\'s Lounge',
        'forms': 'My Forms',
        'contact': 'Contact Us'
    };
    
    if (pageTitles[currentPage]) {
        updatePageTitle(pageTitles[currentPage]);
    }
}

/**
 * Initialize dashboard
 */
function initDashboard() {
    // Dashboard initialization (if needed)
    // Components are loaded separately
}

/**
 * Initialize logout button
 */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show confirmation
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
}

/**
 * Initialize bottom navigation active state
 */
function initBottomNav() {
    // Check user role and show/hide Director's Lounge
    checkDirectorAccess();
    
    // Set active item based on current page
    const currentPage = getCurrentPage();
    setActiveNavItem(currentPage);
    
    // Navigation is handled by href links in components, but we can add click handlers for additional functionality
    const navItems = document.querySelectorAll('.bottom-nav-item');
    
    navItems.forEach(item => {
        // Navigation is handled by href, but we can add analytics or other functionality here
        item.addEventListener('click', function(e) {
            const page = this.getAttribute('data-page');
            const pageName = this.getAttribute('data-page-name');
            
            // Update page title immediately (before navigation)
            updatePageTitle(pageName || 'Dashboard');
        });
    });
}

/**
 * Check if user has Director access and show/hide Director's Lounge
 */
function checkDirectorAccess() {
    const currentUser = getCurrentUser();
    const directorsLoungeItem = document.querySelector('.bottom-nav-item.director-only');
    
    if (directorsLoungeItem) {
        if (currentUser && currentUser.accountTypes && currentUser.accountTypes.includes('Director')) {
            directorsLoungeItem.style.display = 'flex';
        } else {
            directorsLoungeItem.style.display = 'none';
        }
    }
}

/**
 * Show page content (placeholder for now)
 */
function showPageContent(page, pageName) {
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        // For now, just show a placeholder message
        // This will be replaced with actual page content later
        dashboardContent.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-${getPageIcon(page)} text-primary-custom" style="font-size: 4rem;"></i>
                <h3 class="mt-3 text-muted">${pageName}</h3>
                <p class="text-muted">Content will be displayed here</p>
            </div>
        `;
    }
}

/**
 * Get icon class for page
 */
function getPageIcon(page) {
    const icons = {
        'events': 'calendar-event',
        'resources': 'folder-fill',
        'directors-lounge': 'door-open',
        'forms': 'file-earmark-text',
        'contact': 'telephone-fill'
    };
    return icons[page] || 'house-door-fill';
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem(page) {
    // Remove active class from all items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current page
    const activeItem = document.querySelector(`.bottom-nav-item[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

/**
 * Update page title in header
 */
function updatePageTitle(title) {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = title;
    }
}

/**
 * Get current page from URL
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'dashboard.html';
    
    const pageMap = {
        'events.html': 'events',
        'resources.html': 'resources',
        'directors-lounge.html': 'directors-lounge',
        'forms.html': 'forms',
        'contact.html': 'contact',
        'dashboard.html': 'events'
    };
    
    return pageMap[filename] || 'events';
}

/**
 * Initialize login form
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'warning');
                return;
            }
            
            // Simulate login with mock data
            console.log('Login attempt:', { email });
            
            // Show loading state
            const loginBtn = document.querySelector('.btn-login');
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
            loginBtn.disabled = true;
            
            // Simulate API call - find user in mock data
            setTimeout(async () => {
                try {
                    // Get dataService instance (from window or global scope)
                    const ds = window.dataService || (typeof dataService !== 'undefined' ? dataService : null);
                    
                    // Load users data to find matching user by email only
                    if (ds) {
                        const usersData = await ds.loadData('users.json');
                        const user = usersData.users.find(u => 
                            u.email.toLowerCase() === email.toLowerCase()
                        );
                        
                        if (user) {
                            // Store current user in sessionStorage
                            sessionStorage.setItem('currentUserId', user.id.toString());
                            sessionStorage.setItem('currentUser', JSON.stringify(user));
                            
                            // Redirect to events page (homepage)
                            window.location.href = 'events.html';
                        } else {
                            // User not found
                            loginBtn.innerHTML = originalText;
                            loginBtn.disabled = false;
                            showAlert('Invalid credentials. Please try again.', 'danger');
                        }
                    } else {
                        // Fallback: use default user ID
                        sessionStorage.setItem('currentUserId', '1');
                        window.location.href = 'events.html';
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    loginBtn.innerHTML = originalText;
                    loginBtn.disabled = false;
                    showAlert('An error occurred. Please try again.', 'danger');
                }
            }, 1500);
        });
    }
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

/**
 * Utility function to handle navigation
 */
function navigateTo(page) {
    window.location.href = page;
}

/**
 * Get current user from session storage
 */
function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

/**
 * Get current user ID from session storage
 */
function getCurrentUserId() {
    const userId = sessionStorage.getItem('currentUserId');
    return userId ? parseInt(userId) : 1; // Default to user ID 1 for development
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return sessionStorage.getItem('currentUserId') !== null;
}

/**
 * Logout user
 */
function logout() {
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Format date and time for display
 */
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

/**
 * Get travel type icon
 */
function getTravelTypeIcon(travelType) {
    const icons = {
        'Flight': 'airplane',
        'Driving': 'car-front',
        'Train': 'train-front',
        'Uber': 'taxi-front',
        'Bus': 'bus-front',
        'Rental Car': 'car-front-fill'
    };
    return icons[travelType] || 'geo-alt';
}

