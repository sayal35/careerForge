import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowRight, User, Tag, Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BLOG_DATA = {
  posts: [
    {
      id: 1,
      title: "Top 10 High-Paying Career Fields in 2024",
      category: "Career Advice",
      featured: true,
      excerpt:
        "Discover the most lucrative career opportunities in today's booming market. From technology to finance, explore fields that offer excellent salaries and growth potential.",
      content: `<div class="prose prose-lg max-w-none">
        <h2>The Current Job Market Landscape</h2>
        <p>The job market continues to evolve with high-paying opportunities across various industries. Technology leads with software development roles earning $120,000+, while data science and product management also command top salaries.</p>
        <h3>Top High-Paying Positions Available:</h3>
        <ul><li><strong>Software Developer</strong> - $80,000 - $150,000</li><li><strong>Data Scientist</strong> - $90,000 - $160,000</li><li><strong>Product Manager</strong> - $100,000 - $180,000</li><li><strong>DevOps Engineer</strong> - $85,000 - $155,000</li><li><strong>UI/UX Designer</strong> - $70,000 - $130,000</li></ul>
        <h3>Skills in High Demand</h3>
        <ul><li>React and TypeScript proficiency</li><li>Python/R expertise for data roles</li><li>Cloud platforms (AWS/Azure/GCP)</li><li>Machine learning and AI experience</li><li>Cybersecurity and penetration testing</li><li>Mobile development (React Native/Swift/Kotlin)</li><li>Design systems and user research</li></ul>
        <p><strong>Ready to start your journey toward a high-paying career? Apply now and take the first step today!</strong></p>
      </div>`,
      author: "Career Expert",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      tags: ["High Salary", "Career Growth", "Job Market"],
    },
    {
      id: 2,
      title: "How to Write a Winning Resume for Tech Jobs in 2024",
      category: "Job Application",
      featured: false,
      excerpt:
        "Everything you need to know about creating a standout resume for technology positions. Step-by-step process, required sections, and tips for a successful application.",
      content: `<div class="prose prose-lg max-w-none"><h2>The Modern Tech Resume: What's Changed</h2><p>Creating an effective resume has become more important than ever in today's competitive tech job market. With applicant tracking systems (ATS) and evolving hiring practices, your resume needs to be both human and machine-readable.</p><h3>Essential Resume Sections for Tech Jobs</h3><ol><li><strong>Contact Information</strong> - Name, phone, email, LinkedIn profile, GitHub</li><li><strong>Professional Summary</strong> - 2-3 sentences highlighting your tech value</li><li><strong>Technical Skills</strong> - Programming languages, frameworks, tools</li><li><strong>Work Experience</strong> - Reverse chronological order with achievements</li><li><strong>Projects</strong> - Personal or professional projects with links</li><li><strong>Education</strong> - Degrees, certifications, relevant coursework</li></ol><h3>Resume Writing Best Practices for Tech Roles</h3><ul><li><strong>Use Action Verbs:</strong> "Developed", "Implemented", "Optimized", "Architected"</li><li><strong>Quantify Achievements:</strong> "Improved performance by 40%", "Reduced load time by 2 seconds"</li><li><strong>Include Keywords:</strong> Match job descriptions with relevant technologies</li><li><strong>Show Impact:</strong> Focus on business outcomes, not just technical tasks</li><li><strong>Keep It Concise:</strong> 1-2 pages maximum, even for senior roles</li></ul><p><strong>Ready to create your winning tech resume? Apply to our current openings and put your new resume to work!</strong></p></div>`,
      author: "HR Specialist",
      publishDate: "2024-01-12",
      readTime: "8 min read",
      tags: ["Resume", "Job Application", "Career Tips"],
    },
    {
      id: 3,
      title: "Entry-Level Tech Jobs: Your Gateway to Professional Success",
      category: "Job Opportunities",
      featured: true,
      excerpt:
        "Explore exciting opportunities for new graduates and career changers. Learn about entry-level positions, requirements, benefits, and how to apply successfully.",
      content: `<div class="prose prose-lg max-w-none"><h2>Starting Your Tech Career Journey</h2><p>Entry-level tech opportunities offer numerous paths for growth and skill development. From software development to quality assurance, there are excellent starting points for building professional experience.</p><h3>Popular Entry-Level Tech Career Paths</h3><ul><li><strong>Junior Software Developer</strong> - Build coding skills with mentorship</li><li><strong>QA Engineer</strong> - Learn testing methodologies and automation</li><li><strong>Technical Writer</strong> - Combine writing skills with technical knowledge</li><li><strong>Data Analyst</strong> - Start with data interpretation and visualization</li><li><strong>UI/UX Designer</strong> - Create user-centered design solutions</li></ul><h3>Benefits of Starting Entry-Level Tech Jobs</h3><ul><li><strong>Skill Development:</strong> Learn cutting-edge technologies</li><li><strong>Career Growth:</strong> Fast-paced advancement opportunities</li><li><strong>Competitive Salaries:</strong> Even entry-level positions offer good pay</li><li><strong>Remote Work:</strong> Many positions offer flexible work arrangements</li><li><strong>Innovation:</strong> Work on projects that impact millions of users</li></ul><p><strong>Ready to start your tech career? Apply now and take the first step toward your professional future!</strong></p></div>`,
      author: "Career Counselor",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      tags: ["Entry Level", "New Graduates", "Career Start"],
    },
  ],
  categories: [
    "All",
    "Career Advice",
    "Job Opportunities",
    "Job Application",
    "Career Development",
    "Interview Tips",
    "Industry Insights",
    "Remote Work",
  ],
}

const BlogPostCard = ({ post, isExpanded, onToggle, onApply, isFeatured = false }) => (
  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-3">
        {isFeatured && <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">Featured</span>}
        <span className="text-xs text-blue-600 font-medium">{post.category}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
      <div className="text-gray-600 mb-4">
        {isExpanded ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p className="line-clamp-3">{post.excerpt}</p>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          {[
            { icon: User, text: post.author },
            {
              icon: Calendar,
              text: new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center space-x-1">
              <Icon className="h-4 w-4" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{post.readTime}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onToggle(post.id)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {isExpanded && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onApply}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Briefcase className="h-4 w-4" />
            <span>Apply Now</span>
          </button>
        </div>
      )}
    </div>
  </article>
)

const Blog = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [expandedPosts, setExpandedPosts] = useState(new Set())

  useEffect(() => {
    setTimeout(() => {
      setPosts(BLOG_DATA.posts)
      setFilteredPosts(BLOG_DATA.posts)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    setFilteredPosts(selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory))
  }, [selectedCategory, posts])

  const handleToggleReadMore = (postId) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev)
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId)
      return newSet
    })
  }

  const handleApplyNow = () => {
    navigate("/apply")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg mb-8 max-w-md mx-auto"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Opportunities & Professional Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover valuable career insights, industry trends, and professional development tips to advance your
            career. Get expert advice on job applications, resume writing, and career growth strategies.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the next step in your professional development and apply for exciting career opportunities
          </p>
          <button
            onClick={handleApplyNow}
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto text-lg"
          >
            <Briefcase className="h-6 w-6" />
            <span>Apply Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Career Insights & Tips</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {BLOG_DATA.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {featuredPosts.length > 0 && selectedCategory === "All" && (
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  isExpanded={expandedPosts.has(post.id)}
                  onToggle={handleToggleReadMore}
                  onApply={handleApplyNow}
                  isFeatured
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                isExpanded={expandedPosts.has(post.id)}
                onToggle={handleToggleReadMore}
                onApply={handleApplyNow}
              />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try selecting a different category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take Action?</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Armed with these career insights and tips, you're ready to take the next step in your professional journey.
            Don't wait – start your application today and unlock new opportunities.
          </p>
          <button
            onClick={handleApplyNow}
            className="bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-green-50 transition-colors duration-200 text-lg"
          >
            Start Your Application Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
