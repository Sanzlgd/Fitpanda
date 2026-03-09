import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'var(--color-bg)'
            }}>
                <div className="spinner" style={{ width: 32, height: 32 }} />
            </div>
        )
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />
}
