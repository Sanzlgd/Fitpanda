import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'
import './WorkoutModal.css'

// MET values for calorie estimation (kcal/min for ~70 kg person ≈ MET * 3.5 * 70 / 200)
const WORKOUT_TYPES = [
    { label: 'Running', value: 'Running', met: 9.8 },
    { label: 'Cycling', value: 'Cycling', met: 7.5 },
    { label: 'Weightlifting', value: 'Weightlifting', met: 5.0 },
    { label: 'Swimming', value: 'Swimming', met: 8.0 },
    { label: 'Yoga', value: 'Yoga', met: 3.0 },
    { label: 'Walking', value: 'Walking', met: 3.8 },
    { label: 'HIIT', value: 'HIIT', met: 10.0 },
    { label: 'Other', value: 'Other', met: 5.0 },
]

function estimateCalories(met, durationMin) {
    // Formula: MET * 3.5 * bodyWeight(kg) / 200 * duration(min)
    const weight = 70
    return Math.round(met * 3.5 * weight / 200 * durationMin)
}

export default function WorkoutModal({ onClose }) {
    const { logWorkout } = useFitness()

    const [type, setType] = useState('Running')
    const [duration, setDuration] = useState('')
    const [notes, setNotes] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const selectedType = WORKOUT_TYPES.find(t => t.value === type) || WORKOUT_TYPES[0]
    const estimatedCal = duration ? estimateCalories(selectedType.met, parseInt(duration, 10)) : 0

    async function handleSubmit(e) {
        e.preventDefault()
        if (!duration || parseInt(duration, 10) <= 0) {
            setError('Please enter a valid duration.')
            return
        }
        setIsSubmitting(true)
        setError('')
        try {
            await logWorkout({
                type,
                duration_min: parseInt(duration, 10),
                calories: estimatedCal,
                notes,
            })
            onClose()
        } catch {
            setError('Failed to log workout. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="modal-header">
                    <h2 id="modal-title" className="modal-title">🏋️ Log Workout</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
                </div>

                {error && (
                    <div className="modal-error" role="alert">⚠ {error}</div>
                )}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-group">
                        <label className="modal-label" htmlFor="workout-type">Workout Type</label>
                        <div className="workout-type-grid">
                            {WORKOUT_TYPES.map(t => (
                                <button
                                    key={t.value}
                                    type="button"
                                    className={`type-chip ${type === t.value ? 'active' : ''}`}
                                    onClick={() => setType(t.value)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="modal-form-group">
                        <label className="modal-label" htmlFor="workout-duration">Duration (minutes)</label>
                        <input
                            id="workout-duration"
                            className="modal-input"
                            type="number"
                            min="1"
                            max="480"
                            placeholder="e.g. 30"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    {duration > 0 && (
                        <div className="calorie-preview">
                            <span className="calorie-preview-icon">🔥</span>
                            <span className="calorie-preview-text">
                                ~<strong>{estimatedCal}</strong> kcal estimated
                            </span>
                        </div>
                    )}

                    <div className="modal-form-group">
                        <label className="modal-label" htmlFor="workout-notes">Notes <span className="optional">(optional)</span></label>
                        <input
                            id="workout-notes"
                            className="modal-input"
                            type="text"
                            placeholder="e.g. Morning jog at the park"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            disabled={isSubmitting}
                            maxLength={120}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-log" id="workout-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <><span className="modal-spinner" />Logging…</>
                            ) : (
                                'Log Workout'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
