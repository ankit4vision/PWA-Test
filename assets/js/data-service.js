/**
 * Data Service - Handles loading and managing mock JSON data
 */

class DataService {
    constructor() {
        this.cache = {};
        this.loadingPromises = {};
    }

    /**
     * Load JSON data from file
     */
    async loadData(fileName) {
        // Return cached data if available
        if (this.cache[fileName]) {
            return this.cache[fileName];
        }

        // Return existing promise if already loading
        if (this.loadingPromises[fileName]) {
            return this.loadingPromises[fileName];
        }

        // Create new loading promise
        this.loadingPromises[fileName] = fetch(`assets/data/${fileName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                this.cache[fileName] = data;
                delete this.loadingPromises[fileName];
                return data;
            })
            .catch(error => {
                console.error(`Error loading ${fileName}:`, error);
                delete this.loadingPromises[fileName];
                throw error;
            });

        return this.loadingPromises[fileName];
    }

    /**
     * Get current user data
     */
    async getCurrentUser() {
        const usersData = await this.loadData('users.json');
        return usersData.currentUser;
    }

    /**
     * Get all users
     */
    async getUsers() {
        const usersData = await this.loadData('users.json');
        return usersData.users;
    }

    /**
     * Get user by ID
     */
    async getUserById(userId) {
        const users = await this.getUsers();
        return users.find(user => user.id === userId);
    }

    /**
     * Get events for current user
     */
    async getEventsForUser(userId = null) {
        const eventsData = await this.loadData('events.json');
        const currentUser = await this.getCurrentUser();
        const targetUserId = userId || currentUser.id;

        // Get user's assigned events
        const user = await this.getUserById(targetUserId);
        if (!user) return [];

        return eventsData.events.filter(event => 
            user.assignedEvents.includes(event.id)
        );
    }

    /**
     * Get event by ID
     */
    async getEventById(eventId) {
        const eventsData = await this.loadData('events.json');
        return eventsData.events.find(event => event.id === eventId);
    }

    /**
     * Get priority event (next upcoming event)
     */
    async getPriorityEvent(userId = null) {
        const events = await this.getEventsForUser(userId);
        const now = new Date();
        // Normalize current date to start of day (local time)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Helper to parse date string to local date
        const parseDate = (dateStr) => {
            const parts = dateStr.split('-');
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        };
        
        // Find next upcoming event
        const upcomingEvents = events.filter(event => {
            const startDate = parseDate(event.startDate);
            const endDate = parseDate(event.endDate);
            // Add 24 hours to end date for the 24-hour rule
            const endDatePlus24 = new Date(endDate);
            endDatePlus24.setDate(endDatePlus24.getDate() + 1);
            
            // Event is upcoming if start date is today or future, OR end date + 24h is still in future
            return startDate >= today || endDatePlus24 >= today;
        });

        if (upcomingEvents.length === 0) return null;

        // Sort by start date and return first (earliest upcoming)
        upcomingEvents.sort((a, b) => {
            const dateA = parseDate(a.startDate);
            const dateB = parseDate(b.startDate);
            return dateA - dateB;
        });

        return upcomingEvents[0];
    }

    /**
     * Get future events (excluding priority event)
     */
    async getFutureEvents(userId = null) {
        const events = await this.getEventsForUser(userId);
        const priorityEvent = await this.getPriorityEvent(userId);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Helper to parse date string to local date
        const parseDate = (dateStr) => {
            const parts = dateStr.split('-');
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        };

        return events.filter(event => {
            if (priorityEvent && event.id === priorityEvent.id) return false;
            const startDate = parseDate(event.startDate);
            return startDate > today;
        }).sort((a, b) => {
            const dateA = parseDate(a.startDate);
            const dateB = parseDate(b.startDate);
            return dateA - dateB;
        });
    }

    /**
     * Get past events
     */
    async getPastEvents(userId = null) {
        const events = await this.getEventsForUser(userId);
        const priorityEvent = await this.getPriorityEvent(userId);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Helper to parse date string to local date
        const parseDate = (dateStr) => {
            const parts = dateStr.split('-');
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        };

        return events.filter(event => {
            if (priorityEvent && event.id === priorityEvent.id) {
                // Check if 24 hours have passed since event end
                const endDate = parseDate(event.endDate);
                const endDatePlus24 = new Date(endDate);
                endDatePlus24.setDate(endDatePlus24.getDate() + 1);
                return endDatePlus24 < today;
            }
            const endDate = parseDate(event.endDate);
            return endDate < today;
        }).sort((a, b) => {
            const dateA = parseDate(a.startDate);
            const dateB = parseDate(b.startDate);
            return dateB - dateA;
        });
    }

    /**
     * Get travel arrangements for user and event
     */
    async getTravelArrangements(userId, eventId) {
        const travelData = await this.loadData('travel.json');
        return travelData.travelArrangements.find(
            ta => ta.userId === userId && ta.eventId === eventId
        );
    }

    /**
     * Get hotel assignment for user and event
     */
    async getHotelAssignment(userId, eventId) {
        const hotelsData = await this.loadData('hotels.json');
        return hotelsData.hotelAssignments.find(
            hotel => hotel.userId === userId && hotel.eventId === eventId
        );
    }

    /**
     * Get food menu for event
     */
    async getFoodMenu(eventId) {
        const foodData = await this.loadData('food.json');
        return foodData.foodMenus.find(menu => menu.eventId === eventId);
    }

    /**
     * Get team members for event
     */
    async getTeamMembers(eventId) {
        const event = await this.getEventById(eventId);
        if (!event) return [];

        const users = await this.getUsers();
        return users.filter(user => event.teamMembers.includes(user.id));
    }

    /**
     * Get resources based on user role
     */
    async getResources(userId = null) {
        const resourcesData = await this.loadData('resources.json');
        const currentUser = await this.getCurrentUser();
        const targetUserId = userId || currentUser.id;
        const user = await this.getUserById(targetUserId);

        if (!user) return { general: [], department: [] };

        const generalResources = resourcesData.generalResources || [];
        let departmentResources = [];

        // Get department resources based on user roles
        if (user.accountTypes.includes('Director')) {
            // Directors see all resources
            departmentResources = resourcesData.departmentResources.director || [];
        } else if (user.accountTypes.includes('Judge')) {
            departmentResources = resourcesData.departmentResources.judge || [];
        } else if (user.accountTypes.includes('Tour Team')) {
            // Tour Team sees resources for their specific role
            const roleKey = user.roles[0]?.toLowerCase().replace(/\s+/g, '-');
            departmentResources = resourcesData.departmentResources[roleKey] || [];
        }

        return {
            general: generalResources,
            department: departmentResources
        };
    }

    /**
     * Get forms based on user role
     */
    async getForms(userId = null) {
        const formsData = await this.loadData('forms.json');
        const currentUser = await this.getCurrentUser();
        const targetUserId = userId || currentUser.id;
        const user = await this.getUserById(targetUserId);

        if (!user) return { general: [], department: [] };

        const generalForms = formsData.generalForms || [];
        let departmentForms = [];

        // Get department forms based on user roles
        if (user.accountTypes.includes('Director')) {
            departmentForms = formsData.departmentForms.director || [];
        } else if (user.accountTypes.includes('Judge')) {
            departmentForms = formsData.departmentForms.judge || [];
        } else if (user.accountTypes.includes('Tour Team')) {
            const roleKey = user.roles[0]?.toLowerCase().replace(/\s+/g, '-');
            departmentForms = formsData.departmentForms[roleKey] || [];
        }

        return {
            general: generalForms,
            department: departmentForms
        };
    }

    /**
     * Get contacts based on user role
     */
    async getContacts(userId = null) {
        const contactsData = await this.loadData('contacts.json');
        const currentUser = await this.getCurrentUser();
        const targetUserId = userId || currentUser.id;
        const user = await this.getUserById(targetUserId);

        if (!user) return { general: [], director: [] };

        // Filter general contacts based on permissions
        const generalContacts = contactsData.generalContacts.filter(contact => {
            return contact.accessPermissions.some(permission => 
                user.accountTypes.includes(permission)
            );
        });

        // Get director contacts if user is a director
        const directorContacts = user.accountTypes.includes('Director')
            ? contactsData.directorContacts || []
            : [];

        return {
            general: generalContacts,
            director: directorContacts
        };
    }

    /**
     * Get Director's Lounge data for event
     */
    async getDirectorsLoungeData(eventId) {
        const loungeData = await this.loadData('directors-lounge.json');
        
        return {
            crewSheet: loungeData.crewSheets.find(cs => cs.eventId === eventId) || null,
            roomingList: loungeData.roomingLists.find(rl => rl.eventId === eventId) || null,
            directorsNotes: loungeData.directorsNotes.find(dn => dn.eventId === eventId) || null,
            eventRegistration: loungeData.eventRegistrations.find(er => er.eventId === eventId) || null
        };
    }

    /**
     * Check if user has access to a feature
     */
    async hasAccess(userId, requiredAccountTypes, requiredRoles = []) {
        const user = await this.getUserById(userId);
        if (!user) return false;

        // Check account types
        const hasAccountType = requiredAccountTypes.some(type => 
            user.accountTypes.includes(type)
        );

        if (!hasAccountType) return false;

        // Check roles if specified
        if (requiredRoles.length > 0) {
            return requiredRoles.some(role => 
                user.roles.some(userRole => 
                    userRole.toLowerCase().includes(role.toLowerCase())
                )
            );
        }

        return true;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache = {};
        this.loadingPromises = {};
    }
}

// Create singleton instance
const dataService = new DataService();

// Make available globally on window object
if (typeof window !== 'undefined') {
    window.dataService = dataService;
}

// Export for use in other files (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataService;
}

