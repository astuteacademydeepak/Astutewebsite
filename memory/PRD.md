# Astute Academy — Product Requirements Document

## Problem Statement
Complete redesign and rebuild of https://www.astuteacademy.com/ as a premium, modern, responsive, bilingual (English + Marathi) education & career counselling brand. Position as: Premium Global Education + Career Counselling + Medical Career Guidance Brand.

## User Personas
- Indian students (Class 12, Bachelor's, Master's) planning global education
- Indian medical graduates (MBBS/MD) pursuing USMLE, Residency, Fellowships, Research
- Parents of prospective students seeking to understand options and cost
- Working professionals seeking higher education / international careers

## Core Requirements (Static)
- Bilingual EN + मराठी (URL prefix /mr/, client-side i18n)
- Brand colors: Blue #0059A9 (dominant), Orange #EB5F22 (accent), Navy #00226B
- Fonts: Plus Jakarta Sans (display) + DM Sans (body) + Noto Sans Devanagari
- Fast, mobile-first, WCAG-conscious
- WhatsApp: 918899117757 / 8899117767
- No fake statistics, no unsupported claims

## Architecture
- Backend: FastAPI + MongoDB with routes for leads, contact, events, blog, testimonials, faqs, admin
- Frontend: React 19 + React Router + Tailwind + Sonner (toasts) + Lucide icons
- Content model: bilingual `_en` + `_mr` fields on events, blog, testimonials, faqs
- JWT-based admin auth (fallback secret; production must set JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD)

## What's Been Implemented (Feb 2026)
- Homepage: Hero, Audience Pathway Selector, Destinations, Medical Pathway, Why Astute, 6-step Journey Timeline, Testimonials with role filter, Partner logo marquee, Free Assessments, Events, Blog, FAQ tabs, Final CTA, Footer
- Destination pages: USA, Germany, Medical Careers, Career Counselling (each with programs, process, why, CTA)
- Utility pages: About + Leadership, Blog list + detail, Events (upcoming/past tabs), Contact form, 404
- Multi-step (6-step) Lead Form modal with progress bar, validation, EN/MR labels
- WhatsApp FAB (desktop) + Mobile bottom bar (WhatsApp + Book)
- Bilingual language switcher (EN | मराठी) in header + footer with URL routing
- Admin dashboard: JWT login, tables for leads and contact messages
- Seed API with 5 testimonials, 4 events, 4 blog posts, 8 FAQs — all bilingual
- Per-route document titles + SEO meta tags

## Prioritized Backlog

### P1 — Next high-value
- AI Career Pathway Assistant (opt-in) using Emergent LLM key
- Program detail pages per program (USMLE, Residency, Bachelor's, etc.)
- Admin CMS forms to add events, blog posts, testimonials from the dashboard UI
- Leadership section with additional team members
- Full FAQ page (currently only homepage tabs)

### P2 — Growth & polish
- hreflang tags for /mr URLs (server-side or via helmet)
- Google Analytics 4 + Meta Pixel + event tracking (language_switch_en/mr, form_start, form_complete, whatsapp_click)
- Sitemap.xml + robots.txt with bilingual URLs
- Rich testimonials with video + longer case studies
- Newsletter subscription
- Blog search + category filter chips
- Real Astute leadership photograph and biographical detail
- Custom "student stories" long-read templates
- Structured data (Organization, FAQ, Course schema)

## 2026-06 — Nav bar redesign
- Desktop nav tabs: Inter Medium 500 at 14px, kept on one line. Each tab is its own frosted glass pill (light blur, faint border, soft shadow). On hover, or while the Destinations menu is open, text turns #026BC0 with a blue glass highlight and a 1px lift. The orange underline was removed and the current page's tab is not highlighted.
- Header fits without overflow from 1024 to 1920px: WhatsApp link shows at 2xl and up, CTA at xl and up (both still in the mobile drawer and floating button).
- Backlog: P1 SEO (hreflang, schema), P1 Analytics (GA4/GTM/Meta Pixel), P2 CAPTCHA + input sanitization.

## 2026-06 — Sticky counselling bar
- New slim bottom bar on all screen sizes (Overlays.jsx). It appears after 600px of scrolling and can be dismissed with X; the dismissal lasts for the browser session (sessionStorage `astute_sticky_bar_dismissed`). The CTA opens the lead form, and phones also get a WhatsApp icon. Text is bilingual (i18n `stickyBar`).
- Replaced the old always-on mobile bottom bar. The floating WhatsApp and Pathway Assistant buttons lift while the bar is visible (`html[data-sticky-bar="on"] .float-lift`). The footer has extra bottom padding so the bar doesn't cover it.

## 2026-06 — Icon visibility fix
- Root cause: brand colours only existed as CSS vars/custom classes, so `from-brand-*` gradients and `/opacity` variants produced no CSS. Added `brand` colours to tailwind.config.js, which fixes the audience icons, the destination card overlays and the Pathway Assistant header gradient.
- Professional icon no longer green (now #026BC0 → navy). Audience cards align to the top. The sticky bar text is hidden below 420px.
