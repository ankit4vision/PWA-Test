/**
 * Contact Page - Handles Contact Us page functionality
 */

class ContactPage {
    constructor() {
        this.generalContacts = [];
        this.directorContacts = [];
    }

    /**
     * Initialize the contact page
     */
    async init() {
        await this.loadContacts();
        await this.renderContacts();
    }

    /**
     * Load contacts for current user
     */
    async loadContacts() {
        const ds = window.dataService;
        if (!ds) {
            console.error('DataService not available');
            return;
        }

        const userId = getCurrentUserId();
        const contacts = await ds.getContacts(userId);
        
        this.generalContacts = contacts.general || [];
        this.directorContacts = contacts.director || [];
        
        console.log('Contacts loaded:', {
            general: this.generalContacts.length,
            director: this.directorContacts.length
        });
    }

    /**
     * Render all contact sections
     */
    async renderContacts() {
        const container = document.getElementById('contactsContainer');
        if (!container) {
            console.error('Contacts container not found');
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

        // General Contacts Section
        if (this.generalContacts && this.generalContacts.length > 0) {
            html += this.renderGeneralContacts();
        }

        // Director Contacts Section
        if (this.directorContacts && this.directorContacts.length > 0) {
            html += this.renderDirectorContacts();
        }

        // Empty state
        if ((!this.generalContacts || this.generalContacts.length === 0) && 
            (!this.directorContacts || this.directorContacts.length === 0)) {
            html = `
                <div class="text-center py-5">
                    <i class="bi bi-telephone-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">No Contacts Available</h3>
                    <p class="text-muted">You don't have access to any contacts at this time.</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    /**
     * Render General Contacts section
     */
    renderGeneralContacts() {
        let html = `
            <div class="mb-4">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-telephone-fill gradient-text me-2"></i>
                    Contact Us
                </h4>
                <div class="contacts-list">
        `;

        this.generalContacts.forEach(contact => {
            html += this.renderContactButton(contact);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render Director Contacts section
     */
    renderDirectorContacts() {
        let html = `
            <div class="mb-4 mt-4 pt-4 border-top">
                <h4 class="mb-3 fw-bold">
                    <i class="bi bi-shield-check-fill gradient-text me-2"></i>
                    On-Call Support
                </h4>
                <div class="contacts-list">
        `;

        this.directorContacts.forEach(contact => {
            html += this.renderContactButton(contact);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render individual contact button
     */
    renderContactButton(contact) {
        const name = contact.name || 'Contact';
        const description = contact.description || '';
        const icon = contact.icon || 'telephone-fill';
        const isProminent = contact.isProminent || false;
        const warningMessage = contact.warningMessage || null;

        // Determine action URL based on contact type
        let actionUrl = '#';
        if (contact.type === 'phone' && contact.phoneNumber) {
            actionUrl = `tel:${contact.phoneNumber}`;
        } else if (contact.type === 'email' && contact.email) {
            actionUrl = `mailto:${contact.email}`;
        }

        // Determine button class based on prominence
        const buttonClass = isProminent 
            ? 'contact-button contact-button-prominent' 
            : 'contact-button';

        // Determine icon class based on type
        const iconClass = contact.type === 'email' ? 'bi-envelope-fill' : `bi-${icon}`;

        let html = `
            <div class="contact-item ${isProminent ? 'mb-3' : 'mb-2'}">
                <a href="${actionUrl}" 
                   class="${buttonClass}"
                   data-contact-id="${contact.id}"
                   data-contact-type="${contact.type}">
                    <div class="contact-button-content">
                        <i class="bi ${iconClass} contact-button-icon"></i>
                        <div class="contact-button-text">
                            <div class="contact-button-name">${name}</div>
                            ${description ? `<div class="contact-button-description">${description}</div>` : ''}
                        </div>
                        <i class="bi bi-chevron-right contact-button-arrow"></i>
                    </div>
                </a>
                ${warningMessage ? `
                    <div class="contact-warning mt-2">
                        <i class="bi bi-exclamation-triangle-fill me-1"></i>
                        <small class="text-muted">${warningMessage}</small>
                    </div>
                ` : ''}
            </div>
        `;

        return html;
    }
}

// Initialize contact page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Wait a bit for components to load
    setTimeout(async function() {
        const contactsContainer = document.getElementById('contactsContainer');
        if (contactsContainer) {
            const contactPage = new ContactPage();
            await contactPage.init();
        }
    }, 500);
});

