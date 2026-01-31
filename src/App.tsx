import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import PrivateRoute from './components/common/PrivateRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Residents from './pages/Residents'
import ResidentDetail from './pages/ResidentDetail'
import Bills from './pages/Bills'
import BillDetail from './pages/BillDetail'
import Payments from './pages/Payments'
import Utilities from './pages/Utilities'
import Maintenance from './pages/Maintenance'
import Announcements from './pages/Announcements'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Layout from './components/layout/Layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="rooms/:id" element={<RoomDetail />} />
                <Route path="residents" element={<Residents />} />
                <Route path="residents/:id" element={<ResidentDetail />} />
                <Route path="bills" element={<Bills />} />
                <Route path="bills/:id" element={<BillDetail />} />
                <Route path="payments" element={<Payments />} />
                <Route path="utilities" element={<Utilities />} />
                <Route path="maintenance" element={<Maintenance />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App