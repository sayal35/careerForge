"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState(null)

  // Admin credentials - In production, this should be handled by your backend
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "SecureAdmin2024!",
    role: "super_admin",
    permissions: ["read", "write", "delete", "manage_users"],
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const authData = localStorage.getItem("adminAuth")
      const sessionExpiry = localStorage.getItem("adminSessionExpiry")

      if (authData && sessionExpiry) {
        const currentTime = new Date().getTime()
        const expiryTime = Number.parseInt(sessionExpiry)

        if (currentTime < expiryTime) {
          const parsedAuthData = JSON.parse(authData)
          setIsAuthenticated(true)
          setAdminUser(parsedAuthData)
        } else {
          // Session expired
          logout()
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const adminData = {
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role,
          permissions: ADMIN_CREDENTIALS.permissions,
          loginTime: new Date().toISOString(),
        }

        // Set session expiry to 8 hours
        const expiryTime = new Date().getTime() + 8 * 60 * 60 * 1000

        localStorage.setItem("adminAuth", JSON.stringify(adminData))
        localStorage.setItem("adminSessionExpiry", expiryTime.toString())

        setIsAuthenticated(true)
        setAdminUser(adminData)

        return { success: true }
      } else {
        return { success: false, error: "Invalid credentials" }
      }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminSessionExpiry")
    setIsAuthenticated(false)
    setAdminUser(null)
  }

  const hasPermission = (permission) => {
    return adminUser?.permissions?.includes(permission) || false
  }

  const value = {
    isAuthenticated,
    isLoading,
    adminUser,
    login,
    logout,
    hasPermission,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}
