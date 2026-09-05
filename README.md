# NOVA — Airport Experience Platform ✈️

> Airports are complex. The interface should feel effortless.

NOVA is a full-stack airport experience platform designed to make the passenger journey clearer, calmer, and more connected.

What began as an exploration of airport interface design evolved into a complete product experience — combining public airport information, authenticated passenger journeys, flight management, notifications, lost & found, and a role-protected administrative system.

NOVA is built around one simple journey:

**Find → Prepare → Navigate → Experience → Explore**

---

## Overview

Airports contain a huge amount of information.

Flights. Gates. Terminals. Security. Navigation. Delays. Passenger services. Lost items. Operational updates.

The challenge isn't simply displaying all that information.

The challenge is making it **easy to understand when someone actually needs it.**

NOVA explores what an airport digital experience could look like when information architecture, wayfinding, interaction design, and real application logic are treated as one system.

---

## The Experience

NOVA has three major layers.

### Public Airport Experience

Visitors can explore the airport and access useful information without creating an account.

The public experience includes:

- Flight information
- Airport and terminal information
- Journey discovery
- Navigation-focused interfaces
- Responsive airport experience
- Clear calls into personalized features

The interface intentionally reveals more functionality as the passenger needs it.

For example, a visitor can freely explore NOVA — but accessing **My Journey** introduces authentication and transitions them into their personal airport experience.

---

### Passenger Experience

Authenticated passengers receive a dedicated dashboard built around their journey.

Passengers can:

- View their journey
- Save and manage flights
- Access flight information
- Receive notifications
- Manage their profile
- Configure preferences
- Submit and track lost & found reports

Authentication and user-specific data are handled with Supabase.

Each passenger only has access to the data they are authorized to see.

---

### Airport Administration

NOVA also includes a separate role-protected administrative environment.

The admin portal provides airport staff with tools for:

- Operational overview
- Flight management
- Passenger inspection
- Airport operations
- Lost & found management
- Passenger notifications
- Administrative settings

Admin access isn't simply hidden in the interface.

Authorization is enforced through application-level role checks and database security policies.

---

## Role-Based Access

NOVA currently supports two application roles:

```text
Passenger
Admin
```

Roles are stored separately from user profile information.

```text
Authentication
      │
      ▼
Authenticated User
      │
      ▼
User Role
   ┌──┴───┐
   ▼      ▼
Passenger Admin
   │      │
   ▼      ▼
Dashboard Admin Portal
```

This allows the application to determine where an authenticated user belongs while keeping authorization concerns separate from profile data.

Protected routes are also checked server-side rather than relying only on client-side navigation.

---

## Authentication

NOVA includes a complete authentication experience:

- Account creation
- Sign in
- Sign out
- Protected routes
- Role-aware redirects
- Forgot password
- Password recovery email
- Secure password reset
- Authenticated sessions

The password recovery flow is designed to avoid exposing whether a submitted email belongs to an existing account.

---

## Database & Security

NOVA uses Supabase for authentication and application data.

Core data models include:

```text
profiles
user_roles
flights
journeys
saved_flights
notifications
lost_found_reports
```

Row Level Security (RLS) is used to enforce access at the database level.

For example:

- Passengers can access their own journeys
- Passengers can manage their own saved flights
- Users can access their own notifications
- Users can update their own profiles
- Passengers can submit and view their own lost & found reports
- Administrative operations require an admin role
- Flight management is restricted appropriately

This means sensitive authorization does not depend solely on what the frontend chooses to display.

---

## Flight Management

Flights act as a central source of truth across the application.

The administrative portal supports flight management operations including:

- Creating flights
- Updating flight information
- Managing flight status
- Editing terminal and gate information
- Deleting flights

Supported flight states include:

```text
scheduled
check_in
boarding
departed
delayed
cancelled
arrived
```

Flight information can then be consumed across passenger and operational experiences.

---

## Lost & Found

Passengers can submit lost item reports through their account.

Airport administrators can inspect reports and move them through their operational lifecycle.

```text
submitted
    ↓
under_review
    ↓
matched
    ↓
resolved
    ↓
closed
```

This creates a shared workflow between the passenger-facing and administrative sides of NOVA.

---

## Notifications

NOVA includes a notification system for communicating relevant updates to passengers.

Notification types include:

```text
flight_update
gate_change
journey
lost_found
system
```

Administrators can create notifications while passengers can access their own notifications through their authenticated experience.

---

## Design Philosophy

NOVA's visual direction combines:

**International Wayfinding × Editorial Design × Aviation Systems**

The interface avoids the feeling of a traditional corporate dashboard.

Instead, it uses:

- Strong typography
- Large information hierarchy
- Purposeful whitespace
- Aviation-inspired information systems
- Editorial composition
- Subtle motion
- Clear status indicators
- Responsive layouts
- Consistent passenger/admin visual language

### Core Palette

| Color | Hex |
|---|---|
| Ink | `#111820` |
| Ivory | `#f5f2eb` |
| Paper | `#faf9f6` |
| Mist | `#e8eff1` |
| Sand | `#e9e0d2` |
| Stone | `#d7d6d1` |
| Aviation Blue | `#315b78` |
| Signal Amber | `#e8a735` |

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React / React Icons

### Backend & Data

- Supabase
- Supabase Authentication
- PostgreSQL
- Row Level Security (RLS)

### Deployment

- Vercel

---

## Project Structure

```text
app/
├── admin/
│   ├── components/
│   ├── flights/
│   ├── passengers/
│   ├── operations/
│   ├── lost-and-found/
│   ├── notifications/
│   └── settings/
│
├── auth/
│   ├── sign-in/
│   ├── sign-up/
│   ├── forgot-password/
│   └── reset-password/
│
├── dashboard/
│   ├── components/
│   ├── journey/
│   ├── saved-flights/
│   ├── notifications/
│   ├── lost-and-found/
│   ├── profile/
│   └── settings/
│
├── components/
├── data/
├── flights/
├── journey/
├── airport/
└── lib/
    ├── auth/
    └── supabase/
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Temitope112/nova.git
```

Move into the project:

```bash
cd nova
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Then start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

NOVA requires a Supabase project.

Never commit your real `.env.local` file or private credentials to the repository.

Only public browser-safe Supabase credentials should use the `NEXT_PUBLIC_` prefix.

---

## Live Experience

NOVA is deployed on Vercel.

**Live:**  
https://nova-ashen-three.vercel.app/

Explore the public airport experience first.

Then try **My Journey**.

There might be more waiting behind it. ✈️

---

## What I Learned

NOVA started as a frontend-focused airport experience, but building the complete product required thinking beyond individual pages.

The project became an exercise in:

- Designing systems instead of isolated screens
- Building reusable React components
- Structuring a larger Next.js application
- Connecting UI states to real application data
- Authentication and session handling
- Designing role-aware experiences
- Server-side route protection
- PostgreSQL data modelling
- Row Level Security
- CRUD workflows
- Error and loading states
- Responsive interface design
- Maintaining visual consistency across public, passenger, and administrative experiences

One of the biggest lessons from NOVA was that a polished interface is only one part of a product.

The experience also depends on **what users can access, when they can access it, and what the system allows them to do.**

---

## Current Status

NOVA is a portfolio project and product exploration.

Core functionality currently includes:

**Public Experience → Authentication → Passenger Dashboard → Admin Portal → Supabase Data → Role-Based Authorization**

The application is actively designed as a realistic airport digital product, while some operational functionality remains simulated rather than connected to real airport infrastructure.

---

## Future Possibilities

NOVA could be extended with:

- Real-time flight data
- Live gate changes
- Real airport APIs
- Interactive terminal maps
- Indoor wayfinding
- Boarding pass integration
- Live operational alerts
- Push notifications
- Custom transactional email
- Airline integrations
- Airport service integrations
- More advanced administrative analytics

---

## Author

**Temitope Eniola Olagunju**

Frontend Developer & software engineer

Portfolio:  
https://temitope112.vercel.app/

---

## Final Note

NOVA isn't an attempt to make airports less complex.

It's an attempt to make that complexity feel effortless to the people moving through them.

**NOVA — Airports are complex. The interface should feel effortless.**
