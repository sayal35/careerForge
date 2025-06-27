import { useState, useEffect } from "react"

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React development and build your first component.",
      status: "published",
      author: "Admin",
      date: "2024-01-15",
      views: 245,
      comments: 12,
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      excerpt: "Deep dive into advanced JS topics like closures, promises, and async/await.",
      status: "draft",
      author: "Admin",
      date: "2024-01-14",
      views: 0,
      comments: 0,
    },
    {
      id: 3,
      title: "Building Modern Web Apps",
      excerpt: "Best practices for modern web development with latest technologies.",
      status: "published",
      author: "Admin",
      date: "2024-01-13",
      views: 189,
      comments: 8,
    },
  ])

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      post: "Getting Started with React",
      comment:
        "Great tutorial! Very helpful for beginners. I was able to follow along easily and build my first React component.",
      date: "2024-01-15",
      status: "approved",
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      post: "Building Modern Web Apps",
      comment:
        "Could you add more examples? The concepts are good but need more practical examples to understand better.",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      author: "Bob Wilson",
      email: "bob@example.com",
      post: "Advanced JavaScript Concepts",
      comment: "This is spam content with promotional links and irrelevant information...",
      date: "2024-01-13",
      status: "spam",
    },
  ])

  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "", status: "draft" })

  useEffect(() => {
    document.title = "Admin Dashboard - CareerForge"

    return () => {
      document.title = "CareerForge"
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    onLogout()
  }

  const handleBackToSite = () => {
    sessionStorage.removeItem("adminAuth")
    window.location.href = "/"
  }

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
    draftPosts: posts.filter((p) => p.status === "draft").length,
    totalComments: comments.length,
    pendingComments: comments.filter((c) => c.status === "pending").length,
    approvedComments: comments.filter((c) => c.status === "approved").length,
    spamComments: comments.filter((c) => c.status === "spam").length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
  }

  const handleCreatePost = () => {
    if (newPost.title && newPost.excerpt) {
      setPosts([
        {
          id: posts.length + 1,
          ...newPost,
          author: "Admin",
          date: new Date().toISOString().split("T")[0],
          views: 0,
          comments: 0,
        },
        ...posts,
      ])
      setNewPost({ title: "", excerpt: "", content: "", status: "draft" })
      setShowCreatePost(false)
    }
  }

  const handleDeletePost = (postId) => setPosts(posts.filter((post) => post.id !== postId))
  const handleCommentAction = (commentId, action) =>
    setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, status: action } : comment)))
  const handleDeleteComment = (commentId) => setComments(comments.filter((comment) => comment.id !== commentId))

  const StatCard = ({ icon, title, value, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <svg className={`w-6 h-6 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  const StatusBadge = ({ status }) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      spam: "bg-red-100 text-red-800",
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>
  }

  const Modal = ({ show, onClose, title, children }) =>
    show && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <h3 className="text-lg font-medium mb-4">{title}</h3>
          {children}
        </div>
      </div>
    )

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "posts", label: "Blog Posts" },
    { id: "comments", label: "Comments" },
    { id: "analytics", label: "Analytics" },
  ]

  const overviewStats = [
    {
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      title: "Total Posts",
      value: stats.totalPosts,
      color: "blue",
    },
    {
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      title: "Total Comments",
      value: stats.totalComments,
      color: "green",
    },
    {
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      color: "purple",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Pending Comments",
      value: stats.pendingComments,
      color: "yellow",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your blog content and interactions</p>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 font-medium">Active Session</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, <strong>Admin</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
              <button
                onClick={handleBackToSite}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Site</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex space-x-8 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Recent Posts",
                  data: posts.slice(0, 3),
                  renderItem: (post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{post.title}</p>
                        <p className="text-sm text-gray-500">
                          {post.date} • {post.views} views
                        </p>
                      </div>
                      <StatusBadge status={post.status} />
                    </div>
                  ),
                },
                {
                  title: "Recent Comments",
                  data: comments.slice(0, 3),
                  renderItem: (comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                        <StatusBadge status={comment.status} />
                      </div>
                      <p className="text-sm text-gray-600 truncate">{comment.comment}</p>
                    </div>
                  ),
                },
              ].map((section, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">{section.data.map(section.renderItem)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + New Post
              </button>
            </div>

            <Modal show={showCreatePost} onClose={() => setShowCreatePost(false)} title="Create New Post">
              <div className="space-y-4">
                {[
                  { label: "Title", key: "title", type: "input", placeholder: "Enter post title..." },
                  { label: "Excerpt", key: "excerpt", type: "textarea", rows: 3, placeholder: "Brief description..." },
                  {
                    label: "Content",
                    key: "content",
                    type: "textarea",
                    rows: 6,
                    placeholder: "Write your post content...",
                  },
                  {
                    label: "Status",
                    key: "status",
                    type: "select",
                    options: [
                      { value: "draft", label: "Draft" },
                      { value: "published", label: "Published" },
                    ],
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        value={newPost[field.key]}
                        onChange={(e) => setNewPost({ ...newPost, [field.key]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={newPost[field.key]}
                        onChange={(e) => setNewPost({ ...newPost, [field.key]: e.target.value })}
                        rows={field.rows}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        value={newPost[field.key]}
                        onChange={(e) => setNewPost({ ...newPost, [field.key]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Post
                </button>
              </div>
            </Modal>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Title", "Status", "Date", "Views", "Actions"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">{post.excerpt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{post.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{post.views}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Comments Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total", value: stats.totalComments, color: "text-gray-900" },
                { label: "Pending", value: stats.pendingComments, color: "text-yellow-600" },
                { label: "Approved", value: stats.approvedComments, color: "text-green-600" },
                { label: "Spam", value: stats.spamComments, color: "text-red-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Author", "Comment", "Post", "Status", "Actions"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{comment.author}</div>
                        <div className="text-sm text-gray-500">{comment.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{comment.comment}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{comment.post}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={comment.status} />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {comment.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleCommentAction(comment.id, "approved")}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleCommentAction(comment.id, "spam")}
                              className="text-red-600 hover:text-red-900 mr-3"
                            >
                              Spam
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Content Overview",
                  data: [
                    ["Published Posts", stats.publishedPosts],
                    ["Draft Posts", stats.draftPosts],
                    ["Total Views", stats.totalViews.toLocaleString()],
                    ["Avg. Views per Post", Math.round(stats.totalViews / stats.publishedPosts) || 0],
                  ],
                },
                {
                  title: "Engagement",
                  data: [
                    ["Total Comments", stats.totalComments],
                    ["Approved Comments", stats.approvedComments, "text-green-600"],
                    ["Pending Review", stats.pendingComments, "text-yellow-600"],
                    ["Spam Blocked", stats.spamComments, "text-red-600"],
                  ],
                },
              ].map((section, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.data.map(([label, value, color], j) => (
                      <div key={j} className="flex justify-between">
                        <span className="text-gray-600">{label}</span>
                        <span className={`font-medium ${color || ""}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
