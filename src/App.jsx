import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import DietTracker from './pages/DietTracker'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { requestNotificationPermissions, scheduleDailyReminder } from './utils/notifications'

function App() {
  const { isAuthenticated, isLoading, profile } = useAuth()

  // Setup daily inactivity reminder when fully logged in
  useEffect(() => {
    if (isAuthenticated && profile) {
      requestNotificationPermissions().then((granted) => {
        if (granted) scheduleDailyReminder()
      })
    }
  }, [isAuthenticated, profile])

  // Show nothing while session is being restored
  if (isLoading) return null

  // Helper: authenticated user without a profile → send to onboarding
  const dashboardOrOnboard = isAuthenticated && !profile
    ? <Navigate to="/onboarding" replace />
    : <Dashboard />

  return (
    <Routes>
      {/* Public routes — redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />}
      />

      {/* Onboarding — only for authenticated users without a profile */}
      <Route
        path="/onboarding"
        element={
          !isAuthenticated
            ? <Navigate to="/login" replace />
            : profile
              ? <Navigate to="/dashboard" replace />   // already onboarded
              : <Onboarding />
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute>{dashboardOrOnboard}</ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />
      <Route
        path="/diet"
        element={<ProtectedRoute><DietTracker /></ProtectedRoute>}
      />

      {/* Default redirect */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  )
}

export default App
