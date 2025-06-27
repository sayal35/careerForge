import { useState, useEffect } from "react"
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard"

const AdminWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)

    const handleBeforeUnload = () => {
      if (window.location.pathname !== "/admin") {
        sessionStorage.removeItem("adminAuth")
      }
    }
    const handlePopState = () => {
      if (window.location.pathname !== "/admin") {
        sessionStorage.removeItem("adminAuth")
        setIsAuthenticated(false)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleLogin = (status) => {
    if (status) {
      setIsAuthenticated(true)
      sessionStorage.setItem("adminAuth", "authenticated")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuth")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />
}

export default AdminWrapper
