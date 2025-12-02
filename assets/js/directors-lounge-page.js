/**
 * Director's Lounge Page - Handles Director's Lounge page functionality
 */

class DirectorsLoungePage {
    constructor() {
        this.priorityEvent = null;
        this.loungeData = null;
    }

    /**
     * Initialize the Director's Lounge page
     */
    async init() {
        // Check if user is a director
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.accountTypes || !currentUser.accountTypes.includes('Director')) {
            this.showAccessDenied();
            return;
        }

        await this.loadData();
        await this.renderPage();
    }

    /**
     * Load priority event and Director's Lounge data
     */
    async loadData() {
        const ds = window.dataService;
        if (!ds) {
            console.error('DataService not available');
            return;
        }

        const userId = getCurrentUserId();
        
        // Get priority event (current/most upcoming event)
        this.priorityEvent = await ds.getPriorityEvent(userId);
        
        // For demo purposes: if no priority event found, use event ID 1
        if (!this.priorityEvent) {
            console.warn('No priority event found, using demo event ID 1');
            this.priorityEvent = await ds.getEventById(1);
        }

        if (!this.priorityEvent) {
            console.error('Could not load event data');
            return;
        }

        // Load Director's Lounge data for the priority event
        this.loungeData = await ds.getDirectorsLoungeData(this.priorityEvent.id);
        
        console.log('Director\'s Lounge data loaded:', {
            eventId: this.priorityEvent.id,
            event: this.priorityEvent.name,
            hasCrewSheet: !!this.loungeData.crewSheet,
            hasRoomingList: !!this.loungeData.roomingList,
            hasDirectorsNotes: !!this.loungeData.directorsNotes,
            hasEventRegistration: !!this.loungeData.eventRegistration,
            loungeData: this.loungeData
        });
    }

    /**
     * Render the entire Director's Lounge page
     */
    async renderPage() {
        const container = document.getElementById('directorsLoungeContainer');
        if (!container) {
            console.error('Director\'s Lounge container not found');
            return;
        }

        // Show loading state
        container.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary-custom" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Loading Director's Lounge...</p>
            </div>
        `;

        if (!this.priorityEvent) {
            console.error('No event available to display');
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-calendar-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">No Upcoming Event</h3>
                    <p class="text-muted">You don't have any upcoming events at this time.</p>
                </div>
            `;
            return;
        }

        console.log('Rendering Director\'s Lounge for event:', this.priorityEvent.id);
        console.log('Lounge data:', this.loungeData);

        let html = '';

        // Event Header
        html += this.renderEventHeader();

        // Section 1: Crew Sheet
        html += this.renderCrewSheet();

        // Section 2: Rooming List
        html += this.renderRoomingList();

        // Section 3: Director's Notes
        html += this.renderDirectorsNotes();

        // Section 4: Event Registration
        html += this.renderEventRegistration();

        container.innerHTML = html;
        console.log('Director\'s Lounge rendered successfully');

        // Initialize accordion functionality after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initAccordion();
        }, 100);
    }

    /**
     * Render event header
     */
    renderEventHeader() {
        const event = this.priorityEvent;
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const dateFormat = { month: 'short', day: 'numeric', year: 'numeric' };
        const startDateStr = startDate.toLocaleDateString('en-US', dateFormat);
        const endDateStr = endDate.toLocaleDateString('en-US', dateFormat);
        const dateRange = startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;

        return `
            <div class="event-header-card mb-3">
                <h1 class="event-title">${event.name}</h1>
                <div class="event-header-meta">
                    <span class="event-date">
                        <i class="bi bi-calendar-event"></i>
                        ${dateRange}
                    </span>
                    <span class="event-location">
                        <i class="bi bi-geo-alt-fill"></i>
                        ${event.city}, ${event.state}
                    </span>
                </div>
            </div>
        `;
    }

    /**
     * Render Crew Sheet section
     */
    renderCrewSheet() {
        const crewSheet = this.loungeData?.crewSheet;
        
        console.log('Rendering Crew Sheet:', crewSheet);
        
        if (!crewSheet || !crewSheet.crewMembers || crewSheet.crewMembers.length === 0) {
            return `
                <div class="card-full accordion-item">
                    <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#crewSheet">
                        <h4 class="mb-0">
                            <i class="bi bi-people-fill me-2"></i>
                            Crew Sheet
                        </h4>
                        <i class="bi bi-chevron-down accordion-icon"></i>
                    </div>
                    <div id="crewSheet" class="collapse show accordion-collapse">
                        <div class="card-body-full">
                            <div class="text-center text-muted py-4">
                                <i class="bi bi-people"></i>
                                <p class="mt-2 mb-0">No crew members assigned to this event.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        let crewMembersHtml = '<div class="crew-sheet-list">';
        
        crewSheet.crewMembers.forEach(member => {
            const roles = Array.isArray(member.roles) ? member.roles.join(', ') : member.roles || 'N/A';
            const dietaryRestrictions = member.dietaryRestrictions || 'None';
            const profilePicture = member.profilePicture || 'https://via.placeholder.com/150';
            const phone = member.phone || 'N/A';
            const phoneLink = phone !== 'N/A' ? `tel:${phone.replace(/[^\d+]/g, '')}` : '#';

            crewMembersHtml += `
                <div class="crew-member-item">
                    <div class="crew-member-avatar">
                        <img src="${profilePicture}" alt="${member.legalName}" class="crew-avatar-img">
                    </div>
                    <div class="crew-member-details">
                        <div class="crew-member-name">${member.legalName}</div>
                        <div class="crew-member-role">
                            <i class="bi bi-briefcase"></i>
                            ${roles}
                        </div>
                        <div class="crew-member-phone">
                            <i class="bi bi-telephone"></i>
                            <a href="${phoneLink}" class="text-decoration-none">${phone}</a>
                        </div>
                        <div class="crew-member-dietary">
                            <i class="bi bi-heart"></i>
                            <span class="text-muted">Dietary: ${dietaryRestrictions}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        crewMembersHtml += '</div>';

        return `
            <div class="card-full accordion-item">
                <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#crewSheet">
                    <h4 class="mb-0">
                        <i class="bi bi-people-fill me-2"></i>
                        Crew Sheet
                    </h4>
                    <i class="bi bi-chevron-down accordion-icon"></i>
                </div>
                <div id="crewSheet" class="collapse show accordion-collapse">
                    <div class="card-body-full">
                        ${crewMembersHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Rooming List section
     */
    renderRoomingList() {
        const roomingList = this.loungeData?.roomingList;
        
        console.log('Rendering Rooming List:', roomingList);
        
        if (!roomingList || !roomingList.rooms || roomingList.rooms.length === 0) {
            return `
                <div class="card-full accordion-item">
                    <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#roomingList">
                        <h4 class="mb-0">
                            <i class="bi bi-door-open me-2"></i>
                            Rooming List
                        </h4>
                        <i class="bi bi-chevron-down accordion-icon"></i>
                    </div>
                    <div id="roomingList" class="collapse show accordion-collapse">
                        <div class="card-body-full">
                            <div class="text-center text-muted py-4">
                                <i class="bi bi-door-open"></i>
                                <p class="mt-2 mb-0">No rooming assignments for this event.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Desktop table view
        let tableHtml = `
            <div class="table-responsive d-none d-md-block">
                <table class="table table-hover rooming-table">
                    <thead>
                        <tr>
                            <th>Room #</th>
                            <th>Room Style</th>
                            <th>Roommate #1</th>
                            <th>Roommate #1 Phone</th>
                            <th>Roommate #2</th>
                            <th>Roommate #2 Phone</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Mobile card view
        let mobileHtml = '<div class="d-md-none rooming-mobile-list">';

        roomingList.rooms.forEach(room => {
            const roommate1 = room.roommate1 || null;
            const roommate2 = room.roommate2 || null;
            const roommate1Phone = roommate1 ? roommate1.phone : 'N/A';
            const roommate2Phone = roommate2 ? roommate2.phone : 'N/A';
            const roommate1PhoneLink = roommate1 && roommate1Phone !== 'N/A' 
                ? `tel:${roommate1Phone.replace(/[^\d+]/g, '')}` : '#';
            const roommate2PhoneLink = roommate2 && roommate2Phone !== 'N/A' 
                ? `tel:${roommate2Phone.replace(/[^\d+]/g, '')}` : '#';

            // Desktop table row
            tableHtml += `
                <tr>
                    <td><strong>${room.roomNumber}</strong></td>
                    <td>${room.roomStyle}</td>
                    <td>${roommate1 ? roommate1.name : 'N/A'}</td>
                    <td>
                        ${roommate1 && roommate1Phone !== 'N/A' 
                            ? `<a href="${roommate1PhoneLink}" class="text-decoration-none">${roommate1Phone}</a>`
                            : roommate1Phone}
                    </td>
                    <td>${roommate2 ? roommate2.name : 'N/A'}</td>
                    <td>
                        ${roommate2 && roommate2Phone !== 'N/A' 
                            ? `<a href="${roommate2PhoneLink}" class="text-decoration-none">${roommate2Phone}</a>`
                            : roommate2Phone}
                    </td>
                </tr>
            `;

            // Mobile card
            mobileHtml += `
                <div class="rooming-mobile-card">
                    <div class="rooming-mobile-header">
                        <strong>Room ${room.roomNumber}</strong>
                        <span class="badge bg-secondary">${room.roomStyle}</span>
                    </div>
                    <div class="rooming-mobile-body">
                        <div class="rooming-mobile-item">
                            <div class="rooming-mobile-label">Roommate #1:</div>
                            <div class="rooming-mobile-value">
                                ${roommate1 ? roommate1.name : 'N/A'}
                                ${roommate1 && roommate1Phone !== 'N/A' 
                                    ? `<br><a href="${roommate1PhoneLink}" class="text-decoration-none small"><i class="bi bi-telephone"></i> ${roommate1Phone}</a>`
                                    : ''}
                            </div>
                        </div>
                        ${roommate2 ? `
                            <div class="rooming-mobile-item">
                                <div class="rooming-mobile-label">Roommate #2:</div>
                                <div class="rooming-mobile-value">
                                    ${roommate2.name}
                                    ${roommate2Phone !== 'N/A' 
                                        ? `<br><a href="${roommate2PhoneLink}" class="text-decoration-none small"><i class="bi bi-telephone"></i> ${roommate2Phone}</a>`
                                        : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        tableHtml += `
                    </tbody>
                </table>
            </div>
        `;

        mobileHtml += '</div>';

        return `
            <div class="card-full accordion-item">
                <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#roomingList">
                    <h4 class="mb-0">
                        <i class="bi bi-door-open me-2"></i>
                        Rooming List
                    </h4>
                    <i class="bi bi-chevron-down accordion-icon"></i>
                </div>
                <div id="roomingList" class="collapse show accordion-collapse">
                    <div class="card-body-full">
                        ${tableHtml}
                        ${mobileHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Director's Notes section
     */
    renderDirectorsNotes() {
        const directorsNotes = this.loungeData?.directorsNotes;
        
        console.log('Rendering Director\'s Notes:', directorsNotes);
        
        if (!directorsNotes || !directorsNotes.content) {
            return `
                <div class="card-full accordion-item">
                    <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#directorsNotes">
                        <h4 class="mb-0">
                            <i class="bi bi-sticky-fill me-2"></i>
                            Director's Notes
                        </h4>
                        <i class="bi bi-chevron-down accordion-icon"></i>
                    </div>
                    <div id="directorsNotes" class="collapse show accordion-collapse">
                        <div class="card-body-full">
                            <div class="text-center text-muted py-4">
                                <i class="bi bi-sticky"></i>
                                <p class="mt-2 mb-0">No notes available for this event.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="card-full accordion-item">
                <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#directorsNotes">
                    <h4 class="mb-0">
                        <i class="bi bi-sticky-fill me-2"></i>
                        Director's Notes
                    </h4>
                    <i class="bi bi-chevron-down accordion-icon"></i>
                </div>
                <div id="directorsNotes" class="collapse show accordion-collapse">
                    <div class="card-body-full">
                        <div class="directors-notes-content">
                            ${directorsNotes.content}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Event Registration section
     */
    renderEventRegistration() {
        const eventRegistration = this.loungeData?.eventRegistration;
        
        console.log('Rendering Event Registration:', eventRegistration);
        
        if (!eventRegistration || !eventRegistration.studios || eventRegistration.studios.length === 0) {
            return `
                <div class="card-full accordion-item">
                    <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#eventRegistration">
                        <h4 class="mb-0">
                            <i class="bi bi-clipboard-check me-2"></i>
                            Event Registration
                        </h4>
                        <i class="bi bi-chevron-down accordion-icon"></i>
                    </div>
                    <div id="eventRegistration" class="collapse show accordion-collapse">
                        <div class="card-body-full">
                            <div class="text-center text-muted py-4">
                                <i class="bi bi-clipboard-check"></i>
                                <p class="mt-2 mb-0">No studio registrations for this event.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        let studiosHtml = '<div class="event-registration-list">';

        eventRegistration.studios.forEach(studio => {
            // Determine balance color
            let balanceClass = '';
            let balanceText = '';
            if (studio.eventBalance > 0) {
                balanceClass = 'text-danger';
                balanceText = `$${studio.eventBalance.toFixed(2)}`;
            } else if (studio.eventBalance < 0) {
                balanceClass = 'text-success';
                balanceText = `$${Math.abs(studio.eventBalance).toFixed(2)} Credit`;
            } else {
                balanceClass = '';
                balanceText = '$0.00';
            }

            // Format registered events for season
            let eventsListHtml = '';
            if (studio.registeredEventsForSeason && studio.registeredEventsForSeason.length > 0) {
                eventsListHtml = '<ul class="mb-0">';
                studio.registeredEventsForSeason.forEach(event => {
                    const eventDate = new Date(event.eventDate);
                    const dateStr = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    eventsListHtml += `<li>${event.eventName} - ${dateStr}</li>`;
                });
                eventsListHtml += '</ul>';
            } else {
                eventsListHtml = '<p class="text-muted mb-0">No other events registered for this season.</p>';
            }

            studiosHtml += `
                <div class="studio-registration-item">
                    <div class="studio-registration-header" data-bs-toggle="collapse" data-bs-target="#studio-${studio.studioId}">
                        <div class="studio-registration-title">
                            <strong>${studio.studioName}</strong>
                            <span class="studio-balance ${balanceClass}">${balanceText}</span>
                        </div>
                        <i class="bi bi-chevron-down accordion-icon"></i>
                    </div>
                    <div id="studio-${studio.studioId}" class="collapse studio-registration-details">
                        <div class="studio-registration-body">
                            <div class="detail-row">
                                <i class="bi bi-person"></i>
                                <div>
                                    <strong>Owner/Director:</strong>
                                    <span>${studio.ownerDirectorName}</span>
                                </div>
                            </div>
                            <div class="detail-row">
                                <i class="bi bi-telephone"></i>
                                <div>
                                    <strong>Telephone:</strong>
                                    <a href="tel:${studio.telephoneNumber.replace(/[^\d+]/g, '')}" class="text-decoration-none">${studio.telephoneNumber}</a>
                                </div>
                            </div>
                            <div class="detail-row">
                                <i class="bi bi-list-check"></i>
                                <div>
                                    <strong>Total Registered Entries:</strong>
                                    <span>${studio.totalRegisteredEntries}</span>
                                </div>
                            </div>
                            <div class="detail-row">
                                <i class="bi bi-people"></i>
                                <div>
                                    <strong>Total Registered Dancers:</strong>
                                    <span>${studio.totalRegisteredDancers}</span>
                                </div>
                            </div>
                            <div class="detail-row">
                                <i class="bi bi-calendar-event"></i>
                                <div>
                                    <strong>Registered Events for Season:</strong>
                                    ${eventsListHtml}
                                </div>
                            </div>
                            <div class="detail-row">
                                <i class="bi bi-credit-card"></i>
                                <div>
                                    <strong>Payment Portal:</strong>
                                    <a href="${studio.paymentPortalLink}" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
                                        Make Payment
                                        <i class="bi bi-box-arrow-up-right ms-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        studiosHtml += '</div>';

        return `
            <div class="card-full accordion-item">
                <div class="card-header-full accordion-header" data-bs-toggle="collapse" data-bs-target="#eventRegistration">
                    <h4 class="mb-0">
                        <i class="bi bi-clipboard-check me-2"></i>
                        Event Registration
                    </h4>
                    <i class="bi bi-chevron-down accordion-icon"></i>
                </div>
                <div id="eventRegistration" class="collapse show accordion-collapse">
                    <div class="card-body-full">
                        ${studiosHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show access denied message
     */
    showAccessDenied() {
        const container = document.getElementById('directorsLoungeContainer');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-shield-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">Access Denied</h3>
                    <p class="text-muted">This page is only accessible to Directors.</p>
                </div>
            `;
        }
    }

    /**
     * Initialize accordion functionality
     */
    initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const targetId = this.getAttribute('data-bs-target');
                const target = document.querySelector(targetId);
                const icon = this.querySelector('.accordion-icon');
                
                if (target) {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !isExpanded);
                }
            });
            
            // Set initial state
            const targetId = header.getAttribute('data-bs-target');
            const target = document.querySelector(targetId);
            if (target && target.classList.contains('show')) {
                header.setAttribute('aria-expanded', 'true');
            } else {
                header.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Listen for Bootstrap collapse events
        const collapseElements = document.querySelectorAll('.accordion-collapse');
        collapseElements.forEach(element => {
            element.addEventListener('show.bs.collapse', function() {
                const header = document.querySelector(`[data-bs-target="#${this.id}"]`);
                if (header) {
                    header.setAttribute('aria-expanded', 'true');
                }
            });
            
            element.addEventListener('hide.bs.collapse', function() {
                const header = document.querySelector(`[data-bs-target="#${this.id}"]`);
                if (header) {
                    header.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// Initialize Director's Lounge page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Director\'s Lounge page: DOM loaded');
    
    // Wait a bit for components and dataService to load
    setTimeout(async function() {
        console.log('Director\'s Lounge page: Initializing...');
        const directorsLoungeContainer = document.getElementById('directorsLoungeContainer');
        
        if (!directorsLoungeContainer) {
            console.error('Director\'s Lounge container not found');
            return;
        }
        
        // Check if dataService is available
        if (typeof window.dataService === 'undefined') {
            console.error('DataService not available, waiting...');
            // Try again after a bit more time
            setTimeout(async function() {
                if (typeof window.dataService !== 'undefined') {
                    const directorsLoungePage = new DirectorsLoungePage();
                    await directorsLoungePage.init();
                } else {
                    console.error('DataService still not available');
                    directorsLoungeContainer.innerHTML = `
                        <div class="text-center py-5">
                            <i class="bi bi-exclamation-triangle gradient-text" style="font-size: 4rem;"></i>
                            <h3 class="mt-3 text-muted">Error Loading Data</h3>
                            <p class="text-muted">Please refresh the page.</p>
                        </div>
                    `;
                }
            }, 1000);
            return;
        }
        
        const directorsLoungePage = new DirectorsLoungePage();
        await directorsLoungePage.init();
    }, 500);
});

