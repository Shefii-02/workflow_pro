import { Link, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import {
  Banknote,
  CreditCard,
  DollarSign,
  FileText,
  Landmark,
  Receipt,
  Repeat,
  TrendingUp,
} from 'lucide-react'
import { PageHeader, StatCard, AnalyticsChartCard } from '../../../shared/components/PageComponents'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ROUTES } from '../../../shared/constants'

type FinanceSlug = 'revenue' | 'invoices' | 'subscription-analytics' | 'payouts' | 'transactions' | 'tax-summaries'
type StatVariant = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'

interface FinanceConfig {
  title: string
  description: string
  accent: string
  chartType: 'area' | 'line' | 'bar' | 'donut'
  categories?: string[]
  labels?: string[]
  series: ApexOptions['series']
  stats: {
    label: string
    value: string
    description: string
    variant: StatVariant
    icon: ReactNode
  }[]
  rows: {
    id: string
    primary: string
    secondary: string
    amount: string
    status: string
    variant: BadgeVariant
  }[]
  breakdown: {
    label: string
    value: string
    progress: number
    tone: string
  }[]
}

const financePages: Record<FinanceSlug, FinanceConfig> = {
  revenue: {
    title: 'Revenue Dashboard',
    description: 'MRR, ARR, expansion, churn impact, and channel revenue performance.',
    accent: '#16a34a',
    chartType: 'area',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Gross revenue', data: [82000, 94000, 108000, 121000, 138000, 154000] },
      { name: 'Net revenue', data: [76000, 89000, 101000, 113000, 128000, 146000] },
    ],
    stats: [
      { label: 'MRR', value: '$154K', description: 'Monthly recurring revenue', variant: 'success', icon: <DollarSign className="h-6 w-6" /> },
      { label: 'ARR', value: '$1.84M', description: 'Annualized revenue run rate', variant: 'brand', icon: <TrendingUp className="h-6 w-6" /> },
      { label: 'Expansion', value: '$24.8K', description: 'Plan upgrades this month', variant: 'info', icon: <Repeat className="h-6 w-6" /> },
      { label: 'Churn impact', value: '$6.2K', description: 'Cancelled account value', variant: 'warning', icon: <Banknote className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'REV-001', primary: 'Enterprise renewals', secondary: '23 accounts renewed', amount: '$84,500', status: 'Booked', variant: 'success' },
      { id: 'REV-002', primary: 'Professional upgrades', secondary: '18 plan upgrades', amount: '$24,800', status: 'Expanding', variant: 'primary' },
      { id: 'REV-003', primary: 'Starter churn', secondary: '9 cancellations', amount: '-$6,200', status: 'Watch', variant: 'warning' },
    ],
    breakdown: [
      { label: 'Enterprise revenue', value: '58%', progress: 58, tone: 'bg-emerald-500' },
      { label: 'Professional revenue', value: '31%', progress: 31, tone: 'bg-blue-500' },
      { label: 'Starter revenue', value: '11%', progress: 11, tone: 'bg-amber-500' },
    ],
  },
  invoices: {
    title: 'Invoice Tables',
    description: 'Invoice ledger with open balances, overdue exposure, credits, and collection status.',
    accent: '#2563eb',
    chartType: 'bar',
    categories: ['Draft', 'Sent', 'Paid', 'Overdue', 'Voided'],
    series: [{ name: 'Invoices', data: [18, 74, 218, 12, 4] }],
    stats: [
      { label: 'Open invoices', value: '104', description: 'Awaiting payment', variant: 'brand', icon: <FileText className="h-6 w-6" /> },
      { label: 'Outstanding', value: '$92.4K', description: 'Unpaid invoice value', variant: 'warning', icon: <DollarSign className="h-6 w-6" /> },
      { label: 'Overdue', value: '$11.8K', description: '12 invoices past due', variant: 'danger', icon: <Receipt className="h-6 w-6" /> },
      { label: 'Collection rate', value: '96%', description: 'Rolling 30 day success', variant: 'success', icon: <CreditCard className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'INV-1048', primary: 'Acme Corp', secondary: 'Enterprise annual renewal', amount: '$18,000', status: 'Paid', variant: 'success' },
      { id: 'INV-1051', primary: 'DataFlow Systems', secondary: 'Professional monthly', amount: '$1,500', status: 'Sent', variant: 'primary' },
      { id: 'INV-1054', primary: 'StartupXYZ', secondary: 'Starter monthly', amount: '$299', status: 'Overdue', variant: 'danger' },
    ],
    breakdown: [
      { label: 'Paid on time', value: '82%', progress: 82, tone: 'bg-emerald-500' },
      { label: 'Sent awaiting', value: '14%', progress: 14, tone: 'bg-blue-500' },
      { label: 'Overdue', value: '4%', progress: 4, tone: 'bg-rose-500' },
    ],
  },
  'subscription-analytics': {
    title: 'Subscription Analytics',
    description: 'Plan mix, renewal forecast, trials, churn, and subscription health trends.',
    accent: '#7c3aed',
    chartType: 'line',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Active subscriptions', data: [840, 910, 998, 1082, 1176, 1254] },
      { name: 'Trials', data: [92, 110, 104, 126, 144, 158] },
    ],
    stats: [
      { label: 'Active plans', value: '1,254', description: 'Paid subscriptions', variant: 'brand', icon: <Repeat className="h-6 w-6" /> },
      { label: 'Trial pipeline', value: '158', description: 'Potential conversions', variant: 'info', icon: <TrendingUp className="h-6 w-6" /> },
      { label: 'Renewal risk', value: '6.4%', description: 'Next 30 days at risk', variant: 'warning', icon: <Receipt className="h-6 w-6" /> },
      { label: 'Net retention', value: '112%', description: 'Expansion after churn', variant: 'success', icon: <DollarSign className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'SUB-ENT', primary: 'Enterprise', secondary: '176 active accounts', amount: '$88K MRR', status: 'Strong', variant: 'success' },
      { id: 'SUB-PRO', primary: 'Professional', secondary: '642 active accounts', amount: '$51K MRR', status: 'Stable', variant: 'success' },
      { id: 'SUB-STA', primary: 'Starter', secondary: '436 active accounts', amount: '$15K MRR', status: 'Watch', variant: 'warning' },
    ],
    breakdown: [
      { label: 'Enterprise mix', value: '57%', progress: 57, tone: 'bg-violet-500' },
      { label: 'Professional mix', value: '33%', progress: 33, tone: 'bg-blue-500' },
      { label: 'Starter mix', value: '10%', progress: 10, tone: 'bg-amber-500' },
    ],
  },
  payouts: {
    title: 'Payouts',
    description: 'Freelancer payouts, processing batches, holdbacks, and payout failure management.',
    accent: '#0891b2',
    chartType: 'bar',
    categories: ['Queued', 'Processing', 'Paid', 'Held', 'Failed'],
    series: [{ name: 'Payouts', data: [84, 38, 418, 22, 6] }],
    stats: [
      { label: 'Due payouts', value: '$68.4K', description: 'Next payout cycle', variant: 'brand', icon: <Landmark className="h-6 w-6" /> },
      { label: 'Paid today', value: '$42.1K', description: '418 payouts completed', variant: 'success', icon: <CreditCard className="h-6 w-6" /> },
      { label: 'On hold', value: '$8.7K', description: 'Verification or dispute holds', variant: 'warning', icon: <Receipt className="h-6 w-6" /> },
      { label: 'Failed', value: '6', description: 'Bank rejection events', variant: 'danger', icon: <Banknote className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'PAYO-8401', primary: 'Mike Davis', secondary: 'Weekly freelancer payout', amount: '$2,840', status: 'Paid', variant: 'success' },
      { id: 'PAYO-8402', primary: 'Jane Developer', secondary: 'Bank verification pending', amount: '$1,920', status: 'Held', variant: 'warning' },
      { id: 'PAYO-8403', primary: 'Bob Designer', secondary: 'Invalid account number', amount: '$740', status: 'Failed', variant: 'danger' },
    ],
    breakdown: [
      { label: 'Paid batch', value: '74%', progress: 74, tone: 'bg-cyan-500' },
      { label: 'Queued batch', value: '15%', progress: 15, tone: 'bg-blue-500' },
      { label: 'Held or failed', value: '11%', progress: 11, tone: 'bg-amber-500' },
    ],
  },
  transactions: {
    title: 'Transaction History',
    description: 'Payments, refunds, adjustments, chargebacks, and provider reconciliation.',
    accent: '#ea580c',
    chartType: 'area',
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      { name: 'Payments', data: [228, 252, 241, 286, 314, 198, 226] },
      { name: 'Refunds', data: [8, 10, 6, 12, 9, 5, 7] },
    ],
    stats: [
      { label: 'Transactions', value: '1,552', description: 'Last 7 days', variant: 'brand', icon: <CreditCard className="h-6 w-6" /> },
      { label: 'Gross volume', value: '$214K', description: 'Payments processed', variant: 'success', icon: <DollarSign className="h-6 w-6" /> },
      { label: 'Refund rate', value: '2.1%', description: 'Below 4% target', variant: 'info', icon: <Receipt className="h-6 w-6" /> },
      { label: 'Chargebacks', value: '3', description: 'Needs review', variant: 'warning', icon: <Banknote className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'TXN-9081', primary: 'Acme Corp', secondary: 'Card payment, Stripe', amount: '$5,000', status: 'Settled', variant: 'success' },
      { id: 'TXN-9082', primary: 'Global Solutions', secondary: 'ACH transfer', amount: '$8,000', status: 'Pending', variant: 'warning' },
      { id: 'TXN-9083', primary: 'StartupXYZ', secondary: 'Subscription refund', amount: '-$299', status: 'Refunded', variant: 'secondary' },
    ],
    breakdown: [
      { label: 'Card volume', value: '65%', progress: 65, tone: 'bg-orange-500' },
      { label: 'Bank transfer', value: '31%', progress: 31, tone: 'bg-blue-500' },
      { label: 'Manual wire', value: '4%', progress: 4, tone: 'bg-slate-500' },
    ],
  },
  'tax-summaries': {
    title: 'Tax Summaries',
    description: 'Collected tax, regional liability, exemptions, reverse charges, and filing readiness.',
    accent: '#475569',
    chartType: 'donut',
    labels: ['US sales tax', 'VAT', 'GST', 'Exempt'],
    series: [42, 31, 17, 10],
    stats: [
      { label: 'Tax collected', value: '$18.6K', description: 'Current filing period', variant: 'brand', icon: <Receipt className="h-6 w-6" /> },
      { label: 'Filing regions', value: '14', description: 'Active tax jurisdictions', variant: 'info', icon: <Landmark className="h-6 w-6" /> },
      { label: 'Exempt value', value: '$31.2K', description: 'Verified exemption volume', variant: 'neutral', icon: <FileText className="h-6 w-6" /> },
      { label: 'Exceptions', value: '5', description: 'Missing tax metadata', variant: 'warning', icon: <Banknote className="h-6 w-6" /> },
    ],
    rows: [
      { id: 'TAX-US', primary: 'US sales tax', secondary: 'CA, NY, TX nexus', amount: '$7,820', status: 'Ready', variant: 'success' },
      { id: 'TAX-EU', primary: 'EU VAT', secondary: 'B2B reverse charge included', amount: '$5,766', status: 'Ready', variant: 'success' },
      { id: 'TAX-IN', primary: 'India GST', secondary: '5 invoices missing GSTIN', amount: '$3,162', status: 'Review', variant: 'warning' },
    ],
    breakdown: [
      { label: 'Filed-ready', value: '88%', progress: 88, tone: 'bg-emerald-500' },
      { label: 'Needs review', value: '9%', progress: 9, tone: 'bg-amber-500' },
      { label: 'Blocked', value: '3%', progress: 3, tone: 'bg-rose-500' },
    ],
  },
}

function chartOptions(config: FinanceConfig): ApexOptions {
  return {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    colors: [config.accent, '#22c55e', '#f59e0b'],
    dataLabels: { enabled: false },
    labels: config.labels,
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    xaxis: config.categories ? { categories: config.categories } : undefined,
    legend: { position: 'bottom' },
    tooltip: { theme: 'light' },
  }
}

export default function AdvancedFinancePage() {
  const { view } = useParams()
  const slug = (view || 'revenue') as FinanceSlug
  const config = financePages[slug] ?? financePages.revenue

  return (
    <div className="space-y-5">
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          <Link to={ROUTES.SP_FINANCE}>
            <Button variant="secondary">Finance Overview</Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <AnalyticsChartCard
          title={`${config.title} Trend`}
          description="Financial movement across the selected reporting window."
          chart={
            <Chart
              options={chartOptions(config)}
              series={config.series}
              type={config.chartType}
              height={340}
            />
          }
        />

        <Card className="p-6">
          <h3 className="font-semibold text-slate-950">Financial Breakdown</h3>
          <p className="mt-1 text-sm text-slate-500">Current mix and operational pressure.</p>
          <div className="mt-6 space-y-5">
            {config.breakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Finance Records</h3>
            <p className="text-sm text-slate-500">Representative ledger rows for this finance view.</p>
          </div>
          <Badge variant="outline">Finance sample</Badge>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Record</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {config.rows.map((row) => (
                <tr key={row.id} className="bg-white">
                  <td className="px-4 py-4 font-mono text-xs font-semibold text-slate-600">{row.id}</td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-950">{row.primary}</p>
                    <p className="mt-1 text-sm text-slate-500">{row.secondary}</p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{row.amount}</td>
                  <td className="px-4 py-4">
                    <Badge variant={row.variant}>{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
