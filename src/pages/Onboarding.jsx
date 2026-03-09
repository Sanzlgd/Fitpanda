import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcBMR, calcTDEE, calcDailyPlan } from '../utils/calculations'
import './Onboarding.css'

const ACTIVITY_OPTIONS = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', emoji: '🛋️' },
    { value: 'light', label: 'Lightly Active', desc: '1–3 days/week', emoji: '🚶' },
    { value: 'moderate', label: 'Moderately Active', desc: '3–5 days/week', emoji: '🏃' },
    { value: 'active', label: 'Very Active', desc: '6–7 days/week', emoji: '💪' },
    { value: 'very_active', label: 'Extra Active', desc: 'Hard daily exercise + physical job', emoji: '🔥' },
]

const MIN_DATE = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().slice(0, 10)
})()

const TOTAL_STEPS = 7  // 1-weight, 2-height, 3-age, 4-gender, 5-activity, 6-goal, 7-date

export default function Onboarding() {
    const navigate = useNavigate()
    const { saveProfile } = useAuth()

    const [step, setStep] = useState(1)
    const [dir, setDir] = useState('forward')   // 'forward' | 'back'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [animKey, setAnimKey] = useState(0)

    const [form, setForm] = useState({
        weight_kg: '',
        height_cm: '',
        age: '',
        gender: 'male',
        activity_level: 'moderate',
        target_weight_kg: '',
        target_date: '',
    })

    function set(field, value) {
        setForm(prev => ({ ...prev, [field]: value }))
        setError('')
    }

    function goNext() {
        const err = validateCurrent()
        if (err) { setError(err); return }
        setError('')
        setDir('forward')
        setAnimKey(k => k + 1)
        setStep(s => s + 1)
    }

    function goBack() {
        setError('')
        setDir('back')
        setAnimKey(k => k + 1)
        setStep(s => s - 1)
    }

    function validateCurrent() {
        const { weight_kg, height_cm, age, target_weight_kg, target_date } = form
        if (step === 1) {
            if (!weight_kg || +weight_kg < 20 || +weight_kg > 300)
                return 'Enter a valid weight between 20 and 300 kg.'
        }
        if (step === 2) {
            if (!height_cm || +height_cm < 100 || +height_cm > 250)
                return 'Enter a valid height between 100 and 250 cm.'
        }
        if (step === 3) {
            if (!age || +age < 10 || +age > 100)
                return 'Enter a valid age between 10 and 100.'
        }
        if (step === 6) {
            if (!target_weight_kg || +target_weight_kg < 20 || +target_weight_kg > 300)
                return 'Enter a valid target weight between 20 and 300 kg.'
            if (+target_weight_kg === +form.weight_kg)
                return 'Target weight must differ from your current weight.'
        }
        if (step === 7) {
            if (!target_date) return 'Please select a target date.'
            if (target_date < MIN_DATE) return 'Target date must be at least 7 days from today.'
        }
        return ''
    }

    // Live calculation for the results preview on the last step
    const calc = useMemo(() => {
        const { weight_kg, height_cm, age, gender, activity_level, target_weight_kg, target_date } = form
        const w = parseFloat(weight_kg), h = parseFloat(height_cm),
            a = parseInt(age, 10), tw = parseFloat(target_weight_kg)
        if (!w || !h || !a || !tw || !target_date) return null
        const bmr = calcBMR(w, h, a, gender)
        const tdee = calcTDEE(bmr, activity_level)
        const plan = calcDailyPlan(tdee, w, tw, target_date)
        return { bmr, tdee, ...plan }
    }, [form])

    async function handleFinish() {
        const err = validateCurrent()
        if (err) { setError(err); return }
        if (!calc) { setError('Please fill in all fields.'); return }
        setIsSubmitting(true)
        setError('')
        try {
            await saveProfile({
                ...form,
                bmr: Math.round(calc.bmr),
                tdee: Math.round(calc.tdee),
                daily_calories: calc.dailyCalories,
                daily_protein: calc.dailyProtein,
            })
            navigate('/dashboard')
        } catch {
            setError('Failed to save profile. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const progress = (step / TOTAL_STEPS) * 100

    const stepConfig = [
        { emoji: '⚖️', title: "What's your current weight?", subtitle: 'We use this to calculate your calorie burn.' },
        { emoji: '📏', title: "How tall are you?", subtitle: 'Your height helps us compute your BMR.' },
        { emoji: '🎂', title: "How old are you?", subtitle: 'Age affects your metabolism rate.' },
        { emoji: '🧬', title: "What's your biological sex?", subtitle: 'Used for accurate calorie calculations.' },
        { emoji: '🏃', title: "How active are you?", subtitle: 'Pick the level that best matches your typical week.' },
        { emoji: '🎯', title: "What's your target weight?", subtitle: 'Set a realistic goal to work towards.' },
        { emoji: '📅', title: "When do you want to hit your goal?", subtitle: 'We\'ll reverse-engineer your daily calorie target.' },
    ]

    const current = stepConfig[step - 1]
    const animClass = dir === 'forward' ? 'ob-slide-in-right' : 'ob-slide-in-left'

    return (
        <div className="onboard-page">
            <div className="onboard-bg">
                <div className="onboard-orb onboard-orb-1" />
                <div className="onboard-orb onboard-orb-2" />
            </div>

            <div className="onboard-container">
                {/* Logo */}
                <div className="onboard-logo">
                    <span className="onboard-logo-icon">🐼</span>
                    <span className="onboard-logo-text">FitPanda</span>
                </div>

                {/* Progress bar */}
                <div className="ob-progress-bar-wrap">
                    <div className="ob-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <p className="ob-step-counter">Step {step} of {TOTAL_STEPS}</p>

                {/* Card */}
                <div className="onboard-card" key={animKey} style={{ animation: `${animClass} 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) both` }}>
                    {/* Step emoji + header */}
                    <div className="ob-step-header">
                        <div className="ob-step-emoji">{current.emoji}</div>
                        <h1 className="onboard-title">{current.title}</h1>
                        <p className="onboard-subtitle">{current.subtitle}</p>
                    </div>

                    {error && <div className="onboard-error" role="alert">⚠ {error}</div>}

                    {/* ────── Step 1: Weight ────── */}
                    {step === 1 && (
                        <div className="ob-big-input-wrap">
                            <input
                                className="ob-big-input"
                                type="number"
                                inputMode="decimal"
                                placeholder="70"
                                min="20" max="300"
                                value={form.weight_kg}
                                onChange={e => set('weight_kg', e.target.value)}
                                autoFocus
                            />
                            <span className="ob-big-unit">kg</span>
                        </div>
                    )}

                    {/* ────── Step 2: Height ────── */}
                    {step === 2 && (
                        <div className="ob-big-input-wrap">
                            <input
                                className="ob-big-input"
                                type="number"
                                inputMode="decimal"
                                placeholder="175"
                                min="100" max="250"
                                value={form.height_cm}
                                onChange={e => set('height_cm', e.target.value)}
                                autoFocus
                            />
                            <span className="ob-big-unit">cm</span>
                        </div>
                    )}

                    {/* ────── Step 3: Age ────── */}
                    {step === 3 && (
                        <div className="ob-big-input-wrap">
                            <input
                                className="ob-big-input"
                                type="number"
                                inputMode="numeric"
                                placeholder="25"
                                min="10" max="100"
                                value={form.age}
                                onChange={e => set('age', e.target.value)}
                                autoFocus
                            />
                            <span className="ob-big-unit">yrs</span>
                        </div>
                    )}

                    {/* ────── Step 4: Gender ────── */}
                    {step === 4 && (
                        <div className="ob-big-choice-grid">
                            {[
                                { value: 'male', label: '♂ Male', emoji: '👨' },
                                { value: 'female', label: '♀ Female', emoji: '👩' },
                            ].map(g => (
                                <button
                                    key={g.value}
                                    type="button"
                                    className={`ob-big-choice ${form.gender === g.value ? 'active' : ''}`}
                                    onClick={() => set('gender', g.value)}
                                >
                                    <span className="ob-choice-emoji">{g.emoji}</span>
                                    <span className="ob-choice-label">{g.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ────── Step 5: Activity ────── */}
                    {step === 5 && (
                        <div className="ob-activity-list">
                            {ACTIVITY_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`ob-activity-row ${form.activity_level === opt.value ? 'active' : ''}`}
                                    onClick={() => set('activity_level', opt.value)}
                                >
                                    <span className="ob-act-emoji">{opt.emoji}</span>
                                    <span className="ob-act-info">
                                        <span className="ob-act-label">{opt.label}</span>
                                        <span className="ob-act-desc">{opt.desc}</span>
                                    </span>
                                    {form.activity_level === opt.value && <span className="ob-act-check">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ────── Step 6: Target Weight ────── */}
                    {step === 6 && (
                        <div className="ob-big-input-wrap">
                            <input
                                className="ob-big-input"
                                type="number"
                                inputMode="decimal"
                                placeholder="65"
                                min="20" max="300"
                                value={form.target_weight_kg}
                                onChange={e => set('target_weight_kg', e.target.value)}
                                autoFocus
                            />
                            <span className="ob-big-unit">kg</span>
                        </div>
                    )}

                    {/* ────── Step 7: Target Date + Results ────── */}
                    {step === 7 && (
                        <div className="ob-step7">
                            <div className="ob-big-input-wrap">
                                <input
                                    className="ob-big-input ob-date-input"
                                    type="date"
                                    min={MIN_DATE}
                                    value={form.target_date}
                                    onChange={e => set('target_date', e.target.value)}
                                />
                            </div>

                            {calc && (
                                <div className="calc-preview">
                                    <p className="calc-preview-title">📊 Your Personalised Plan</p>
                                    <div className="calc-grid">
                                        <div className="calc-item">
                                            <span className="calc-value">{calc.dailyCalories.toLocaleString()}</span>
                                            <span className="calc-label">Daily Calories</span>
                                        </div>
                                        <div className="calc-item">
                                            <span className="calc-value">{calc.dailyProtein}g</span>
                                            <span className="calc-label">Daily Protein</span>
                                        </div>
                                        <div className="calc-item">
                                            <span className="calc-value">{Math.round(calc.tdee).toLocaleString()}</span>
                                            <span className="calc-label">TDEE (Maintenance)</span>
                                        </div>
                                        <div className="calc-item">
                                            <span className="calc-value">{calc.dailyDeficit.toLocaleString()}</span>
                                            <span className="calc-label">{calc.isGain ? 'Daily Surplus' : 'Daily Deficit'} (kcal)</span>
                                        </div>
                                    </div>
                                    <p className="calc-summary">
                                        {calc.isGain
                                            ? `Gain ${calc.weightDelta.toFixed(1)} kg in ${calc.daysUntilGoal} days 💪`
                                            : `Lose ${calc.weightDelta.toFixed(1)} kg in ${calc.daysUntilGoal} days 🔥`}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className={`ob-nav ${step > 1 ? 'two-btn' : ''}`}>
                        {step > 1 && (
                            <button type="button" className="onboard-back-btn" onClick={goBack}>← Back</button>
                        )}
                        {step < TOTAL_STEPS ? (
                            <button
                                type="button"
                                className="onboard-next-btn"
                                onClick={goNext}
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="onboard-submit-btn"
                                onClick={handleFinish}
                                disabled={isSubmitting || !calc}
                                id="onboard-submit-btn"
                            >
                                {isSubmitting
                                    ? <><span className="ob-spinner" /> Saving…</>
                                    : 'Start My Journey 🚀'}
                            </button>
                        )}
                    </div>
                </div>

                <p className="onboard-footer">You can update these settings anytime from your profile.</p>
            </div>
        </div>
    )
}
