# InsightFlow

A business analytics dashboard with interactive data visualization, KPI tracking, AI-powered insights, and comprehensive reporting. Built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-3-ff7300?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square)

## Live Demo

**[insightflow-brown.vercel.app](https://insightflow-brown.vercel.app)**

## Features

- **Executive Dashboard** — KPI metric cards with animated counters, revenue trends, and performance summaries
- **Revenue Analytics** — Interactive revenue charts with time-range selectors, growth rate tracking, and breakdown by source
- **Customer Insights** — Customer acquisition funnel, retention rates, cohort analysis, and segmentation views
- **Engagement Metrics** — User engagement tracking with session duration, page views, bounce rates, and conversion funnels
- **AI Insights** — AI-generated business recommendations, anomaly detection, and predictive trend analysis
- **Analytics Deep Dive** — Drill-down charts with filtering, date range selectors, and exportable data views
- **Sidebar Navigation** — Collapsible sidebar with route-based active states and mobile drawer
- **Responsive Design** — Desktop sidebar layout with mobile-optimized navigation and touch-friendly charts
- **Skeleton Loading** — Graceful loading states with shimmer placeholders across all data sections
- **Smooth Animations** — Framer Motion entrance animations, staggered reveals, and hover interactions

## Screenshots

![Dashboard](/screenshots/dashboard.png)
![Revenue](/screenshots/revenue.png)
![AI Insights](/screenshots/ai-insights.png)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/donnywin85/insightflow.git
cd insightflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
insightflow/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with sidebar and top bar
│   │   ├── page.tsx                # Redirects to /dashboard
│   │   ├── (dashboard)/dashboard/  # Main dashboard with KPI cards
│   │   ├── revenue/                # Revenue analytics and charts
│   │   ├── customers/              # Customer insights and segmentation
│   │   ├── engagement/             # User engagement metrics
│   │   ├── analytics/              # Deep-dive analytics views
│   │   └── ai-insights/            # AI-powered business insights
│   ├── components/
│   │   ├── layout/                 # Sidebar, TopBar, MobileNav
│   │   └── ui/                     # MetricCard, Badge, DateRangeSelector, Skeleton
│   └── lib/
│       └── data.ts                 # Mock data and utility functions
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts 3 (area, bar, pie, line)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Deployment**: Vercel
