import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (error) setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }
        setIsLoading(true)
        setError('')
        try {
            await login(form.email, form.password)
            navigate('/dashboard')
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            {/* Animated background orbs */}
            <div className="auth-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            <div className="auth-container">
                {/* Logo */}
                <div className="auth-logo">
                    <span className="auth-logo-icon">🐼</span>
                    <span className="auth-logo-text">FitPanda</span>
                </div>

                <div className="auth-card">
                    <div className="auth-card-header">
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">Your health journey continues here</p>
                    </div>

                    {error && (
                        <div className="alert alert-error" role="alert">
                            <span>⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form" noValidate>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email Address</label>
                            <input
                                id="login-email"
                                className={`form-input ${error ? 'error' : ''}`}
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <div className="form-label-row">
                                <label className="form-label" htmlFor="login-password">Password</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <input
                                id="login-password"
                                className={`form-input ${error ? 'error' : ''}`}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-submit-btn"
                            disabled={isLoading}
                            id="login-submit-btn"
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    <span>Signing in…</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" id="go-to-signup-link">Create one — it&apos;s free</Link>
                    </p>
                </div>

                <p className="auth-footer">
                    By continuing, you agree to FitPanda&apos;s Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
