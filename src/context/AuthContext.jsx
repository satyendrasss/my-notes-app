import React, { createContext, useContext, useState, useCallback } from 'react'
import {
  findUserById,
  getSession,
  loginUser,
  registerUser,
  setSession,
} from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const sessionId = getSession()
    return sessionId ? findUserById(sessionId) : null
  })

  const login = useCallback((email, password) => {
    const found = loginUser({ email, password })
    setSession(found.id)
    setUser(found)
    return found
  }, [])

  const register = useCallback((name, email, password) => {
    const created = registerUser({ name, email, password })
    setSession(created.id)
    setUser(created)
    return created
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
