# Mock Data Documentation

This directory contains mock JSON data files for development and testing of the StaffPortal application.

## Data Files

### `users.json`
Contains user account information including:
- Current user (for development)
- All users with different account types (Director, Judge, Tour Team)
- User roles, assigned events, and profile information

**Usage:**
```javascript
const user = await dataService.getCurrentUser();
const users = await dataService.getUsers();
```

### `events.json`
Contains event data including:
- Current season
- Available seasons
- Events with past, current, and future status
- Event details (dates, venue, registration status, etc.)

**Usage:**
```javascript
const events = await dataService.getEventsForUser();
const priorityEvent = await dataService.getPriorityEvent();
const futureEvents = await dataService.getFutureEvents();
const pastEvents = await dataService.getPastEvents();
```

### `travel.json`
Contains travel arrangements for users:
- Flight details (with connection support)
- Driving/Carpool arrangements
- Train travel
- Rental car information
- Multiple travel types per user

**Usage:**
```javascript
const travel = await dataService.getTravelArrangements(userId, eventId);
```

### `hotels.json`
Contains hotel assignment information:
- Hotel details (name, address, phone)
- Room assignments
- Roommate information
- Breakfast hours
- Travel time to venue

**Usage:**
```javascript
const hotel = await dataService.getHotelAssignment(userId, eventId);
```

### `food.json`
Contains food and catering menu information:
- General food notes (all users)
- Director food notes (Director + Event Coordinator only)
- Menu URLs and published status

**Usage:**
```javascript
const foodMenu = await dataService.getFoodMenu(eventId);
```

### `resources.json`
Contains resource links organized by:
- General Resources (all users)
- Department Resources (role-based)

**Usage:**
```javascript
const resources = await dataService.getResources();
// Returns: { general: [], department: [] }
```

### `forms.json`
Contains form links organized by:
- General Forms (all users)
- Department Forms (role-based)

**Usage:**
```javascript
const forms = await dataService.getForms();
// Returns: { general: [], department: [] }
```

### `contacts.json`
Contains contact information:
- General Contacts (filtered by permissions)
- Director Contacts (Director only)

**Usage:**
```javascript
const contacts = await dataService.getContacts();
// Returns: { general: [], director: [] }
```

### `directors-lounge.json`
Contains Director's Lounge data:
- Crew Sheet (all staff for event)
- Rooming List (hotel room assignments)
- Director's Notes (WYSIWYG content)
- Event Registration (studio information with balances)

**Usage:**
```javascript
const loungeData = await dataService.getDirectorsLoungeData(eventId);
// Returns: { crewSheet, roomingList, directorsNotes, eventRegistration }
```

## Data Service API

The `DataService` class provides methods to access all mock data:

### User Methods
- `getCurrentUser()` - Get current logged-in user
- `getUsers()` - Get all users
- `getUserById(userId)` - Get specific user

### Event Methods
- `getEventsForUser(userId)` - Get events assigned to user
- `getEventById(eventId)` - Get specific event
- `getPriorityEvent(userId)` - Get next upcoming event
- `getFutureEvents(userId)` - Get future events (excluding priority)
- `getPastEvents(userId)` - Get past events

### Travel & Hotel Methods
- `getTravelArrangements(userId, eventId)` - Get travel details
- `getHotelAssignment(userId, eventId)` - Get hotel assignment
- `getFoodMenu(eventId)` - Get food menu
- `getTeamMembers(eventId)` - Get team members for event

### Resources & Forms Methods
- `getResources(userId)` - Get resources (role-based)
- `getForms(userId)` - Get forms (role-based)
- `getContacts(userId)` - Get contacts (role-based)

### Director's Lounge Methods
- `getDirectorsLoungeData(eventId)` - Get all Director's Lounge data

### Utility Methods
- `hasAccess(userId, accountTypes, roles)` - Check user permissions
- `loadData(fileName)` - Directly load JSON file
- `clearCache()` - Clear cached data

## Example Usage

```javascript
// Get current user's events
const userId = getCurrentUserId();
const events = await dataService.getEventsForUser(userId);

// Get priority event
const priorityEvent = await dataService.getPriorityEvent();

// Get travel arrangements
const travel = await dataService.getTravelArrangements(userId, priorityEvent.id);

// Get resources based on user role
const resources = await dataService.getResources(userId);

// Check if user has access
const hasAccess = await dataService.hasAccess(userId, ['Director'], []);
```

## Data Structure Notes

- **User IDs**: Start from 1
- **Event IDs**: Start from 1
- **Multi-role Support**: Users can have multiple account types and roles
- **Date Format**: ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
- **Event Status**: "upcoming", "past"
- **Event Category** (for demo): "priority", "future", "past" - Used to simplify event filtering for demonstration purposes
- **Travel Types**: Flight, Driving, Train, Uber, Bus, Rental Car
- **Balance Colors**: 
  - > $0: RED (owes money)
  - = $0: Default
  - < $0: GREEN (credit)

## Testing Different User Types

To test different user types, modify the `currentUser` in `users.json` or change the user ID in sessionStorage:

```javascript
// Test as Director
sessionStorage.setItem('currentUserId', '1');

// Test as Judge
sessionStorage.setItem('currentUserId', '2');

// Test as Tour Team (Videographer)
sessionStorage.setItem('currentUserId', '3');
```

## Notes

- All data is cached after first load for performance
- Data is loaded asynchronously using fetch API
- Error handling is included for failed requests
- Data structure matches the project scope requirements

