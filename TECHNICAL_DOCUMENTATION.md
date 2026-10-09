# Stackly Travel & Tourism Website
## Technical Documentation

*Responsive HTML5 Template for Luxury Expeditions, Tour Operators & Travel Agency Portals*  
**Version 1.0**

---

## 1. Introduction

**Stackly Travel & Tourism** is a comprehensive, production-ready, fully responsive HTML5 website template engineered for luxury tour operators, destination management companies (DMCs), travel agencies, and independent wilderness expeditions. It pairs a high-converting public marketing website (Home, About, Tours directory, Alpine, Marine, Safari, and Cultural tour deep-dives, Pricing & Membership, and Contact) with an enterprise-grade authenticated area (Sign In, Sign Up) and **two completely independent role-based user dashboard systems**:

1. **Traveller Dashboard**: Tailored for consumers and explorers to review confirmed expeditions, active flight and high-speed rail itineraries, emergency satellite tracking, and medical evacuation safety protocols.
2. **Travel Agent Dashboard**: Tailored for B2B wholesale travel agents, affiliates, and brokers to manage wholesale tour packages, monitor commissions, manage agency partner agreements, and access direct agency support desk hotlines.

The template is crafted with semantic HTML5, a pure custom CSS3 design system with CSS custom properties (variables), Font Awesome 6.5.1 vector icons, AOS (Animate On Scroll) motion effects, and lightweight vanilla ES6+ JavaScript. It features zero dependencies on jQuery, ensuring blazing-fast render performance and straightforward backend integration.

### Template Features

- **Fully Responsive HTML5 & CSS3 Layout**: Fluid grid architecture optimized across mobile devices (320px–480px), tablets (768px–991px), laptops (1024px–1280px), and ultra-wide desktops (1440px+).
- **Luxury Travel UI/UX Design System**: Visual identity centered around deep forest pine (`#0B3B24`), warm sunset amber (`#E08538`), bright sun gold (`#FBBF24`), and frosted glassmorphism overlays.
- **Dual Independent Role-Based Dashboards**: Clean separation of Traveller and Travel Agent workflows with dedicated navigation sidebars, subpages, and zero cross-role page contamination.
- **Dynamic Explorer Greeting & User Personalization**: Intelligently parses user email/name on login and injects personalized greetings across both public and dashboard views based on the user's local time.
- **Scenic Destination Heros with Organic Heartbeat Animations**: Unique, high-resolution tourist destination backdrops on every page featuring GPU-accelerated breathing pulse keyframe animations (`heroScenicHeartbeat`).
- **Diversified Theme Identity**: Every single page features an entirely distinct travel theme (ancient citadel, historic river capital, Caribbean cruise port, snowcapped alpine summit, coral lagoon, African savannah, Kyoto shrine, Mediterranean cliffside, Parisian landmark, desert pyramids, and tropical sunset beach).
- **Authentication Pages with Client-Side Validation**: Interactive login and registration forms featuring live email pattern validation, dynamic password strength meters, and show/hide password toggles.
- **WCAG AAA Contrast Standards**: Multi-stop dark gradient masks paired with bright `#FFFFFF` headings, `#FBBF24` highlight spans, and layered text-shadows ensure crisp legibility over all photographic backdrops.
- **Accessibility & Reduced-Motion Killswitch**: Native `@media (prefers-reduced-motion: reduce)` overrides to instantly disable heavy transforms for users with motion sensitivity.
- **Interactive Search & Tour Filters**: Dynamic filtering interface by Continent, Holiday Style, Duration, and Budget range.
- **Custom 404 Error Page**: Dedicated fallback error page with clean return-to-home actions.
- **Zero-Dependency Vanilla JavaScript**: Clean, modular, well-commented JS files for maintainability and extensibility.

---

## 2. Technologies Used

| Technology | Purpose & Description |
| :--- | :--- |
| **HTML5** | Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), structured metadata, and accessibility ARIA landmarks. |
| **CSS3** | Modular styling architecture leveraging CSS Variables, Flexbox, CSS Grid, custom keyframe animations, glassmorphism (`backdrop-filter`), and responsive media queries. |
| **JavaScript (Vanilla ES6+)** | Lightweight client-side application logic for navigation drawers, role switching, sticky header behavior, form validation, password strength meters, and greeting personalization. |
| **Font Awesome 6.5.1** | Vector icon library loaded via CDN for high-density navigation, badge, utility, and action icons. |
| **AOS 2.3.4 (Animate On Scroll)** | Modern scroll-triggered fade and slide micro-interactions loaded via CDN. |
| **WebP Image Format** | Modern next-gen lossy/lossless image format providing high visual fidelity with up to 70% smaller file sizes compared to traditional PNG/JPEG. |

---

## 3. Folder Structure

```
Travel & Tourism/
├── index.html                                 # Public Homepage / Landing Page
├── 404.html                                   # Root 404 Redirect Fallback
│
├── pages/
│   ├── about.html                             # About Us / Company Heritage
│   ├── tours.html                             # Worldwide Tours & Holiday Packages Directory
│   ├── alpine.html                            # Alpine & Mountain Escapes Tour Deep-Dive
│   ├── marine.html                            # Tropical Islands & Marine Escapes Tour Deep-Dive
│   ├── safaris.html                           # Wildlife Safaris & African Savannah Tour Deep-Dive
│   ├── cultural.html                          # Cultural Journeys & Ancient Capitals Tour Deep-Dive
│   ├── pricing.html                           # Transparent Pricing & Membership Packages
│   ├── contact.html                           # Contact & 24/7 Global Dispatch Desk
│   ├── sign-in.html                           # User Login Page (Explorer & Agent Portal)
│   ├── sign-up.html                           # User Registration Page (Role Selection)
│   ├── 404.html                               # Dedicated Styled 404 Error Page
│   │
│   ├── dashboard-traveller.html               # Traveller Main Overview Dashboard
│   ├── dashboard-expeditions.html             # Traveller Active Expeditions Subpage
│   ├── dashboard-itineraries.html             # Traveller Flight & Rail Itineraries Subpage
│   ├── dashboard-safety.html                  # Traveller Medical & Safety Protocols Subpage
│   ├── dashboard-settings.html                # Traveller Account & Privacy Settings Subpage
│   ├── dashboard-support.html                 # Traveller Concierge & Field Support Subpage
│   │
│   ├── dashboard-agent.html                   # Travel Agent Main Overview Dashboard
│   ├── dashboard-agent-tours.html             # Travel Agent Wholesale Tours Inventory Subpage
│   ├── dashboard-agent-commissions.html       # Travel Agent Commission & Revenue Subpage
│   ├── dashboard-agent-agreement.html         # Travel Agent Partner Agreement Subpage
│   ├── dashboard-agent-settings.html          # Travel Agent Agency Settings Subpage
│   ├── dashboard-agent-support.html           # Travel Agent Partner Support Desk Subpage
│   │
│   ├── dashboard.html                         # Smart Role-Based Dashboard Dispatcher
│   ├── dashboard-traveler.html                # Canonical Alias to Traveller Dashboard
│   ├── dashboard-agency.html                  # Canonical Alias to Agent Dashboard
│   ├── dashboard-admin.html                   # Admin Role Fallback Alias
│   └── dashboard-guide.html                   # Tour Guide Role Fallback Alias
│
└── assets/
    ├── css/
    │   ├── style.css                          # Global Master Stylesheet (Variables, Reset, Components, Layout)
    │   ├── responsive.css                     # Responsive Media Queries (Mobile, Tablet, Desktop Breakpoints)
    │   ├── animations.css                     # Keyframe Animations, Heartbeat Pulse, Shimmer, Reduced Motion
    │   └── dashboard.css                      # Unified Dashboard Theme, Table Styling, KPI Cards, Sidebar
    │
    ├── js/
    │   ├── main.js                            # Global Navigation, Sticky Header, Mobile Drawer, Dynamic Greeting
    │   ├── auth.js                            # Form Validation, Password Strength, Show/Hide, Local Authentication
    │   ├── dashboard.js                       # Dashboard Sidebar Toggle, Role Name Resolution, Table Interactivity
    │   └── animations.js                      # AOS Initialization, Intersection Observer Scroll Effects
    │
    └── images/
        ├── logoStackly.webp                   # Primary Brand Logo (WebP)
        ├── logo.svg                           # Primary Brand Logo (Vector SVG)
        ├── logo-white.svg                     # High-Contrast Monochrome Brand Logo
        ├── machu-picchu-citadel.webp          # Homepage Hero: Ancient Lost Citadel in Andes
        ├── london-heritage-bigben.webp        # About Us Hero: London Tower Bridge & River Thames
        ├── caribbean-st-lucia-pitons.webp     # Tours Directory Hero: Caribbean Cruise Port & Archipelago
        ├── swiss-alps-matterhorn.webp         # Alpine Tour Hero: Matterhorn Swiss Summit
        ├── maldives-overwater-villas.webp     # Marine Tour Hero: Maldives Overwater Coral Villas
        ├── serengeti-safari-savannah.webp     # Safari Tour Hero: Serengeti Acacia Savannah
        ├── kyoto-historic-shrine.webp         # Cultural Tour Hero: Kyoto Shinto Shrine & Pagoda
        ├── santorini-greece-oia.webp          # Pricing Hero: Santorini Aegean Cliffside Village
        ├── paris-louvre-eiffel.webp           # Contact Hero: Paris Eiffel Tower & Seine River
        ├── cairo-giza-pyramids.webp           # Sign In Hero: Egyptian Desert Pyramids of Giza
        ├── tropical-beach-coastline.webp      # Sign Up Hero: Golden Sunset Beach & Ocean Shoreline
        ├── banff-canadian-rockies.webp        # Destination Gallery Asset
        ├── italian-dolomites-peaks.webp       # Destination Gallery Asset
        ├── new-zealand-southern-alps.webp     # Destination Gallery Asset
        ├── patagonia-glacial-fjord.webp       # Destination Gallery Asset
        ├── rome-colosseum-sunset.webp         # Destination Gallery Asset
        ├── athens-acropolis-parthenon.webp    # Destination Gallery Asset
        └── specialist-*.webp                  # Tour Directors & Destination Specialist Headshots
```

---

## 4. Installation & Setup Guide

### Local Development Setup

1. **Clone or Download the Project**:
   ```bash
   git clone https://github.com/your-username/travel-and-tourism.git
   cd travel-and-tourism
   ```
2. **Open in Code Editor**:
   Open the root project folder in your preferred code editor (VS Code, Cursor, WebStorm, etc.).
3. **Launch with a Local Server**:
   To ensure that relative paths between `/pages/` and `/assets/` resolve properly and web fonts/icons render without local file-origin CORS warnings, run a lightweight HTTP server:
   - **VS Code Live Server Extension**: Right-click `index.html` and click **Open with Live Server**.
   - **Python 3**:
     ```bash
     python -m http.server 3000
     ```
   - **Node.js (`npx serve`)**:
     ```bash
     npx serve .
     ```
4. Access the site in your browser at `http://localhost:3000`.

### GitHub Pages Hosting Setup

1. Create a new repository on GitHub (e.g., `stackly-travel-tourism`).
2. Push your project files to GitHub, preserving the root `index.html`, `pages/`, and `assets/` structure:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Stackly Travel website"
   git branch -M main
   git remote add origin https://github.com/your-username/stackly-travel-tourism.git
   git push -u origin main
   ```
3. In GitHub, navigate to **Settings** > **Pages** (under Code and automation).
4. Under **Build and deployment**:
   - **Source**: Deploy from a branch.
   - **Branch**: `main`, folder: `/ (root)`.
   - Click **Save**.
5. Wait 1–2 minutes. Access your live website at:  
   `https://<your-username>.github.io/stackly-travel-tourism/`

### cPanel / Traditional Web Hosting Setup

1. Compress the project folder into a `.zip` archive (ensure `index.html` is at the archive root).
2. Log in to your cPanel dashboard.
3. Open **File Manager** and navigate to your web root (`public_html` or domain document root).
4. Upload the `.zip` archive and click **Extract**.
5. Ensure `index.html`, `pages/`, and `assets/` sit directly under `public_html`.
6. Open your custom domain in the browser to confirm proper loading.

---

## 5. Main HTML Pages Summary

| File Path | Page Title | Primary Purpose |
| :--- | :--- | :--- |
| `index.html` | Stackly Travel - Explore The World | Homepage featuring dynamic greeting, search filter bar, tour highlights, and brand storytelling. |
| `pages/about.html` | About Us - Stackly Travel | Brand vision, team credentials, sustainability stewardship, and company milestones. |
| `pages/tours.html` | Extraordinary Tours & Packages | Comprehensive tour directory with multi-criteria filtering, duration badges, and pricing cards. |
| `pages/alpine.html` | Majestic Alpine & Mountain Escapes | Specialized itinerary deep-dive for high-altitude trekking, ski chalets, and glacier routes. |
| `pages/marine.html` | Tropical Islands & Marine Escapes | Specialized itinerary deep-dive for coral reefs, overwater bungalows, and yacht expeditions. |
| `pages/safaris.html` | Wildlife Safaris & African Savannah | Specialized itinerary deep-dive for game drives, luxury tented camps, and conservation treks. |
| `pages/cultural.html` | Historic Capitals & Cultural Journeys | Specialized itinerary deep-dive for UNESCO shrines, art pilgrimages, and culinary tours. |
| `pages/pricing.html` | Transparent Pricing & Membership Packages | Tiered membership plans, all-inclusive inclusions table, and transparent cost breakdown. |
| `pages/contact.html` | Contact Expedition Headquarters | 24/7 global dispatch desk inquiry form, direct phone hotlines, and office locations. |
| `pages/sign-in.html` | Sign In - Stackly Travel | Explorer & Agent login portal with role selection, password show/hide, and email validation. |
| `pages/sign-up.html` | Create Your Account - Stackly Travel | Registration page for Travellers and Travel Agents with live password strength evaluation. |
| `pages/dashboard-traveller.html`| Traveller Expedition Portal | Overview dashboard for booked expeditions, flight/rail vouchers, and emergency contacts. |
| `pages/dashboard-expeditions.html`| Active Expeditions | Dedicated subpage for upcoming, in-progress, and past holiday bookings. |
| `pages/dashboard-itineraries.html`| Real-Time Travel Itineraries | Live flight tracker, rail timetable, hotel confirmation vouchers, and transfer times. |
| `pages/dashboard-safety.html` | Field Safety & Medical Evacuation | Satellite communication tracking, medical insurance, and emergency SOS protocols. |
| `pages/dashboard-settings.html` | Explorer Account Settings | Profile management, password updates, currency preferences, and privacy controls. |
| `pages/dashboard-support.html` | 24/7 Concierge Support | Direct live chat ticketing, hotline numbers, and tour director messaging. |
| `pages/dashboard-agent.html` | Travel Agent Partner Portal | Overview dashboard for agency performance, gross bookings, and net payouts. |
| `pages/dashboard-agent-tours.html`| Wholesale Tours Inventory | Direct access to wholesale B2B pricing, group allocation holds, and white-label booking tools. |
| `pages/dashboard-agent-commissions.html`| Agent Commission Tracking | Tiered commission rates (12%–18%), payout history, and pending settlement reports. |
| `pages/dashboard-agent-agreement.html`| Agency Partner Agreement | Signed B2B contracts, liability guidelines, cancellation policies, and renewal status. |
| `pages/dashboard-agent-settings.html`| Agency Profile & Billing Settings | Agency licensing details, IATA/CLIA registration, banking info, and payout preferences. |
| `pages/dashboard-agent-support.html` | Dedicated B2B Agency Support Desk | Direct hotline to priority reservations, emergency field re-ticketing, and agent liaisons. |
| `pages/404.html` | 404 - Destination Not Found | Custom error experience with navigation back to Home and previous page fallback. |

---

## 6. Detailed Page Descriptions

### Homepage (`index.html`)
The primary gateway to the brand. Features a full-viewport hero section with the ancient **Machu Picchu Citadel** backdrop, GPU-accelerated heartbeat pulse animation, and a dynamic local time greeting badge. Below the hero sits the **Global Search & Filter Strip**, followed by curated destination cards, signature expeditions, client testimonials, travel director biographies, and an email newsletter subscription footer.

### About Us (`pages/about.html`)
Highlights the ten-year journey of Stackly Travel. Backed by the **London Tower Bridge & River Thames** hero image, it communicates company milestones, ethical ecotourism commitments, senior expedition leaders, and industry certifications.

### Tours & Packages Directory (`pages/tours.html`)
Presents the complete inventory of worldwide travel programs. Framed by a **Caribbean Island Cruise Port** backdrop, it includes dynamic multi-parameter filter selects (Continent, Travel Style, Duration, Budget Range) and structured tour cards showing departure dates, duration badges, and transparent net prices.

### Tour Category Subpages (`alpine.html`, `marine.html`, `safaris.html`, `cultural.html`)
Specialized deep-dive landing pages for distinct traveler passions:
- **Alpine (`alpine.html`)**: Features the iconic **Matterhorn** summit; focuses on the Swiss Alps, Dolomites, and high-altitude hut-to-hut treks.
- **Marine (`marine.html`)**: Features the **Maldives Overwater Villas**; highlights private island atolls, scuba diving, and yacht charters.
- **Safaris (`safaris.html`)**: Features the **Serengeti Savannah**; showcases Big Five game drives, luxury safari lodges, and ranger-led walks.
- **Cultural (`cultural.html`)**: Features **Kyoto's Shinto Shrine & Pagoda**; focuses on architectural wonders, ancient tea ceremonies, and culinary tours.

### Pricing & Packages (`pages/pricing.html`)
Structured around the **Santorini Aegean Cliffside** backdrop, this page offers complete transparency into tiered membership packages (Explorer, Odyssey, Sovereign VIP), an all-inclusive feature breakdown table, and clear explanations of net pricing with zero hidden fees.

### Contact Us (`pages/contact.html`)
Backed by the **Paris Eiffel Tower & River Seine** backdrop, this page houses the 24/7 Global Expedition Dispatch Desk. It includes a comprehensive inquiry form with field validation, direct telephone hotlines across London, New York, and Tokyo, and interactive Google Maps office embeddings.

### Authentication (`pages/sign-in.html` & `pages/sign-up.html`)
Built with a sleek two-column split layout:
- **Left Column**: High-resolution scenic travel image (**Giza Pyramids** for Sign In; **Tropical Sunset Coastline** for Sign Up) with living pulse badge, benefit bullet points, and client testimonial pill.
- **Right Column**: Clean card holding the login/registration form, single contextual button header, password visibility eye toggles, password strength scoring, and social login fallbacks.

### Role-Based User Dashboards
The dashboard architecture is strictly segregated into two dedicated roles:
- **Traveller Portal (`dashboard-traveller.html` + 5 subpages)**: Displays upcoming departure countdowns, e-ticket downloads, confirmed flight and train schedules, emergency satellite communication check-ins, and personal expedition histories.
- **Travel Agent Portal (`dashboard-agent.html` + 5 subpages)**: Displays wholesale booking volume, gross sales KPIs, real-time commission statements (12%–18%), exclusive B2B wholesale tour allocations, agency partner agreements, and priority dispatch hotlines.
- **Independent Layout Guarantee**: Each role operates with its own distinct sidebar navigation, tailored subpage links, and dedicated CSS rules, preventing cross-role layout bleeding and accidental redirection.

---

## 7. Reusable Component Patterns

### 1. Main Navigation Header
The primary header (`.header-main`) remains sticky on scroll with a frosted glass background (`backdrop-filter: blur(12px)`). It features:
- Responsive desktop navbar with dropdown menus for Tour subcategories.
- Mobile hamburger menu triggering an off-canvas drawer with full keyboard and backdrop support.
- Direct links to Sign In and Sign Up actions.

### 2. Fixed Auth Header
Found on `pages/sign-in.html` and `pages/sign-up.html`, this minimalist header maintains a distraction-free experience:
- Clickable brand logo linking back to `../index.html`.
- Home button with both icon and text (`<i class="fa-solid fa-arrow-left"></i> Home`).
- Single contextual alternate action button ("Create Account" on Sign In; "Sign In" on Sign Up).

### 3. Page Hero Section (`.page-hero`)
A standardized component structure across all interior pages:
```html
<section class="page-hero">
  <div class="page-hero-bg" style="background-image: url('../assets/images/scenic-image.webp');"></div>
  <div class="page-hero-overlay"></div>
  <div class="container">
    <div class="hero-pill-badge hero-heartbeat-badge">
      <span class="heartbeat-indicator"></span>
      <i class="fa-solid fa-icon-name"></i>
      <span>Badge Text</span>
    </div>
    <h1 class="page-hero-title">Page Title <span>Highlighted Text</span></h1>
    <p class="page-hero-desc">Descriptive lead copy.</p>
    <div class="breadcrumbs">
      <a href="../index.html"><i class="fa-solid fa-house"></i> Home</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span>Current Page</span>
    </div>
  </div>
</section>
```

### 4. Dashboard Shell Layout
The dashboard interface utilizes an asynchronous, non-overlapping grid structure:
- **Collapsible Sidebar (`.dash-sidebar`)**: Contains role-specific navigation links, brand badge, and profile logout trigger.
- **Dashboard Topbar (`.dash-topbar`)**: Contains mobile toggle button, current page title, live notification bell, and user profile avatar with dynamically parsed email name.
- **Main Viewport (`.dash-content`)**: Scrolls independently without double-header jitter.

---

## 8. CSS Architecture & Customization

The CSS codebase is organized into four clean, purpose-driven stylesheets inside `assets/css/`:

1. `style.css`: Core design system, CSS variables, typography, buttons, cards, forms, and layout components.
2. `responsive.css`: Breakpoint-specific media queries ensuring clean reflow across devices.
3. `animations.css`: Keyframe definitions, pulse/heartbeat breathing animations, button hover shines, and accessibility overrides.
4. `dashboard.css`: Unified dashboard component styles, KPI cards, tables, status tags, and sidebar transitions.

### Design Tokens (CSS Variables)

Located at the root of `assets/css/style.css`:

```css
:root {
  /* Brand Palette */
  --primary: #0B3B24;          /* Deep Forest Pine */
  --primary-light: #165335;    /* Light Pine */
  --primary-dark: #072718;     /* Midnight Pine */
  --secondary: #E08538;        /* Warm Sunset Amber */
  --secondary-hover: #C97227;  /* Dark Amber */
  --accent: #FBBF24;           /* Radiant Sun Gold */
  
  /* Neutral Palette */
  --dark: #0A1C14;             /* Obsidian Dark */
  --dark-soft: #142E22;        /* Dark Surface */
  --light: #F8FAFC;            /* Clean Off-White */
  --bg-subtle: #F1F5F9;        /* Subtle Grey Background */
  --border: #E2E8F0;           /* Default Border */
  --border-dark: #1E4535;      /* Dark Mode Border */
  --text-muted: #64748B;       /* Secondary Text */
  
  /* Status Colors */
  --success: #10B981;          /* Emerald Success */
  --warning: #F59E0B;          /* Amber Warning */
  --error: #EF4444;            /* Red Error */
  --info: #3B82F6;             /* Blue Info */
  
  /* Typography */
  --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  /* Shadows & Elevation */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.10);
  --shadow-lg: 0 10px 28px rgba(0, 0, 0, 0.14);
  
  /* Border Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 0.18s ease;
  --transition-normal: 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Customizing Styles

Developers can easily adjust the site's branding by editing `:root` variables:
- **Change Primary Brand Color**: Modify `--primary` and `--primary-light`.
- **Change Button & CTA Accent Color**: Modify `--secondary` and `--secondary-hover`.
- **Change Typography**: Update `--font-main` with any Google Font or system font stack.
- **Adjust Hero Image Opacity**: Tune the alpha stops in `.hero-overlay` and `.page-hero-overlay` in `assets/css/style.css`.

---

## 9. JavaScript Architecture & Files

All client-side scripts are located in `assets/js/` and written in modular Vanilla ES6+:

| File | Primary Responsibilities |
| :--- | :--- |
| `main.js` | Mobile drawer toggle, sticky header glass effect on scroll, active navigation item highlighting, dynamic time-of-day explorer greeting, search bar query filtering, and smooth scroll anchors. |
| `auth.js` | Sign In and Sign Up form handling, live email regex validation, password strength scoring algorithm, password visibility toggles, session token simulation, and role dispatching. |
| `dashboard.js` | Responsive sidebar collapse/expand, dynamic user name extraction from login email, role switching simulation, interactive tables, tab switching, and safe logout handling. |
| `animations.js` | AOS (Animate On Scroll) configuration, lazy-loading intersection observers, scroll progress indicator, and reduced-motion event listeners. |

### Dynamic User Name Extraction Example (`dashboard.js`)
When users sign in with any email (e.g., `alex.sterling@example.com`), the script extracts and formats their name cleanly:
```javascript
function resolveDisplayName(email) {
  if (!email || !email.includes('@')) return 'Alex Sterling';
  const localPart = email.split('@')[0];
  return localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

---

## 10. Image Asset Management & Replacement Guide

All images are optimized and placed under `assets/images/`.

### Replacing the Brand Logo
- File location: `assets/images/logoStackly.webp` and `assets/images/logo.svg`.
- Recommended dimensions: **200px × 48px** (SVG or WebP format with transparent background).
- Update the `src` attribute in HTML or keep the same file name to automatically replace it site-wide.

### Scenic Hero Images & Unique Themes Mapping

To maintain visual diversity and avoid theme repetition, each page is assigned a dedicated scenic image:

| Page | Image Path | Theme Description |
| :--- | :--- | :--- |
| `index.html` | `assets/images/machu-picchu-citadel.webp` | Ancient Lost Citadel in Andes Mountains |
| `pages/about.html` | `assets/images/london-heritage-bigben.webp` | Historic River Capital & Tower Bridge |
| `pages/tours.html` | `assets/images/caribbean-st-lucia-pitons.webp`| Caribbean Cruise Port & Island Archipelago |
| `pages/alpine.html` | `assets/images/swiss-alps-matterhorn.webp` | Swiss Alps Matterhorn Snow Summit |
| `pages/marine.html` | `assets/images/maldives-overwater-villas.webp`| Maldives Turquoise Coral Atoll & Villas |
| `pages/safaris.html`| `assets/images/serengeti-safari-savannah.webp`| Serengeti Golden Acacia Grasslands |
| `pages/cultural.html`| `assets/images/kyoto-historic-shrine.webp` | Kyoto Shinto Torii Shrine & Pagoda |
| `pages/pricing.html`| `assets/images/santorini-greece-oia.webp` | Santorini Whitewashed Aegean Village |
| `pages/contact.html`| `assets/images/paris-louvre-eiffel.webp` | Paris Eiffel Tower & Seine River at Dusk |
| `pages/sign-in.html`| `assets/images/cairo-giza-pyramids.webp` | Egyptian Desert Pyramids of Giza |
| `pages/sign-up.html`| `assets/images/tropical-beach-coastline.webp`| Golden Sunset Shoreline & Ocean Waves |

**Recommended Replacement Specifications**:
- **Format**: Modern WebP (or optimized JPEG).
- **Dimensions**: 1920px × 1080px (Hero banners) or 1200px × 800px (Cards).
- **Compression**: 80–85% quality to keep file size under 100 KB.

---

## 11. Responsive Breakpoints & Browser Compatibility

### Responsive Breakpoints (`responsive.css`)

```css
/* Ultra-Wide Displays */
@media (min-width: 1400px) { ... }

/* Standard Desktops & Laptops */
@media (min-width: 992px) and (max-width: 1199px) { ... }

/* Tablets & Small Laptops */
@media (min-width: 768px) and (max-width: 991px) { ... }

/* Mobile Devices */
@media (max-width: 767px) { ... }

/* Small Mobile Screens */
@media (max-width: 480px) { ... }
```

### Browser Compatibility

The template has been tested across all modern Evergreen browsers:
- **Google Chrome**: Version 100+
- **Mozilla Firefox**: Version 100+
- **Microsoft Edge**: Version 100+
- **Apple Safari**: Version 15+ (macOS & iOS)
- **Opera**: Version 85+

---

## 12. Backend Integration Guides

The template is fully wired for front-end presentation and client-side simulation. Follow the guides below to connect it to a production backend.

### 1. Booking & Tour Inquiry Integration
The search bar (`#tourSearchForm`) and tour booking buttons can be connected to any RESTful or GraphQL API:
```javascript
// Example Node.js / Express fetch submission
async function submitBookingInquiry(formData) {
  const response = await fetch('/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return await response.json();
}
```

### 2. Contact Form & 24/7 Dispatch Desk Integration
The contact form on `pages/contact.html` contains fields for Full Name, Email, Phone, Destination, Group Size, and Message. To connect:
- **PHP Mailer / Laravel**: Point `action="/api/contact"` with `method="POST"`.
- **Node.js / Express / Resend**: Send an async POST request to your mailer endpoint.
- **Serverless (Formspree / Netlify Forms)**: Add `action="https://formspree.io/f/YOUR_ID"` to `<form>`.

### 3. Authentication & Role-Based Dashboard Integration
To replace local client simulation with persistent authentication:
1. **JWT / Session API**: On login form submission, send credentials to `/api/auth/login`.
2. **Store Session Token**: Store the received JWT token in `HttpOnly` cookies (recommended) or `sessionStorage`.
3. **Route by Role**:
   - If user role is `traveller` -> redirect to `pages/dashboard-traveller.html`.
   - If user role is `agent` -> redirect to `pages/dashboard-agent.html`.
4. **Attach Authorization Header**: In `dashboard.js`, fetch dynamic bookings and commission records using `Bearer <token>`.

---

## 13. Performance, SEO & Accessibility (WCAG AAA)

### Performance Optimization
- **WebP Assets**: All photographs utilize WebP compression, reducing page weight by over 60%.
- **GPU-Accelerated Animations**: Heartbeat animations run via `transform: scale()` on isolated `-25px` inset layers with `will-change: transform`, preventing browser reflows.
- **Resource Hints**: Preconnects configured for Google Fonts and Cloudflare CDNs.

### Search Engine Optimization (SEO)
- Unique `<title>` and descriptive `<meta name="description">` on every page.
- Semantic HTML tags (`<h1>` to `<h3>`, `<article>`, `<nav>`, `<main>`) for clean web crawlers.
- Open Graph tags (`og:title`, `og:image`, `og:description`) for rich social previews.

### Accessibility Standards
- High color contrast ratio (> 10:1) on all hero headings and badges against scenic photographic overlays.
- ARIA labels on icon buttons, drawer toggles, and modal dismiss elements.
- Strict reduced-motion fallback:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
      transform: none !important;
    }
  }
  ```

---

## 14. Credits & Third-Party Assets

- **Font Awesome 6.5.1**: [https://fontawesome.com](https://fontawesome.com)
- **Google Fonts (Plus Jakarta Sans)**: [https://fonts.google.com](https://fonts.google.com)
- **AOS (Animate On Scroll)**: [https://michalsnik.github.io/aos/](https://michalsnik.github.io/aos/)
- **Photography Assets**: Licensed via Unsplash & Pexels (optimized for Stackly Travel).

---

## 15. Maintenance & Support Information

When editing or extending the template:
1. **Verify Relative Paths**: Interior pages in `pages/` reference assets via `../assets/`, whereas root `index.html` references `assets/`.
2. **Maintain Role Separation**: Keep `dashboard-traveller.html` and `dashboard-agent.html` workflows clean and independent without cross-linking subpages.
3. **Preserve Overlay & Text-Shadow Rules**: When swapping hero images, maintain the `.page-hero-overlay` gradient to guarantee WCAG AAA text legibility.
