# Buka

[![.NET 8](https://img.shields.io/badge/.NET-8.0-512bd4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/download)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

A full-stack zodiac discovery platform with two frontend interconnected applications working seamlessly together connected to one backend bain.

## Architecture Overview

                      ┌─────────────────┐
                      │    PostgreSQ    │
                      │     Database    │
                      └────────┬────────┘
                               │
                      ┌────────▼────────┐
                      │  ASP.NET Core   │
                      │  Backend API    │
                      └────────┬────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
        ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
        │   Flutter   │ │    React    │ │    Future   │
        │ Mobile App  │ │   Web App   │ │  Platforms  │
        └─────────────┘ └─────────────┘ └─────────────┘

## Three Projects, One Purpose

### 1️ **ASP.NET Core Backend API** (The Brain)

- **Role**: Central server handling all logic and data
- **Tech**: C#, ASP.NET Core, Entity Framework, JWT Authentication
- **Database**: PostgreSQL for reliable data storage
- **Why**: Single source of truth for user data, zodiac calculations, and history

### 2️ **Flutter Mobile App** (The Companion)

- **Role**: Native mobile experience for on-the-go zodiac discovery
- **Tech**: Dart, Flutter, Material Design
- **Platforms**: iOS & Android
- **Why**: Mobile-first approach for users who prefer smartphone interaction

### 3️ **React Web App** (The Portal)

- **Role**: Desktop-friendly web interface for broader accessibility
- **Tech**: TypeScript, React, Vite, Bootstrap
- **Why**: Accessible from any browser, no installation required

## How They Work Together

        User Action → Mobile/Web App → Backend API → Database → Response → App
        ↑                                                                   ↓
        └─────────────────── Real-time Updates ─────────────────────────────┘

- **Unified Authentication**: One account works everywhere
- **Shared Database**: Your zodiac history syncs across all devices
- **Consistent Logic**: Same zodiac calculations regardless of platform
- **Real-time Sync**: Changes reflect instantly across all apps

## Why This Architecture?

| Component              | Purpose                   | Benefit                                   |
|------------------------|---------------------------|-------------------------------------------|
| **Separate Backend**   | Centralized logic & data  | One codebase serves all frontends         |
| **Flutter Mobile**     | Native performance        | Smooth animations, offline capabilities   |
| **React Web**          | Universal access          | No app store required, SEO friendly       |
| **PostgreSQL**         | Reliable storage          | Data integrity, complex queries           |

## Communication Flow

1. **Authentication**: Apps request JWT token → Backend validates → Token returned
2. **Zodiac Lookup**: Apps send birth date → Backend calculates → Result saved to DB
3. **History Sync**: Apps request history → Backend queries DB → Returns user data
4. **Profile Management**: Apps update profile → Backend updates DB → Syncs everywhere

## Technology Stack

`**Backend**

- ASP.NET Core 8.0
- Entity Framework Core
- PostgreSQL
- JWT Bearer Authentication
- BCrypt for password hashing

`**Mobile**

- Flutter 3.x
- Dart
- Material UI
- HTTP Client
- Secure Storage

`**Web**

- React 18
- TypeScript
- Vite
- Bootstrap 5
- Axios
- Framer Motion

## Why Three Separate Apps?

- **Specialized Experiences**: Each platform optimized for its use case
- **Independent Scaling**: Update mobile without touching web
- **Team Parallel Work**: Different teams can work simultaneously
- **Technology Best-Fit**: Using right tool for each platform

## Data Synchronization

        Mobile App ────┐
        |              |
        ├──►       Backend API       ──►        PostgreSQL
        |              |
        Web App ───────┘

- **Central Database**: All apps read/write to same data source
- **Real-time**: No sync delays, always latest data
- **Consistent**: Same rules across all platforms

## Deployment Strategy

- **Backend API**: Cloud server
- **PostgreSQL**: Managed database service
- **Mobile App**: App Store & Google Play
- **Web App**: Static hosting (Vercel/Netlify)

## Benefits

**Cross-platform reach** - Users on any device  
**Unified user experience** - Same features everywhere  
**Cost-effective** - One backend serves all frontends  
**Future-proof** - Easy to add more platforms later  

---

**The Buka Ecosystem**: One backend to rule them all, multiple frontends to reach everyone.
