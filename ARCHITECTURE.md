# Architecture & Engineering Principles

This document outlines the key architectural decisions, engineering principles, and technical choices that shape Afiado.

## Core Engineering Principles

### 1. Simplicity Over Complexity
- Prefer simple, maintainable solutions over clever optimizations
- Keep the codebase approachable for new contributors
- If a feature feels complex, it probably needs more design thinking

### 2. Type Safety is not optional
- Maintain strict type checking configurations
- Document type definitions clearly

### 3. Testing as a First-Class Citizen
- Maintain high test coverage for critical paths
- Write tests that serve as documentation
- Follow the testing pyramid: unit → integration → e2e

### 4. Performance by Default
- Consider performance implications in every PR
- Optimize for core web vitals
- Regular performance monitoring and benchmarking

### 5. Mobile First UI
- Build for mobile first, then desktop
- Use responsive design patterns
- Optimize for touch interactions

### 6. Build Fast, Ship Faster
- Optimize build times, for both development and production
- The faster we can build, the faster we can ship
- Use CI/CD to automate builds and tests

### 7. We love open source
- Prefer open source tools and libraries
- Share our learnings with the community
- Keep the CHANGELOG up to date

## Architecture Overview

### System Components

```mermaid
graph TD
Client[Client Browser] --> NextJS[Next.js Frontend]
NextJS --> API[API Layer]
API --> DB[Database]
```

## Technology Choices

For each technology choice, we will consider the following:

- Context: What is the problem we are trying to solve?
- Considered Alternatives: What other technologies did we consider? List at least 3 alternatives.
- Consequences: What are the trade-offs of the chosen technology? What are the mitigation strategies for the negative consequences?

Summary of the technology choices:

- [Frontend Framework: Next.js](#frontend-framework-nextjs)
- [Auth Provider: Clerk](#auth-provider-clerk)
- [Backend: Convex](#backend-convex)
- [Payments: AbacatePay + Lemon Squeezy by Stripe](#payments-abacatepay-lemon-squeezy-by-stripe)
- [Styling: TailwindCSS](#styling-tailwindcss)
- [Component Library: Shadcn/ui](#component-library-shadcn-ui)
- [Product Analytics: PostHog](#product-analytics-posthog)
- [Web Analytics: PostHog](#web-analytics-posthog)
- [SEO Tracking: aHrefs + MakeMeFindable](#seo-tracking-ahrefs-makemefindable)
- [DNS: Cloudflare](#dns-cloudflare)
- [E-mail: Resend](#e-mail-resend)
- [Package Manager: Bun](#package-manager-bun)
- [Linting: Biome](#linting-biome)
- [Formatting: Biome](#formatting-biome)
- [Unit Testing: Vitest](#unit-testing-vitest)
- [E2E Testing: Playwright](#e2e-testing-playwright)
- [Deployment: Cloudflare Pages](#deployment-cloudflare)

### Frontend Framework: Next.js

**Context:**
- Need for a modern framework with recognizable patterns, helping new developers get up to speed quickly
- Looking for excellent developer experience
- Require strong TypeScript support

**Considered Alternatives:**
1. [Next.js](https://nextjs.org/)
2. [React Router (Framework Mode)](https://reactrouter.com/)
3. [Tanstack Start](https://tanstack.com/start)

**Consequences: Next.js**
- Positive:
  - Faster development cycles, since is widely regarded as the de facto framework for starting a React project
  - Built-in performance optimizations
  - Great DX with hot reload and turbopack improvements reducing build times
  - Strong ecosystem, backed by Vercel
  - Allows for starting with static generation, but also has the ability to be server-side rendered
- Negative:
  - Learning curve for developers new to Next.js
  - Some lock-in to Vercel's ecosystem
  - Need to follow Next.js upgrade cycles

### Auth Provider: Clerk

**Context:**
- Need for a modern auth provider with a strong focus on user experience
- Looking for a provider that is easy to integrate with
- Preferably hosted solution, but we can self-host if necessary
- Require strong TypeScript support

**Considered Alternatives:**
1. [Clerk](https://clerk.com/)
2. [BetterAuth](https://better-auth.com/)
3. [WorkOS](https://workos.com/)

**Consequences: Clerk**
- Positive:
  - Strong TypeScript support
  - Excellent developer experience
  - Active community
  - Excellent documentation
  - Excellent support for social login providers
- Negative:
  - Some lock-in to Clerk's ecosystem
  - Hard to onboard Enterprise customers with multiple sign-in methods and users with different roles
- Mitigation Strategies:
  - [WorkOS](https://workos.com/) has a Admin Portal and a more flexible role-based access control (RBAC)
  - [BetterAuth](https://better-auth.com/) enables us to self-host and have more control over the user experience and the data we store about our users

### Backend: Convex

**Context:**
- Need for a modern backend framework with a strong focus on user experience
- Looking for a provider that is easy to integrate with
- Looking for an alternative that is easy to implement Real-Time Data Sync
- Offline-first approach is nice plus.
- Require strong TypeScript support

**Considered Alternatives:**
1. [Convex](https://www.convex.dev/)
2. [Supabase](https://supabase.com/)
3. [Firebase](https://firebase.google.com/)

**Consequences: Convex**
- Positive:
  - Good support for Real-Time Data Sync
  - Good support for Offline-first approach
  - Good support for TypeScript
- Negative:
  - Some lock-in to Convex's ecosystem
  - When offline Convex enqueues requests to be sent when the user comes back online, but to be fully offline-first we need to add some third-party libraries

### Payments: AbacatePay + Lemon Squeezy by Stripe

**Context:**
- Need for a modern payments provider with a strong focus on user experience
- Looking for a provider that is easy to integrate with
- Good support for PIX, Brazilian instant payment method
- Require strong TypeScript support
- Prefer MoR over Payment Gateway, wherever possible

**Considered Alternatives:**
1. [AbacatePay](https://abacate.com.br/)
2. [Stripe](https://stripe.com/)
3. [Lemon Squeezy](https://lemonsqueezy.com/)
4. [Polar](https://polar.sh/)

**Consequences: AbacatePay + Lemon Squeezy by Stripe**
- Positive:
  - Good support for PIX, Brazilian instant payment method, using AbacatePay
  - Good support for Card, using Lemon Squeezy by Stripe
  - Smallest fees in comparison to other providers
  - Easy to integrate with
  - Strong TypeScript support
- Negative:
  - Lock-in to AbacatePay and Lemon Squeezy's ecosystem and payout limitations
  - Need to use Paypal Account to receive Lemon Squeezy payouts
- Mitigation Strategies:
  - [Polar](https://polar.sh/) has smaller fees, but Brazilian accounts are not supported for payouts; see more @ https://github.com/orgs/polarsource/discussions/3494#discussioncomment-9816314

### Styling: TailwindCSS

**Context:**
- Need for a modern styling library with a strong focus on user experience
- Server-side rendering (SSR) friendly
- Good documentation
- Good community support

**Considered Alternatives:**
1. [TailwindCSS](https://tailwindcss.com/)
2. [Styled Components](https://styled-components.com/)
3. [UnoCSS](https://unocss.dev/)

**Consequences: TailwindCSS**
- Positive:
  - Good documentation
  - Good community support
  - Good performance
  - Good DX
- Negative:
  - Some lock-in to TailwindCSS's ecosystem

### Component Library: Shadcn/ui

**Context:**
- Need for a modern component library with a strong focus on user experience
- Server-side rendering (SSR) friendly
- Good documentation
- Good community support
- Good DX
- Good design
- Good accessibility
- Good dark mode support

**Considered Alternatives:**
1. [Shadcn/ui](https://ui.shadcn.com/)
2. [Mantine](https://mantine.dev/)
3. [Chakra UI](https://chakra-ui.com/)

**Consequences: Shadcn/ui**
- Positive:
  - Good documentation
  - Good community support
  - Good DX, uses TailwindCSS under the hood
  - Good design
  - Good accessibility, uses Radix UI under the hood
  - Good dark mode support
- Negative:
  - Smaller component library than other libraries

### Product Analytics: PostHog

**Context:**
- Need for a modern analytics provider with a strong focus on user experience
- Want to easily track user/product events and properties
- Looking for a provider that is easy to integrate with
- Good documentation
- Good community support

**Considered Alternatives:**
1. [PostHog](https://posthog.com/)
2. [Segment](https://segment.com/)
3. [Mixpanel](https://mixpanel.com/)

**Consequences: PostHog**
- Positive:
  - Good documentation
  - Good community support
  - Good DX
- Negative:
  - Some lock-in to PostHog's ecosystem

### Web Analytics: PostHog

**Context:**
- Need for a modern analytics provider with a strong focus on user experience
- Want to easily track anonymous analytics for web traffic and heatmaps
- Looking for a provider that is easy to integrate with
- Good documentation
- Good community support

**Considered Alternatives:**
1. [PostHog](https://posthog.com/)
2. [Google Analytics](https://analytics.google.com/)
3. [Hotjar](https://hotjar.com/)

**Consequences: PostHog**
- Positive:
  - Good documentation
  - Good community support
  - Good DX
  - Good support for heatmaps
  - One less tool to integrate, since we are already using PostHog for product analytics
- Negative:
  - Some lock-in to PostHog's ecosystem

### SEO Tracking: aHrefs + MakeMeFindable

**Context:**
- Need for a modern SEO tracking provider with a strong focus on user experience
- Looking for a provider that is easy to integrate with
- Gives a variety of insights, including backlinks, keywords, and traffic
- Good documentation
- Good community support

**Considered Alternatives:**
1. [aHrefs](https://ahrefs.com/webmaster-tools)
2. [Google Search Console](https://search.google.com/search-console)
2. [MakeMeFindable](https://makemefindable.com/)

**Consequences: aHrefs + MakeMeFindable**
- Positive:
  - Good documentation
  - Good community support
  - Good DX
  - Good support for heatmaps
  - Free software, that provide a lot of insights and metric
- Negative:
  - Some lock-in to aHrefs's ecosystem

### DNS: Cloudflare
### E-mail: ⁠Resend
### Package Manager: ⁠Bun
### Linting: Biome
### Formatting: Biome
### Unit Testing: Vitest   
### E2E Testing: Playwright
### Deployment: Cloudflare Pages

Teams are free, builds are limited to 500 builds per month.

https://pages.cloudflare.com/

## Contributing Guidelines

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines. When contributing to architecture:

1. Update this document for architectural decisions
2. Maintain backwards compatibility when possible
3. Consider impact on existing contributors