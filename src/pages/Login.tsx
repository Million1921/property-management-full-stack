import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { Mail, Lock } from 'lucide-react'

const Login: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/')
        } catch (error) {
            // Error handling is handled in AuthContext/toast
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative bg-black selection:bg-blue-500/30 selection:text-white" style={{ backgroundImage: "url('/bg-dark-4k.png')" }}>
            <div className="absolute inset-0 bg-black/70 backdrop-brightness-50"></div>
            <div className="max-w-md w-full space-y-8 bg-black/40 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-[0_0_120px_rgba(0,0,0,0.9)] relative z-10 border border-white/5 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="flex flex-col items-center relative">
                    <div className="relative mb-8 group/logo">
                        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover/logo:opacity-40 transition-opacity duration-700 rounded-full"></div>
                        <img src="/ethio-logo.jpg" alt="Ethio Telecom" className="h-28 w-auto relative z-10 rounded-[2rem] shadow-2xl brightness-110 grayscale-[30%] hover:grayscale-0 transition-all duration-700 transform hover:scale-105" />
                    </div>
                    <h2 className="text-center text-5xl font-black text-white tracking-tighter mb-1 opacity-90">
                        ETHIO<span className="text-blue-500">PROPERTY</span>
                    </h2>
                    <h3 className="text-center text-sm font-bold text-gray-400 tracking-[0.4em] uppercase mb-4 opacity-60">
                        MANAGEMENT SYSTEM
                    </h3>
                    <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6"></div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            required
                            placeholder="mmillion728@gmail.com"
                            icon={<Mail size={20} className="text-blue-400" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-white"
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            placeholder="••••••••"
                            icon={<Lock size={20} className="text-blue-400" />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-5 px-4 border border-white/10 text-sm font-black rounded-2xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-[0_15px_40px_rgba(37,99,235,0.4)] uppercase tracking-[0.2em]"
                        >
                            Establish Connection
                        </Button>
                        <p className="text-center text-xs text-gray-500 mt-6 font-medium tracking-wide">
                            Authorized Personnel Only. <span className="text-blue-500/60 hover:text-blue-400 cursor-pointer transition-colors">Reset Access?</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
