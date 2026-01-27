import React from 'react'
import { FolderOpen } from 'lucide-react'

interface EmptyStateProps {
    title: string
    description?: string
    icon?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
                {icon || <FolderOpen className="h-10 w-10 text-gray-400" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
    )
}

export default EmptyState
