import React from 'react'
import {
  Users,
  Home,
  FileText,
  CreditCard,
  Bell,
  Wrench,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import Card from '../components/common/Card'
import RevenueChart from '../components/dashboard/RevenueChart'
import { DashboardStats } from '../types'

const Dashboard: React.FC = () => {
  // Skeleton data for now
  const stats: DashboardStats = {
    totalRooms: 50,
    occupiedRooms: 42,
    vacantRooms: 8,
    activeResidents: 45,
    pendingResidents: 3,
    monthlyRevenue: 25400,
    pendingPayments: 5,
    totalPendingAmount: 1200,
    collectionRate: 95.5,
    revenueData: [
      { month: 'Jan', revenue: 20000, expenses: 15000, profit: 5000 },
      { month: 'Feb', revenue: 22000, expenses: 16000, profit: 6000 },
      { month: 'Mar', revenue: 25000, expenses: 17000, profit: 8000 },
    ],
    occupancyData: [],
    recentActivity: [],
    maintenance: {
      open: 5,
      inProgress: 2,
      completed: 10,
      overdue: 1,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Rooms</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.totalRooms}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Residents</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.activeResidents}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <h3 className="text-xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Maintenance</p>
              <h3 className="text-xl font-bold text-gray-900">{stats.maintenance.open}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
          <RevenueChart data={stats.revenueData} />
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Occupancy Rate</span>
              <span className="text-sm font-bold text-gray-900">
                {((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(stats.occupiedRooms / stats.totalRooms) * 100}%` }}
              ></div>
            </div>
            {/* More stats... */}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard