# StaffPortal App - Implementation Plan

## 📋 Project Overview
A mobile-first web application for OneBeat staff members to manage events, travel, resources, forms, and communications. The app supports role-based access control with three main account types: Director, Judge, and Tour Team.

---

## 🎯 Phase 1: Foundation & Core Infrastructure

### 1.1 Authentication & User Management
- [ ] **Login System Enhancement**
  - Integrate with OneBeat Registration account system
  - Store user session/token management
  - Multi-role support (users can have multiple roles)
  
- [ ] **User Profile & Roles System**
  - User account types: Director, Judge, Tour Team
  - Staff roles mapping:
    - Director: Senior Director, Director
    - Judge: Head Judge, Judge, Master Class Teacher
    - Tour Team: Tabulator, Score Keeper, Event Coordinator, Merch, Audio Tech, Videographer, Photographer, Content Producer, Backstage, Awards Coordinator
  - Permission checking logic (check all roles, show applicable content)

### 1.2 Navigation System
- [ ] **Bottom Navigation Bar**
  - 5 menu items with icons:
    1. My Events (Home) - All users
    2. My Resources - All users
    3. Director's Lounge - Director only (conditional display)
    4. My Forms - All users
    5. Contact Us - All users
  - Active state management
  - Role-based visibility (hide Director's Lounge for non-directors)

### 1.3 Layout Components
- [ ] **Top App Bar** (Fixed)
  - Dynamic title based on current page
  - Back button functionality
  - Consistent styling across all pages

- [ ] **Bottom Navigation** (Fixed)
  - Icon + label design
  - Active state indicators
  - Responsive behavior

- [ ] **Page Container**
  - Proper padding for fixed top/bottom bars
  - Scrollable content area
  - Mobile-first responsive design

### 1.4 Data Structure & State Management
- [ ] **User Data Model**
  - User profile information
  - Assigned roles array
  - Assigned events array
  
- [ ] **Event Data Model**
  - Event basic info (name, dates, venue, city, state)
  - Travel arrangements
  - Hotel information
  - Food/catering info
  - Team members list
  - Registration status

- [ ] **Mock Data Setup** (for development)
  - Sample users with different roles
  - Sample events (past, current, future)
  - Sample travel arrangements
  - Sample resources and forms

---

## 🎯 Phase 2: Module 1 - My Events (Homepage)

### 2.1 Event List Page
- [ ] **Season Filter**
  - Dropdown/selector for season selection
  - Default to current season
  - Filter events by selected season

- [ ] **Event List Sections**
  - [ ] **My Priority Event** (Next Event)
    - Display at top with "Next Event" badge
    - Show until 24 hours after event end date
    - Fields: Event Name, Start/End Date, Venue Name, City Weather (API), Travel Posted Status, Travel Type Icon
    - Weather API integration (OpenWeatherMap or similar)
    
  - [ ] **Future Events**
    - All future events excluding "Next Event"
    - Fields: Event Name, Start/End Date, Travel Posted Status, Registration Status (Sold Out, 75% Full, 50% Full)
    - Sort by date (most current to least current)
    
  - [ ] **Past Events**
    - All past events (excluding "Next Event" until 24h after end)
    - Fields: Event Name, Start/End Date
    - Sort by date (most recent first)

- [ ] **Event Card Design**
  - Card-based layout with shadows
  - Icons for travel types (Car, Flight, Train)
  - Status badges (Travel Posted, Registration Status)
  - Weather display with icon
  - Clickable to navigate to Event Details

### 2.2 Event Details Page
- [ ] **Section 1: Event Information**
  - Page header with Event Name
  - Event Date
  - Event City and State
  - Venue Name
  - Venue Address (clickable - opens Maps)
  - Load In Time and Date
  - Livestream Link/Event Details (from OneBeat Registration)
  - Tour Team List & Roles (with profile pictures)

- [ ] **Section 2: Travel Arrangements**
  - [ ] **Travel Type Display**
    - Icons for each type: Flight, Driving, Train, Uber, Bus
    - Support multiple travel types per user
    
  - [ ] **Flight Travel Details**
    - Flight Confirmation Number
    - Airline (Delta, United, JetBlue, Southwest, Frontier, American Airlines)
    - Scheduled departure/arrival times
    - Connection flight support (departure & arrival)
    - Special Notes (with clickable URLs)
    
  - [ ] **Driving/Carpool Travel Details**
    - Car Type (5 Seater or 7 Seater)
    - Carpool Passengers list
    - Meeting Location & Planned Stops (Stop 1, Stop 2, etc.)
    - Special Notes
    
  - [ ] **Rental Car Travel Details**
    - Car Type
    - Rental Car Company
    - Rental Car Confirmation Number
    - Carpool Passengers
    - Meeting Location & Planned Stops
    - Special Notes
    
  - [ ] **Travel Status Indicator**
    - "Travel Not Posted" vs Published status
    - Visual indicators

- [ ] **Section 3: Hotel Information** (conditional display)
  - Hotel Name
  - Hotel Address (clickable - opens Maps)
  - Hotel Phone Number
  - Breakfast hours
  - Room Type (Single King or Double Queen)
  - Roommate Assignments
  - Estimated travel time from hotel to venue

- [ ] **Section 4: Food & Catering Menu**
  - Food Notes (all users)
  - Director Food Notes (Director + Event Coordinator only)
  - WYSIWYG content display
  - Links open within app
  - Tied to "Published" status from Travel Arrangements

---

## 🎯 Phase 3: Module 2 - My Resources

### 3.1 General Resources Section
- [ ] **Header: "General Resources"**
- [ ] **Resource Display**
  - Button-style links with icons
  - Mirrors OneBeat Registration dashboard widgets
  - Access: Director, Judge, Tour Team

### 3.2 Department Resources Section
- [ ] **Header: "Department Resources"**
- [ ] **Role-Based Resource Display**
  - Director: See ALL department resources
  - Judge: See ONLY Faculty Resources
  - Tour Team: See ONLY their specific role resources
  
- [ ] **Resource Categories** (with icons)
  - Director Resources
  - Faculty Resources
  - Scorekeeper Resources
  - Tabulator Resources
  - Videographer Resources
  - CP Resources (also sees Photographer/Videographer)
  - Photographer Resources
  - Backstage Resources
  - Merch Resources
  - DA Resources
  - Audio Resources
  - Awards Coordinator Resources

- [ ] **Resource Button Design**
  - Icon + label
  - Opens URL in app (iframe or new tab)
  - Ghost page styling

---

## 🎯 Phase 4: Module 3 - My Forms

### 4.1 General Forms Section
- [ ] **Header: "Generic Forms"**
- [ ] **Form Links** (all users)
  - Broken/Missing Items Form
  - Travel Opt-Out Form
  - Ideas Form
- [ ] **Form Display**
  - Button-style links
  - Opens forms inside app

### 4.2 Department Forms Section
- [ ] **Header: "Department Forms"**
- [ ] **Role-Based Form Display**
  - Director: See ALL department forms
  - Judge: See ONLY faculty forms
  - Tour Team: See ONLY their specific role forms
  
- [ ] **Form Categories**
  - Director Forms
  - Scorekeeper/Tabulator Forms
  - CP Forms
  - Backstage Forms
  - Merch Forms

---

## 🎯 Phase 5: Module 4 - Contact Us

### 5.1 General Contact Information
- [ ] **Header: "Contact Us"**
- [ ] **Contact Buttons**
  - [ ] **Travel Hotline** (prominent/standout)
    - Phone button (opens native dialer)
    - Warning message: "SMS and Carrier rates may apply"
    
  - [ ] **Email Helpdesk**
    - Email button (opens native mail app)
    - mailto:dreamteam@onebeatdance.com
    
  - [ ] **Judge's Email Helpdesk** (Judge only)
    - Email button (opens native mail app)
    - mailto:judges@onebeatdance.com
    - Conditional display based on role

### 5.2 Director's Contact Information
- [ ] **Header: "On-Call Support"** (Director only)
- [ ] **Contact Buttons**
  - C-Suite On-Call
  - BTS/BR On-Call
  - GR/RV Director On-Call
  - Media Director On-Call
- [ ] **Phone/Email Integration**
  - Native app integration (tel:, mailto:)

---

## 🎯 Phase 6: Module 5 - Director's Lounge (Director Only)

### 6.1 Crew Sheet Section
- [ ] **Header: "Crew Sheet"**
- [ ] **Staff List Display**
  - Profile Picture
  - Legal Name
  - Role
  - Phone
  - Dietary Restrictions (if available)
- [ ] **List Layout**
  - Card or list item design
  - All staff for current/upcoming event

### 6.2 Rooming List Section
- [ ] **Header: "Rooming List"**
- [ ] **Table Display**
  - Room #
  - Room Style (Single King/Double Queen)
  - Roommate #1 & Roommate #2
  - Roommate #1's Phone Number
  - Roommate #2's Phone Number
- [ ] **Table Design**
  - Responsive table
  - Mobile-friendly layout

### 6.3 Director's Notes Section
- [ ] **Header: "Director's Notes"**
- [ ] **WYSIWYG Display**
  - Rich text content display
  - Formatted text support
  - Admin-editable content

### 6.4 Event Registration Section
- [ ] **Header: "Event Registration"**
- [ ] **Studio List**
  - Collapsible sections (tap to expand)
  - Studio Name | Event Balance (color-coded)
  
- [ ] **Studio Details** (when expanded)
  - Studio Owner/Director Name
  - Studio Telephone Number
  - Total Registered Entries
  - Total Registered Dancers
  - Total Registered Events for Season (list)
  - Payment Portal Link
  
- [ ] **Balance Color Logic**
  - Balance > $0: RED (owes money)
  - Balance = $0: Default color
  - Balance < $0: GREEN (account credit)
  
- [ ] **Real-time Balance Updates**
  - Integration with OneBeat Registration system
  - Auto-refresh functionality

---

## 🎯 Phase 7: API Integrations & External Services

### 7.1 Weather API
- [ ] **Integration**
  - OpenWeatherMap or similar service
  - Fetch weather by event city
  - Auto-refresh weather data
  - Display weather icon + temperature

### 7.2 OneBeat Registration System Integration
- [ ] **Data Endpoints**
  - User authentication
  - Event data retrieval
  - Travel arrangements
  - Hotel information
  - Team member lists
  - Studio registration data
  - Event balance information
  
- [ ] **Real-time Updates**
  - Event balance refresh
  - Event registration status
  - Travel arrangement updates

### 7.3 Flight Status API
- [ ] **Integration** (for Push Notifications Phase)
  - Flight tracking API (FlightAware, AviationStack, etc.)
  - Parse flight number (e.g., DL7289)
  - Monitor flight delays
  - Real-time departure time updates

### 7.4 Maps Integration
- [ ] **Venue/Hotel Address Links**
  - Google Maps integration
  - Apple Maps fallback
  - Open in native maps app or browser

---

## 🎯 Phase 8: Push Notifications System

### 8.1 Notification Infrastructure
- [ ] **Service Worker Setup**
  - PWA service worker
  - Push notification registration
  - Background notification handling

### 8.2 Notification Types
- [ ] **I. Travel Arrangements Published**
  - Trigger: Admin publishes travel for event
  - Recipients: All users assigned to event
  - Action: Link to travel itinerary
  - Message: "Travel Arrangements Published - Tap here to view your travel itinerary for your upcoming trip to <<Event_Name>>."

- [ ] **II. It's Almost Here!**
  - Trigger: 24 hours before travel departure
  - Recipients: Users with travel arrangements
  - Message: "It's Almost Here! Tomorrow is the day! We can't wait to set the stage at <<Event_Name>> with you!"

- [ ] **III. Ready, Jet Set, GO!**
  - Trigger: 6 hours before travel departure
  - Recipients: Users with travel arrangements
  - Message: "Ready, Jet Set, GO! It's about that time <<First_Name>>. You're set to travel at <<Travel_Start_Time>>. We can't wait to see you at <<Event_Name>>!"

- [ ] **IV. Crew Members Assigned**
  - Trigger: Changes to crew/faculty for event
  - Recipients: Director/Event Coordinator only
  - Action: Link to crew members list
  - Message: "Meet Your Dream Team! A change has been made to the crew/faculty for your event. Tap here to view your crew/faculty members for <<Event_Name>>."

- [ ] **V. Forms Reminder**
  - Trigger: Last day of event, 1 hour before last awards break
  - Recipients: Director, Merch, CP, Scorekeeper, Tabulator, Backstage
  - Timezone: User's local time zone
  - Message: "Forms Reminder! Please remember to submit your event forms as soon as time allows. If you need assistance, please consult your director."

- [ ] **VI. Delayed Flights**
  - Trigger: Flight delay detected via API
  - Recipients: Users with affected flights
  - Message: "Flight Delay Detected - Heads up! It looks like your flight to <<Arrival City>> has been delayed. The new scheduled departure time is <<updated departure time>>. Please contact the Travel Hotline if you need any assistance."

### 8.3 Notification Scheduling
- [ ] **Background Jobs**
  - Travel departure time monitoring
  - Event end date tracking
  - Flight status polling
  - Forms reminder scheduling

---

## 🎯 Phase 9: UI/UX Enhancements

### 9.1 Loading States
- [ ] **Loading Indicators**
  - Skeleton screens for content
  - Spinner for API calls
  - Progress indicators

### 9.2 Error Handling
- [ ] **Error States**
  - Network error messages
  - Empty state designs
  - Error boundaries
  - User-friendly error messages

### 9.3 Animations & Transitions
- [ ] **Smooth Transitions**
  - Page transitions
  - Card hover effects
  - Button interactions
  - List item animations

### 9.4 Accessibility
- [ ] **A11y Features**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Color contrast compliance

---

## 🎯 Phase 10: Testing & Optimization

### 10.1 Testing
- [ ] **Unit Tests**
  - Permission logic
  - Data filtering
  - Date calculations
  
- [ ] **Integration Tests**
  - API integrations
  - Navigation flow
  - Role-based access
  
- [ ] **E2E Tests**
  - User workflows
  - Cross-browser testing
  - Mobile device testing

### 10.2 Performance
- [ ] **Optimization**
  - Image optimization
  - Code splitting
  - Lazy loading
  - Caching strategies
  - API response caching

### 10.3 PWA Features
- [ ] **Progressive Web App**
  - Service worker
  - Offline support
  - Install prompt
  - App manifest
  - Push notifications

---

## 🎯 Phase 11: Deployment & Documentation

### 11.1 Deployment
- [ ] **Production Setup**
  - Environment configuration
  - API endpoint configuration
  - Build optimization
  - Hosting setup

### 11.2 Documentation
- [ ] **User Documentation**
  - User guide
  - Feature explanations
  - FAQ
  
- [ ] **Technical Documentation**
  - Code comments
  - API documentation
  - Architecture overview
  - Deployment guide

---

## 📊 Implementation Priority

### **High Priority (MVP)**
1. Phase 1: Foundation & Core Infrastructure
2. Phase 2: Module 1 - My Events (Homepage)
3. Phase 3: Module 2 - My Resources
4. Phase 4: Module 3 - My Forms
5. Phase 5: Module 4 - Contact Us

### **Medium Priority**
6. Phase 6: Module 5 - Director's Lounge
7. Phase 7: API Integrations (Weather, Maps)
8. Phase 9: UI/UX Enhancements

### **Lower Priority (Future)**
9. Phase 8: Push Notifications System
10. Phase 7: Flight Status API
11. Phase 10: Testing & Optimization
12. Phase 11: Deployment & Documentation

---

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **APIs**: 
  - Weather API (OpenWeatherMap)
  - Maps API (Google Maps / Apple Maps)
  - Flight Status API (for notifications)
  - OneBeat Registration System API
- **PWA**: Service Workers, Web App Manifest
- **State Management**: LocalStorage / SessionStorage (or consider lightweight state library)

---

## 📝 Notes

- **Multi-role Support**: Users can have multiple roles - app must check all roles and show applicable content
- **24-Hour Rule**: "Next Event" remains until 24 hours after event end date
- **Timezone Handling**: Forms reminder must use user's local timezone
- **Real-time Updates**: Event balances and registration status need frequent refresh
- **Mobile-First**: All designs must be mobile-first, responsive
- **Native Integration**: Phone calls (tel:) and emails (mailto:) must open native apps

---

## ✅ Next Steps

1. Review and finalize this plan
2. Set up development environment
3. Begin with Phase 1: Foundation & Core Infrastructure
4. Create mock data for development
5. Build incrementally, testing each phase

