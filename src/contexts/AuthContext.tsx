import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../utils/api'
import toast from 'react-hot-toast'

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      loadUser()
    } else {
      setIsLoading(false)
    }
  }, [token])

  // Sync user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const loadUser = async () => {
    try {
      const response = await authApi.get('/auth/me')
      setUser(response.data)
    } catch (error) {
      console.error('Failed to load user:', error)
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt:', { email, apiUrl: authApi.defaults.baseURL })
      const response = await authApi.post('/auth/login', { email, password })
      console.log('Login response received:', response.data)

      const { access_token, user } = response.data

      if (!access_token) {
        console.error('No access token in response:', response.data)
        toast.error('Login failed: No access token received')
        throw new Error('No access token received')
      }

      localStorage.setItem('token', access_token)
      setToken(access_token)
      setUser(user)
      authApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      console.log('Login successful, user:', user)
      toast.success('Welcome back!')
      navigate('/')
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      })

      const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      toast.error(errorMessage)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authApi.post('/auth/register', { name, email, password })
      const { access_token, user } = response.data

      localStorage.setItem('token', access_token)
      setToken(access_token)
      setUser(user)
      authApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      toast.success('Account created successfully!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete authApi.defaults.headers.common['Authorization']
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // This would be implemented when the API endpoint is available
      // const response = await authApi.patch('/auth/profile', data)
      // setUser(response.data)
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed')
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}