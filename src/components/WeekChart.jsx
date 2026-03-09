import { useEffect, useRef } from 'react'
import './WeekChart.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeekChart({ data }) {
    const barsRef = useRef([])

    const maxVal = Math.max(...data.map(d => d.calories_burned), 1)

    // Animate bars in on mount
    useEffect(() => {
        barsRef.current.forEach((bar, i) => {
            if (!bar) return
            const pct = data[i] ? (data[i].calories_burned / maxVal) * 100 : 0
            // Start at 0, animate to target height
            bar.style.height = '0%'
            setTimeout(() => {
                bar.style.height = `${pct}%`
            }, 50 + i * 60)
        })
    }, [data, maxVal])

    const today = new Date().toISOString().slice(0, 10)

    return (
        <div className="week-chart">
            <div className="chart-bars">
                {data.map((day, i) => {
                    const pct = (day.calories_burned / maxVal) * 100
                    const isToday = day.date === today
                    const dayLabel = DAYS[new Date(day.date + 'T12:00:00').getDay()]
                    return (
                        <div key={day.date} className="chart-col">
                            <div className="bar-track">
                                <div
                                    className={`bar-fill ${isToday ? 'bar-today' : ''}`}
                                    ref={el => barsRef.current[i] = el}
                                    style={{ height: `${pct}%` }}
                                    title={`${day.calories_burned} kcal`}
                                />
                            </div>
                            <span className={`bar-value ${day.calories_burned === 0 ? 'bar-value-zero' : ''}`}>
                                {day.calories_burned > 0 ? day.calories_burned : ''}
                            </span>
                            <span className={`bar-label ${isToday ? 'bar-label-today' : ''}`}>
                                {isToday ? 'Today' : dayLabel}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
