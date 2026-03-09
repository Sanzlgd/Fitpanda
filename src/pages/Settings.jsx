import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import './Settings.css'

export default function Settings() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    const joinDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '—'

    return (
        <div className="settings-page">
            <div className="settings-bg" />

            {/* Top Nav */}
            <nav className="dashboard-nav">
                <div className="nav-logo">
                    <span className="nav-logo-icon">🐼</span>
                    <span className="nav-logo-text">FitPanda</span>
                </div>
                <Link to="/dashboard" className="nav-settings-btn" id="back-to-dashboard-link">
                    <span>←</span>
                    <span>Dashboard</span>
                </Link>
            </nav>

            <main className="settings-main">
                <div className="settings-header">
                    <h1 className="settings-title">Account Settings</h1>
                    <p className="settings-subtitle">Manage your FitPanda account</p>
                </div>

                {/* Profile Card */}
                <div className="settings-card">
                    <div className="settings-section-label">Profile</div>
                    <div className="profile-row">
                        <div className="profile-avatar">{initials}</div>
                        <div className="profile-info">
                            <p className="profile-name">{user?.name}</p>
                            <p className="profile-email">{user?.email}</p>
                            <p className="profile-joined">Member since {joinDate}</p>
                        </div>
                    </div>
                </div>

                {/* Account Security Card */}
                <div className="settings-card">
                    <div className="settings-section-label">Security</div>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <p className="settings-item-title">Password</p>
                            <p className="settings-item-desc">Change your account password</p>
                        </div>
                        <button className="btn btn-ghost settings-item-btn" disabled>
                            Change (Phase 2)
                        </button>
                    </div>
                    <div className="settings-divider" />
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <p className="settings-item-title">Two-Factor Authentication</p>
                            <p className="settings-item-desc">Add an extra layer of security</p>
                        </div>
                        <button className="btn btn-ghost settings-item-btn" disabled>
                            Enable (Phase 2)
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-card settings-card-danger">
                    <div className="settings-section-label settings-section-danger">Danger Zone</div>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <p className="settings-item-title">Sign Out</p>
                            <p className="settings-item-desc">Log out of your FitPanda account on this device</p>
                        </div>
                        <button
                            className="btn btn-danger settings-item-btn"
                            onClick={handleLogout}
                            id="logout-btn"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Version */}
                <p className="settings-version">FitPanda v1.1.0 — Phase 2: Fitness Tracking</p>
            </main>
        </div>
    )
}
