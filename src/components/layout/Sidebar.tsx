import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Home, ClipboardList, Wallet, Receipt, CreditCard, Settings, LogOut, Megaphone, Wrench, BarChart3, Bell, FileText, Zap } from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'

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
    // Placeholder for logout function, assuming it will be defined elsewhere or passed as prop
    const logout = () => {
        console.log("Logging out...");
        // Implement actual logout logic here
    };

    return (
        <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Ethio Property</span>
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


            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme</span>
                    <ThemeToggle />
                </div>
                <button
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    <LogOut size={20} className="mr-3" />
                    Sign Out
                </button>
            </div>
        </div >
    )
}

export default Sidebar
