
# IntelX Frontend - React/Next.js Application

A modern enterprise-grade frontend application built with Next.js 15, TypeScript, and Tailwind CSS for RFP (Request for Proposal) management.

## 🏗️ Architecture Overview

This project follows a clean, scalable architecture pattern with clear separation of concerns:

### **Directory Structure**

```
project/
├── app/                    # Next.js App Router (v13+)
│   ├── dashboard/         # Dashboard route pages
│   ├── rfps/             # RFP management pages
│   ├── settings/         # Settings pages
│   ├── team/             # Team management pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── lib/                   # Shared utilities & contexts
│   ├── accessibility-context.tsx
│   └── language-context.tsx
├── src/                   # Main application code
│   ├── components/       # Reusable UI components
│   ├── services/         # API & business logic
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── theme/           # Design system tokens
├── public/              # Static assets
└── ...config files
```

## 🧩 Component Architecture

### **Component Organization**

```
src/components/
├── ui/                  # shadcn/ui components & custom UI
│   ├── button.tsx
│   ├── card.tsx
│   ├── sidebar.tsx
│   └── ...
├── screens/            # Page-level components
│   ├── landing-page.tsx
│   ├── enhanced-dashboard.tsx
│   ├── team-page.tsx
│   └── ...
├── common/             # Shared components
│   └── Button.tsx
└── index.ts           # Component exports
```

### **Design System**

- **UI Components**: Built on [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Theme**: Centralized theme system in `src/theme/`
- **Typography**: Geist Sans & Geist Mono fonts
- **Icons**: Lucide React icon library

## 🚀 Technology Stack

### **Core Framework**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with modern features
- **TypeScript** - Type-safe development

### **Styling & UI**
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Framer Motion** - Animations

### **State & Data**
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Custom API Service** - Centralized data layer

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Geist Fonts** - Typography

## 📁 Key Directories Explained

### **`app/` - Next.js App Router**
- **Purpose**: Next.js 13+ App Router structure
- **Location**: Root level (required by Next.js)
- **Contains**: Route components, layouts, and page files

### **`lib/` - Shared Libraries**
- **Purpose**: Framework-agnostic utilities and contexts
- **Location**: Root level (Next.js convention)
- **Contains**: Contexts, utilities shared across the app

### **`src/` - Application Source**
- **Purpose**: Main application code organized by feature
- **Location**: Root level
- **Benefits**: Clear separation from framework files

### **Component Categories**

#### **UI Components** (`src/components/ui/`)
- Reusable, atomic UI elements
- Built on shadcn/ui and Radix primitives
- Highly configurable and accessible

#### **Screen Components** (`src/components/screens/`)
- Page-level components with business logic
- Compose multiple UI components
- Handle data fetching and state management

#### **Generic Components** (`src/genericComponents/`)
- Framework-agnostic, reusable components
- Typography, Spacing, Icons
- Can be shared across different projects

## 🔧 Development Setup

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm

### **Installation**
```bash
npm install
# or
pnpm install
```

### **Development Server**
```bash
npm run dev
```
Access the application at `http://localhost:3000`

### **Build & Deploy**
```bash
npm run build
npm run start
```

## 🛠️ Configuration Files

### **TypeScript Configuration** (`tsconfig.json`)
- Path mapping for clean imports (`@/`, `@/src/`, `@/components/`)
- Strict TypeScript settings
- Next.js optimizations

### **Tailwind Configuration** (`tailwind.config.ts`)
- Custom color palette
- Design system tokens
- Component-specific utilities
- Dark mode support

### **Component Configuration** (`components.json`)
- shadcn/ui configuration
- Path aliases for UI components
- CSS variables and theming

## 🎯 Architecture Principles

### **1. Separation of Concerns**
- **Presentation**: React components in `src/components/`
- **Business Logic**: Services in `src/services/`
- **Utilities**: Pure functions in `src/utils/`
- **Types**: TypeScript definitions in `src/types/`

### **2. Scalable Structure**
- Feature-based organization
- Reusable component library
- Centralized configuration
- Type-safe development

### **3. Developer Experience**
- Hot reload in development
- TypeScript for type safety
- ESLint for code quality
- Path aliases for clean imports

### **4. Accessibility First**
- Radix UI primitives for a11y
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility

## 🚀 Deployment

### **Replit Deployment**
This application is optimized for deployment on Replit:

1. **Development**: Automatic hot reload
2. **Production**: Optimized build process
3. **Environment**: Configured for Replit's infrastructure

### **Build Configuration**
- **Framework**: Next.js with App Router
- **Output**: Static optimization where possible
- **Assets**: Unoptimized images for Replit compatibility

## 📱 Features

### **Core Functionality**
- **Dashboard**: Comprehensive analytics and metrics
- **RFP Management**: Create, track, and manage proposals
- **Team Management**: User roles and permissions
- **Settings**: Application configuration

### **UI/UX Features**
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching capability
- **Accessibility**: WCAG 2.1 compliant
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=your_api_url
# Add other environment variables as needed
```

## 📚 Development Guidelines

### **Code Organization**
- One component per file
- Use TypeScript for all new code
- Follow established naming conventions
- Export components from index files

### **Styling Guidelines**
- Use Tailwind CSS utility classes
- Follow the design system tokens
- Maintain consistent spacing and typography
- Leverage CSS variables for theming

### **Best Practices**
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow accessibility guidelines
- Write type-safe code with TypeScript

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
