# 🛍️ Modern E-Commerce Frontend

A cutting-edge e-commerce web application built with React, TypeScript, and TanStack Router, featuring a seamless shopping experience with modern UI/UX design principles.

## ✨ Features

### 🎨 User Experience
- **Responsive Design** - Perfectly optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Smooth Animations** - Enhanced user experience with fluid transitions
- **Loading States** - Beautiful spinners and skeleton screens
- **Toast Notifications** - Real-time feedback for user actions

### 🛒 Shopping Features
- **Product Catalog** - Browse with advanced filtering and search
- **Shopping Cart** - Persistent cart with local storage
- **Wishlist** - Save favorite items for later
- **Quick View** - Preview products without leaving the page
- **Related Products** - Smart product recommendations

### 👤 User Management
- **Authentication** - Secure login/register with JWT
- **Profile Management** - Update personal information and preferences
- **Order History** - Track past purchases and order status
- **Address Book** - Save multiple shipping addresses

### 💳 Checkout Process
- **Multi-step Checkout** - Guided purchasing experience
- **Payment Integration** - Stripe payment processing
- **Order Summary** - Clear breakdown of costs
- **Order Confirmation** - Email confirmation and order tracking

### 👑 Admin Dashboard
- **Product Management** - Add, edit, delete products
- **Order Management** - Update order status
- **User Management** - View and manage customers
- **Analytics** - Sales reports and insights

## 🚀 Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Type-safe routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library

### State Management
- **React Context** - Theme, Cart state
- **React Query** - Server state, caching
- **LocalStorage** - Persist cart data

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### UI/UX
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### API Integration
- **Axios** - HTTP client
- **React Query** - Data fetching
- **JWT** - Authentication

## 📁 Project Structure

src/
├── Modules/ # Feature-based modules
│ ├── Auth/ # Authentication
│ ├── Cart/ # Shopping cart
│ ├── Products/ # Product management
│ ├── Profile/ # User profile
│ ├── Theme/ # Dark/light theme
│ └── Payment/ # Checkout process
├── Components/ # Reusable components
├── Hooks/ # Custom hooks
├── Lib/ # Utilities
├── Types/ # TypeScript types
└── Routes/ # TanStack Router routes


## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
git clone https://github.com/momen-x/front_e-Commarce.git
cd ecommerce-frontend

npm install
# or
yarn install
# or
pnpm install

cp .env.example .env

VITE_APIS_DOMAIN=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

npm run dev
# or
yarn dev
# or
pnpm dev


