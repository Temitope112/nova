# NOVA International Airport

> **Airports are complex. The interface should feel effortless.**

NOVA is a modern digital airport experience designed to rethink how passengers interact with an international airport online.

Rather than treating an airport website as a collection of information pages, NOVA approaches it as a journey — helping passengers find their flight, prepare for travel, navigate the terminal, discover airport experiences, and understand what comes next.

The project combines **international wayfinding, editorial design, aviation systems, and purposeful motion** to create an airport interface that feels premium, functional, and intuitive.

---

## ✈️ The Idea

Most airport websites contain everything a passenger needs, but finding that information can often feel unnecessarily complicated.

NOVA explores a different approach.

The experience is structured around five simple passenger needs:

**Find → Prepare → Navigate → Experience → Explore**

Instead of overwhelming users with navigation menus, dashboards, and disconnected information, NOVA attempts to surface the right information at the right point in the journey.

---

## 🌍 Core Experience

### Find

Passengers can quickly search for flights and explore departures and arrivals.

The Flights experience includes:

- Departures and arrivals
- Flight search
- Airline and destination information
- Terminal filtering
- Gate information
- Flight status
- Estimated departure times
- Selected flight details

---

### Prepare

The **Plan Your Visit** experience helps passengers prepare before arriving at the airport.

Information includes:

- Recommended airport arrival times
- Travel documents
- Baggage guidance
- Airport transport
- Parking
- Passenger assistance
- Pre-travel checklist

---

### Navigate

NOVA introduces an interactive airport wayfinding experience.

Passengers can explore:

- Terminal locations
- Dining
- Shopping
- Lounges
- Family facilities
- Business facilities
- Passenger assistance

The interface visualizes routes through the airport rather than presenting locations as a conventional list.

---

### Experience

NOVA treats the airport as more than somewhere passengers wait for a flight.

The airport experience highlights:

- Dining
- Lounges
- Shopping
- Art & culture
- Family spaces
- Business facilities

The homepage also introduces **Airport Pulse**, an operational view of the airport showing information such as terminal activity, security waiting times, parking availability, weather, and airport operations.

---

### Explore

The Explore experience introduces destinations and the wider world accessible through NOVA.

The page combines editorial storytelling with destination discovery, featuring cities such as:

- London
- Dubai
- Paris
- Cape Town
- New York
- Tokyo

It also introduces Lagos as the city behind NOVA's identity.

---

## 🧭 My Journey

One of NOVA's core concepts is **My Journey**.

Instead of forcing passengers to repeatedly search for information across different pages, My Journey brings the most relevant parts of their airport experience into one place.

A passenger can follow a journey such as:

```text
LOS → LHR

Check-in
   ↓
Security
   ↓
Explore
   ↓
Gate
   ↓
Boarding
```

The experience can display:

- Flight number
- Destination
- Departure time
- Boarding time
- Terminal
- Gate
- Aircraft
- Security waiting time
- Walking time to gate
- Current journey stage
- Airport navigation
- Recommended next action

The long-term idea is for the journey state to respond dynamically to flight and airport information.

---

## 🛫 Pages

```text
/
├── Home
├── Flights
├── At the Airport
├── Explore
├── Plan Your Visit
└── My Journey
```

### Home

The homepage introduces the complete NOVA passenger journey.

```text
Hero
↓
Live Departures
↓
My Journey
↓
Terminal Navigation
↓
Destinations
↓
Airport Experience
↓
Airport Pulse
↓
Services
↓
Travel Information
↓
Final CTA
```

### Flights

A more detailed operational interface for searching and understanding flights.

### At the Airport

An interactive spatial experience for navigating terminals and discovering airport facilities.

### Explore

An editorial destination and airport discovery experience.

### Plan Your Visit

Practical information passengers need before travelling to NOVA.

### My Journey

A personalized airport journey interface built around a passenger's flight.

---

## 🎨 Design Direction

NOVA's visual language combines:

**International Wayfinding × Editorial Design × Aviation Systems**

The interface draws inspiration from physical airport environments:

- Runway markings
- Taxiway systems
- Departure boards
- Gate numbers
- Boarding passes
- Flight paths
- Airport coordinates
- Terminal architecture
- Wayfinding arrows
- Operational signage

The objective is not to create a futuristic airport interface.

Instead, NOVA aims to feel like something that could genuinely exist inside a modern international airport.

---

## 🎨 Color System

| Color | Hex | Usage |
| --- | --- | --- |
| Ink Navy | `#111820` | Primary dark surface |
| Warm Ivory | `#F5F2EB` | Warm background |
| Paper | `#FAF9F6` | Primary light surface |
| Mist Blue | `#E8EFF1` | Journey / informational surfaces |
| Soft Sand | `#E9E0D2` | Destination / spatial sections |
| Stone | `#D7D6D1` | Neutral surfaces |
| Aviation Blue | `#315B78` | Navigation / important actions |
| Signal Amber | `#E8A735` | Active states / operational signals |

Signal Amber is intentionally used sparingly.

It represents movement, active states, boarding information, navigation, and other moments requiring attention.

---

## 🧩 Design Principles

### 1. Complexity belongs behind the interface

Airports contain enormous amounts of information.

The passenger should not have to experience that complexity.

### 2. Motion communicates

Animation is not added simply to make the website feel modern.

Motion is used to communicate:

- Direction
- Progress
- Route changes
- Active states
- Flight movement
- Journey progression

### 3. Information before decoration

Operational information should always remain understandable.

Visual design supports the information rather than competing with it.

### 4. Different backgrounds, same atmosphere

NOVA avoids placing every section on the same dark background.

Different parts of the passenger journey use different surfaces while maintaining one visual system.

### 5. Mobile is intentional

Responsive behaviour is treated as part of the product design rather than a desktop layout compressed onto a smaller screen.

---

## 🛠️ Built With

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **React Icons**

---

## ⚙️ Frontend Architecture

NOVA currently focuses primarily on the frontend experience.

The project uses:

- Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for interaction and motion
- Static typed data for prototype airport information

The current architecture allows static flight and airport data to eventually be replaced by real APIs without requiring the interface to be redesigned.

---

## 📁 Project Structure

```text
nova/
│
├── app/
│   ├── components/
│   │   ├── common/
│   │   └── home/
│   │
│   ├── flights/
│   │   ├── components/
│   │   └── page.tsx
│   │
│   ├── airport/
│   │   ├── components/
│   │   └── page.tsx
│   │
│   ├── explore/
│   │   ├── data.ts
│   │   └── page.tsx
│   │
│   ├── plan/
│   │   ├── data.ts
│   │   └── page.tsx
│   │
│   ├── journey/
│   │   ├── components/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── data/
│   ├── airport-places.ts
│   ├── airport-pulse.ts
│   ├── departures.ts
│   ├── destinations.ts
│   ├── experiences.ts
│   ├── flights.ts
│   ├── journeys.ts
│   ├── services.ts
│   ├── terminal-locations.ts
│   └── travel-info.ts
│
├── public/
│   ├── destinations/
│   ├── experience/
│   └── airport-hero.png
│
└── README.md
```

The project intentionally avoids unnecessary abstraction.

Components are extracted based on **responsibility and interaction complexity**, rather than simply splitting files because they become long.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Enter the project:

```bash
cd nova
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 📱 Responsive Design

NOVA is being designed across:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behaviour includes:

- Adaptive typography
- Mobile navigation
- Responsive flight boards
- Vertical journey timelines
- Touch-friendly airport navigation
- Adaptive destination layouts
- Mobile-friendly information hierarchy

---

## ♿ Accessibility

The project aims to support accessible interaction through:

- Semantic HTML
- Keyboard-accessible controls
- Descriptive image alternative text
- Accessible form labels
- Visible interaction states
- Reduced-motion considerations
- Appropriate contrast
- Responsive text sizing

Accessibility improvements will continue as the project develops.

---

## 🧪 Current Status

NOVA is currently under active development.

### Implemented

- [x] Homepage
- [x] Responsive navigation
- [x] Footer
- [x] Flight search interface
- [x] Departures / arrivals
- [x] Flight filtering
- [x] Flight detail experience
- [x] Airport wayfinding
- [x] Terminal navigation
- [x] Destination discovery
- [x] Airport experience
- [x] Airport Pulse
- [x] Airport services
- [x] Travel information
- [x] Plan Your Visit
- [x] My Journey interface
- [x] Responsive foundations
- [x] Framer Motion interactions

### In Progress / Planned

- [ ] My Journey time-based progression
- [ ] Improved reduced-motion support
- [ ] Full mobile polish
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Additional flight states
- [ ] Detailed destination experiences
- [ ] Real flight data integration
- [ ] Real airport operational data
- [ ] Journey persistence

---

## 🔌 Future API Integration

NOVA currently uses mock data so the frontend product experience can be developed independently.

Future versions could integrate APIs for:

```text
Flight schedules
Flight status
Gate changes
Security waiting times
Weather
Parking availability
Terminal activity
Airline information
```

This would allow experiences such as **My Journey** and **Airport Pulse** to respond to actual airport conditions.

---

## ⚠️ Disclaimer

NOVA International Airport is a fictional airport created as a product design and frontend engineering project.

Flight schedules, airport locations, operational information, airlines, routes, waiting times and other aviation data displayed within the project are mock data and should not be used for real-world travel decisions.

Any real airline, airport, city or aircraft names used within the interface are included solely for demonstration purposes.

---

## 👨🏽‍💻 Project Focus

NOVA is an exploration of what happens when frontend engineering is treated as more than implementing static screens.

The project focuses on:

- Frontend architecture
- Interaction design
- UI/UX
- Responsive design
- Motion systems
- Information hierarchy
- State management
- Spatial interfaces
- Product thinking

The goal is simple:

> **Make a complex environment feel effortless.**

---

## License

This project is intended for portfolio and educational purposes.

---

<p align="center">
  <strong>NOVA International Airport</strong><br />
  <sub>Every journey begins somewhere.</sub>
</p>
