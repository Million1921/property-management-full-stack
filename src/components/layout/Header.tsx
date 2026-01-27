import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, User as UserIcon } from 'lucide-react'

const Header: React.FC = () => {
    const { user, logout } = useAuth()

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center">
                {/* Search bar or breadcrumbs could go here */}
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                        <UserIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role || 'Manager'}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    )
}

export default Header
