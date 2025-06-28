import { useState, useEffect } from "react"

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCredentials({ username: "", password: "" })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.username === "admin" && credentials.password === "admin123") {
      setCredentials({ username: "", password: "" })
      onLogin(true)
    } else if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Access Required</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please sign in to access the admin dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { id: "username", label: "Username", type: "text", placeholder: "Enter username" },
              { id: "password", label: "Password", type: "password", placeholder: "Enter password" }
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  value={credentials[id]}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={placeholder}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="/" className="text-sm text-blue-600 hover:text-blue-500">← Back to main site</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
