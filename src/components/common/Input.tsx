import React, { InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({ label, error, icon, className = '', id, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
        <div className="space-y-1 group/field">
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-blue-400 transition-colors duration-300 z-20">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    type={inputType}
                    className={`
                        w-full ${icon ? 'pl-11' : 'px-4'} ${isPassword ? 'pr-11' : 'pr-4'} py-4 
                        bg-white/5 border border-white/10 rounded-2xl 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
                        placeholder-transparent transition-all duration-300 backdrop-blur-xl text-white
                        peer disabled:bg-gray-900/50 disabled:cursor-not-allowed 
                        ${error ? 'border-red-500/50' : 'hover:border-white/20'} 
                        ${className}
                    `}
                    placeholder={label || props.placeholder}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`
                            absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300
                            ${icon ? 'ml-11' : 'ml-4'} text-gray-400 font-medium
                            peer-focus:-top-2 peer-focus:left-2 peer-focus:ml-0 peer-focus:text-xs peer-focus:font-bold peer-focus:text-blue-400 peer-focus:bg-black/80 peer-focus:px-2 peer-focus:rounded-lg peer-focus:tracking-widest peer-focus:uppercase
                            peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:ml-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-gray-400 peer-[:not(:placeholder-shown)]:bg-black/80 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded-lg peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase
                        `}
                    >
                        {label}
                    </label>
                )}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 z-20"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="text-[10px] uppercase font-bold text-red-400/80 tracking-widest mt-1 ml-4 animate-pulse">{error}</p>}
        </div>
    )
}

export default Input
