import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFitness } from '../context/FitnessContext'
import WorkoutModal from '../components/WorkoutModal'
import WeekChart from '../components/WeekChart'
import './Dashboard.css'

export default function Dashboard() {
    const { user, profile } = useAuth()
    const { todayLog, weekData, workouts, isLoading, updateToday } = useFitness()

    const [showModal, setShowModal] = useState(false)
    const [stepsInput, setStepsInput] = useState('')
    const [updatingWater, setUpdatingWater] = useState(false)
    const [updatingSteps, setUpdatingSteps] = useState(false)

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    const greeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    async function addWater(ml) {
        if (!todayLog || updatingWater) return
        setUpdatingWater(true)
        try {
            await updateToday({ water_ml: (todayLog.water_ml || 0) + ml })
        } finally {
            setUpdatingWater(false)
        }
    }

    async function setSteps(e) {
        e.preventDefault()
        const steps = parseInt(stepsInput, 10)
        if (!steps || steps < 0 || updatingSteps) return
        setUpdatingSteps(true)
        try {
            await updateToday({ steps })
            setStepsInput('')
        } finally {
            setUpdatingSteps(false)
        }
    }

    const waterL = todayLog ? (todayLog.water_ml / 1000).toFixed(2).replace(/\.?0+$/, '') || '0' : '—'
    const todayWorkouts = workouts.filter(w => w.date === new Date().toISOString().slice(0, 10))

    return (
        <div className="dashboard-page">
            <div className="dashboard-bg" />

            {/* Top Nav */}
            <nav className="dashboard-nav">
                <div className="nav-logo">
                    <span className="nav-logo-icon">🐼</span>
                    <span className="nav-logo-text">FitPanda</span>
                </div>
                <div className="nav-actions">
                    <div className="nav-avatar" title={user?.name}>{initials}</div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Greeting */}
                <div className="dashboard-greeting">
                    <h1 className="greeting-title">
                        {greeting()}, <span className="greeting-name">{user?.name?.split(' ')[0] ?? 'there'}</span> 👋
                    </h1>
                    <p className="greeting-subtitle">
                        {isLoading ? 'Loading your stats…' : "Here's your fitness summary for today."}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {/* Calories */}
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-body">
                            <span className="stat-value">
                                {isLoading ? '—' : (todayLog?.calories_burned ?? 0)}
                            </span>
                            <span className="stat-unit">kcal</span>
                        </div>
                        <span className="stat-label">Calories Burned</span>
                    </div>

                    {/* Water */}
                    <div className="stat-card stat-card-interactive">
                        <div className="stat-icon">💧</div>
                        <div className="stat-body">
                            <span className="stat-value">{isLoading ? '—' : waterL}</span>
                            <span className="stat-unit">L</span>
                        </div>
                        <span className="stat-label">Water Intake</span>
                        <div className="quick-add-row">
                            <button
                                className="quick-add-btn"
                                onClick={() => addWater(250)}
                                disabled={isLoading || updatingWater}
                                id="add-water-250-btn"
                                title="Add 250ml"
                            >+250ml</button>
                            <button
                                className="quick-add-btn"
                                onClick={() => addWater(500)}
                                disabled={isLoading || updatingWater}
                                id="add-water-500-btn"
                                title="Add 500ml"
                            >+500ml</button>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="stat-card stat-card-interactive">
                        <div className="stat-icon">🏃</div>
                        <div className="stat-body">
                            <span className="stat-value">
                                {isLoading ? '—' : (todayLog?.steps ?? 0).toLocaleString()}
                            </span>
                            <span className="stat-unit">steps</span>
                        </div>
                        <span className="stat-label">Steps Today</span>
                        <form className="steps-form" onSubmit={setSteps}>
                            <input
                                className="steps-input"
                                type="number"
                                min="0"
                                placeholder="Update steps"
                                value={stepsInput}
                                onChange={e => setStepsInput(e.target.value)}
                                disabled={isLoading || updatingSteps}
                                id="steps-input"
                            />
                            <button
                                className="quick-add-btn"
                                type="submit"
                                disabled={isLoading || updatingSteps || !stepsInput}
                                id="set-steps-btn"
                            >Set</button>
                        </form>
                    </div>

                    {/* Workouts */}
                    <div className="stat-card">
                        <div className="stat-icon">🏋️</div>
                        <div className="stat-body">
                            <span className="stat-value">
                                {isLoading ? '—' : todayWorkouts.length}
                            </span>
                            <span className="stat-unit">sessions</span>
                        </div>
                        <span className="stat-label">Workouts Today</span>
                    </div>
                </div>

                {/* Log Workout Button */}
                <div className="log-workout-row">
                    <button
                        className="log-workout-btn"
                        onClick={() => setShowModal(true)}
                        id="open-workout-modal-btn"
                    >
                        <span>🏋️</span>
                        <span>Log Workout</span>
                    </button>
                </div>

                {/* Recent Workouts */}
                {todayWorkouts.length > 0 && (
                    <div className="recent-workouts">
                        <p className="section-title">Today's Workouts</p>
                        <div className="workout-list">
                            {todayWorkouts.map(w => (
                                <div key={w.id} className="workout-item">
                                    <span className="workout-item-type">{w.type}</span>
                                    <span className="workout-item-detail">{w.duration_min} min · {w.calories} kcal</span>
                                    {w.notes && <span className="workout-item-notes">{w.notes}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Goal Progress */}
                {profile && (
                    <div className="goal-card">
                        <p className="section-title">🎯 Today's Goals</p>
                        <div className="goal-grid">
                            {/* Calorie target */}
                            <div className="goal-item">
                                <div className="goal-row">
                                    <span className="goal-label">🔥 Calories</span>
                                    <span className="goal-nums">
                                        <strong>{todayLog?.calories_burned ?? 0}</strong>
                                        <span> / {profile.daily_calories.toLocaleString()} kcal</span>
                                    </span>
                                </div>
                                <div className="goal-bar-track">
                                    <div
                                        className="goal-bar-fill"
                                        style={{ width: `${Math.min(100, Math.round(((todayLog?.calories_burned ?? 0) / profile.daily_calories) * 100))}%` }}
                                    />
                                </div>
                                <span className="goal-remain">
                                    {Math.max(0, profile.daily_calories - (todayLog?.calories_burned ?? 0)).toLocaleString()} kcal remaining
                                </span>
                            </div>

                            {/* Protein target */}
                            <div className="goal-item goal-item-protein">
                                <span className="goal-label">💪 Daily Protein Target</span>
                                <span className="goal-protein-val">{profile.daily_protein}g</span>
                                <span className="goal-remain">
                                    {profile.target_weight_kg < profile.weight_kg ? 'Cutting to ' : 'Building to '}
                                    <strong>{profile.target_weight_kg} kg</strong>
                                    {' · '}
                                    {Math.max(0, Math.ceil((new Date(profile.target_date) - new Date()) / 86400000))} days left
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Week Chart */}
                <div className="chart-section">
                    <p className="section-title">7-Day Calorie Burn</p>
                    {weekData.length > 0
                        ? <WeekChart data={weekData} />
                        : <div className="chart-empty">Start logging workouts to see your weekly chart!</div>
                    }
                </div>

            </main>

            {/* Workout Modal */}
            {showModal && <WorkoutModal onClose={() => setShowModal(false)} />}
        </div>
    )
}
