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
  Receipt,
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
    pendingBills: 12,
    maintenanceRequests: 8,
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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Br {stats.monthlyRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-4">
              <Receipt size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Bills</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.pendingBills}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <Wrench size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Maintenance</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.maintenanceRequests} Requests</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={stats.revenueData} />

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Occupancy Rate</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {/* Simple CSS Donut Chart for demo */}
              <div className="w-full h-full rounded-full border-[1.5rem] border-gray-100 dark:border-gray-700"></div>
              <div
                className="absolute inset-0 w-full h-full rounded-full border-[1.5rem] border-blue-600"
                style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, transform: `rotate(${stats.occupiedRooms / stats.totalRooms * 360}deg)` }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Occupied</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Occupied ({stats.occupiedRooms})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Vacant ({stats.totalRooms - stats.occupiedRooms})</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard