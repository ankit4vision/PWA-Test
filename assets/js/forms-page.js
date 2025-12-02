/**
 * Forms Page - Handles My Forms page functionality
 */

class FormsPage {
    constructor() {
        this.generalForms = [];
        this.departmentForms = [];
    }

    /**
     * Initialize the forms page
     */
    async init() {
        await this.loadForms();
        await this.renderForms();
    }

    /**
     * Load forms for current user
     */
    async loadForms() {
        const ds = window.dataService;
        if (!ds) {
            console.error('DataService not available');
            return;
        }

        const userId = getCurrentUserId();
        const forms = await ds.getForms(userId);
        
        this.generalForms = forms.general || [];
        this.departmentForms = forms.department || [];
        
        console.log('Forms loaded:', {
            general: this.generalForms.length,
            department: this.departmentForms.length
        });
    }

    /**
     * Render all form sections
     */
    async renderForms() {
        const container = document.getElementById('formsContainer');
        if (!container) {
            console.error('Forms container not found');
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

        // General Forms Section
        if (this.generalForms && this.generalForms.length > 0) {
            html += this.renderGeneralForms();
        }

        // Department Forms Section
        if (this.departmentForms && this.departmentForms.length > 0) {
            html += this.renderDepartmentForms();
        }

        // Empty state
        if ((!this.generalForms || this.generalForms.length === 0) && 
            (!this.departmentForms || this.departmentForms.length === 0)) {
            html = `
                <div class="text-center py-5">
                    <i class="bi bi-file-earmark-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">No Forms Available</h3>
                    <p class="text-muted">You don't have access to any forms at this time.</p>
                </div>
            `;
        }

        container.innerHTML = html;

        // Add click handlers
        this.attachFormHandlers();
    }

    /**
     * Render General Forms section
     */
    renderGeneralForms() {
        let html = `
            <div class="mb-4">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-file-earmark-text-fill gradient-text me-2"></i>
                    Generic Forms
                </h4>
                <div class="forms-list-vertical">
        `;

        this.generalForms.forEach(form => {
            html += this.renderFormListItem(form);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render Department Forms section
     */
    renderDepartmentForms() {
        let html = `
            <div class="mb-4 mt-4 pt-4 border-top">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-briefcase-fill gradient-text me-2"></i>
                    Department Forms
                </h4>
                <div class="forms-list-vertical">
        `;

        this.departmentForms.forEach(form => {
            html += this.renderFormListItem(form);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render individual form list item (vertical list view with icon, label, link)
     */
    renderFormListItem(form) {
        const title = form.title || 'Form';
        const url = form.url || '#';

        return `
            <div class="form-list-item">
                <i class="bi bi-file-earmark-text form-list-icon"></i>
                <span class="form-list-label">${title}</span>
                <a href="${url}" 
                   class="form-list-link"
                   data-form-id="${form.id}">
                    <i class="bi bi-box-arrow-up-right"></i>
                </a>
            </div>
        `;
    }

    /**
     * Attach event handlers to form list items
     */
    attachFormHandlers() {
        document.querySelectorAll('.form-list-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                const formId = link.getAttribute('data-form-id');
                const formTitle = link.closest('.form-list-item')?.querySelector('.form-list-label')?.textContent?.trim() || 'Form';
                
                if (url && url !== '#') {
                    // Forms should open inside the app using a modal with iframe
                    this.openFormInModal(url, formTitle, formId);
                }
            });
        });
    }

    /**
     * Open form in a modal overlay (inside the app)
     */
    openFormInModal(url, title, formId) {
        // Create modal HTML
        const modalId = `formModal-${formId}`;
        const modalHTML = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header form-modal-header">
                            <h5 class="modal-title fw-bold" id="${modalId}Label">
                                <i class="bi bi-file-earmark-text-fill gradient-text me-2"></i>
                                ${title}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body form-modal-body p-0">
                            <iframe 
                                src="${url}" 
                                class="form-iframe"
                                frameborder="0"
                                allow="camera; microphone; geolocation"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize and show Bootstrap modal
        const modalElement = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });
        
        modal.show();

        // Clean up when modal is closed
        modalElement.addEventListener('hidden.bs.modal', function() {
            modalElement.remove();
        });

        // Handle iframe load
        const iframe = modalElement.querySelector('.form-iframe');
        iframe.addEventListener('load', function() {
            console.log('Form loaded:', url);
        });

        console.log('Opening form in modal:', url);
    }
}

// Initialize forms page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Wait a bit for components to load
    setTimeout(async function() {
        const formsContainer = document.getElementById('formsContainer');
        if (formsContainer) {
            const formsPage = new FormsPage();
            await formsPage.init();
        }
    }, 500);
});

