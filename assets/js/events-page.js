/**
 * Events Page - Handles My Events page functionality
 */

class EventsPage {
    constructor() {
        this.currentSeason = null;
        this.events = [];
        this.priorityEvent = null;
        this.futureEvents = [];
        this.pastEvents = [];
    }

    /**
     * Initialize the events page
     */
    async init() {
        await this.loadEvents();
        this.renderSeasonFilter();
        await this.renderEvents();
        
        // Debug logging
        console.log('Events loaded:', {
            total: this.events.length,
            priority: this.priorityEvent,
            future: this.futureEvents.length,
            past: this.pastEvents.length
        });
    }

    /**
     * Load events for current user
     */
    async loadEvents() {
        const ds = window.dataService;
        if (!ds) {
            console.error('DataService not available');
            return;
        }

        const userId = getCurrentUserId();
        
        // Get events data
        const eventsData = await ds.loadData('events.json');
        this.currentSeason = eventsData.currentSeason;
        
        // Get user's assigned events
        const userEvents = await ds.getEventsForUser(userId);
        this.events = userEvents;
        
        // Categorize events directly from eventCategory property (for demo)
        this.priorityEvent = userEvents.find(e => e.eventCategory === 'priority') || null;
        this.futureEvents = userEvents.filter(e => e.eventCategory === 'future');
        this.pastEvents = userEvents.filter(e => e.eventCategory === 'past');
        
        console.log('Events loaded:', {
            total: this.events.length,
            priority: this.priorityEvent ? this.priorityEvent.name : 'None',
            future: this.futureEvents.length,
            past: this.pastEvents.length
        });
    }

    /**
     * Render season filter
     */
    renderSeasonFilter() {
        const ds = window.dataService;
        if (!ds) return;

        ds.loadData('events.json').then(eventsData => {
            const filterContainer = document.getElementById('seasonFilter');
            if (!filterContainer) return;

            const currentSeason = eventsData.currentSeason;
            const seasons = eventsData.seasons;

            filterContainer.innerHTML = `
                <label for="seasonSelect" class="form-label mb-2">
                    <i class="bi bi-calendar3"></i> Season
                </label>
                <select class="form-select" id="seasonSelect">
                    ${seasons.map(season => 
                        `<option value="${season}" ${season === currentSeason ? 'selected' : ''}>${season}</option>`
                    ).join('')}
                </select>
            `;

            // Add change event listener
            const seasonSelect = document.getElementById('seasonSelect');
            if (seasonSelect) {
                seasonSelect.addEventListener('change', (e) => {
                    this.filterBySeason(e.target.value);
                });
            }
        });
    }

    /**
     * Filter events by season
     */
    async filterBySeason(season) {
        // Filter events by season
        const filteredEvents = this.events.filter(event => event.season === season);
        
        // Categorize events directly from eventCategory property (for demo)
        this.priorityEvent = filteredEvents.find(e => e.eventCategory === 'priority') || null;
        this.futureEvents = filteredEvents.filter(e => e.eventCategory === 'future');
        this.pastEvents = filteredEvents.filter(e => e.eventCategory === 'past');
        
        console.log('Season filter results:', {
            priority: this.priorityEvent ? this.priorityEvent.name : 'None',
            future: this.futureEvents.length,
            past: this.pastEvents.length
        });

        // Re-render
        await this.renderEvents();
    }

    /**
     * Render all event sections
     */
    async renderEvents() {
        const container = document.getElementById('eventsContainer');
        if (!container) {
            console.error('Events container not found');
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

        // Priority Event Section
        if (this.priorityEvent) {
            console.log('Rendering priority event:', this.priorityEvent.name);
            html += await this.renderPriorityEvent(this.priorityEvent);
        } else {
            console.log('No priority event found');
        }

        // Future Events Section
        if (this.futureEvents && this.futureEvents.length > 0) {
            console.log('Rendering future events:', this.futureEvents.length);
            html += await this.renderEventSection('Future Events', this.futureEvents, false);
        } else {
            console.log('No future events found');
        }

        // Past Events Section
        if (this.pastEvents && this.pastEvents.length > 0) {
            console.log('Rendering past events:', this.pastEvents.length);
            html += await this.renderEventSection('Past Events', this.pastEvents, true);
        } else {
            console.log('No past events found');
        }

        // Empty state
        if (!this.priorityEvent && (!this.futureEvents || this.futureEvents.length === 0) && (!this.pastEvents || this.pastEvents.length === 0)) {
            html = `
                <div class="text-center py-5">
                    <i class="bi bi-calendar-x gradient-text" style="font-size: 4rem;"></i>
                    <h3 class="mt-3 text-muted">No Events Found</h3>
                    <p class="text-muted">You don't have any events for the selected season.</p>
                </div>
            `;
        }

        container.innerHTML = html;

        // Add click handlers
        this.attachEventHandlers();
        
        // Load weather for priority event
        if (this.priorityEvent) {
            this.loadWeather(this.priorityEvent.id, this.priorityEvent.city);
        }
    }

    /**
     * Render Priority Event card
     */
    async renderPriorityEvent(event) {
        const startDate = formatDate(event.startDate);
        const endDate = formatDate(event.endDate);
        const travelIcon = await this.getTravelTypeIcon(event);
        const travelLabel = await this.getTravelTypeLabel(event);
        
        return `
            <div class="mb-4">
                <h5 class="mb-3">
                    <span class="badge bg-primary-custom me-2">Next Event</span>
                    Priority Event
                </h5>
                <div class="card event-card priority-event" data-event-id="${event.id}">
                    <div class="card-body p-3">
                        <h5 class="card-title mb-2">${event.name}</h5>
                        <p class="text-muted mb-2 small">
                            <i class="bi bi-calendar-event"></i> ${startDate} - ${endDate}
                        </p>
                        <p class="text-muted mb-2 small">
                            <i class="bi bi-geo-alt"></i> ${event.venueName}
                        </p>
                        <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mt-3">
                            <div class="d-flex flex-wrap gap-2 align-items-center">
                                ${this.renderTravelStatus(event)}
                                ${travelIcon ? `<span class="badge bg-light text-dark"><i class="bi bi-${travelIcon}"></i></span>` : ''}
                            </div>
                            <div id="weather-${event.id}" class="weather-widget-small">
                                <i class="bi bi-sun-fill"></i>
                                <span class="weather-temp-small">72°F</span>
                                <span class="weather-city-small">${event.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render event section (Future or Past)
     */
    async renderEventSection(title, events, isPast) {
        let html = `
            <div class="mb-4">
                <h5 class="mb-3">${title}</h5>
                <div class="row g-3">
        `;

        // Render all event cards
        for (const event of events) {
            html += await this.renderEventCard(event, isPast);
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render individual event card
     */
    async renderEventCard(event, isPast = false) {
        const startDate = formatDate(event.startDate);
        const endDate = formatDate(event.endDate);
        const travelIcon = await this.getTravelTypeIcon(event);
        
        return `
            <div class="col-12 col-md-6">
                <div class="card event-card" data-event-id="${event.id}">
                    <div class="card-body p-3">
                        <h5 class="card-title mb-2">${event.name}</h5>
                        <p class="text-muted mb-2 small">
                            <i class="bi bi-calendar-event"></i> ${startDate} - ${endDate}
                        </p>
                        <p class="text-muted mb-2 small">
                            <i class="bi bi-geo-alt"></i> ${event.venueName}
                        </p>
                        <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
                            ${this.renderTravelStatus(event)}
                            ${!isPast ? `<span class="badge ${this.getRegistrationBadgeClass(event.registrationStatus)}">${event.registrationStatus}</span>` : ''}
                            ${travelIcon ? `<span class="badge bg-light text-dark"><i class="bi bi-${travelIcon}"></i></span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render travel status badge
     */
    renderTravelStatus(event) {
        if (event.travelPublished) {
            return `<span class="badge bg-success"><i class="bi bi-check-circle"></i> Travel Posted</span>`;
        } else {
            return `<span class="badge bg-warning text-dark"><i class="bi bi-exclamation-triangle"></i> Travel Not Posted</span>`;
        }
    }

    /**
     * Get travel type icon for event
     */
    async getTravelTypeIcon(event) {
        const ds = window.dataService;
        if (!ds) return null;

        const userId = getCurrentUserId();
        const travel = await ds.getTravelArrangements(userId, event.id);
        
        if (!travel || !travel.travelTypes || travel.travelTypes.length === 0) {
            return null;
        }

        // Return icon for first travel type
        const travelType = travel.travelTypes[0];
        const iconMap = {
            'Flight': 'airplane',
            'Driving': 'car-front',
            'Train': 'train-front',
            'Uber': 'taxi-front',
            'Bus': 'bus-front',
            'Rental Car': 'car-front-fill'
        };
        
        return iconMap[travelType] || null;
    }

    /**
     * Get travel type label
     */
    async getTravelTypeLabel(event) {
        const ds = window.dataService;
        if (!ds) return 'Travel';

        const userId = getCurrentUserId();
        const travel = await ds.getTravelArrangements(userId, event.id);
        
        if (!travel || !travel.travelTypes || travel.travelTypes.length === 0) {
            return 'Travel';
        }

        return travel.travelTypes[0];
    }

    /**
     * Get registration badge class
     */
    getRegistrationBadgeClass(status) {
        if (status === 'Sold Out') return 'bg-danger';
        if (status === '75% Full') return 'bg-warning text-dark';
        if (status === '50% Full') return 'bg-info';
        return 'bg-secondary';
    }

    /**
     * Attach event handlers to event cards
     */
    attachEventHandlers() {
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const eventId = card.getAttribute('data-event-id');
                if (eventId) {
                    window.location.href = `event-details.html?id=${eventId}`;
                }
            });
        });
    }

    /**
     * Load weather for event city (mock for now)
     */
    async loadWeather(eventId, city) {
        // TODO: Integrate with weather API
        const weatherWidget = document.getElementById(`weather-${eventId}`);
        if (weatherWidget) {
            // Weather is already rendered in the card, just update if needed
            // For now, the static content is fine for demo
        }
    }
}

// Initialize events page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Wait a bit for components to load
    setTimeout(async function() {
        const eventsContainer = document.getElementById('eventsContainer');
        if (eventsContainer) {
            const eventsPage = new EventsPage();
            await eventsPage.init();
        }
    }, 500);
});

