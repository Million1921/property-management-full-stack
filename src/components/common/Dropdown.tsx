import React, { useState, useRef, useEffect } from 'react'

interface DropdownItem {
    label: string
    onClick: () => void
    destructive?: boolean
}

interface DropdownProps {
    items: DropdownItem[]
    children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ items, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-all">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                className={`block w-full text-left px-4 py-2 text-sm ${item.destructive
                                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                role="menuitem"
                                onClick={() => {
                                    item.onClick()
                                    setIsOpen(false)
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown
