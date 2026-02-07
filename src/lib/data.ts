import {
  KPIMetric,
  MonthlyRevenue,
  Customer,
  CustomerSegment,
  AIInsight,
  FunnelStage,
  FeatureUsage,
  UserMetrics,
  DailyActiveUsers,
  SessionMetric,
  EngagementData,
} from './types';

export const kpiMetrics: KPIMetric[] = [
  {
    label: 'Monthly Recurring Revenue',
    value: 847329,
    change: 12.5,
    changeType: 'positive',
    format: 'currency',
    sparklineData: [620000, 645000, 672000, 698000, 710000, 725000, 742000, 768000, 790000, 805000, 828000, 847329],
  },
  {
    label: 'Annual Recurring Revenue',
    value: 10167948,
    change: 15.2,
    changeType: 'positive',
    format: 'currency',
    sparklineData: [7440000, 7740000, 8064000, 8376000, 8520000, 8700000, 8904000, 9216000, 9480000, 9660000, 9936000, 10167948],
  },
  {
    label: 'Active Users',
    value: 34521,
    change: 8.3,
    changeType: 'positive',
    format: 'number',
    sparklineData: [28100, 28900, 29500, 30200, 30800, 31200, 31900, 32400, 33000, 33500, 34000, 34521],
  },
  {
    label: 'Churn Rate',
    value: 2.1,
    change: -0.3,
    changeType: 'positive',
    format: 'percent',
    sparklineData: [3.2, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.1],
  },
  {
    label: 'NPS Score',
    value: 72,
    change: 5,
    changeType: 'positive',
    format: 'score',
    sparklineData: [58, 60, 62, 63, 65, 66, 67, 68, 69, 70, 71, 72],
  },
  {
    label: 'Avg Revenue Per User',
    value: 24.53,
    change: 3.1,
    changeType: 'positive',
    format: 'currency',
    sparklineData: [20.10, 20.80, 21.20, 21.90, 22.30, 22.70, 23.10, 23.50, 23.80, 24.00, 24.30, 24.53],
  },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 620000, newMRR: 45000, expansion: 22000, contraction: 8000, churn: 12000 },
  { month: 'Feb', revenue: 645000, newMRR: 48000, expansion: 25000, contraction: 7500, churn: 11500 },
  { month: 'Mar', revenue: 672000, newMRR: 52000, expansion: 28000, contraction: 9000, churn: 13000 },
  { month: 'Apr', revenue: 698000, newMRR: 50000, expansion: 30000, contraction: 8500, churn: 11000 },
  { month: 'May', revenue: 710000, newMRR: 42000, expansion: 24000, contraction: 10000, churn: 14000 },
  { month: 'Jun', revenue: 725000, newMRR: 47000, expansion: 27000, contraction: 7000, churn: 10000 },
  { month: 'Jul', revenue: 742000, newMRR: 49000, expansion: 29000, contraction: 8000, churn: 11000 },
  { month: 'Aug', revenue: 768000, newMRR: 55000, expansion: 32000, contraction: 9500, churn: 12500 },
  { month: 'Sep', revenue: 790000, newMRR: 51000, expansion: 28000, contraction: 7500, churn: 10500 },
  { month: 'Oct', revenue: 805000, newMRR: 46000, expansion: 26000, contraction: 8000, churn: 11000 },
  { month: 'Nov', revenue: 828000, newMRR: 53000, expansion: 31000, contraction: 9000, churn: 12000 },
  { month: 'Dec', revenue: 847329, newMRR: 56000, expansion: 34000, contraction: 8500, churn: 10500 },
];

export const customers: Customer[] = [
  { id: '1', name: 'Acme Corporation', plan: 'Enterprise', mrr: 52000, users: 450, healthScore: 92, lastActive: '2h ago', trend: [48000, 49000, 50000, 51000, 52000] },
  { id: '2', name: 'Globex Industries', plan: 'Enterprise', mrr: 48500, users: 380, healthScore: 88, lastActive: '1h ago', trend: [44000, 45000, 46000, 47500, 48500] },
  { id: '3', name: 'Initech Solutions', plan: 'Enterprise', mrr: 41000, users: 320, healthScore: 75, lastActive: '4h ago', trend: [42000, 41500, 41200, 41000, 41000] },
  { id: '4', name: 'Umbrella Corp', plan: 'Growth', mrr: 28000, users: 210, healthScore: 82, lastActive: '30m ago', trend: [24000, 25000, 26000, 27000, 28000] },
  { id: '5', name: 'Stark Dynamics', plan: 'Growth', mrr: 24500, users: 185, healthScore: 91, lastActive: '15m ago', trend: [20000, 21000, 22000, 23500, 24500] },
  { id: '6', name: 'Wayne Systems', plan: 'Growth', mrr: 22000, users: 160, healthScore: 68, lastActive: '1d ago', trend: [23000, 22800, 22500, 22200, 22000] },
  { id: '7', name: 'Osborn Tech', plan: 'Growth', mrr: 19500, users: 140, healthScore: 45, lastActive: '3d ago', trend: [22000, 21500, 20800, 20000, 19500] },
  { id: '8', name: 'Pied Piper', plan: 'Starter', mrr: 8500, users: 65, healthScore: 94, lastActive: '5m ago', trend: [6000, 6800, 7200, 7800, 8500] },
  { id: '9', name: 'Hooli Inc', plan: 'Starter', mrr: 6200, users: 48, healthScore: 35, lastActive: '5d ago', trend: [8000, 7500, 7000, 6500, 6200] },
  { id: '10', name: 'Prestige Worldwide', plan: 'Starter', mrr: 4800, users: 32, healthScore: 58, lastActive: '12h ago', trend: [4500, 4600, 4700, 4750, 4800] },
];

export const customerSegments: CustomerSegment[] = [
  { name: 'Enterprise', percentage: 23, mrr: 412000, customerCount: 45, avgHealthScore: 85 },
  { name: 'Growth', percentage: 41, mrr: 289000, customerCount: 128, avgHealthScore: 72 },
  { name: 'Starter', percentage: 36, mrr: 146000, customerCount: 312, avgHealthScore: 65 },
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    severity: 'critical',
    category: 'Churn Risk',
    title: 'High-value customer showing disengagement signals',
    description: 'Hooli Inc (Starter, $6,200 MRR) has shown a 42% decrease in platform usage over the past 30 days. Login frequency dropped from daily to weekly, and key feature adoption has stalled.',
    recommendedAction: 'Schedule an immediate customer success check-in. Offer a personalized onboarding session for underutilized features and consider a temporary discount to re-engage.',
    estimatedImpact: '+$6,200 MRR retained',
    impactValue: 6200,
  },
  {
    id: '2',
    severity: 'critical',
    category: 'Revenue',
    title: 'Enterprise expansion opportunity detected',
    description: 'Acme Corporation has exceeded their user seat limit by 15% for 3 consecutive months. Their API usage is at 92% capacity, indicating strong product-market fit and growth.',
    recommendedAction: 'Proactively reach out with an enterprise tier upgrade proposal. Highlight additional capacity, priority support, and custom integrations available in the next tier.',
    estimatedImpact: '+$12,000 MRR',
    impactValue: 12000,
  },
  {
    id: '3',
    severity: 'warning',
    category: 'Product',
    title: 'Feature adoption gap in Growth segment',
    description: 'Only 34% of Growth-tier customers are using the advanced analytics dashboard, despite it being a key differentiator. This segment shows 2.3x higher retention when the feature is adopted.',
    recommendedAction: 'Launch an in-app guided tour for advanced analytics. Create segment-specific email campaign highlighting use cases and ROI examples from similar companies.',
    estimatedImpact: '-2% churn rate',
    impactValue: -2,
  },
  {
    id: '4',
    severity: 'warning',
    category: 'Operations',
    title: 'Support ticket volume trending upward',
    description: 'Support tickets have increased 28% month-over-month, with "integration setup" being the most common category (41% of tickets). Average first response time has increased to 4.2 hours.',
    recommendedAction: 'Create comprehensive integration documentation and video tutorials. Consider implementing a self-service integration wizard to reduce ticket volume by an estimated 35%.',
    estimatedImpact: '-35% support tickets',
    impactValue: -35,
  },
  {
    id: '5',
    severity: 'info',
    category: 'Growth',
    title: 'Viral coefficient increasing in Starter segment',
    description: 'Starter plan customers are referring 1.4 new users per account, up from 0.8 last quarter. The referral-to-conversion rate is 23%, significantly above the 12% industry average.',
    recommendedAction: 'Double down on the referral program. Implement a tiered rewards system offering account credits for successful referrals. Consider a "Refer 3, Get Pro" promotion.',
    estimatedImpact: '+850 new signups/month',
    impactValue: 850,
  },
  {
    id: '6',
    severity: 'info',
    category: 'Market',
    title: 'Competitor pricing shift creates opportunity',
    description: 'Two major competitors have increased their pricing by 20-30% this quarter. Social media sentiment analysis shows growing dissatisfaction among their user base, with "too expensive" appearing in 34% of recent reviews.',
    recommendedAction: 'Launch a competitive migration campaign with special pricing for switchers. Create comparison landing pages highlighting value proposition and offer free data migration assistance.',
    estimatedImpact: '+2,400 potential leads',
    impactValue: 2400,
  },
];

export const funnelData: FunnelStage[] = [
  { name: 'Visitors', count: 125000, conversionRate: null },
  { name: 'Signups', count: 8750, conversionRate: 7.0 },
  { name: 'Activated', count: 5250, conversionRate: 60.0 },
  { name: 'Paying', count: 2100, conversionRate: 40.0 },
  { name: 'Retained', count: 1680, conversionRate: 80.0 },
];

export const featureUsage: FeatureUsage[] = [
  { name: 'Dashboard Analytics', adoption: 94, trend: 'up', userCount: 32449 },
  { name: 'Custom Reports', adoption: 78, trend: 'up', userCount: 26926 },
  { name: 'API Integrations', adoption: 65, trend: 'up', userCount: 22439 },
  { name: 'Team Collaboration', adoption: 59, trend: 'stable', userCount: 20367 },
  { name: 'Automated Alerts', adoption: 52, trend: 'up', userCount: 17951 },
  { name: 'Data Export', adoption: 45, trend: 'down', userCount: 15534 },
  { name: 'Advanced Filters', adoption: 38, trend: 'up', userCount: 13118 },
  { name: 'AI Predictions', adoption: 28, trend: 'up', userCount: 9666 },
];

export const userMetrics: UserMetrics[] = [
  { month: 'Jan', activeUsers: 28100, newSignups: 3200, churned: 890 },
  { month: 'Feb', activeUsers: 28900, newSignups: 3400, churned: 820 },
  { month: 'Mar', activeUsers: 29500, newSignups: 3600, churned: 950 },
  { month: 'Apr', activeUsers: 30200, newSignups: 3500, churned: 780 },
  { month: 'May', activeUsers: 30800, newSignups: 3300, churned: 910 },
  { month: 'Jun', activeUsers: 31200, newSignups: 3450, churned: 850 },
  { month: 'Jul', activeUsers: 31900, newSignups: 3550, churned: 880 },
  { month: 'Aug', activeUsers: 32400, newSignups: 3700, churned: 920 },
  { month: 'Sep', activeUsers: 33000, newSignups: 3600, churned: 800 },
  { month: 'Oct', activeUsers: 33500, newSignups: 3450, churned: 860 },
  { month: 'Nov', activeUsers: 34000, newSignups: 3650, churned: 910 },
  { month: 'Dec', activeUsers: 34521, newSignups: 3800, churned: 840 },
];

// Generate 30 days of daily active users
export const dailyActiveUsers: DailyActiveUsers[] = Array.from({ length: 30 }, (_, i) => ({
  date: `Dec ${i + 1}`,
  users: Math.floor(28000 + Math.random() * 7000 + i * 100),
}));

export const sessionMetrics: SessionMetric[] = [
  { label: 'Avg Session Duration', value: '8m 42s', change: 5.2, changeType: 'positive', sparklineData: [7.2, 7.5, 7.8, 8.0, 8.1, 8.3, 8.5, 8.7] },
  { label: 'Pages per Session', value: '6.4', change: 2.8, changeType: 'positive', sparklineData: [5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.3, 6.4] },
  { label: 'Bounce Rate', value: '24.3%', change: -1.5, changeType: 'positive', sparklineData: [28.0, 27.2, 26.5, 26.0, 25.5, 25.0, 24.8, 24.3] },
  { label: 'Return Rate', value: '68.7%', change: 3.4, changeType: 'positive', sparklineData: [62.0, 63.5, 64.8, 65.5, 66.2, 67.0, 67.8, 68.7] },
];

// Generate engagement heatmap data (7 days x 24 hours)
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const engagementHeatmap: EngagementData[] = days.flatMap((day, dayIdx) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    count: Math.floor(
      (hour >= 9 && hour <= 17 ? 800 : hour >= 6 && hour <= 21 ? 400 : 100) *
      (dayIdx < 5 ? 1 : 0.4) *
      (0.7 + Math.random() * 0.6)
    ),
  }))
);

export const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', section: 'Overview' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3', section: 'Overview' },
  { label: 'Revenue', href: '/revenue', icon: 'DollarSign', section: 'Revenue' },
  { label: 'Customers', href: '/customers', icon: 'Users', section: 'Revenue' },
  { label: 'Engagement', href: '/engagement', icon: 'Activity', section: 'Product' },
  { label: 'AI Insights', href: '/ai-insights', icon: 'Sparkles', section: 'Product' },
];
