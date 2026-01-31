import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, Monitor } from 'lucide-react'
import Card from '../components/common/Card'

const Settings: React.FC = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="grid gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Monitor className="text-blue-600 dark:text-blue-400" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Choose your preferred theme interface.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                        {/* Light Mode Button */}
                        <button
                            onClick={() => theme === 'dark' && toggleTheme()}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                    <Sun size={24} />
                                </div>
                                <div className="text-left">
                                    <p className={`font-semibold ${theme === 'light' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                                        Light Mode
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Clean and bright</p>
                                </div>
                            </div>
                            {theme === 'light' && (
                                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                            )}
                        </button>

                        {/* Dark Mode Button */}
                        <button
                            onClick={() => theme === 'light' && toggleTheme()}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-gray-600'}`}>
                                    <Moon size={24} />
                                </div>
                                <div className="text-left">
                                    <p className={`font-semibold ${theme === 'dark' ? 'text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                                        Dark Mode
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Easy on the eyes</p>
                                </div>
                            </div>
                            {theme === 'dark' && (
                                <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                            )}
                        </button>
                    </div>
                </Card>

                {/* Placeholder for other settings */}
                <Card className="p-6 opacity-50 cursor-not-allowed">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications (Coming Soon)</h2>
                    <p className="text-gray-500">Manage your email and push notification preferences.</p>
                </Card>
            </div>
        </div>
    )
}

export default Settings
