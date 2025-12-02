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
                <div class="row g-2">
        `;

        this.generalForms.forEach(form => {
            html += this.renderFormButton(form);
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
                <div class="row g-2">
        `;

        this.departmentForms.forEach(form => {
            html += this.renderFormButton(form);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render individual form button
     */
    renderFormButton(form) {
        const icon = form.icon || 'file-earmark-text';
        const title = form.title || 'Form';
        const description = form.description || '';
        const url = form.url || '#';

        return `
            <div class="col-12 col-md-6 col-lg-4">
                <a href="${url}" 
                   class="form-button text-decoration-none"
                   data-form-id="${form.id}">
                    <div class="card h-100 form-card">
                        <div class="card-body d-flex flex-column align-items-center justify-content-center p-4 text-center">
                            <div class="form-icon mb-3">
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
     * Attach event handlers to form buttons
     */
    attachFormHandlers() {
        document.querySelectorAll('.form-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = button.getAttribute('href');
                const formId = button.getAttribute('data-form-id');
                const formTitle = button.querySelector('.card-title')?.textContent || 'Form';
                
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

