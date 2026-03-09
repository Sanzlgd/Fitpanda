import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcBMR, calcTDEE, calcDailyPlan } from '../utils/calculations'
import './Onboarding.css'

const ACTIVITY_OPTIONS = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Lightly Active', desc: '1–3 days/week' },
    { value: 'moderate', label: 'Moderately Active', desc: '3–5 days/week' },
    { value: 'active', label: 'Very Active', desc: '6–7 days/week' },
    { value: 'very_active', label: 'Extra Active', desc: 'Hard daily exercise + physical job' },
]

const MIN_DATE = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().slice(0, 10)
})()

export default function Onboarding() {
    const navigate = useNavigate()
    const { saveProfile } = useAuth()

    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState({
        weight_kg: '',
        height_cm: '',
        age: '',
        gender: 'male',
        activity_level: 'moderate',
        target_weight_kg: '',
        target_date: '',
    })

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    // Live calculation — only when Step 2 fields present
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

    function validateStep1() {
        const { weight_kg, height_cm, age } = form
        if (!weight_kg || +weight_kg < 20 || +weight_kg > 300) return 'Enter a valid weight (20–300 kg).'
        if (!height_cm || +height_cm < 100 || +height_cm > 250) return 'Enter a valid height (100–250 cm).'
        if (!age || +age < 10 || +age > 100) return 'Enter a valid age (10–100).'
        return ''
    }

    function validateStep2() {
        const { target_weight_kg, target_date, weight_kg } = form
        if (!target_weight_kg || +target_weight_kg < 20 || +target_weight_kg > 300) return 'Enter a valid target weight (20–300 kg).'
        if (+target_weight_kg === +weight_kg) return 'Target weight must be different from current weight.'
        if (!target_date) return 'Please select a target date.'
        if (target_date < MIN_DATE) return 'Target date must be at least 7 days from today.'
        return ''
    }

    function handleNext() {
        const err = validateStep1()
        if (err) { setError(err); return }
        setError('')
        setStep(2)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const err = validateStep2()
        if (err) { setError(err); return }
        if (!calc) return
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

                {/* Step indicator */}
                <div className="onboard-steps">
                    <div className={`onboard-step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
                    <div className="onboard-step-line" />
                    <div className={`onboard-step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
                </div>

                <div className="onboard-card">
                    {step === 1 && (
                        <>
                            <div className="onboard-header">
                                <h1 className="onboard-title">Tell us about yourself</h1>
                                <p className="onboard-subtitle">We'll use this to personalise your calorie targets.</p>
                            </div>

                            {error && <div className="onboard-error" role="alert">⚠ {error}</div>}

                            <div className="onboard-form">
                                {/* Weight & Height row */}
                                <div className="onboard-row">
                                    <div className="onboard-group">
                                        <label className="onboard-label" htmlFor="ob-weight">Current Weight</label>
                                        <div className="onboard-input-wrap">
                                            <input id="ob-weight" className="onboard-input" type="number" name="weight_kg"
                                                placeholder="70" min="20" max="300" value={form.weight_kg} onChange={handleChange} />
                                            <span className="onboard-unit">kg</span>
                                        </div>
                                    </div>
                                    <div className="onboard-group">
                                        <label className="onboard-label" htmlFor="ob-height">Height</label>
                                        <div className="onboard-input-wrap">
                                            <input id="ob-height" className="onboard-input" type="number" name="height_cm"
                                                placeholder="175" min="100" max="250" value={form.height_cm} onChange={handleChange} />
                                            <span className="onboard-unit">cm</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Age & Gender row */}
                                <div className="onboard-row">
                                    <div className="onboard-group">
                                        <label className="onboard-label" htmlFor="ob-age">Age</label>
                                        <div className="onboard-input-wrap">
                                            <input id="ob-age" className="onboard-input" type="number" name="age"
                                                placeholder="25" min="10" max="100" value={form.age} onChange={handleChange} />
                                            <span className="onboard-unit">yrs</span>
                                        </div>
                                    </div>
                                    <div className="onboard-group">
                                        <label className="onboard-label">Gender</label>
                                        <div className="gender-toggle">
                                            {['male', 'female'].map(g => (
                                                <button key={g} type="button"
                                                    className={`gender-btn ${form.gender === g ? 'active' : ''}`}
                                                    onClick={() => setForm(p => ({ ...p, gender: g }))}>
                                                    {g === 'male' ? '♂ Male' : '♀ Female'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Activity level */}
                                <div className="onboard-group">
                                    <label className="onboard-label">Activity Level</label>
                                    <div className="activity-grid">
                                        {ACTIVITY_OPTIONS.map(opt => (
                                            <button key={opt.value} type="button"
                                                className={`activity-card ${form.activity_level === opt.value ? 'active' : ''}`}
                                                onClick={() => setForm(p => ({ ...p, activity_level: opt.value }))}>
                                                <span className="activity-label">{opt.label}</span>
                                                <span className="activity-desc">{opt.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button className="onboard-next-btn" type="button" onClick={handleNext} id="onboard-next-btn">
                                    Next — Set Your Goal →
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="onboard-header">
                                <h1 className="onboard-title">Set your goal</h1>
                                <p className="onboard-subtitle">We'll calculate your custom daily targets.</p>
                            </div>

                            {error && <div className="onboard-error" role="alert">⚠ {error}</div>}

                            <form className="onboard-form" onSubmit={handleSubmit}>
                                <div className="onboard-row">
                                    <div className="onboard-group">
                                        <label className="onboard-label" htmlFor="ob-target-weight">Target Weight</label>
                                        <div className="onboard-input-wrap">
                                            <input id="ob-target-weight" className="onboard-input" type="number" name="target_weight_kg"
                                                placeholder="65" min="20" max="300" value={form.target_weight_kg} onChange={handleChange} />
                                            <span className="onboard-unit">kg</span>
                                        </div>
                                    </div>
                                    <div className="onboard-group">
                                        <label className="onboard-label" htmlFor="ob-target-date">Target Date</label>
                                        <input id="ob-target-date" className="onboard-input" type="date" name="target_date"
                                            min={MIN_DATE} value={form.target_date} onChange={handleChange} />
                                    </div>
                                </div>

                                {/* Live Results Preview */}
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
                                                ? `Gain ${calc.weightDelta.toFixed(1)} kg in ${calc.daysUntilGoal} days by eating a ${calc.dailyDeficit} kcal/day surplus.`
                                                : `Lose ${calc.weightDelta.toFixed(1)} kg in ${calc.daysUntilGoal} days by eating ${calc.dailyCalories.toLocaleString()} kcal/day.`}
                                        </p>
                                    </div>
                                )}

                                <div className="onboard-actions">
                                    <button type="button" className="onboard-back-btn" onClick={() => setStep(1)}>← Back</button>
                                    <button type="submit" className="onboard-submit-btn" id="onboard-submit-btn" disabled={isSubmitting || !calc}>
                                        {isSubmitting ? <><span className="ob-spinner" />Saving…</> : 'Start My Journey 🚀'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <p className="onboard-footer">You can update these settings anytime from your profile.</p>
            </div>
        </div>
    )
}
