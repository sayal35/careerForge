"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAdminAuth } from "../contexts/AdminAuthContext"
import { Lock, User, Eye, EyeOff, AlertCircle, Shield } from "lucide-react"

const AdminLogin = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useAdminAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)

  const returnUrl = searchParams.get("returnUrl") || "/admin/dashboard"

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate(returnUrl, { replace: true })
    }
  }, [isAuthenticated, navigate, returnUrl])

  useEffect(() => {
    // Block after 3 failed attempts for 5 minutes
    if (attempts >= 3) {
      setIsBlocked(true)
      const timer = setTimeout(
        () => {
          setIsBlocked(false)
          setAttempts(0)
        },
        5 * 60 * 1000,
      ) // 5 minutes

      return () => clearTimeout(timer)
    }
  }, [attempts])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isBlocked) {
      setError("Too many failed attempts. Please try again later.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await login(formData.username, formData.password)

      if (result.success) {
        navigate(returnUrl, { replace: true })
      } else {
        setError(result.error)
        setAttempts((prev) => prev + 1)
      }
    } catch (err) {
      setError("Login failed. Please try again.")
      setAttempts((prev) => prev + 1)
    }

    setIsLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Security Warning */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 text-red-400">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Restricted Access Area</span>
          </div>
          <p className="text-red-300 text-xs mt-1">Authorized personnel only. All access attempts are logged.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
              <Lock className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Administrator Access</h1>
            <p className="text-blue-200 mt-2">Secure login required</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {isBlocked && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">Account temporarily locked due to multiple failed attempts.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Administrator Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isBlocked}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-blue-200 disabled:opacity-50"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isBlocked}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-blue-200 disabled:opacity-50"
                  placeholder="Enter secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                  disabled={isBlocked}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-blue-300">Failed attempts: {attempts}/3 • Session expires in 8 hours</p>
          </div>

          {/* Development credentials notice - remove in production */}
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-300 text-center">
              <strong>Dev Mode:</strong> admin / SecureAdmin2024!
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-blue-300">
            🔒 This is a secure area. All login attempts are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
