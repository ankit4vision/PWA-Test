# Staff Resources App – Project Scope

```
**GR = Groove, RV = Reverb, BTS = Beyond The Stars, BR = Breakout
```
### Overview: OneBeat GO is a mobile app for staff members who work at OneBeat events. The app gives

```
each staff member everything they need for their assigned event: travel plans, hotel info, food menus,
team contacts, documents, and support tools.
The app must:
```
- Work on iPhones and Android phones and be published on the Apple App Store and Google Play.
- Let users log in using their current OneBeat Registration account.
- Show different information depending on the user's role (like Director or Tour Team).

### User Account Types and Permissions

### There are 3 types of user accounts. These types decide what the person can see in the

### application.

### o Permission Types: Director, Judge, Tour Team

### SPECIAL NOTE:

- One user can have more than one role. The app must check all roles and show what

### applies. See next page for Staff Roles.

### Staff Roles:

- **Director Roles:** Senior Director, Director
- **Judge Roles:** Head Judge, Judge, Master Class Teacher
- **Tour Team Roles:** Tabulator, Score Keeper, Event Coordinator, Merch, Audio Tech,

### Videographer, Photographer, Content Producer, Backstage, Awards Coordinator

```
Main Navigation (Bottom Menu Icons)
```
At the bottom of the app, there will be 5 icons. Each icon opens a page. These icons must always be visible.


App Module Description **Permissions**

“My Events” Tray Icon should take the User
to a page labeled “My Events”.
This is also the “Homepage” and
should be the first page that a
User goes to when they open
the application.

```
Access Permissions:
```
```
Director
Judge
Tour Team
```
“My Resources” Tray Icon should take the User
to a page labeled “My

### Resources”

```
Access Permissions:
```
```
Director
Judge
```
### Tour Team

“Director’s Lounge” Tray Icon should take ONLY
Director type accounts to a page
labeled “Director’s Lounge”.

```
Access Permissions:
```
```
Director
```
“My Forms” Tray Icon should take the User
to a page labeled “My Forms”.

```
Access Permissions:
```
```
Director
Judge
Tour Team
```
“Contact Us” Tray Icon should take the User
to a page labeled “Contact Us”.

```
Access Permissions:
```
```
Director
Judge
Tour Team
```

### Event List (add a Season Filter that defaults to the current season):

### ▪ My Priority Event – This is the next upcoming event within the current season and

### should remain the next event until 24 hours after the end date of an event. This should

### be listed at the very TOP of the sort order. This listing with the “Next Event” designation

### should show the following fields:

```
o Event Name
o Event Start Date
o Event End Date
o Event Venue Name
o Event City Weather (use an API that will refresh with weather updates for that specific
city)
o Event Travel Posted/Not Posted (If Travel arrangements => Marked as NOT published for
this event, please display “Event Travel Not Posted”. If Travel Arrangements => Marked as
published for this event, label travel arrangements with an icon. (Car, Flight, Train)
o Event Travel Type *displayed as an icon* (Car/Flight/Train)
```
### ▪ Future Events - This list is all of the user’s future events EXCLUDING next event. The

### future events will start below the “Next Event” designation.

```
o Event Name
o Event Start Date
o Event End Date
o Event Travel Posted/Not Posted (if no travel arrangements are marked as published for
this event, please display “Event Travel Not Posted”)
o Event Registration Status (Sold Out, 75% Full, 50% Full)
```
### ▪ Past Events – This list is all of the user’s past events EXCLUDING the event designated

### “Next Event” until 24 hours after the last day of that event.

```
o Event Name
o Event Start Date
o Event End Date
```
### Module 1 : My Events (This will be the default module when user opens the application.)

### This is the first page users will see. It shows all events that the user is assigned to. User should only see

### events listed that they are assigned to. The sort level is as follows:

### Sort Level 1: Next Event (can ONLY be one event at a time), Future Events, Past Events |

### Sort Level 2: The most current date to the least current date.


### Event List => Event Details (Clicking on any event in the event list will take you to the Event

### Details Screen, comparable to what is available on OneBeat Registration)

# Event Details Screen

### Section 1: Event

### Information

### (Part of each

### Event sub-page)

```
This function shows details of the Event as listed in OneBeat
Registration system.
```
```
All users must be able to see the following information on each
event page that is assigned to them.
```
## Page Header: <<Event_Name>> (as listed in OneBeat

```
Registration)
Under the header, the following fields should be displayed in a
list format:
```
- Event Date
- Event City and State
- Venue Name
- Venue Address (tap to open in Google Maps or Apple
    Maps)
- Load In Time and Date
- Livestream Link/Event Details (We need to pull this from
    the “Event Details” public facing URL for that event.)
- Tour Team List & Roles (all staff members and their
    profile pictures assigned to the same event)

```
Access Permissions:
```
```
Director
Judge
Tour Team
```
### Section 2: Travel

### Arrangements

```
This shows the user's travel plan to get to the event. The app
must show this clearly using icons and sections.
```
```
Here are the fields we need to display and logic we need to
follow (Please note: A user can travel using one or more of the
following travel types. We would like to display an icon and label
for each travel type:
```
```
Access Permissions:
```
```
Director
Judge
Tour Team
```

- **Flight** **a User can be assigned multiple departure
    flight itineraries and multiple arrival flight itineraries, for
    connecting fights. We would like to be able to choose
    this option when both instances might happen and we
    need to label the second departure and arrival itinerary

### “Connection Flight”.

- **Driving**
- **Train**
- **Uber**
- **Bus**

If a User has been assigned **Flight** travel, we need to display
these fields:

- Flight Confirmation Number
- Airline (Delta, United, JetBlue, Southwest, Frontier,
    American Airlines)
- Scheduled flight departure time
- Scheduled flight arrival time
- Connection flight departure time (if user has TWO
    departure flights)
- Connection flight arrival time (if user has TWO arrival
    flights)
- Special Notes **this is just a text field that our
    application administrators would write specific details
    for the event. Any URL that goes in this field must allow
    a user to open in their phone’s browser.

If a User has been assigned **Driving/Carpool** travel, we need to
display these fields:

- Car Type (5 Seater or 7 Seater)
- Carpool Passengers
- Meeting Location & Planned Stops (we need to add
    stops if they exist and call them Stop 1, Stop 2, etc.)
- Special Notes

If a User has been assigned **Rental Car** travel, we need to display
these fields:

- Car Type (5 Seater or 7 Seater)
- Rental Car Company
- Rental Car Confirmation Number


- Carpool Passengers
- Meeting Location & Planned Stops (we need to add
    stops if they exist and call them Stop 1, Stop 2, etc.)
- Special Notes

```
Hotel Information
Only show this if the user has a hotel assignment.
```
```
If a User has been assigned a Hotel Room, we need to create and
display these fields:
```
- Hotel Name
- Hotel Address (tap to open in Google Maps or Apple

### Maps)

- Hotel Phone Number
- Breakfast hours (text format)
- Room Type (Single King or Double Queen)
- Roommate Assignments (who the staff member will
    share a room with)
- Estimated travel time from hotel to venue (auto-
    calculated or entered by admin)

### Section 3: Food

### & Catering

### Menu

```
This function needs to follow certain logic and display these
fields:
```
### All users can view a link to a menu for meals. Application

### Administrators should be able to upload link in WYSIWYG

### text boxes. This link should open inside the app.

### For this application and the Online staff facing version, we

### want to link ALL food notes sections to the “Published”

### button located on Travel Arrangements.

```
“Food Notes” Access
Permissions:
```
```
Director
Judge
Tour Team
```
```
“Director Food Notes”
Access Permissions:
Director
Event Coordinator
(role)
```

Module 2: My Resources – This page will have URL links. Each link is defined as a “Resource” and should display as a button
with an icon for each Resource. There are two sections to this page

1. General Resources This first section should have a Header
    defined as “General Resources”.
    This will mirror the Dashboard widgets on
    OneBeat Registration.

```
“General Resources”
Access Permissions:
```
```
Director
Judge
Tour Team
```
2. Department Resources This second section should have a Header
    defined as “Department Resources”. This
    function should display resources based on
    user role and permissions. Each resources
    subsection needs to display in a ghost page
    with buttons with icons for each item.
    Here is the logic:
       - Director type accounts see ALL
          resources in this function
       - Judge type accounts see ONLY
          faculty resources
       - Tour Team type accounts see ONLY
          resources for the SPECIFIC role
          (example: Videographer role users
          only see “Videographer Resources”.
    See below the different fields we need to
    create:
       - Director Resources (should see all
          role resources)
       - Faculty Resources
       - Scorekeeper Resources
       - Tabulator Resources
       - Videographer Resources
       - CP Resources (should also see
          Photographer/Videographer
          resources)
       - Photographer Resources
       - Backstage Resources
       - Merch Resources
       - DA Resources
       - Audio Resources
       - Awards Coordinator Resourcees

```
“Department Resources”
Access Permissions:
Director (sees ALL resources)
Judge
Tour Team (by unique role::
video sees video, scorekeeper
sees scorekeeper, etc.)
```

### Page 3: My Forms - This page has important URL links to online forms. These forms should open inside the app.

```
There are two sections to this page.
```
1. General
    Forms

```
This first section should have a Header defined as
“Generic Forms”.
The following set of links need to be displayed to
ALL user type accounts:
```
```
Broken/Missing Items Form
Travel Opt-Out Form
Ideas Form
```
```
“General Forms”
Access Permissions:
```
```
Director
Judge (sees ONLY judge resources)
Tour Team
```
2. Role-
    Specific
    Forms

```
This second section should have a Header defined
as “Department Forms”. This function should
display forms to users with proper permissions.
Here is the logic:
```
- Director type accounts see ALL links in this
    function
- Faculty type accounts see ONLY faculty
    links
- Tour Team type accounts see ONLY
    resources for the SPECIFIC role (example:
    Merch role users only sees “Merch”.
- Director Forms
- Scorekeeper/Tabulator Forms
- CP Forms
- Backstage Forms
- Merch Forms

```
“Department Resources”
Access Permissions:
Director (sees ALL resources)
Judge (sees ONLY judge resources)
Tour Team (by unique role:: video sees video,
scorekeeper sees scorekeeper, etc.)
```

Module VI: Contact Us - This page will have telephone numbers and email address communication types. Each phone
number/email address is defined as a “Contact” and should display as a button for each contact with an icon that open in a
User’s calling application or emailing application, depending on the communication type. There are two sections to this page.

1. General Contact
    Information

```
This first section should have a Header
defined as “Contact Us”.
All account types need to see the following
contacts:
◼ Travel Hotline – if we can make this
stand-out as this is the most important
number for our teams on the ground.
This number should be displayed as a
button that will prompt users to call using
their native phone application to begin a
call. A warning message should also
display “SMS and Carrier rates may apply.”
```
```
◼ Email Helpdesk – This button should
prompt a user to open their native Mail
app and start a
mailto:dreamteam@onebeatdance.com
```
```
◼ Judge’s Email Helpdesk – This should
ONLY be used for JUDGE account types.
This button should prompt a Judge user
to open their native Mail app and start a
new message to
mailto:judges@onebeatdance.com
```
```
“General Contact Information”
Access Permissions:
```
```
Director (sees ALL contact information)
Judge (sees ALSO judge contact
information)
Tour Team (does NOT see judge contact
information)
```
2. Director’s Contact
    Information

```
This second section should have a Header
defined as “On-Call Support”.
ONLY Director account types need to see the
following contacts:
```
- C-Suite On-Call
- BTS/BR On-Call
- GR/RV Director On-Call
- Media Director On-Call

```
“Director’s Contact Information”
Access Permissions:
Director (sees ALL director contact
information)
```

## Page 5: Director’s Lounge **applies ONLY to Director user account types

## Private page that shows important details for the current/most upcoming event. There are 4

## sections:

1. Crew Sheet This section should be defined as “Crew Sheet”.

```
This function should display all staff working this event
(Directors, Faculty, Tour Team)
This function should display as a list with the following fields:
```
- Profile Picture
- Legal Name
- Role
- Phone
- Dietary Restrictions (if listed in profile)
2. Rooming List This section should be defined as “Rooming List”.

```
This function should list Hotel Rooming assignments for that
Director’s current/most upcoming event.
This function should display as a table with the following
fields:
```
- Room #
- Room Style (Single King/ Double Queen)
- Roommate #1 & Roommate #2 (if applicable)
- Roommate #1’s Phone Number
- Roommate #2’s Phone Number
3. Director’s Notes This section should be defined as “Director’s Notes”.

```
This function should display a WYSIWYG text box with a field
defined as “Director’s Notes”.
```
4. Event Registration This section should be defined as “Event Registration”.

```
This function should display all registered studios’
information for that director’s current/upcoming Event.
We would need to recall this information from our OneBeat
Registration system.
```

- Show all studios registered for this event
- Each studio name is labeled in a collapsible

### section (tap to expand)

- When a Studio Section is expanded, show the

### following fields in this format:

## Studio Name | Event Balance**

- Studio Owner/Director Name
- Studio Telephone Number
- Studio’s Total Registered Entries
- Studio’s Total Registered Dancers
- Studio’s Total Registered Event for THAT Season (list
    all events that a studio is registered for the current
    season)
- Payment Portal Link (should allow us to make studio
    balance payments for that specific studio)

**For the Event Balance, please follow this logic:

If Balance is greater than zero, this studio owes money. Please
show the balance in RED.

If Balance is zero, please leave in default color.

If Balance is less than $0.00, please show this **as an account
credit** in green.

Event Balance must refresh often from OneBeat Registration
system and detect real time updates.


## Push Notifications

I. Travel Arrangements Published When an app admin publishes travel details for an event, we need to send a
push notification to all users who are assigned to that event. That push
notification, when pressed, should link them directly to their travel itinerary for
that specific event

```
Wording to Use:
```
```
Travel Arrangements Published
Tap here to view your travel itinerary for your upcoming trip to
<<Event_Name>>.
```
II. It’s Almost Here!! The app should recall information from the user’s assigned travel information
and send a reminder that occurs 24 hours before they are scheduled to depart
from their origin.

```
Wording to Use:
```
```
It’s Almost Here!
Tomorrow is the day! We can’t wait to set the stage at <<Event_Name>> with
you!
```
III. Ready, Jet Set, GO! The app should recall information from the user’s assigned travel information
and send a reminder that occurs 6 hours before they are scheduled to depart
from their origin.

```
Wording to Use:
```
```
Ready, Jet Set, GO!
It’s about that time <<First_Name>>. You’re set to travel at
<<Travel_Start_Time>>. We can’t wait to see you at <<Event_Name>>!
```
IV. Crew Members Assigned The app should recall information from an Event’s Team and notify ONLY the
Director/Event Coordinator of that event of any changes made to crew/faculty
for that event. This push notification should link them to the crew members for
assigned for that specific event.


```
Wording to Use:
```
```
Meet Your Dream Team!
A change has been made to the crew/faculty for your event. Tap here to view
your crew/faculty members for <<Event_Name>>.
```
V. Forms Reminder The app should recall information from an Event’s Team and notify ONLY the
Director, Merch, CP, Scorekeeper, Tabulator, and Backstage Users to complete
their forms on the last day of every assigned weekend.
Schedule this notification with the following logic:
Use the time of an entry that happens ONE HOUR before the last awards break,
you should be recalling this time from the Event’s Entry Registration schedule.
Make sure the time is correct for the user's local time zone.
Wording to Use:

```
Forms Reminder!
Please remember to submit your event forms as soon as time allows. If you
need assistance, please consult your director.
```
VI. Delayed Flights This push notification should alert a user if there has been any time changes to
their scheduled flight (if applicable). We must use an API that will recall their
Flight Number to pull real-time updates of their assigned flights.
Example:
**DL7289** – Delta Airlines Flight #: 7289 (DL7289) is what must be searched by
the API to notify the user of any delays to original flight departure. We must
use the API to give us the new flight departure time and display that departure
time in their notification.

```
Wording to Use:
```
```
Flight Delay Detected
Heads up! It looks like your flight to <<Arrival City>> has been delayed. The
new scheduled departure time is <<updated departure time **READ FROM
API**>>. Please contact the Travel Hotline if you need any assistance.
```

