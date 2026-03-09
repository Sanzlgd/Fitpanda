import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const TOKEN_KEY = 'fitpanda_token'
const USER_KEY = 'fitpanda_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // ── Session helpers ───────────────────────────────────────────
    function persistSession(tok, usr) {
        localStorage.setItem(TOKEN_KEY, tok)
        localStorage.setItem(USER_KEY, JSON.stringify(usr))
        setToken(tok)
        setUser(usr)
        setIsAuthenticated(true)
    }

    function clearSession() {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
        setProfile(null)
        setIsAuthenticated(false)
    }

    // ── Fetch profile from localStorage ─────────────────────────────────────
    const fetchProfile = useCallback((userId) => {
        const idToFetch = userId || user?.id
        if (!idToFetch) return

        try {
            const rawProfiles = localStorage.getItem('fitpanda_profiles')
            const profiles = rawProfiles ? JSON.parse(rawProfiles) : {}
            setProfile(profiles[idToFetch] || null)
        } catch {
            setProfile(null)
        }
    }, [user?.id])

    // ── On mount: restore session from localStorage ────────────────
    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY)
        const savedUser = localStorage.getItem(USER_KEY)
        if (savedToken && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser)
                setToken(savedToken)
                setUser(parsedUser)
                setIsAuthenticated(true)
                // Fetch profile synchronously
                const rawProfiles = localStorage.getItem('fitpanda_profiles')
                const profiles = rawProfiles ? JSON.parse(rawProfiles) : {}
                setProfile(profiles[parsedUser.id] || null)
            } catch {
                clearSession()
            }
        }
        setIsLoading(false)
    }, [])

    // ── Auth actions (100% Offline) ───────────────────────────────────────────────
    const signup = useCallback(async (name, email, password) => {
        // Read existing users
        const rawUsers = localStorage.getItem('fitpanda_users')
        const users = rawUsers ? JSON.parse(rawUsers) : []

        // Check if email exists
        if (users.find(u => u.email === email)) {
            throw new Error("User already exists with this email")
        }

        // Create new offline user (mocking password hash with plain text for this local-only version since there is no backend security to breach)
        const newUser = {
            id: 'usr_' + Date.now(),
            name,
            email,
            passwordHash: password // Mock
        }

        users.push(newUser)
        localStorage.setItem('fitpanda_users', JSON.stringify(users))

        const mockToken = 'local_token_' + Date.now()

        // Exclude password from active session
        const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email }
        persistSession(mockToken, sessionUser)
        setProfile(null)

        return { token: mockToken, user: sessionUser }
    }, [])

    const login = useCallback(async (email, password) => {
        const rawUsers = localStorage.getItem('fitpanda_users')
        const users = rawUsers ? JSON.parse(rawUsers) : []

        const foundUser = users.find(u => u.email === email && u.passwordHash === password)
        if (!foundUser) {
            throw new Error("Invalid email or password")
        }

        const mockToken = 'local_token_' + Date.now()
        const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email }

        persistSession(mockToken, sessionUser)
        fetchProfile(foundUser.id)

        return { token: mockToken, user: sessionUser }
    }, [fetchProfile])

    const logout = useCallback(() => {
        clearSession()
    }, [])

    const [isHeavyLiftDay, setIsHeavyLiftDay] = useState(false)

    // Save / update onboarding profile to localStorage
    const saveProfile = useCallback(async (data) => {
        if (!user) throw new Error("Not logged in")

        const rawProfiles = localStorage.getItem('fitpanda_profiles')
        const profiles = rawProfiles ? JSON.parse(rawProfiles) : {}

        profiles[user.id] = data
        localStorage.setItem('fitpanda_profiles', JSON.stringify(profiles))

        setProfile(data)
        return data
    }, [user])

    // Dynamic metrics based on Heavy Lift toggle
    const dynamicTargets = {
        calories: profile ? (isHeavyLiftDay ? profile.daily_calories + 300 : profile.daily_calories) : 0,
        protein: profile ? profile.daily_protein : 0, // Base protein stays the same
        addedCarbs: isHeavyLiftDay ? 50 : 0 // +50g carbs on heavy lift days
    }

    const value = {
        user, token, profile, isLoading, isAuthenticated,
        signup, login, logout, saveProfile, fetchProfile,
        setProfile,
        isHeavyLiftDay, setIsHeavyLiftDay, dynamicTargets
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
