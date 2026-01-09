# Dukaloco | Content Management Workspace

A high-fidelity, high-performance administrative dashboard designed for modern content teams. This workspace provides a seamless interface for managing community-driven content, powered by real-time data synchronization and a premium glassmorphic user experience.

## 🚀 Key Features

### 1. Advanced State Management
Leveraging **TanStack Query (v5)**, the application ensures high-performance server-state synchronization.
- **Auto-caching**: Intelligent data caching for 5 minutes reduces redundant network requests.
- **Optimistic UI Patterns**: Instant feedback on CRUD operations via manual cache invalidation and updates.
- **Synchronization**: Background refetching ensures the workspace is always up-to-date with the latest entries.

### 2. Role-Based Access Control (RBAC)
A sophisticated permission system governs the workspace:
- **Administrators**: Full authority to manage, edit, and delete any content within the ecosystem.
- **Standard Members**: Empowered to create content and maintain full ownership (edit/delete) over their own contributions.
- **Session Persistence**: Authentication state is maintained via `localStorage` for a persistent workflow.

### 3. Data Visualization & Analytics
The **Insight Hub** provides a top-down view of workspace activity:
- **Volume Analytics**: Real-time bar charts powered by `Recharts` visualize author contribution distribution.
- **Metric Cards**: Quick-glance indicators for total reach, verified authors, and content volume.

### 4. Premium UI/UX
Designed with a "Design-First" philosophy:
- **Glassmorphism**: Sophisticated frosted-glass components with blurred backdrops for a modern aesthetic.
- **Responsive Layout**: Fluid transition between desktop sidebars and mobile-optimized headers.
- **Micro-interactions**: Slick hover states, slide-in animations, and pulsing status indicators for a "live" feel.

---

## 🛠 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS (JIT mode)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Fonts**: Plus Jakarta Sans

---

## 🏗 Project Structure

```text
src/
├── components/          # Reusable UI modules (Cards, Modals, Layout)
├── context/             # Auth & Global state providers
├── services/            # API abstraction layer
├── types/               # TypeScript interfaces & definitions
├── constants/           # Design tokens, Icons, and Mock data
└── App.tsx              # Main orchestrator & routing
```

---

## 🚦 Permissions Logic

The workspace logic is centralized in the `PostCard` and `PostModal` components. Permissions are calculated dynamically:
- `canModify = user.role === 'admin' || user.id === post.userId`

This ensures that UI elements (Edit/Delete buttons) only appear for authorized users, while the service layer acts as the final guard for data integrity.

---

## 📈 Optimization Notes

- **Performance**: Used `useMemo` for heavy statistical calculations on the dashboard to prevent unnecessary re-renders.
- **Scalability**: The `apiService` is decoupled from the UI components, allowing for easy migration from the current mock JSONPlaceholder API to a production backend.
- **Reliability**: Configured the QueryClient with exponential backoff retries for resilient data fetching in poor network conditions.

---
*Developed as a high-fidelity demonstration of modern frontend engineering principles.*
