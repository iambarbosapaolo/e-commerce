# VERVE - Premium Wellness E-Commerce Store

A complete, production-ready e-commerce storefront for premium wellness and lifestyle products built with React, TypeScript, and Tailwind CSS.

## 🌿 Brand Identity

**VERVE** is a modern wellness brand focused on:
- Premium natural and organic products
- Sustainable and eco-friendly practices
- Holistic health and wellness
- Modern, minimal design aesthetic

## ✨ Features

### Customer-Facing Features
- **Homepage** - Hero section, featured categories, new arrivals, best sellers, editorial banners
- **Product Listing** - Advanced filtering (category, price, tags), sorting, responsive grid
- **Product Details** - Image gallery, color/size selection, reviews, ratings, related products
- **Shopping Cart** - Drawer and full page views, quantity management, discount codes
- **Checkout** - Multi-step flow (Contact → Shipping → Payment → Review)
- **Search** - Real-time product search with results page
- **Account Dashboard** - Order history, saved addresses, payment methods
- **Light/Dark Mode** - Full theme support with smooth transitions

### Admin Features
- **Dashboard** - KPIs (revenue, orders, AOV, conversion rate)
- **Product Management** - Full CRUD operations, stock tracking
- **Order Management** - Status tracking, order details

### Technical Features
- Fully responsive (mobile, tablet, desktop)
- Context-based state management (Cart & App state)
- Toast notifications for user feedback
- Accessible UI components (WCAG AA compliant)
- Type-safe with TypeScript
- Modern component architecture

## 📦 Product Categories

1. **Supplements** - Adaptogens, protein powders, vitamins
2. **Skincare** - Serums, creams, lotions (natural ingredients)
3. **Fitness** - Yoga mats, resistance bands, water bottles
4. **Aromatherapy** - Essential oils, diffusers
5. **Wellness** - Meditation cushions, journals, herbal teas

## 🎨 Design System

### Color Palette
- **Brand Primary**: Green (#16A34A) - Wellness, nature, sustainability
- **Accent Colors**: Yellow (ratings), Red (sales/destructive actions)
- **Neutrals**: Sophisticated grays for light and dark modes

### Typography
- Clean, modern sans-serif
- Responsive font sizing
- Optimal readability with proper line-heights

### Components
All components follow a consistent design language:
- Rounded corners (10px default)
- Subtle shadows and borders
- Smooth hover transitions
- Clear focus states for accessibility

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Shadcn/UI** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first design.

## 🚀 Getting Started

The application is ready to use! Navigate through:

1. **Home** - Browse featured products and categories
2. **Shop All** - Filter and sort all products
3. **Product Pages** - View details, add to cart
4. **Cart** - Review items, proceed to checkout
5. **Account** - View orders and manage addresses
6. **Admin** - Access dashboard and management tools

## 🎯 Key User Flows

### Shopping Flow
1. Browse homepage → Click category or product
2. View product details → Select options → Add to cart
3. Review cart (drawer or page) → Proceed to checkout
4. Complete 4-step checkout → Order confirmation

### Account Management
1. Sign in → View dashboard
2. Check order history → Track shipments
3. Manage saved addresses → Update payment methods

### Admin Flow
1. Access admin dashboard → View KPIs
2. Manage products → Update inventory
3. Process orders → Update order status

## 💡 Mock Data

The application includes:
- **12 Products** with realistic pricing, images, and details
- **3 Sample Orders** with different statuses
- **2 Saved Addresses** for quick checkout
- **Product Reviews** with verified badges
- **Category Organization** with product counts

## 🔒 Security & Best Practices

- Client-side form validation
- Proper error handling
- Accessible ARIA labels
- Keyboard navigation support
- Mobile-optimized touch targets (≥ 44px)

## 🎨 Customization

To customize for a different brand:

1. Update brand colors in components (search for `green-600`)
2. Replace product data in `/lib/data.ts`
3. Update logo and brand name in Navbar and Footer
4. Modify color scheme in `/styles/globals.css`

## 📊 Sample Metrics (Admin Dashboard)

- **Total Revenue**: $351.95
- **Total Orders**: 3
- **Average Order Value**: $117.32
- **Conversion Rate**: 3.2%

## 🌐 Future Enhancements

Consider adding:
- **Backend Integration** - Connect to Supabase for persistence
- **User Authentication** - Real login/signup functionality
- **Payment Integration** - Stripe or PayPal
- **Email Notifications** - Order confirmations, shipping updates
- **Wishlist** - Save favorite products
- **Product Reviews** - User-generated content
- **Inventory Management** - Real-time stock updates
- **Analytics** - Track user behavior and conversions

## 📄 License

This is a demonstration e-commerce application created for Figma Make.

---

Built with ❤️ using modern web technologies
