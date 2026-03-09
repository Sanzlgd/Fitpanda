import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { snoozeReminderToTomorrow } from '../utils/notifications'

const FitnessContext = createContext(null)

export function FitnessProvider({ children }) {
    const { isAuthenticated, user } = useAuth()

    const [todayLog, setTodayLog] = useState(null)
    const [weekData, setWeekData] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Helper: Get or initialize today's log in localStorage
    const getTodayLogOffline = useCallback(() => {
        if (!user?.id) return null
        const todayStr = new Date().toISOString().split('T')[0]
        const rawLogs = localStorage.getItem('fitpanda_fitness_logs')
        const logs = rawLogs ? JSON.parse(rawLogs) : {}

        if (!logs[user.id]) logs[user.id] = {}

        if (!logs[user.id][todayStr]) {
            logs[user.id][todayStr] = {
                id: 'fit_' + todayStr,
                date: todayStr,
                steps: 0,
                water_ml: 0,
                calories_burned: 0
            }
            localStorage.setItem('fitpanda_fitness_logs', JSON.stringify(logs))
        }
        return logs[user.id][todayStr]
    }, [user])


    const fetchToday = useCallback(async () => {
        if (!isAuthenticated || !user?.id) return
        try {
            const todayData = getTodayLogOffline()
            setTodayLog(todayData)
        } catch (err) {
            console.error('fetchToday error:', err)
        }
    }, [isAuthenticated, user?.id, getTodayLogOffline])

    const fetchWeek = useCallback(async () => {
        if (!isAuthenticated || !user?.id) return
        try {
            const rawLogs = localStorage.getItem('fitpanda_fitness_logs')
            const logs = rawLogs ? JSON.parse(rawLogs) : {}
            const userLogs = logs[user.id] || {}

            // Get last 7 days
            const week = []
            for (let i = 6; i >= 0; i--) {
                const d = new Date()
                d.setDate(d.getDate() - i)
                const dateStr = d.toISOString().split('T')[0]
                week.push(userLogs[dateStr] || { date: dateStr, steps: 0, water_ml: 0, calories_burned: 0 })
            }
            // Reverse so newest is first, or keep ascending? Dashboard usually wants ascending.
            setWeekData(week)
        } catch (err) {
            console.error('fetchWeek error:', err)
        }
    }, [isAuthenticated, user?.id])

    const fetchWorkouts = useCallback(async () => {
        if (!isAuthenticated || !user?.id) return
        try {
            const rawWorkouts = localStorage.getItem('fitpanda_workouts')
            const allWorkouts = rawWorkouts ? JSON.parse(rawWorkouts) : []

            // Filter workouts for current user, sort by newest
            const userWorkouts = allWorkouts
                .filter(w => w.userId === user.id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            setWorkouts(userWorkouts)
        } catch (err) {
            console.error('fetchWorkouts error:', err)
        }
    }, [isAuthenticated, user?.id])

    // Update water or steps for today
    const updateToday = useCallback(async (patch) => {
        if (!user?.id) return
        try {
            const todayStr = new Date().toISOString().split('T')[0]
            const rawLogs = localStorage.getItem('fitpanda_fitness_logs')
            const logs = rawLogs ? JSON.parse(rawLogs) : {}

            if (!logs[user.id]) logs[user.id] = {}
            if (!logs[user.id][todayStr]) {
                logs[user.id][todayStr] = { date: todayStr, steps: 0, water_ml: 0, calories_burned: 0 }
            }

            const updatedLog = { ...logs[user.id][todayStr], ...patch }
            logs[user.id][todayStr] = updatedLog
            localStorage.setItem('fitpanda_fitness_logs', JSON.stringify(logs))

            setTodayLog(updatedLog)

            // Update week data with new today value
            setWeekData(prev => prev.map(d => d.date === todayStr ? updatedLog : d))
        } catch (err) {
            console.error('updateToday error:', err)
            throw err
        }
    }, [user])

    // Log a new workout
    const logWorkout = useCallback(async (data) => {
        if (!user?.id) return
        try {
            const todayStr = new Date().toISOString().split('T')[0]

            // 1. Save Workout
            const newWorkout = {
                ...data,
                id: 'wk_' + Date.now(),
                userId: user.id,
                created_at: new Date().toISOString()
            }
            const rawWorkouts = localStorage.getItem('fitpanda_workouts')
            const allWorkouts = rawWorkouts ? JSON.parse(rawWorkouts) : []
            allWorkouts.unshift(newWorkout) // Add to top
            localStorage.setItem('fitpanda_workouts', JSON.stringify(allWorkouts))

            // 2. Add calories to Today's Fitness Log
            const rawLogs = localStorage.getItem('fitpanda_fitness_logs')
            const logs = rawLogs ? JSON.parse(rawLogs) : {}
            if (!logs[user.id]) logs[user.id] = {}
            if (!logs[user.id][todayStr]) {
                logs[user.id][todayStr] = { date: todayStr, steps: 0, water_ml: 0, calories_burned: 0 }
            }

            logs[user.id][todayStr].calories_burned += (data.calories || 0)
            const updatedLog = logs[user.id][todayStr]
            localStorage.setItem('fitpanda_fitness_logs', JSON.stringify(logs))

            // Update React State
            setWorkouts(prev => [newWorkout, ...prev])
            setTodayLog(updatedLog)
            setWeekData(prev => prev.map(d => d.date === todayStr ? updatedLog : d))

            // Activity logged! Snooze warning for today
            snoozeReminderToTomorrow()

        } catch (err) {
            console.error('logWorkout error:', err)
            throw err
        }
    }, [user])


    // Auto-fetch all data when user logs in
    useEffect(() => {
        if (!isAuthenticated) return
        setIsLoading(true)
        Promise.all([fetchToday(), fetchWeek(), fetchWorkouts()])
            .finally(() => setIsLoading(false))
    }, [isAuthenticated, fetchToday, fetchWeek, fetchWorkouts])

    const value = {
        todayLog,
        weekData,
        workouts,
        isLoading,
        fetchToday,
        fetchWeek,
        fetchWorkouts,
        updateToday,
        logWorkout,
    }

    return (
        <FitnessContext.Provider value={value}>
            {children}
        </FitnessContext.Provider>
    )
}

export function useFitness() {
    const ctx = useContext(FitnessContext)
    if (!ctx) throw new Error('useFitness must be used within a FitnessProvider')
    return ctx
}
