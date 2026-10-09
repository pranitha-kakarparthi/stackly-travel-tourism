# Stackly Travel & Tourism Website
## Technical Documentation

*Responsive HTML5 Template for Luxury Expeditions, Tour Operators & Travel Agency Portals*  
**Version 1.0**

---

## Introduction

Stackly Travel & Tourism is a fully responsive HTML5 website template engineered for luxury tour operators, destination management companies (DMCs), travel agencies, wilderness expeditions, and holiday booking portals. It combines a high-converting public marketing website (home, about, tours directory, specialized category expeditions, transparent pricing, and 24/7 global dispatch contact) with an authenticated explorer and agency portal (sign in, registration, and dual role-based dashboards).

The template is built with modern HTML5 and pure CSS3, uses Font Awesome 6.5.1 vector icons and AOS (Animate On Scroll) motion effects, and includes custom vanilla JavaScript for navigation, role-based dashboard switching, dynamic greeting personalizations, and authentication form validation. It operates without any third-party frameworks or jQuery dependencies.

### Template Features

• Fully Responsive HTML5 Layout (desktop, laptop, tablet, mobile)  
• Modern, luxury travel-themed UI/UX design  
• Dual Role-Based User Dashboards (independent Traveller and Travel Agent portals)  
• Wholesale Tours Inventory & Commission Tracking for Travel Agents  
• Expedition Itineraries, Live Flight & Rail Tracking, and Emergency SOS Protocols for Travellers  
• Sign In & Registration pages with live client-side validation and password strength assessment  
• Tours & Holiday Packages directory with multi-parameter filter criteria (continent, travel style, duration, budget)  
• Dedicated tour category deep-dive pages (Alpine, Marine, Safaris, and Cultural journeys)  
• Transparent pricing and tiered membership packages page  
• Contact page with 24/7 global expedition dispatch desk and Google Maps integration  
• Scenic destination hero banners with continuous breathing heartbeat animations and live status badges  
• Diversified visual themes across all pages with unique scenic destinations  
• Sticky header navigation with frosted glassmorphism effect and mobile off-canvas drawer  
• Contextual fixed auth header for distraction-free login and registration  
• Custom 404 error page with quick return-to-home actions  
• Cross-browser compatible across all modern evergreen browsers  
• Clean, organized, well-commented modular architecture  

---

## Technologies Used

| Technology | Description |
| :--- | :--- |
| **HTML5** | Page structure, semantic markup, and accessible document layout |
| **CSS3** | Global and page-specific styling, CSS variables, grid, flexbox, and keyframe animations |
| **JavaScript (Vanilla)** | Navigation drawer, sticky header, dynamic time-of-day greeting, role switching, and form validation |
| **Font Awesome 6.5.1** | Vector icon library loaded via CDN |
| **AOS (Animate On Scroll)** | Scroll-triggered reveal animations loaded via CDN |
| **Google Fonts** | Plus Jakarta Sans typographic family |
| **Google Maps Embed** | Interactive location map embed on the Contact page |

---

## Folder Structure

```
Travel & Tourism/
|
├── index.html
├── 404.html
|
├── pages/
│   ├── about.html
│   ├── tours.html
│   ├── alpine.html
│   ├── marine.html
│   ├── safaris.html
│   ├── cultural.html
│   ├── pricing.html
│   ├── contact.html
│   ├── sign-in.html
│   ├── sign-up.html
│   ├── 404.html
│   ├── dashboard-traveller.html
│   ├── dashboard-expeditions.html
│   ├── dashboard-itineraries.html
│   ├── dashboard-safety.html
│   ├── dashboard-settings.html
│   ├── dashboard-support.html
│   ├── dashboard-agent.html
│   ├── dashboard-agent-tours.html
│   ├── dashboard-agent-commissions.html
│   ├── dashboard-agent-agreement.html
│   ├── dashboard-agent-settings.html
│   └── dashboard-agent-support.html
|
└── assets/
    ├── css/
    │   ├── style.css (global design system & master styles)
    │   ├── responsive.css (media queries & layout reflow)
    │   ├── animations.css (heartbeat, shimmer, & motion keyframes)
    │   └── dashboard.css (unified dashboard & table styles)
    ├── js/
    │   ├── main.js (navigation, header, dynamic greeting, search)
    │   ├── auth.js (login, registration, validation, strength meter)
    │   ├── dashboard.js (sidebar toggle, role name resolution, tables)
    │   └── animations.js (AOS initialization & scroll effects)
    └── images/
        ├── logoStackly.webp
        ├── logo.svg
        ├── logo-white.svg
        └── (destination & tour photographs)
```

---

## Installation & Setup Guide

### Local Setup

1. Download or clone the project ZIP package to your local workstation.  
2. Extract the ZIP archive into your preferred working folder.  
3. Open the project folder in your code editor (such as VS Code, Cursor, or Sublime Text).  
4. Run `index.html` directly in the browser or launch it using a local HTTP server (such as VS Code Live Server, Node `serve`, or Python `http.server`) so that relative paths across the root, `/pages/`, and `/assets/` directories resolve consistently.  

### GitHub Hosting Setup

#### Upload the Template to GitHub
5. Log in to your GitHub account.  
6. Create a new public or private repository (for example, `stackly-travel-tourism`).  
7. Upload or push all project files, strictly preserving the root `index.html`, `pages/`, and `assets/` directory hierarchy.  
8. Commit and push the changes to your `main` branch.  

#### Enable GitHub Pages
9. Open the repository **Settings** tab.  
10. Navigate to the **Pages** section in the left sidebar.  
11. Under **Build and deployment > Source**, select **Deploy from a branch**.  
12. Set the branch to `main` and the folder to `/ (root)`.  
13. Click **Save**.  
14. Allow 1 to 2 minutes for the deployment workflow to complete.  
15. Open your generated live GitHub Pages URL in any browser.  

### cPanel Hosting Setup

16. Log in to your hosting cPanel control panel.  
17. Open the **File Manager** utility.  
18. Navigate to your primary web root directory (typically `public_html` or your domain document root).  
19. Upload the project ZIP package.  
20. Extract the ZIP archive directly inside `public_html`, ensuring that `index.html`, `pages/`, and `assets/` reside at the top level of the public web root.  
21. Enter your registered domain name in the browser address bar to verify that all pages, styles, and assets load properly.  

---

## Main HTML Pages

| Page | Description |
| :--- | :--- |
| `index.html` | Public Homepage / Marketing Landing Page |
| `pages/about.html` | About Us / Company Heritage & Leadership |
| `pages/tours.html` | Worldwide Tours & Holiday Packages Directory |
| `pages/alpine.html` | Scenic Alps & Mountain Escapes Category Page |
| `pages/marine.html` | Tropical Islands & Marine Escapes Category Page |
| `pages/safaris.html` | Wildlife Safaris & Nature Category Page |
| `pages/cultural.html` | Historic Capitals & Cultural Journeys Category Page |
| `pages/pricing.html` | Transparent Pricing & Tiered Membership Packages |
| `pages/contact.html` | Contact Page with 24/7 Global Dispatch Desk & Map |
| `pages/sign-in.html` | User Login Portal (Traveller & Agent access) |
| `pages/sign-up.html` | User Registration Page with Role Selection |
| `pages/dashboard-traveller.html` | Primary Traveller Expedition Portal |
| `pages/dashboard-agent.html` | Primary Travel Agent B2B Partner Portal |
| `404.html` | Custom Error Page |

---

## Page Descriptions

### Homepage (`index.html`)
The main landing page of the website. It includes the top-level sticky navigation bar, a high-contrast hero banner featuring the Machu Picchu citadel with an organic heartbeat pulse animation, a dynamic time-of-day greeting badge, an interactive global search and filter strip, signature tour packages, client testimonials, travel specialist profiles, and the comprehensive site footer.

### About (`pages/about.html`)
Provides company history, vision, sustainability stewardship, and executive team information. Helps prospective travelers and agencies build trust through accreditation highlights, company milestones, and core values. Backed by the historic London Tower Bridge and Thames river hero image.

### Tours & Packages (`pages/tours.html`)
Displays the complete worldwide tour catalog. Includes an interactive multi-parameter filter strip (Continent, Travel Style, Duration, Budget Range), sortable tour cards, departure schedules, duration badges, and direct inquiry call-to-actions. Backed by the Caribbean island cruise port hero image.

### Tour Categories (`alpine.html`, `marine.html`, `safaris.html`, `cultural.html`)
Curated showcases highlighting themed travel collections:
• **Alpine Escapes (`pages/alpine.html`)**: High-altitude trekking, ski chalets, and glacier routes, backed by the Swiss Alps Matterhorn.  
• **Marine Escapes (`pages/marine.html`)**: Coral atolls, overwater villas, and yacht charters, backed by the Maldives lagoons.  
• **Wildlife Safaris (`pages/safaris.html`)**: Big Five game drives, tented camps, and conservation walks, backed by the Serengeti savannah.  
• **Cultural Journeys (`pages/cultural.html`)**: UNESCO heritage shrines, art pilgrimages, and historic capitals, backed by Kyoto shrines.  

### Pricing & Packages (`pages/pricing.html`)
Presents transparent, all-inclusive pricing tiers (Explorer, Odyssey, Sovereign VIP), complete inclusions comparison tables, net booking benefits with zero hidden fees, and membership privileges. Backed by the Santorini cliffside village hero image.

### Contact (`pages/contact.html`)
Enables visitors to reach the 24/7 global dispatch headquarters through an expedition inquiry form, direct telephone hotlines across regional offices, direct email addresses, and an embedded Google Map for office locations. Backed by the Paris Eiffel Tower hero image.

### Sign In (`pages/sign-in.html`)
Handles user authentication for both Travellers and Travel Agents. Features a two-column split layout with an Egyptian Pyramids scenic hero sidebar, client-side email validation, password visibility toggles, and seamless role redirection into dedicated dashboard pages.

### Sign Up (`pages/sign-up.html`)
Allows new users to register as either a Traveller or Travel Agent. Includes full name, email, phone number, role selector, real-time password strength meter, and terms agreement check. Backed by a tropical sunset beach scenic sidebar.

### User Dashboards (`pages/dashboard-*.html`)
Strictly isolated, role-based dashboards for signed-in users:
• **Traveller Portal (`pages/dashboard-traveller.html`)**: Displays upcoming countdowns, confirmed flight and high-speed rail itineraries, e-ticket downloads, field safety checklists, emergency satellite tracking, and medical evacuation SOS protocols.  
• **Travel Agent Portal (`pages/dashboard-agent.html`)**: Displays wholesale booking volumes, gross sales revenue KPIs, tiered commission statement tracking (12%–18%), exclusive B2B wholesale tour inventories, agency partner agreements, and priority dispatch hotlines.  

### 404 Error Page (`404.html`, `pages/404.html`)
A dedicated branded error page displayed when a requested URL cannot be found. Offers direct navigation back to the Homepage or the previous page.

---

## Reusable Components

### Primary Navigation Header
The main header is shared across marketing pages. It features a sticky glassmorphic container on scroll, active page link highlighting, multi-level dropdowns for tour categories, a mobile off-canvas drawer with toggle controls, and quick action buttons for Sign In and Sign Up.

### Fixed Auth Header
A specialized minimalist header utilized on Sign In and Sign Up pages. Features the clickable brand logo linking to the homepage, a dedicated "Home" button with arrow icon, and a single contextual alternative action button ("Create Account" on Sign In; "Sign In" on Sign Up).

### Page Hero Component
Standardized hero banner present on interior pages. Composed of an absolute-positioned background image layer running the continuous breathing pulse animation, a dark multi-stop gradient overlay for WCAG AAA contrast, a pill badge with animated status dot, a main title with warm gold accent highlights, lead description copy, and breadcrumb navigation links.

### Dashboard Shell
A clean dashboard layout containing an independently collapsible sidebar with role-specific menu items, a sticky topbar with notification indicators and user name extracted from the login email, and an independent content viewport preventing double-header jitter during scroll.

---

## CSS Customization

### Stylesheet Locations
• Global styles, design tokens, and components: `assets/css/style.css`  
• Responsive breakpoints and device layout: `assets/css/responsive.css`  
• Keyframe animations, pulse effects, and reduced motion: `assets/css/animations.css`  
• Unified dashboard layout and table formatting: `assets/css/dashboard.css`  

### Customizable Design Elements
You can easily adjust the look and feel of the website by modifying the design tokens defined at the top of the global stylesheet:
• **Brand Colors**: Primary deep forest pine, secondary sunset amber, accent gold, and neutral slate tones  
• **Typography**: Font family, base font sizes, line heights, and heading weights  
• **Layout Spacing**: Section paddings, container max-widths, and grid gap intervals  
• **Buttons & Tags**: Border radii, hover transforms, button sizes, and badge backgrounds  
• **Hero Overlay Opacity**: Dark gradient overlay density to fine-tune background image visibility  
• **Responsive Breakpoints**: Media query thresholds for tablets and mobile devices  

---

## JavaScript Files

All scripts are located in `assets/js/` and operate using vanilla ES6+ without external library dependencies:

| File | Responsibility |
| :--- | :--- |
| `main.js` | Mobile navigation drawer open/close, sticky header scroll observer, active navigation highlighting, dynamic time-of-day greeting ("Good morning/afternoon/evening, Explorer!"), search bar filtering, and smooth scroll handling |
| `auth.js` | Client-side login and registration form validation, email pattern checks, dynamic password strength meter calculation, password visibility toggle, and role-based redirect dispatcher |
| `dashboard.js` | Collapsible sidebar toggle (desktop and mobile drawer), dynamic user name extraction and formatting from login email, interactive table search/filtering, tab switching, and logout handling |
| `animations.js` | AOS animation initialization, scroll progress bar indicator, and accessibility reduced-motion event listeners |

---

## Image Replacement Guide

### Replace Brand Logo
The primary brand logo files are located at:
• `assets/images/logoStackly.webp` (Primary WebP logo)  
• `assets/images/logo.svg` (Primary vector SVG)  
• `assets/images/logo-white.svg` (Monochrome white SVG)  
To update the logo, replace these files with your brand artwork using the same file names, or update the `src` references within the HTML headers. Recommended height is 36px to 48px.

### Replace Hero & Section Images
Hero images are organized inside `assets/images/`. Each page features a dedicated, unique scenic destination to maintain visual diversity:

| Page | File Name | Destination Theme |
| :--- | :--- | :--- |
| Homepage | `machu-picchu-citadel.webp` | Ancient Lost Citadel & Mountain Sanctuary |
| About Us | `london-heritage-bigben.webp` | Historic River Capital & Tower Bridge |
| Tours Directory | `caribbean-st-lucia-pitons.webp` | Caribbean Island Cruise Port & Archipelago |
| Alpine Escapes | `swiss-alps-matterhorn.webp` | Swiss Alps Matterhorn Snow Summit |
| Marine Escapes | `maldives-overwater-villas.webp` | Maldives Turquoise Coral Atoll & Villas |
| Wildlife Safaris | `serengeti-safari-savannah.webp` | Serengeti Golden Acacia Grasslands |
| Cultural Journeys | `kyoto-historic-shrine.webp` | Kyoto Shinto Torii Shrine & Pagoda |
| Pricing & Packages | `santorini-greece-oia.webp` | Santorini Whitewashed Aegean Village |
| Contact Us | `paris-louvre-eiffel.webp` | Paris Eiffel Tower & Seine River |
| Sign In | `cairo-giza-pyramids.webp` | Egyptian Desert Pyramids of Giza |
| Sign Up | `tropical-beach-coastline.webp` | Golden Sunset Shoreline & Ocean Beach |

When replacing images, maintain a 16:9 or 3:2 landscape aspect ratio (recommended 1920 × 1080 pixels) and compress them in modern WebP format for fast load speeds.

---

## Fonts & Icons

### Typography
The template uses the **Plus Jakarta Sans** font family loaded via Google Fonts CDN, providing clean readability across both high-density digital displays and mobile viewports.

### Font Awesome Icons
All UI, navigation, and feature icons are powered by Font Awesome 6.5.1 loaded via CDN. Icon classes can be updated directly within HTML markup by referencing official icon names (e.g., `fa-compass`, `fa-plane`, `fa-shield-heart`).

---

## Responsive Design

The template is fully responsive and supports all screen sizes:
• **Ultra-Wide Screens & Desktops** (1400px and above)  
• **Standard Desktops & Laptops** (992px to 1199px)  
• **Tablets & Small Laptops** (768px to 991px)  
• **Mobile Devices** (320px to 767px)  

---

## Browser Compatibility

Tested and fully supported across all modern evergreen browsers:
• Google Chrome  
• Mozilla Firefox  
• Microsoft Edge  
• Apple Safari (macOS & iOS)  
• Opera  

---

## Backend & Integration Guide

The template currently provides interactive client-side form handling and validation. To connect it to a production backend, integrate with any of the following architectures:

### Tour Booking & Inquiry Integration
Connect the search and booking inquiry forms to one of the following:
• A custom Node.js / Express REST API with a PostgreSQL, MySQL, or MongoDB database  
• A PHP / Laravel backend  
• A Python / Django or FastAPI backend  
• A headless booking API or cloud database (Firebase, Supabase)  

### Contact Form Integration
Connect the dispatch desk inquiry form to an email delivery service:
• PHP `mail()` or PHPMailer script  
• A serverless mail API (SendGrid, Resend, Mailgun, Postmark)  
• Form endpoints such as Formspree or Netlify Forms  

### Authentication & Dashboard Integration
Replace the client-side session simulation with your production identity provider:
• Custom REST API with JWT tokens or secure HTTP-only session cookies  
• Firebase Authentication or Supabase Auth  
• Auth0, Clerk, or enterprise OAuth2 / OpenID Connect providers  

---

## Performance Optimization Tips

• Use compressed WebP image assets to keep initial page weight under 1 MB.  
• Minify global CSS and JavaScript files prior to production deployment.  
• Utilize CDN delivery for Google Fonts and Font Awesome assets (already pre-configured).  
• Enable Gzip or Brotli compression on your production web server.  
• Enable HTTP browser caching headers for static assets (images, CSS, JS).  

---

## SEO & Accessibility Optimization

• Add unique meta titles and descriptive meta descriptions to each HTML page.  
• Maintain semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).  
• Provide descriptive `alt` text attributes for all content images.  
• Retain the built-in WCAG AAA text contrast ratios and dark gradient overlays.  
• The built-in `@media (prefers-reduced-motion: reduce)` media query automatically disables heavy transforms for users with motion sensitivities.  

---

## Credits

• **Font Awesome 6.5.1**: Icon vector library (https://fontawesome.com)  
• **Google Fonts**: Plus Jakarta Sans typographic family (https://fonts.google.com)  
• **AOS Library**: Animate On Scroll micro-interactions (https://michalsnik.github.io/aos/)  
• **Unsplash & Pexels**: Licensed high-resolution destination imagery  

---

## Support & Maintenance Information

If you encounter any issues while setting up or customizing the template:
• Ensure all relative file paths are maintained (use `../assets/` on subpages inside `pages/` and `assets/` on root `index.html`).  
• When adding new subpages to dashboards, keep the Traveller and Travel Agent workflows independent to prevent role conflicts.  
• Verify that all image assets exist in `assets/images/` with identical file names when moving files between environments.  
