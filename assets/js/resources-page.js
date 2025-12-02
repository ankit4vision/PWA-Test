/**
 * Resources Page - Handles My Resources page functionality
 */

class ResourcesPage {
    constructor() {
        this.generalResources = [];
        this.departmentResources = [];
    }

    /**
     * Initialize the resources page
     */
    async init() {
        await this.loadResources();
        await this.renderResources();
    }

    /**
     * Load resources for current user
     */
    async loadResources() {
        const ds = window.dataService;
        if (!ds) {
            console.error('DataService not available');
            return;
        }

        const userId = getCurrentUserId();
        const resources = await ds.getResources(userId);
        
        this.generalResources = resources.general || [];
        this.departmentResources = resources.department || [];
        
        console.log('Resources loaded:', {
            general: this.generalResources.length,
            department: this.departmentResources.length
        });
    }

    /**
     * Render all resource sections
     */
    async renderResources() {
        const container = document.getElementById('resourcesContainer');
        if (!container) {
            console.error('Resources container not found');
            return;
        }

        // Show loading state
        container.innerHTML = `
            <div class="text-center py-3">
                <div class="spinner-border spinner-border-sm text-primary-custom" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        let html = '';

        // General Resources Section
        if (this.generalResources && this.generalResources.length > 0) {
            html += this.renderGeneralResources();
        }

        // Department Resources Section
        if (this.departmentResources && this.departmentResources.length > 0) {
            html += this.renderDepartmentResources();
        }

        // Empty state
        if ((!this.generalResources || this.generalResources.length === 0) && 
            (!this.departmentResources || this.departmentResources.length === 0)) {
            html = `
                <div class="text-center py-5">
                    <i class="bi bi-folder-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">No Resources Available</h3>
                    <p class="text-muted">You don't have access to any resources at this time.</p>
                </div>
            `;
        }

        container.innerHTML = html;

        // Add click handlers
        this.attachResourceHandlers();
    }

    /**
     * Render General Resources section
     */
    renderGeneralResources() {
        let html = `
            <div class="mb-4">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-folder-fill gradient-text me-2"></i>
                    General Resources
                </h4>
                <div class="row g-2">
        `;

        this.generalResources.forEach(resource => {
            html += this.renderResourceButton(resource);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render Department Resources section
     */
    renderDepartmentResources() {
        let html = `
            <div class="mb-4 mt-4 pt-4 border-top">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-briefcase-fill gradient-text me-2"></i>
                    Department Resources
                </h4>
                <div class="row g-2">
        `;

        this.departmentResources.forEach(resource => {
            html += this.renderResourceButton(resource);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render individual resource button
     */
    renderResourceButton(resource) {
        const icon = resource.icon || 'link-45deg';
        const title = resource.title || 'Resource';
        const description = resource.description || '';
        const url = resource.url || '#';

        return `
            <div class="col-12 col-md-6 col-lg-4">
                <a href="${url}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="resource-button text-decoration-none"
                   data-resource-id="${resource.id}">
                    <div class="card h-100 resource-card">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center p-4 text-center">
                            <div class="resource-icon mb-3">
                                <i class="bi bi-${icon}"></i>
                            </div>
                            <h6 class="card-title mb-2 fw-bold">${title}</h6>
                            ${description ? `<p class="card-text text-muted small mb-0">${description}</p>` : ''}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    /**
     * Attach event handlers to resource buttons
     */
    attachResourceHandlers() {
        document.querySelectorAll('.resource-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const url = button.getAttribute('href');
                if (url && url !== '#') {
                    // Open in new tab (as per requirements)
                    // The target="_blank" in the HTML will handle this, but we can add analytics or tracking here if needed
                    console.log('Opening resource:', url);
                }
            });
        });
    }
}

// Initialize resources page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Wait a bit for components to load
    setTimeout(async function() {
        const resourcesContainer = document.getElementById('resourcesContainer');
        if (resourcesContainer) {
            const resourcesPage = new ResourcesPage();
            await resourcesPage.init();
        }
    }, 500);
});

