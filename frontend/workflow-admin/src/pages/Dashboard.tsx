import { Card } from '../components/ui/card'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

const overviewData = [
  { label: 'Active projects', value: '24' },
  { label: 'Open tickets', value: '18' },
  { label: 'Team members', value: '12' },
  { label: 'Monthly growth', value: '+14%' },
]

const tableData = [
  { project: 'Launch site', owner: 'Mia', status: 'On track' },
  { project: 'Mobile app', owner: 'Noah', status: 'Delayed' },
  { project: 'Integration', owner: 'Aria', status: 'At risk' },
  { project: 'Support portal', owner: 'Liam', status: 'On track' },
]

const columnHelper = createColumnHelper<typeof tableData[number]>()

const columns = [
  columnHelper.accessor('project', {
    header: 'Project',
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
]

const chartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  grid: { strokeDashArray: 4, borderColor: '#e2e8f0' },
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  colors: ['#6366f1'],
  tooltip: { theme: 'light' },
}

export default function Dashboard() {
  const table = useReactTable({ data: tableData, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewData.map((item) => (
          <Card key={item.label} className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="min-h-[320px]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Weekly traffic</p>
              <h2 className="text-2xl font-semibold text-slate-950">Visitor flow</h2>
            </div>
          </div>
          <Chart options={chartOptions} series={[{ name: 'Visitors', data: [45, 72, 62, 91, 84, 110, 98] }]} type="area" height={320} />
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Recent activity</p>
            <h2 className="text-2xl font-semibold text-slate-950">Team performance</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <table className="w-full min-w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-slate-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
