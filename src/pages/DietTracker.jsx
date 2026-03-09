import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDiet } from '../context/DietContext'
import { useFitness } from '../context/FitnessContext'
import { INDIAN_FOODS, MEAL_TYPES } from '../data/indianFoods'
import './DietTracker.css'

const WORKOUT_TYPES = ['Running', 'Cycling', 'Walking', 'Weightlifting', 'Swimming', 'HIIT', 'Yoga', 'Other']

function estimateBurn(type, duration) {
    const METS = { Running: 9.8, Cycling: 7.5, Walking: 3.8, Weightlifting: 5, Swimming: 8, HIIT: 10, Yoga: 3, Other: 5 }
    return Math.round((METS[type] || 5) * 3.5 * 70 / 200 * duration)
}

export default function DietTracker() {
    const { user, profile } = useAuth()
    const { todayLogs, totals, isLoading, logFood, deleteLog } = useDiet()
    const { logWorkout } = useFitness()

    const [activeMeal, setActiveMeal] = useState('Breakfast')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [isLogging, setIsLogging] = useState(false)
    const [showExercise, setShowExercise] = useState(false)
    const [exerciseType, setExerciseType] = useState('Running')
    const [exDuration, setExDuration] = useState('')
    const [isLoggingEx, setIsLoggingEx] = useState(false)
    const [logError, setLogError] = useState('')

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    // ── Pre-calculate limits & rendering state ───────────────────────────
    const baseCalorieLimit = profile?.daily_calories || 2000
    const calorieLimit = dynamicTargets?.calories || baseCalorieLimit
    // Base carbs + dynamic heavy-lift carbs. If we don't have a static carbs goal, we'll estimate 200g base.
    const carbsGoal = 200 + (dynamicTargets?.addedCarbs || 0)

    // Total calories consumed today + burned from exercise
    // Wait, diet tracker normally doesn't subtract exercise from the *consumed* unless we calculate net.
    // In Phase 3 we did:
    const burnedCalories = todayLogs.filter(l => l.meal_type === 'Exercise').reduce((sum, l) => sum + l.calories, 0)
    const consumedCalories = totals.calories // This totals *everything* logged, including negative exercise entries if implemented that way.

    // netCalories is basically what they've eaten so far.
    // In our simplified version, totals.calories holds the net sum if logFood handles negatives, or just the sum.
    const netCalories = consumedCalories

    const remaining = Math.max(0, calorieLimit - netCalories)
    const caloriePct = Math.min(100, Math.round((netCalories / calorieLimit) * 100)) || 0
    const isOverLimit = netCalories > calorieLimit

    // Filter foods by search query
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return INDIAN_FOODS.slice(0, 20)
        return INDIAN_FOODS.filter(f => f.name.toLowerCase().includes(q)).slice(0, 30)
    }, [search])

    // Group today's logs by meal type
    const byMeal = useMemo(() => {
        const g = {}
        MEAL_TYPES.forEach(m => { g[m] = [] })
        todayLogs.forEach(l => { if (g[l.meal_type]) g[l.meal_type].push(l) })
        return g
    }, [todayLogs])

    // Selected food preview (adjusted for quantity)
    const preview = selected ? {
        calories: Math.round(selected.calories * quantity),
        protein_g: Math.round(selected.protein_g * quantity),
        carbs_g: Math.round(selected.carbs_g * quantity),
        fat_g: Math.round(selected.fat_g * quantity),
    } : null

    const estBurn = exDuration ? estimateBurn(exerciseType, parseInt(exDuration, 10)) : 0

    async function handleLogFood(e) {
        e.preventDefault()
        if (!selected) return
        setIsLogging(true)
        setLogError('')
        try {
            await logFood({
                meal_type: activeMeal,
                food_id: selected.id,
                food_name: selected.name,
                serving: selected.serving,
                quantity: parseFloat(quantity) || 1,
                calories: selected.calories,
                protein_g: selected.protein_g,
                carbs_g: selected.carbs_g,
                fat_g: selected.fat_g,
            })
            setSelected(null)
            setSearch('')
            setQuantity(1)
        } catch {
            setLogError('Failed to log food. Try again.')
        } finally {
            setIsLogging(false)
        }
    }

    async function handleLogExercise(e) {
        e.preventDefault()
        if (!exDuration || parseInt(exDuration, 10) <= 0) return
        setIsLoggingEx(true)
        try {
            await logWorkout({ type: exerciseType, duration_min: parseInt(exDuration, 10), calories: estBurn })
            setShowExercise(false)
            setExDuration('')
        } finally {
            setIsLoggingEx(false)
        }
    }

    // AI Scanner State & Logic
    const [isScanning, setIsScanning] = useState(false)

    async function handleSnapMeal() {
        try {
            // Import dynamically or top-level. We'll do it dynamically here to avoid web errors if not set up,
            // but standard imports are fine too since we added pwa-elements.
            const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
            const { analyzeFoodImage } = await import('../utils/aiScanner')

            const image = await Camera.getPhoto({
                quality: 60,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera
            })

            if (image.base64String) {
                setIsScanning(true)
                setLogError('')
                setSelected(null) // Clear existing selection

                const aiResult = await analyzeFoodImage(image.base64String)

                // Auto-log the food immediately
                await logFood({
                    id: 'ai-gen-' + Date.now(),
                    name: `✨ AI: ${aiResult.name}`,
                    serving: '1 serving (estimated)',
                    calories: aiResult.calories,
                    protein_g: aiResult.protein_g,
                    carbs_g: aiResult.carbs_g,
                    fat_g: aiResult.fat_g,
                    quantity: 1,
                    mealType: activeMeal || 'Snack' // Fallback to Snack if not set
                })

                // Clear search to show the logged item in the sections below
                setSearch('')
            }
        } catch (err) {
            console.error('Camera/AI Error:', err)
            if (err.message !== 'User cancelled photos app') {
                setLogError('AI Scan failed: ' + (err.message || 'Check camera permissions or API key.'))
            }
        } finally {
            setIsScanning(false)
        }
    }

    return (
        <div className="diet-page">
            <div className="diet-bg" />

            {/* Nav */}
            <nav className="dashboard-nav">
                <div className="nav-logo">
                    <span className="nav-logo-icon">🐼</span>
                    <span className="nav-logo-text">FitPanda</span>
                </div>
                <div className="nav-actions">
                    <Link to="/dashboard" className="nav-settings-btn" id="back-to-dashboard">
                        <span>🏠</span><span>Dashboard</span>
                    </Link>
                    <div className="nav-avatar" title={user?.name}>{initials}</div>
                </div>
            </nav>

            <main className="diet-main">

                {/* ── Day Type Toggle ─────────────────────────────────────── */}
                <div className="day-type-toggle-container">
                    <div className="day-type-toggle">
                        <button
                            className={`dt-btn ${!isHeavyLiftDay ? 'active' : ''}`}
                            onClick={() => setIsHeavyLiftDay(false)}
                            title="Base Calories"
                        >
                            🧘 Rest Day
                        </button>
                        <button
                            className={`dt-btn ${isHeavyLiftDay ? 'active' : ''}`}
                            onClick={() => setIsHeavyLiftDay(true)}
                            title="+300 kcal, +50g Carbs"
                        >
                            🏋️ Heavy Lift
                        </button>
                    </div>
                </div>

                {/* ── Calorie Progress Card ─────────────────────────── */}
                <div className="cal-progress-card">
                    <div className="cal-header">
                        <div>
                            <p className="cal-title">Today's Calories</p>
                            <p className={`cal-count ${isOverLimit ? 'over-limit' : ''}`}>
                                <strong>{netCalories.toLocaleString()}</strong>
                                <span> / {calorieLimit.toLocaleString()} kcal</span>
                            </p>
                        </div>
                        <div className="cal-remain-badge" style={{ background: isOverLimit ? 'rgba(239,68,68,0.15)' : undefined }}>
                            <p className="cal-remain-label">{isOverLimit ? 'Over by' : 'Remaining'}</p>
                            <p className={`cal-remain-val ${isOverLimit ? 'over' : ''}`}>
                                {isOverLimit ? netCalories - calorieLimit : remaining} kcal
                            </p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="cal-bar-track">
                        <div
                            className={`cal-bar-fill ${isOverLimit ? 'over' : ''}`}
                            style={{ width: `${caloriePct}%` }}
                        />
                    </div>
                    <div className="cal-bar-labels">
                        <span>0</span>
                        <span>{caloriePct}% of {isHeavyLiftDay ? 'Heavy Lift' : 'Base'} goal</span>
                        <span>{calorieLimit.toLocaleString()}</span>
                    </div>

                    {/* Macro summary */}
                    <div className="macro-row">
                        {[
                            { label: 'Protein', val: totals.protein_g, unit: 'g', color: '#60a5fa' },
                            { label: 'Carbs', val: totals.carbs_g, unit: 'g', color: '#fbbf24' },
                            { label: 'Fat', val: totals.fat_g, unit: 'g', color: '#f87171' },
                        ].map(m => (
                            <div key={m.label} className="macro-chip" style={{ borderColor: m.color + '44' }}>
                                <span className="macro-val" style={{ color: m.color }}>{m.val}{m.unit}</span>
                                <span className="macro-name">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Log Food Panel ────────────────────────────────── */}
                <div className="log-panel">
                    {/* Meal type tabs */}
                    <div className="meal-tabs">
                        {MEAL_TYPES.map(m => (
                            <button key={m} className={`meal-tab ${activeMeal === m ? 'active' : ''}`}
                                onClick={() => setActiveMeal(m)} id={`meal-tab-${m.toLowerCase()}`}>
                                {m === 'Breakfast' ? '🌅' : m === 'Lunch' ? '☀️' : m === 'Dinner' ? '🌙' : '🍎'} {m}
                            </button>
                        ))}
                    </div>

                    {/* Food search */}
                    <div className="food-search-wrap">
                        <span className="search-icon">🔍</span>
                        <input
                            className="food-search"
                            type="text"
                            placeholder="Search Indian foods…"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setSelected(null) }}
                            id="food-search-input"
                        />
                        {search && <button className="search-clear" onClick={() => { setSearch(''); setSelected(null) }}>✕</button>}
                    </div>

                    {/* Food dropdown */}
                    {!selected && (
                        <div className="food-list">
                            {filtered.map(food => (
                                <button key={food.id} className="food-item" onClick={() => { setSelected(food); setSearch('') }}
                                    id={`food-item-${food.id}`}>
                                    <div className="food-item-left">
                                        <span className="food-item-name">{food.name}</span>
                                        <span className="food-item-serving">{food.serving}</span>
                                    </div>
                                    <div className="food-item-right">
                                        <span className="food-item-cal">{food.calories} kcal</span>
                                        <span className="food-item-macro">P{food.protein_g}g</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Selected food entry form */}
                    {selected && (
                        <form className="food-entry-form" onSubmit={handleLogFood}>
                            <div className="food-entry-header">
                                <div>
                                    <p className="food-entry-name">{selected.name}</p>
                                    <p className="food-entry-serving">Per serving: {selected.serving}</p>
                                </div>
                                <button type="button" className="food-entry-clear" onClick={() => setSelected(null)}>✕</button>
                            </div>

                            <div className="food-entry-qty-row">
                                <label className="form-label-sm">Servings</label>
                                <div className="qty-controls">
                                    <button type="button" className="qty-btn" onClick={() => setQuantity(q => Math.max(0.5, +(q - 0.5).toFixed(1)))}>−</button>
                                    <input className="qty-input" type="number" min="0.5" step="0.5" value={quantity}
                                        onChange={e => setQuantity(parseFloat(e.target.value) || 1)} />
                                    <button type="button" className="qty-btn" onClick={() => setQuantity(q => +(q + 0.5).toFixed(1))}>+</button>
                                </div>
                            </div>

                            {/* Macro preview for this entry */}
                            {preview && (
                                <div className="entry-preview">
                                    <div className="entry-preview-item"><span className="ep-val">{preview.calories}</span><span className="ep-label">kcal</span></div>
                                    <div className="entry-preview-item"><span className="ep-val" style={{ color: '#60a5fa' }}>{preview.protein_g}g</span><span className="ep-label">Protein</span></div>
                                    <div className="entry-preview-item"><span className="ep-val" style={{ color: '#fbbf24' }}>{preview.carbs_g}g</span><span className="ep-label">Carbs</span></div>
                                    <div className="entry-preview-item"><span className="ep-val" style={{ color: '#f87171' }}>{preview.fat_g}g</span><span className="ep-label">Fat</span></div>
                                </div>
                            )}

                            {preview && (netCalories + preview.calories) > calorieLimit && (
                                <div className="food-entry-warning">
                                    ⚠️ Logging this will put you {((netCalories + preview.calories) - calorieLimit).toLocaleString()} kcal over your daily limit.
                                </div>
                            )}

                            {logError && <p className="log-error">{logError}</p>}


                            <button type="submit" className="log-food-btn" id="log-food-btn" disabled={isLogging}>
                                {isLogging ? '…' : `Add to ${activeMeal}`}
                            </button>
                        </form>
                    )}
                </div>

                {/* ── Add Exercise ──────────────────────────────────── */}
                {!showExercise ? (
                    <button className="add-exercise-btn" onClick={() => setShowExercise(true)} id="add-exercise-btn">
                        ⚡ Add Exercise (subtract calories)
                    </button>
                ) : (
                    <form className="exercise-quick-form" onSubmit={handleLogExercise}>
                        <p className="exercise-form-title">⚡ Log Exercise</p>
                        <div className="exercise-form-row">
                            <select className="exercise-select" value={exerciseType} onChange={e => setExerciseType(e.target.value)}>
                                {WORKOUT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <div className="ex-dur-wrap">
                                <input className="ex-dur-input" type="number" min="1" placeholder="min"
                                    value={exDuration} onChange={e => setExDuration(e.target.value)} />
                                <span className="ex-dur-label">min</span>
                            </div>
                            {estBurn > 0 && <span className="ex-burn-preview">~{estBurn} kcal</span>}
                        </div>
                        <div className="exercise-form-actions">
                            <button type="button" className="ex-cancel-btn" onClick={() => { setShowExercise(false); setExDuration('') }}>Cancel</button>
                            <button type="submit" className="ex-log-btn" id="log-exercise-btn" disabled={isLoggingEx || !exDuration}>
                                {isLoggingEx ? '…' : 'Log Exercise'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Meal Sections ─────────────────────────────────── */}
                <div className="meal-sections">
                    {MEAL_TYPES.map(meal => {
                        const entries = byMeal[meal]
                        if (!entries?.length) return null
                        const mealCal = entries.reduce((s, e) => s + e.calories * e.quantity, 0)
                        return (
                            <div key={meal} className="meal-section">
                                <div className="meal-section-header">
                                    <span className="meal-section-name">
                                        {meal === 'Breakfast' ? '🌅' : meal === 'Lunch' ? '☀️' : meal === 'Dinner' ? '🌙' : '🍎'} {meal}
                                    </span>
                                    <span className="meal-section-cal">{Math.round(mealCal)} kcal</span>
                                </div>
                                {entries.map(entry => (
                                    <div key={entry.id} className="meal-entry">
                                        <div className="meal-entry-info">
                                            <span className="meal-entry-name">{entry.food_name}</span>
                                            <span className="meal-entry-detail">
                                                {entry.quantity !== 1 ? `×${entry.quantity} · ` : ''}
                                                {Math.round(entry.calories * entry.quantity)} kcal &nbsp;·&nbsp;
                                                P{Math.round(entry.protein_g * entry.quantity)}g &nbsp;C{Math.round(entry.carbs_g * entry.quantity)}g &nbsp;F{Math.round(entry.fat_g * entry.quantity)}g
                                            </span>
                                        </div>
                                        <button className="meal-entry-del" onClick={() => deleteLog(entry.id)}
                                            title="Remove" id={`del-entry-${entry.id}`}>✕</button>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>

                {isLoading && <p className="diet-loading">Loading…</p>}

                {/* ── AI Scanner UI ─────────────────────────────────── */}
                <button
                    className="snap-meal-fab"
                    onClick={handleSnapMeal}
                    title="Snap Meal with AI"
                    disabled={isScanning}
                >
                    <span className="fab-icon">📷</span>
                </button>

                {isScanning && (
                    <div className="scanning-overlay">
                        <div className="scanning-spinner"></div>
                        <p>🤖 Analyzing your meal...</p>
                    </div>
                )}
            </main>
        </div>
    )
}

