import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Home,
    Users,
    FileText,
    CreditCard,
    Zap,
    Wrench,
    Bell,
    BarChart3,
    Settings,
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Rooms', href: '/rooms', icon: Home },
    { name: 'Residents', href: '/residents', icon: Users },
    { name: 'Bills', href: '/bills', icon: FileText },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Utilities', href: '/utilities', icon: Zap },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Announcements', href: '/announcements', icon: Bell },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex items-center h-16 px-6 border-b border-gray-200">
                <span className="text-xl font-bold text-blue-600">PropertyManager</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-3 space-y-1">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon
                                className="mr-3 h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                            />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
