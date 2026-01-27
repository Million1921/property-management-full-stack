import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add response interceptor for error handling
const errorHandler = (error: any) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return Promise.reject(error)
}

api.interceptors.response.use((response) => response, errorHandler)
authApi.interceptors.response.use((response) => response, errorHandler)

export default api
