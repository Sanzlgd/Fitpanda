import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { snoozeReminderToTomorrow } from '../utils/notifications'

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:5000/api') + '/diet'

const DietContext = createContext(null)

export function DietProvider({ children }) {
    const { isAuthenticated } = useAuth()

    const [todayLogs, setTodayLogs] = useState([])
    const [totals, setTotals] = useState({ calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 })
    const [isLoading, setIsLoading] = useState(false)

    const fetchToday = useCallback(async () => {
        if (!isAuthenticated || !user?.id) return
        try {
            const todayStr = new Date().toISOString().split('T')[0]
            const rawLogs = localStorage.getItem('fitpanda_diet_logs')
            const allLogs = rawLogs ? JSON.parse(rawLogs) : []

            // Filter logs for this user and today's date
            const logsToday = allLogs.filter(l => l.userId === user.id && l.dateString === todayStr)
            setTodayLogs(logsToday)

            // Calculate totals locally
            let c = 0, p = 0, cb = 0, f = 0
            logsToday.forEach(log => {
                c += log.calories * log.quantity
                p += log.protein_g * log.quantity
                cb += log.carbs_g * log.quantity
                f += log.fat_g * log.quantity
            })
            setTotals({
                calories: Math.round(c),
                protein_g: Math.round(p),
                carbs_g: Math.round(cb),
                fat_g: Math.round(f)
            })
        } catch (err) {
            console.error('DietContext fetchToday error:', err)
        }
    }, [isAuthenticated, user?.id])

    const logFood = useCallback(async (data) => {
        if (!user?.id) return null

        const todayStr = new Date().toISOString().split('T')[0]
        const entry = {
            ...data,
            id: 'log_' + Date.now() + Math.floor(Math.random() * 1000),
            userId: user.id,
            dateString: todayStr
        }

        // Save to LocalStorage
        const rawLogs = localStorage.getItem('fitpanda_diet_logs')
        const allLogs = rawLogs ? JSON.parse(rawLogs) : []
        allLogs.push(entry)
        localStorage.setItem('fitpanda_diet_logs', JSON.stringify(allLogs))

        // Optimistically update local state
        setTodayLogs(prev => [...prev, entry])
        setTotals(prev => ({
            calories: Math.round(prev.calories + entry.calories * entry.quantity),
            protein_g: Math.round(prev.protein_g + entry.protein_g * entry.quantity),
            carbs_g: Math.round(prev.carbs_g + entry.carbs_g * entry.quantity),
            fat_g: Math.round(prev.fat_g + entry.fat_g * entry.quantity),
        }))

        // Activity logged! Snooze warning for today
        snoozeReminderToTomorrow()

        return entry
    }, [user])

    const deleteLog = useCallback(async (id) => {
        if (!user?.id) return

        const rawLogs = localStorage.getItem('fitpanda_diet_logs')
        let allLogs = rawLogs ? JSON.parse(rawLogs) : []

        const entryIndex = allLogs.findIndex(l => l.id === id)
        if (entryIndex === -1) return

        const entry = allLogs[entryIndex]

        // Remove from local storage
        allLogs.splice(entryIndex, 1)
        localStorage.setItem('fitpanda_diet_logs', JSON.stringify(allLogs))

        // Update state
        setTodayLogs(prev => prev.filter(l => l.id !== id))
        setTotals(prev => ({
            calories: Math.max(0, Math.round(prev.calories - entry.calories * entry.quantity)),
            protein_g: Math.max(0, Math.round(prev.protein_g - entry.protein_g * entry.quantity)),
            carbs_g: Math.max(0, Math.round(prev.carbs_g - entry.carbs_g * entry.quantity)),
            fat_g: Math.max(0, Math.round(prev.fat_g - entry.fat_g * entry.quantity)),
        }))
    }, [user])

    useEffect(() => {
        if (!isAuthenticated) return
        setIsLoading(true)
        fetchToday().finally(() => setIsLoading(false))
    }, [isAuthenticated, fetchToday])

    return (
        <DietContext.Provider value={{ todayLogs, totals, isLoading, fetchToday, logFood, deleteLog }}>
            {children}
        </DietContext.Provider>
    )
}

export function useDiet() {
    const ctx = useContext(DietContext)
    if (!ctx) throw new Error('useDiet must be used within a DietProvider')
    return ctx
}
