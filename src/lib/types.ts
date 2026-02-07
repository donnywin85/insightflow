export interface KPIMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  format: 'currency' | 'number' | 'percent' | 'score';
  sparklineData: number[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  newMRR: number;
  expansion: number;
  contraction: number;
  churn: number;
}

export interface Customer {
  id: string;
  name: string;
  plan: 'Enterprise' | 'Growth' | 'Starter';
  mrr: number;
  users: number;
  healthScore: number;
  lastActive: string;
  trend: number[];
}

export interface CustomerSegment {
  name: 'Enterprise' | 'Growth' | 'Starter';
  percentage: number;
  mrr: number;
  customerCount: number;
  avgHealthScore: number;
}

export interface AIInsight {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  recommendedAction: string;
  estimatedImpact: string;
  impactValue: number;
}

export interface FunnelStage {
  name: string;
  count: number;
  conversionRate: number | null;
}

export interface FeatureUsage {
  name: string;
  adoption: number;
  trend: 'up' | 'down' | 'stable';
  userCount: number;
}

export interface UserMetrics {
  month: string;
  activeUsers: number;
  newSignups: number;
  churned: number;
}

export interface EngagementData {
  day: string;
  hour: number;
  count: number;
}

export interface DailyActiveUsers {
  date: string;
  users: number;
}

export interface SessionMetric {
  label: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  sparklineData: number[];
}

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  section: string;
};
