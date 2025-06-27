"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "../contexts/AdminAuthContext"
import {
  BarChart3,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Clock,
  AlertTriangle,
} from "lucide-react"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { logout, adminUser, hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalPosts: 12,
    totalComments: 45,
    totalViews: 1250,
    totalApplications: 89,
  })

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout()
      navigate("/")
    }
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3, permission: "read" },
    { id: "posts", label: "Blog Posts", icon: FileText, permission: "write" },
    { id: "comments", label: "Comments", icon: MessageSquare, permission: "write" },
    { id: "applications", label: "Applications", icon: Users, permission: "read" },
    { id: "settings", label: "Settings", icon: Settings, permission: "manage_users" },
  ]

  // Filter menu items based on permissions
  const allowedMenuItems = menuItems.filter((item) => hasPermission(item.permission))

  const AdminHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {adminUser?.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Session Active</p>
            <p className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Expires in 8 hours
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </div>
    </div>
  )

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="bg-green-100 px-3 py-1 rounded-full">
          <span className="text-green-800 text-sm font-medium">● System Online</span>
        </div>
      </div>

      {/* Security Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Security Notice</span>
        </div>
        <p className="text-yellow-700 text-sm mt-1">
          You are logged in as an administrator. All actions are logged and monitored.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Posts", value: stats.totalPosts, icon: FileText, color: "blue" },
          { label: "Total Comments", value: stats.totalComments, icon: MessageSquare, color: "green" },
          { label: "Total Views", value: stats.totalViews, icon: Eye, color: "purple" },
          { label: "Applications", value: stats.totalApplications, icon: Users, color: "orange" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Admin Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Admin Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hasPermission("write") && (
            <button
              onClick={() => setActiveTab("posts")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Post</span>
            </button>
          )}
          {hasPermission("write") && (
            <button
              onClick={() => setActiveTab("comments")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Moderate Comments</span>
            </button>
          )}
          {hasPermission("read") && (
            <button
              onClick={() => setActiveTab("applications")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Review Applications</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const PostsTab = () => {
    if (!hasPermission("write")) {
      return (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to manage blog posts.</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts Management</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    title: "Top 10 High-Paying Career Fields in 2024",
                    category: "Career Advice",
                    status: "Published",
                    date: "2024-01-15",
                  },
                  {
                    id: 2,
                    title: "How to Write a Winning Resume for Tech Jobs",
                    category: "Job Application",
                    status: "Draft",
                    date: "2024-01-12",
                  },
                ].map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        {hasPermission("delete") && (
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "posts":
        return <PostsTab />
      case "comments":
        return hasPermission("write") ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">Comments management interface...</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
            <p className="text-gray-600">You don't have permission to manage comments.</p>
          </div>
        )
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <nav className="mt-6">
            {allowedMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
