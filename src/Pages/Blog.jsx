import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
  Tag,
  Briefcase,
  Building2,
  Code,
  Stethoscope,
  GraduationCap,
  Truck,
  ShoppingBag,
  Banknote,
  Wrench,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const BLOG_DATA = {
  posts: [
    {
      id: 1,
      title: "Top 10 High-Paying Career Fields in 2024",
      category: "Career Advice",
      featured: true,
      excerpt:
        "Discover the most lucrative career field opportunities in today's booming market. From finance to technology, explore fields that offer excellent salaries and growth potential.",
      content: `<div class="prose prose-lg max-w-none"><h2>The Current Career Field Landscape</h2><p>The career field market continues to evolve with high-paying opportunities across various industries. Technology fields lead with software development earning $120,000+, while healthcare fields and financial analysis also command top salaries.</p><h3>Top 10 High-Paying Career Fields for 2024:</h3><ol><li><strong>Software Development Field</strong> - $120,000 - $180,000</li><li><strong>Data Science Field</strong> - $110,000 - $160,000</li><li><strong>Product Management Field</strong> - $115,000 - $170,000</li><li><strong>Financial Analysis Field</strong> - $85,000 - $130,000</li><li><strong>Healthcare Practice Field</strong> - $95,000 - $140,000</li><li><strong>Marketing Management Field</strong> - $80,000 - $125,000</li><li><strong>Sales Management Field</strong> - $90,000 - $150,000</li><li><strong>Operations Management Field</strong> - $85,000 - $135,000</li><li><strong>Human Resources Field</strong> - $75,000 - $120,000</li><li><strong>Project Management Field</strong> - $80,000 - $130,000</li></ol><h3>Skills in High Demand</h3><p>To secure these high-paying field opportunities, focus on developing these in-demand skills:</p><ul><li>Technical skills (programming, data analysis, digital marketing)</li><li>Leadership and management capabilities</li><li>Problem-solving and critical thinking</li><li>Communication and interpersonal skills</li><li>Industry-specific certifications</li></ul><p><strong>Ready to start your journey toward a high-paying career field? Browse our current field openings and take the first step today!</strong></p></div>`,
      author: "Career Expert",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      tags: ["High Salary", "Career Growth", "Field Market"],
    },
    {
      id: 2,
      title: "How to Write a Winning Resume for Career Fields in 2024",
      category: "Job Application",
      featured: false,
      excerpt:
        "Everything you need to know about creating a standout resume for career fields. Step-by-step process, required sections, and tips for a successful field application.",
      content: `<div class="prose prose-lg max-w-none"><h2>The Modern Resume: What's Changed for Career Fields</h2><p>Creating an effective resume has become more important than ever in today's competitive career field market. With applicant tracking systems (ATS) and evolving hiring practices, your resume needs to be both human and machine-readable.</p><h3>Essential Resume Sections for Career Fields</h3><ol><li><strong>Contact Information</strong> - Name, phone, email, LinkedIn profile</li><li><strong>Professional Summary</strong> - 2-3 sentences highlighting your field value</li><li><strong>Work Experience</strong> - Reverse chronological order with field achievements</li><li><strong>Skills</strong> - Technical and soft skills relevant to the field</li><li><strong>Education</strong> - Degrees, certifications, relevant field coursework</li></ol><h3>Resume Writing Best Practices for Fields</h3><ul><li><strong>Use Action Verbs:</strong> Start bullet points with strong action words</li><li><strong>Quantify Achievements:</strong> Include numbers, percentages, and metrics</li><li><strong>Tailor for Each Field:</strong> Customize your resume for specific field opportunities</li><li><strong>Keep It Concise:</strong> 1-2 pages maximum for most professionals</li><li><strong>Use Keywords:</strong> Include relevant field terms and skills</li></ul><p><strong>Ready to create your winning resume? Apply to our current field openings and put your new resume to work!</strong></p></div>`,
      author: "HR Specialist",
      publishDate: "2024-01-12",
      readTime: "8 min read",
      tags: ["Resume", "Field Application", "Career Tips"],
    },
    {
      id: 3,
      title: "Entry-Level Career Fields: Your Gateway to Professional Success",
      category: "Job Opportunities",
      featured: true,
      excerpt:
        "Explore exciting opportunities for new graduates and career changers. Learn about entry-level field opportunities, requirements, benefits, and how to apply successfully.",
      content: `<div class="prose prose-lg max-w-none"><h2>Starting Your Career Field Journey</h2><p>Entry-level field opportunities offer numerous opportunities for growth and skill development. Business operations fields, administrative service fields, and marketing fields provide excellent starting points for building professional experience and advancing your career.</p><h3>Popular Entry-Level Career Field Paths</h3><ul><li><strong>Business Operations Field</strong> - Build communication and problem-solving skills</li><li><strong>Administrative Services Field</strong> - Develop organizational and office management skills</li><li><strong>Marketing & Sales Field</strong> - Learn sales techniques and customer relationship management</li><li><strong>Information Management Field</strong> - Gain experience with databases and attention to detail</li><li><strong>Marketing Coordination Field</strong> - Start in digital marketing and content creation</li></ul><h3>Benefits of Starting Entry-Level Fields</h3><ul><li><strong>Skill Development:</strong> Learn fundamental workplace skills</li><li><strong>Career Exploration:</strong> Discover what you enjoy and excel at</li><li><strong>Professional Network:</strong> Build relationships with colleagues and mentors</li><li><strong>Growth Opportunities:</strong> Many companies promote from within</li><li><strong>Experience Building:</strong> Gain valuable work history for future field roles</li></ul><p><strong>Ready to start your career field? Browse our entry-level field openings and take the first step toward your professional future!</strong></p></div>`,
      author: "Career Counselor",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      tags: ["Entry Level", "New Graduates", "Career Start"],
    },
  ],
  categories: [
    "All",
    "Career Advice",
    "Field Opportunities",
    "Field Application",
    "Career Development",
    "Interview Tips",
    "Industry Insights",
    "Remote Work",
  ],
  sectors: [
    {
      id: 1,
      title: "Energy & Petroleum Field",
      icon: Wrench,
      gradient: "from-orange-500 to-red-600",
      roles: [
        "Energy Engineering Field",
        "Geology & Geophysics Field",
        "Operations Supervision Field",
        "Health & Safety Field",
        "Mechanical Engineering Field",
        "Project Management Field",
        "Logistics Coordination Field",
      ],
      benefits: "Attractive compensation packages and long-term career field prospects.",
    },
    {
      id: 2,
      title: "Construction & Engineering Field",
      icon: Building2,
      gradient: "from-gray-600 to-gray-800",
      roles: [
        "Civil Engineering Field",
        "Site Management Field",
        "Quantity Surveying Field",
        "Architecture Field",
        "Electrical Engineering Field",
        "Safety Management Field",
        "Project Coordination Field",
      ],
      benefits:
        "Technical expertise, project management experience, and leadership abilities are highly valued in this field.",
    },
    {
      id: 3,
      title: "Information Technology & Digital Innovation Field",
      icon: Code,
      gradient: "from-blue-500 to-indigo-600",
      roles: [
        "Software Development Field",
        "IT Support Field",
        "Cybersecurity Field",
        "Data Science Field",
        "AI Engineering Field",
        "Cloud Computing Field",
        "Web Development Field",
        "Digital Marketing Field",
      ],
      benefits: "Certifications and hands-on experience with the latest technologies are strong assets in this field.",
    },
    {
      id: 4,
      title: "Hospitality & Tourism Field",
      icon: MapPin,
      gradient: "from-pink-500 to-rose-600",
      roles: [
        "Hotel Management Field",
        "Front Desk Operations Field",
        "Housekeeping Management Field",
        "Culinary Arts Field",
        "Tour Guide Field",
        "Event Coordination Field",
        "Sales Executive Field",
        "Customer Service Field",
      ],
      benefits:
        "Excellent customer service, interpersonal skills, and multilingual abilities are highly valued in this field.",
    },
    {
      id: 5,
      title: "Finance & Banking Field",
      icon: Banknote,
      gradient: "from-green-500 to-emerald-600",
      roles: [
        "Accounting Field",
        "Auditing Field",
        "Financial Analysis Field",
        "Investment Banking Field",
        "Relationship Management Field",
        "Compliance Field",
        "Risk Management Field",
      ],
      benefits:
        "Professional certifications such as ACCA, CPA, CFA, or CMA significantly enhance prospects in this field.",
    },
    {
      id: 6,
      title: "Healthcare Field",
      icon: Stethoscope,
      gradient: "from-teal-500 to-cyan-600",
      roles: [
        "Medical Practice Field",
        "Nursing Field",
        "Pharmacy Field",
        "Medical Technology Field",
        "Physiotherapy Field",
        "Radiology Field",
        "Healthcare Administration Field",
      ],
      benefits: "Licensed professionals with relevant qualifications and experience are in high demand in this field.",
    },
    {
      id: 7,
      title: "Retail & Sales Field",
      icon: ShoppingBag,
      gradient: "from-purple-500 to-violet-600",
      roles: [
        "Store Management Field",
        "Sales Operations Field",
        "Visual Merchandising Field",
        "Marketing Coordination Field",
        "Customer Service Field",
        "E-commerce Management Field",
      ],
      benefits:
        "Strong communication skills, customer-oriented mindset, and sales experience are key to success in this field.",
    },
    {
      id: 8,
      title: "Education Field",
      icon: GraduationCap,
      gradient: "from-indigo-500 to-purple-600",
      roles: [
        "Teaching Field",
        "Academic Coordination Field",
        "University Instruction Field",
        "Early Childhood Education Field",
        "Special Education Field",
        "School Administration Field",
      ],
      benefits:
        "Relevant teaching certifications and experience with international curricula are often required in this field.",
    },
    {
      id: 9,
      title: "Logistics & Transportation Field",
      icon: Truck,
      gradient: "from-yellow-500 to-orange-600",
      roles: [
        "Logistics Coordination Field",
        "Supply Chain Management Field",
        "Warehouse Management Field",
        "Freight Forwarding Field",
        "Delivery Services Field",
        "Customs Operations Field",
      ],
      benefits:
        "Strong organizational skills, knowledge of logistics software, and efficiency in managing operations are highly valued in this field.",
    },
    {
      id: 10,
      title: "Marketing & Advertising Field",
      icon: Briefcase,
      gradient: "from-red-500 to-pink-600",
      roles: [
        "Marketing Management Field",
        "Digital Marketing Field",
        "Content Creation Field",
        "Brand Management Field",
        "Social Media Management Field",
        "Advertising Executive Field",
        "Market Research Field",
      ],
      benefits:
        "Creative thinking, digital marketing skills, and data analysis capabilities are highly sought after in this field.",
    },
  ],
}

const SectorCard = ({ sector, index, onApply }) => {
  const Icon = sector.icon
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img
          src={`/placeholder.svg?height=320&width=800&text=${encodeURIComponent(sector.title)}`}
          alt={sector.title}
          className="w-full h-full object-cover bg-gray-200"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${sector.gradient} bg-opacity-80`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="bg-white/20 p-4 rounded-full inline-block mb-4">
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {index + 1}. {sector.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Key field areas include:</span>
            </h4>
            <ul className="space-y-3">
              {sector.roles.map((role, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{role}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between">
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Tag className="h-5 w-5 text-green-600" />
                <span>Benefits & Requirements:</span>
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">{sector.benefits}</p>
            </div>
            <button
              onClick={() => onApply(sector.title)}
              className={`w-full bg-gradient-to-r ${sector.gradient} text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 text-lg`}
            >
              <span>Apply Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogPostCard = ({ post, isExpanded, onToggle, onApply, isFeatured = false }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          {isFeatured && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">Featured</span>
          )}
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
              { icon: Calendar, text: formatDate(post.publishDate) },
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
}

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
    const filtered = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory)
    setFilteredPosts(filtered)
  }, [selectedCategory, posts])

  const handleToggleReadMore = (postId) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev)
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId)
      return newSet
    })
  }

  const handleApplyNow = () => navigate("/apply")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg mb-8 max-w-md mx-auto"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
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
            Career Fields Available: Explore Diverse Professional Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover unmatched career field opportunities across a variety of industries. With a strong economy, modern
            infrastructure, competitive salaries, and high standard of living, we continue to attract talent from all
            corners of the globe.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Career Field Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our current field openings across all industries and start your application today
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

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Career Opportunities by Field</h2>
          <div className="space-y-12">
            {BLOG_DATA.sectors.map((sector, index) => (
              <SectorCard key={sector.id} sector={sector} index={index} onApply={handleApplyNow} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Career Field Insights & Tips</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Conclusion</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            The thriving and diverse economy offers abundant opportunities across a wide range of career fields. With
            its blend of modern innovation, international business environment, and world-class lifestyle, it remains a
            top destination for ambitious professionals.
          </p>
          <button
            onClick={handleApplyNow}
            className="bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-green-50 transition-colors duration-200 text-lg"
          >
            Take Your Career Field to the Next Level - Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog