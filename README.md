# Portfolio Site

A modern, interactive portfolio website built with Next.js and React. Features include an interactive map powered by Leaflet, project showcase with Vercel KV integration, GitHub activity feed, tech stack visualization, and a responsive design using Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Core Features](#core-features)
  - [Interactive Elements](#interactive-elements)
  - [Accessibility Features](#accessibility-features)
  - [Best Practices](#best-practices)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

A portfolio with RPG-style achievements, interactive maps, and real-time GitHub integrations, designed to showcase both projects and personality.

## Tech Stack
- **Framework:** Next.js 14.1.0
- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Database:** Vercel KV (Redis)
- **Map Integration:** React Leaflet, Leaflet.js
- **Authentication:** Custom admin authentication
- **Deployment:** Vercel
- **Animation:** Framer Motion
- **Email:** Nodemailer

## Features

### Core Features
- Interactive map showing location and impact points
- Project showcase with images and descriptions
- Real-time GitHub activity feed
- Tech stack visualization with hover effects
- Contact form with email notifications
- Protected admin dashboard
- Responsive design for all devices
- Dark mode support

### Interactive Elements
- RPG-style experience system with achievements
- Battle status card with GitHub stats
- Collapsible user interface elements
- Animated tooltips and modals
- Interactive timeline with expandable sections

### Accessibility Features
- Full keyboard navigation support
- ARIA labels and roles throughout
- Focus management for modals and tooltips
- Screen reader friendly content structure
- Semantic HTML elements
- Clear focus indicators
- Proper heading hierarchy
- Alt text for images
- Color contrast compliance
- Skip navigation links
- Accessible form labels
- Keyboard-accessible tooltips
- Mobile-friendly touch targets

### Best Practices
- Progressive enhancement
- Responsive images
- Error boundaries
- Loading states
- Form validation
- Type safety with TypeScript
- Code splitting
- SEO optimization
- Performance optimization
- Security best practices
- Clean code architecture
- Component reusability
- State management patterns
- Proper error handling

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- Vercel account (for deployment)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/portfolio-site.git
   cd portfolio-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_KEY=your_api_key
   VERCEL_KV_REST_API_URL=your_kv_url
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) **in your browser.**

## Deployment

This project is deployed on [Vercel](https://vercel.com/).

### Deploy Steps:
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Configure environment variables in the Vercel dashboard.
4. Click "Deploy."

Alternatively, deploy via CLI:
```bash
vercel deploy
```

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Visuals

![Portfolio Screenshot](https://github.com/SunTheCoder/portfolio-site/blob/main/public/projects/portfolio-site.png?raw=true)

[![Vercel](https://vercelbadge.vercel.app/api/sunthecoder/portfolio-site)](https://sunthecoder.com/)