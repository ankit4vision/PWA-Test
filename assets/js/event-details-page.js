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

        // Initialize logout button
        if (typeof initLogout === 'function') {
            initLogout();
        }

        // Initialize back button
        initBackButton();

        // Initialize page
        initEventDetailsPage();
    } catch (error) {
        console.error('Error initializing event details page:', error);
    }
});

/**
 * Initialize Back Button
 */
function initBackButton() {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Go back to events page
            window.location.href = 'events.html';
        });
    }
}

/**
 * Initialize Event Details Page
 */
async function initEventDetailsPage() {
    // Initialize accordion functionality
    initAccordion();
    
    // Wait for dataService to be available (check both window.dataService and global dataService)
    let retries = 0;
    while ((typeof window.dataService === 'undefined' && typeof dataService === 'undefined') && retries < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    
    if (typeof window.dataService === 'undefined' && typeof dataService === 'undefined') {
        console.error('DataService not available after waiting');
        renderNoTravelMessage();
        return;
    }
    
    // Load and render travel arrangements
    await loadTravelArrangements();
}

/**
 * Load and render travel arrangements
 */
async function loadTravelArrangements() {
    try {
        // Ensure dataService is available
        const service = window.dataService || dataService;
        if (!service) {
            console.error('DataService not available');
            renderNoTravelMessage();
            return;
        }
        
        // Get event ID from URL or use default for demo
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('eventId') || '1'; // Default to event 1 for demo
        
        console.log('Loading travel for eventId:', eventId);
        
        // Get current user
        const currentUser = await service.getCurrentUser();
        if (!currentUser) {
            console.error('No current user found');
            renderNoTravelMessage();
            return;
        }
        
        console.log('Current user:', currentUser.id);
        
        // Get travel arrangements - ensure eventId is a number
        const travel = await service.getTravelArrangements(currentUser.id, parseInt(eventId));
        
        console.log('Travel data:', travel);
        
        if (!travel) {
            console.log('No travel arrangements found for user', currentUser.id, 'event', eventId);
            renderNoTravelMessage();
            return;
        }
        
        // Render travel arrangements
        renderTravelArrangements(travel);
        
    } catch (error) {
        console.error('Error loading travel arrangements:', error);
        console.error('Error stack:', error.stack);
        renderNoTravelMessage();
    }
}

/**
 * Render travel arrangements
 */
function renderTravelArrangements(travel) {
    const container = document.getElementById('travelArrangementsContent');
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Check if travel types exist
    if (!travel.travelTypes || travel.travelTypes.length === 0) {
        renderNoTravelMessage();
        return;
    }
    
    // Render travel type badges - Each travel type gets an icon and label
    const travelTypesContainer = document.createElement('div');
    travelTypesContainer.className = 'travel-types-container mb-3';
    
    // Display icon and label for EACH travel type
    travel.travelTypes.forEach(type => {
        const badge = createTravelTypeBadge(type);
        travelTypesContainer.appendChild(badge);
    });
    
    container.appendChild(travelTypesContainer);
    
    // Render each travel type's details section
    travel.travelTypes.forEach((type, index) => {
        const section = renderTravelTypeDetails(type, travel);
        if (section) {
            // Add a heading for each travel type section
            const heading = document.createElement('h6');
            heading.className = 'travel-type-heading mb-3';
            if (index > 0) {
                heading.className += ' mt-4';
            }
            heading.innerHTML = `
                <i class="bi ${getTravelTypeIcon(type)} me-2"></i>
                ${type} Details
            `;
            
            container.appendChild(heading);
            container.appendChild(section);
        }
    });
}

/**
 * Get travel type icon class
 */
function getTravelTypeIcon(type) {
    const icons = {
        'Flight': 'bi-airplane-fill',
        'Driving': 'bi-car-front-fill',
        'Rental Car': 'bi-car-front',
        'Train': 'bi-train-front',
        'Uber': 'bi-taxi-front-fill',
        'Bus': 'bi-bus-front'
    };
    return icons[type] || 'bi-circle';
}

/**
 * Create travel type badge
 */
function createTravelTypeBadge(type) {
    const badge = document.createElement('div');
    badge.className = 'travel-type-badge-inline';
    
    const icons = {
        'Flight': 'bi-airplane-fill',
        'Driving': 'bi-car-front-fill',
        'Rental Car': 'bi-car-front',
        'Train': 'bi-train-front',
        'Uber': 'bi-taxi-front-fill',
        'Bus': 'bi-bus-front'
    };
    
    const iconClass = icons[type] || 'bi-circle';
    
    badge.innerHTML = `
        <i class="bi ${iconClass}"></i>
        <span>${type}</span>
    `;
    
    return badge;
}

/**
 * Render travel type details
 */
function renderTravelTypeDetails(type, travel) {
    const section = document.createElement('div');
    section.className = 'travel-type-section mb-4';
    
    switch(type) {
        case 'Flight':
            if (travel.flight) {
                section.innerHTML = renderFlightDetails(travel.flight);
            }
            break;
        case 'Driving':
            if (travel.driving) {
                section.innerHTML = renderDrivingDetails(travel.driving);
            }
            break;
        case 'Rental Car':
            if (travel.rentalCar) {
                section.innerHTML = renderRentalCarDetails(travel.rentalCar);
            }
            break;
        case 'Train':
            if (travel.train) {
                section.innerHTML = renderTrainDetails(travel.train);
            }
            break;
        case 'Uber':
            if (travel.uber) {
                section.innerHTML = renderUberDetails(travel.uber);
            }
            break;
        case 'Bus':
            if (travel.bus) {
                section.innerHTML = renderBusDetails(travel.bus);
            }
            break;
    }
    
    return section.children.length > 0 ? section : null;
}

/**
 * Render Flight details
 */
function renderFlightDetails(flight) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
               ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-ticket-perforated"></i>
                <div>
                    <strong>Confirmation:</strong>
                    <span class="font-monospace">${flight.confirmationNumber}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-airplane"></i>
                <div>
                    <strong>Airline:</strong>
                    <span>${flight.airline}</span>
                </div>
            </div>
            
            <!-- Main Flight -->
            <div class="flight-compact">
                <div class="flight-label">Main Flight</div>
                <div class="flight-route">
                    <div class="airport-compact">
                        <div class="airport-code-sm">${flight.departureAirport}</div>
                        <div class="airport-time-sm">${formatDate(flight.departureTime)}</div>
                    </div>
                    <i class="bi bi-arrow-right flight-arrow-sm"></i>
                    <div class="airport-compact">
                        <div class="airport-code-sm">${flight.arrivalAirport}</div>
                        <div class="airport-time-sm">${formatDate(flight.arrivalTime)}</div>
                    </div>
                </div>
            </div>
    `;
    
    // Connection flight
    if (flight.hasConnection && flight.connectionFlight) {
        html += `
            <div class="flight-compact">
                <div class="flight-label">Connection</div>
                <div class="flight-route">
                    <div class="airport-compact">
                        <div class="airport-code-sm">${flight.connectionFlight.departureAirport}</div>
                        <div class="airport-time-sm">${formatDate(flight.connectionFlight.departureTime)}</div>
                    </div>
                    <i class="bi bi-arrow-right flight-arrow-sm"></i>
                    <div class="airport-compact">
                        <div class="airport-code-sm">${flight.connectionFlight.arrivalAirport}</div>
                        <div class="airport-time-sm">${formatDate(flight.connectionFlight.arrivalTime)}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Special notes
    if (flight.specialNotes) {
        const notesWithLinks = flight.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render Driving/Carpool details
 */
function renderDrivingDetails(driving) {
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-car-front-fill"></i>
                <div>
                    <strong>Car Type:</strong>
                    <span>${driving.carType}</span>
                </div>
            </div>
    `;
    
    // Carpool passengers
    if (driving.carpoolPassengers && driving.carpoolPassengers.length > 0) {
        html += `
            <div class="detail-row">
                <i class="bi bi-people"></i>
                <div>
                    <strong>Carpool Passengers:</strong>
                    <div class="passenger-list">
        `;
        driving.carpoolPassengers.forEach(passenger => {
            html += `
                <div class="passenger-item">
                    <span>${passenger.name}</span>
                    ${passenger.phone ? `<a href="tel:${passenger.phone.replace(/\s/g, '')}" class="text-primary ms-2">
                        <i class="bi bi-telephone"></i> ${passenger.phone}
                    </a>` : ''}
                </div>
            `;
        });
        html += `
                    </div>
                </div>
            </div>
        `;
    }
    
    // Meeting location
    if (driving.meetingLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <strong>Meeting Location:</strong>
                    <span>${driving.meetingLocation}</span>
                </div>
            </div>
        `;
    }
    
    // Planned stops
    if (driving.plannedStops && driving.plannedStops.length > 0) {
        html += `
            <div class="detail-row">
                <i class="bi bi-signpost-split"></i>
                <div>
                    <strong>Planned Stops:</strong>
                    <div class="stops-list">
        `;
        driving.plannedStops.forEach(stop => {
            const stopTime = new Date(stop.estimatedTime).toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
            });
            html += `
                <div class="stop-item">
                    <strong>Stop ${stop.stopNumber}:</strong> ${stop.location}
                    <span class="text-muted ms-2">(${stopTime})</span>
                </div>
            `;
        });
        html += `
                    </div>
                </div>
            </div>
        `;
    }
    
    // Special notes
    if (driving.specialNotes) {
        const notesWithLinks = driving.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render Rental Car details
 */
function renderRentalCarDetails(rentalCar) {
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-car-front"></i>
                <div>
                    <strong>Car Type:</strong>
                    <span>${rentalCar.carType}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-building"></i>
                <div>
                    <strong>Rental Company:</strong>
                    <span>${rentalCar.rentalCompany}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-ticket-perforated"></i>
                <div>
                    <strong>Confirmation:</strong>
                    <span class="font-monospace">${rentalCar.confirmationNumber}</span>
                </div>
            </div>
    `;
    
    // Carpool passengers
    if (rentalCar.carpoolPassengers && rentalCar.carpoolPassengers.length > 0) {
        html += `
            <div class="detail-row">
                <i class="bi bi-people"></i>
                <div>
                    <strong>Carpool Passengers:</strong>
                    <div class="passenger-list">
        `;
        rentalCar.carpoolPassengers.forEach(passenger => {
            html += `
                <div class="passenger-item">
                    <span>${passenger.name}</span>
                    ${passenger.phone ? `<a href="tel:${passenger.phone.replace(/\s/g, '')}" class="text-primary ms-2">
                        <i class="bi bi-telephone"></i> ${passenger.phone}
                    </a>` : ''}
                </div>
            `;
        });
        html += `
                    </div>
                </div>
            </div>
        `;
    }
    
    // Meeting location
    if (rentalCar.meetingLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <strong>Meeting Location:</strong>
                    <span>${rentalCar.meetingLocation}</span>
                </div>
            </div>
        `;
    }
    
    // Planned stops
    if (rentalCar.plannedStops && rentalCar.plannedStops.length > 0) {
        html += `
            <div class="detail-row">
                <i class="bi bi-signpost-split"></i>
                <div>
                    <strong>Planned Stops:</strong>
                    <div class="stops-list">
        `;
        rentalCar.plannedStops.forEach(stop => {
            const stopTime = new Date(stop.estimatedTime).toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
            });
            html += `
                <div class="stop-item">
                    <strong>Stop ${stop.stopNumber}:</strong> ${stop.location}
                    <span class="text-muted ms-2">(${stopTime})</span>
                </div>
            `;
        });
        html += `
                    </div>
                </div>
            </div>
        `;
    }
    
    // Special notes
    if (rentalCar.specialNotes) {
        const notesWithLinks = rentalCar.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render Train details
 */
function renderTrainDetails(train) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
               ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-ticket-perforated"></i>
                <div>
                    <strong>Confirmation:</strong>
                    <span class="font-monospace">${train.confirmationNumber}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-train-front"></i>
                <div>
                    <strong>Train Line:</strong>
                    <span>${train.trainLine}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <strong>Departure:</strong>
                    <span>${train.departureStation} - ${formatDate(train.departureTime)}</span>
                </div>
            </div>
            
            <div class="detail-row">
                <i class="bi bi-geo-alt-fill"></i>
                <div>
                    <strong>Arrival:</strong>
                    <span>${train.arrivalStation} - ${formatDate(train.arrivalTime)}</span>
                </div>
            </div>
    `;
    
    if (train.specialNotes) {
        const notesWithLinks = train.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render Uber details
 */
function renderUberDetails(uber) {
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-taxi-front-fill"></i>
                <div>
                    <strong>Service:</strong>
                    <span>Uber</span>
                </div>
            </div>
    `;
    
    if (uber.pickupLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <strong>Pickup Location:</strong>
                    <span>${uber.pickupLocation}</span>
                </div>
            </div>
        `;
    }
    
    if (uber.dropoffLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt-fill"></i>
                <div>
                    <strong>Drop-off Location:</strong>
                    <span>${uber.dropoffLocation}</span>
                </div>
            </div>
        `;
    }
    
    if (uber.specialNotes) {
        const notesWithLinks = uber.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render Bus details
 */
function renderBusDetails(bus) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
               ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    
    let html = `
        <div class="travel-details-compact">
            <div class="detail-row">
                <i class="bi bi-bus-front"></i>
                <div>
                    <strong>Bus Service:</strong>
                    <span>${bus.busService || 'Bus'}</span>
                </div>
            </div>
    `;
    
    if (bus.departureLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <strong>Departure:</strong>
                    <span>${bus.departureLocation}${bus.departureTime ? ' - ' + formatDate(bus.departureTime) : ''}</span>
                </div>
            </div>
        `;
    }
    
    if (bus.arrivalLocation) {
        html += `
            <div class="detail-row">
                <i class="bi bi-geo-alt-fill"></i>
                <div>
                    <strong>Arrival:</strong>
                    <span>${bus.arrivalLocation}${bus.arrivalTime ? ' - ' + formatDate(bus.arrivalTime) : ''}</span>
                </div>
            </div>
        `;
    }
    
    if (bus.specialNotes) {
        const notesWithLinks = bus.specialNotes.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );
        html += `
            <div class="detail-row">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>Notes:</strong>
                    <div class="notes-text">${notesWithLinks}</div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Render no travel message
 */
function renderNoTravelMessage() {
    const container = document.getElementById('travelArrangementsContent');
    if (!container) return;
    
    // Try to load demo data as fallback
    loadDemoTravelData(container);
}

/**
 * Load demo travel data as fallback
 */
async function loadDemoTravelData(container) {
    try {
        // Try to fetch travel data directly
        const response = await fetch('assets/data/travel.json');
        if (!response.ok) throw new Error('Failed to fetch travel data');
        
        const data = await response.json();
        const demoTravel = data.travelArrangements.find(ta => ta.userId === 1 && ta.eventId === 1);
        
        if (demoTravel) {
            console.log('Using demo travel data');
            renderTravelArrangements(demoTravel);
        } else {
            container.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="bi bi-info-circle fs-1 d-block mb-2"></i>
                    <p>No travel arrangements have been posted for this event yet.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading demo data:', error);
        container.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-info-circle fs-1 d-block mb-2"></i>
                <p>No travel arrangements have been posted for this event yet.</p>
                <p class="small mt-2">Error: ${error.message}</p>
            </div>
        `;
    }
}

/**
 * Initialize Accordion Sections
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const target = document.querySelector(targetId);
            const icon = this.querySelector('.accordion-icon');
            
            if (target) {
                // Toggle aria-expanded
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

