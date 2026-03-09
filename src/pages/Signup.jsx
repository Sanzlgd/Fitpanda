import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

function getPasswordStrength(pw) {
    if (!pw) return { score: 0, label: '', color: '' }
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++

    const map = [
        { score: 0, label: '', color: '' },
        { score: 1, label: 'Weak', color: '#EF4444' },
        { score: 2, label: 'Fair', color: '#F59E0B' },
        { score: 3, label: 'Good', color: '#3B82F6' },
        { score: 4, label: 'Strong', color: '#10B981' },
    ]
    return map[score]
}

export default function Signup() {
    const navigate = useNavigate()
    const { signup } = useAuth()

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const strength = useMemo(() => getPasswordStrength(form.password), [form.password])

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
        if (apiError) setApiError('')
    }

    function validate() {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Full name is required.'
        if (!form.email) errs.email = 'Email address is required.'
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.'
        if (!form.password) errs.password = 'Password is required.'
        else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
        if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.'
        return errs
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }

        setIsLoading(true)
        setApiError('')
        try {
            await signup(form.name.trim(), form.email, form.password)
            navigate('/dashboard')
        } catch (err) {
            setApiError(err?.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            <div className="auth-container">
                <div className="auth-logo">
                    <span className="auth-logo-icon">🐼</span>
                    <span className="auth-logo-text">FitPanda</span>
                </div>

                <div className="auth-card">
                    <div className="auth-card-header">
                        <h1 className="auth-title">Create your account</h1>
                        <p className="auth-subtitle">Start your health transformation today</p>
                    </div>

                    {apiError && (
                        <div className="alert alert-error" role="alert">
                            <span>⚠</span>
                            <span>{apiError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form" noValidate>
                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-name">Full Name</label>
                            <input
                                id="signup-name"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                type="text"
                                name="name"
                                placeholder="Alex Smith"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="name"
                                disabled={isLoading}
                            />
                            {errors.name && <span className="form-error">⚠ {errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-email">Email Address</label>
                            <input
                                id="signup-email"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                                disabled={isLoading}
                            />
                            {errors.email && <span className="form-error">⚠ {errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-password">Password</label>
                            <input
                                id="signup-password"
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                type="password"
                                name="password"
                                placeholder="At least 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                            {errors.password && <span className="form-error">⚠ {errors.password}</span>}
                            {/* Password strength indicator */}
                            {form.password && (
                                <div className="strength-bar">
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className="strength-segment"
                                            style={{
                                                background: i <= strength.score ? strength.color : 'var(--color-border)'
                                            }}
                                        />
                                    ))}
                                    {strength.label && (
                                        <span className="strength-label" style={{ color: strength.color }}>
                                            {strength.label}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
                            <input
                                id="signup-confirm"
                                className={`form-input ${errors.confirm ? 'error' : ''}`}
                                type="password"
                                name="confirm"
                                placeholder="Repeat your password"
                                value={form.confirm}
                                onChange={handleChange}
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                            {errors.confirm && <span className="form-error">⚠ {errors.confirm}</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-submit-btn"
                            disabled={isLoading}
                            id="signup-submit-btn"
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    <span>Creating account…</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{' '}
                        <Link to="/login" id="go-to-login-link">Sign in</Link>
                    </p>
                </div>

                <p className="auth-footer">
                    By continuing, you agree to FitPanda&apos;s Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
