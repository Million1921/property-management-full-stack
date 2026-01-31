import React from 'react'

interface RoomStatusBadgeProps {
    status: 'occupied' | 'vacant' | 'maintenance'
}

const RoomStatusBadge: React.FC<RoomStatusBadgeProps> = ({ status }) => {
    const styles = {
        occupied: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        vacant: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        maintenance: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]
                }`}
        >
            {status}
        </span>
    )
}

export default RoomStatusBadge
