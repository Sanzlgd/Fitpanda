import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

export default function BottomNav() {
    const location = useLocation()
    const path = location.pathname

    return (
        <>
            <div className="bottom-nav-spacer"></div>
            <nav className="bottom-nav">
                <Link to="/dashboard" className={`bnav-item ${path === '/dashboard' ? 'active' : ''}`}>
                    <span className="bnav-icon">🏠</span>
                    <span className="bnav-text">Home</span>
                </Link>
                <Link to="/diet" className={`bnav-item ${path === '/diet' ? 'active' : ''}`}>
                    <span className="bnav-icon">🥗</span>
                    <span className="bnav-text">Diet</span>
                </Link>
                <Link to="/settings" className={`bnav-item ${path === '/settings' ? 'active' : ''}`}>
                    <span className="bnav-icon">⚙️</span>
                    <span className="bnav-text">Settings</span>
                </Link>
            </nav>
        </>
    )
}
