import React, { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    options: { value: string | number; label: string }[]
    error?: string
}

const Select: React.FC<SelectProps> = ({ label, options, error, className = '', id, ...props }) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-500' : ''
                    } ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default Select
