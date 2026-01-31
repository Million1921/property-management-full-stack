import React, { useState } from 'react'
import { FileText, Download, Users, Home, CreditCard, Wrench, Zap, FileSpreadsheet } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { exportToCSV } from '../utils/exportUtils'

// Mock Data for Reports (Simulating Backend Data)
const mockRoomsData = [
    { id: 1, room_number: '101', type: 'Studio', rent: 5000, status: 'occupied' },
    { id: 2, room_number: '102', type: '1 Bedroom', rent: 7500, status: 'vacant' },
    { id: 3, room_number: '103', type: '2 Bedroom', rent: 12000, status: 'maintenance' },
]

const mockResidentsData = [
    { id: 1, name: 'Abebe Bikila', room: '101', phone: '0911234567', status: 'active' },
    { id: 2, name: 'Derartu Tulu', room: '103', phone: '0911987654', status: 'active' },
]

const mockFinancialsData = [
    { id: 1, type: 'Rent', amount: 5000, date: '2024-01-01', status: 'paid' },
    { id: 2, type: 'Utility', amount: 450, date: '2024-01-05', status: 'pending' },
]

const mockMaintenanceData = [
    { id: 1, title: 'Leaking Faucet', room: '103', priority: 'high', status: 'open' },
    { id: 2, title: 'Broken Light', room: '101', priority: 'low', status: 'completed' },
]

const Reports: React.FC = () => {
    const [loading, setLoading] = useState<string | null>(null)

    const handleDownload = (type: string, data: any[]) => {
        setLoading(type)
        // Simulate network delay
        setTimeout(() => {
            exportToCSV(data, `${type}_Report_${new Date().toISOString().split('T')[0]}`)
            setLoading(null)
        }, 1000)
    }

    const reportTypes = [
        {
            id: 'rooms',
            title: 'Rooms Report',
            description: 'Download detailed list of all rooms, status, and pricing.',
            icon: Home,
            data: mockRoomsData,
            color: 'blue'
        },
        {
            id: 'residents',
            title: 'Residents Report',
            description: 'Export resident details, contact info, and status.',
            icon: Users,
            data: mockResidentsData,
            color: 'green'
        },
        {
            id: 'financials',
            title: 'Financial Report',
            description: 'Bills, payments, and revenue summaries.',
            icon: CreditCard,
            data: mockFinancialsData,
            color: 'purple'
        },
        {
            id: 'maintenance',
            title: 'Maintenance Report',
            description: 'Log of all maintenance requests and their status.',
            icon: Wrench,
            data: mockMaintenanceData,
            color: 'orange'
        },
        {
            id: 'utilities',
            title: 'Utilities Usage',
            description: 'Water and electricity consumption reports.',
            icon: Zap,
            data: mockFinancialsData, // Reusing mock data for demo
            color: 'yellow'
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports Center</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    select a category to download
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTypes.map((report) => (
                    <Card key={report.id} className="p-6 hover:shadow-md transition-shadow dark:bg-gray-800 border-t-4" style={{ borderColor: report.color }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${report.color}-50 dark:bg-${report.color}-900/10`}>
                                <report.icon className={`w-8 h-8 text-${report.color}-600 dark:text-${report.color}-400`} />
                            </div>
                            <FileSpreadsheet className="text-gray-300 dark:text-gray-600" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 h-10">
                            {report.description}
                        </p>

                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 dark:hover:bg-gray-700"
                            onClick={() => handleDownload(report.id, report.data)}
                            disabled={loading === report.id}
                        >
                            {loading === report.id ? (
                                'Generating...'
                            ) : (
                                <>
                                    <Download size={16} />
                                    Download CSV
                                </>
                            )}
                        </Button>
                    </Card>
                ))}
            </div>

            <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                        <FileText className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Need Custom Reports?</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Contact the system administrator to request specific data analysis or custom export formats.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Reports
