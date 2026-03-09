import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDiet } from '../context/DietContext'
import { INDIAN_FOODS, MEAL_TYPES } from '../data/indianFoods'
import './DietTracker.css'

// Food categories to show in the picker
const CATEGORIES = ['All', 'Breakfast', 'Main', 'Dal', 'Curry', 'Snack', 'Dessert', 'Drink', 'Dairy', 'Protein', 'Starter']

export default function DietTracker() {
    const { user, profile, dynamicTargets } = useAuth()
    const { todayLogs, totals, logFood, deleteLog } = useDiet()

    const [activeMeal, setActiveMeal] = useState('Breakfast')
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    // Quantity picker modal state
    const [selectedFood, setSelectedFood] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [isLogging, setIsLogging] = useState(false)
    const [logError, setLogError] = useState('')

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    // ── Calorie limits ─────────────────────────────────────────────
    const calorieLimit = dynamicTargets?.calories || profile?.daily_calories || 2000
    const netCalories = totals.calories
    const remaining = calorieLimit - netCalories
    const isOver = remaining < 0
    const caloriePct = Math.min(100, Math.round((netCalories / calorieLimit) * 100)) || 0

    // ── Food list ─────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        return INDIAN_FOODS.filter(f => {
            const catMatch = activeCategory === 'All' || f.category === activeCategory
            const searchMatch = !q || f.name.toLowerCase().includes(q)
            return catMatch && searchMatch
        }).slice(0, 30)
    }, [search, activeCategory])

    // ── Logs grouped by meal ──────────────────────────────────────
    const byMeal = useMemo(() => {
        const g = {}
        MEAL_TYPES.forEach(m => { g[m] = [] })
        todayLogs.forEach(l => { if (g[l.meal_type]) g[l.meal_type].push(l) })
        return g
    }, [todayLogs])

    // Quick preview for the qty modal
    const preview = selectedFood ? {
        calories: Math.round(selectedFood.calories * quantity),
        protein_g: +(selectedFood.protein_g * quantity).toFixed(1),
        carbs_g: +(selectedFood.carbs_g * quantity).toFixed(1),
        fat_g: +(selectedFood.fat_g * quantity).toFixed(1),
    } : null

    function openFoodPicker(food) {
        setSelectedFood(food)
        setQuantity(1)
        setLogError('')
    }

    function closePicker() {
        setSelectedFood(null)
        setQuantity(1)
        setLogError('')
    }

    async function confirmLog() {
        if (!selectedFood) return
        setIsLogging(true)
        setLogError('')
        try {
            await logFood({
                meal_type: activeMeal,
                food_id: selectedFood.id,
                food_name: selectedFood.name,
                serving: selectedFood.serving,
                quantity: quantity,
                calories: selectedFood.calories,
                protein_g: selectedFood.protein_g,
                carbs_g: selectedFood.carbs_g,
                fat_g: selectedFood.fat_g,
            })
            closePicker()
        } catch {
            setLogError('Failed to log. Try again.')
        } finally {
            setIsLogging(false)
        }
    }

    return (
        <div className="diet-page">
            <div className="diet-bg" />

            {/* Nav */}
            <nav className="dt-nav">
                <div className="nav-logo">
                    <span className="nav-logo-icon">🐼</span>
                    <span className="nav-logo-text">FitPanda</span>
                </div>
                <div className="nav-actions">
                    <Link to="/dashboard" className="nav-back-btn" id="back-to-dashboard">🏠 Home</Link>
                    <div className="nav-avatar">{initials}</div>
                </div>
            </nav>

            <main className="dt-main">

                {/* ── TODAY'S GOAL BANNER ──────────────────────────── */}
                <div className="goal-banner">
                    <div className="goal-banner-top">
                        <div className="goal-info">
                            <p className="goal-label">Today's Goal</p>
                            <p className="goal-numbers">
                                <span className="goal-eaten">{netCalories.toLocaleString()}</span>
                                <span className="goal-sep"> / </span>
                                <span className="goal-total">{calorieLimit.toLocaleString()} kcal</span>
                            </p>
                        </div>
                        <div className={`goal-remaining-badge ${isOver ? 'over' : ''}`}>
                            <p className="goal-rem-label">{isOver ? 'Over' : 'Remaining'}</p>
                            <p className="goal-rem-val">{Math.abs(remaining).toLocaleString()} kcal</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="goal-bar-track">
                        <div
                            className={`goal-bar-fill ${isOver ? 'over' : caloriePct > 85 ? 'warn' : ''}`}
                            style={{ width: `${caloriePct}%` }}
                        />
                    </div>

                    {/* Macro chips */}
                    <div className="goal-macros">
                        <div className="macro-chip">
                            <span className="macro-emoji">💪</span>
                            <span className="macro-val">{totals.protein_g}g</span>
                            <span className="macro-key">Protein</span>
                        </div>
                        <div className="macro-chip">
                            <span className="macro-emoji">⚡</span>
                            <span className="macro-val">{totals.carbs_g}g</span>
                            <span className="macro-key">Carbs</span>
                        </div>
                        <div className="macro-chip">
                            <span className="macro-emoji">🔥</span>
                            <span className="macro-val">{totals.fat_g}g</span>
                            <span className="macro-key">Fat</span>
                        </div>
                    </div>
                </div>

                {/* ── MEAL TYPE TABS ──────────────────────────────── */}
                <div className="meal-tabs">
                    {MEAL_TYPES.map(m => (
                        <button
                            key={m}
                            className={`meal-tab ${activeMeal === m ? 'active' : ''}`}
                            onClick={() => setActiveMeal(m)}
                        >
                            {m === 'Breakfast' ? '🌅' : m === 'Lunch' ? '☀️' : m === 'Dinner' ? '🌙' : '🍎'} {m}
                        </button>
                    ))}
                </div>

                {/* ── FOOD PICKER ─────────────────────────────────── */}
                <div className="food-picker-section">
                    <p className="section-title">Add Food to {activeMeal}</p>

                    {/* Search */}
                    <div className="food-search-wrap">
                        <span className="food-search-icon">🔍</span>
                        <input
                            className="food-search-input"
                            type="text"
                            placeholder="Search foods..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setActiveCategory('All') }}
                        />
                        {search && <button className="food-search-clear" onClick={() => setSearch('')}>✕</button>}
                    </div>

                    {/* Category pills */}
                    <div className="category-pills">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => { setActiveCategory(cat); setSearch('') }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Food cards grid */}
                    <div className="food-cards-grid">
                        {filtered.map(food => (
                            <button
                                key={food.id}
                                className="food-card"
                                onClick={() => openFoodPicker(food)}
                            >
                                <span className="food-card-emoji">{food.emoji}</span>
                                <span className="food-card-name">{food.name}</span>
                                <span className="food-card-cal">{food.calories} kcal</span>
                                <span className="food-card-serving">per {food.serving}</span>
                                <span className="food-card-add">+</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── TODAY'S LOG ─────────────────────────────────── */}
                <div className="todays-log-section">
                    <p className="section-title">Today's Log</p>
                    {MEAL_TYPES.map(m => {
                        const logs = byMeal[m] || []
                        if (!logs.length) return null
                        return (
                            <div key={m} className="meal-log-group">
                                <p className="meal-log-title">
                                    {m === 'Breakfast' ? '🌅' : m === 'Lunch' ? '☀️' : m === 'Dinner' ? '🌙' : '🍎'} {m}
                                </p>
                                {logs.map(log => (
                                    <div key={log.id} className="log-row">
                                        <div className="log-info">
                                            <span className="log-name">{log.food_name}</span>
                                            <span className="log-meta">×{log.quantity} · {Math.round(log.calories * log.quantity)} kcal</span>
                                        </div>
                                        <button
                                            className="log-delete-btn"
                                            onClick={() => deleteLog(log.id)}
                                            title="Remove"
                                        >✕</button>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                    {todayLogs.length === 0 && (
                        <p className="empty-log-msg">No food logged yet today. Tap a food card above to add! 🍽️</p>
                    )}
                </div>
            </main>

            {/* ── QUANTITY PICKER MODAL ───────────────────────────── */}
            {selectedFood && (
                <div className="qty-overlay" onClick={closePicker}>
                    <div className="qty-modal" onClick={e => e.stopPropagation()}>
                        <div className="qty-modal-emoji">{selectedFood.emoji}</div>
                        <p className="qty-modal-name">{selectedFood.name}</p>
                        <p className="qty-modal-serving">per {selectedFood.serving}</p>

                        {/* Quantity stepper */}
                        <div className="qty-stepper">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => Math.max(0.5, q - (q > 1 ? 1 : 0.5)))}
                            >−</button>
                            <input
                                className="qty-input"
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={quantity}
                                onChange={e => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 1))}
                            />
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(q => q + 1)}
                            >+</button>
                        </div>

                        {/* Live preview */}
                        {preview && (
                            <div className="qty-preview">
                                <div className="qty-preview-big">{preview.calories} kcal</div>
                                <div className="qty-preview-macros">
                                    <span>💪 {preview.protein_g}g protein</span>
                                    <span>⚡ {preview.carbs_g}g carbs</span>
                                    <span>🔥 {preview.fat_g}g fat</span>
                                </div>
                                <div className="qty-remaining-preview">
                                    <span>Remaining after this: </span>
                                    <strong className={remaining - preview.calories < 0 ? 'over-text' : ''}>
                                        {(remaining - preview.calories).toLocaleString()} kcal
                                    </strong>
                                </div>
                            </div>
                        )}

                        {logError && <p className="qty-error">{logError}</p>}

                        <div className="qty-modal-actions">
                            <button className="qty-cancel-btn" onClick={closePicker}>Cancel</button>
                            <button
                                className="qty-confirm-btn"
                                onClick={confirmLog}
                                disabled={isLogging}
                            >
                                {isLogging ? 'Adding…' : `Add to ${activeMeal}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
