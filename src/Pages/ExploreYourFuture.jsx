import { useNavigate } from "react-router-dom"
import {
  ArrowRight, Building2, Users, TrendingUp, Star, Briefcase,
  MapPin, Globe, Clock
} from "lucide-react"
import { mockJobs } from "../assets/jobsData"

const stats = (() => {
  const companies = [...new Set(mockJobs.map((job) => job.company))]
  const entryLevelJobs = mockJobs.filter((job) => ["Entry Level", "Mid-level"].includes(job.experience))
  const remoteJobs = mockJobs.filter((job) => job.location.toLowerCase().includes("remote"))
  const featuredJobs = mockJobs.filter((job) => job.featured)
  const highPayingJobs = mockJobs.filter((job) => {
    const salaryMatch = job.salary.match(/\$(\d[\d,]*)/g)
    const firstAmount = salaryMatch?.[0]?.replace(/[$,]/g, "")
    return firstAmount && parseInt(firstAmount) >= 100000
  })

  return {
    totalJobs: mockJobs.length,
    companies: companies.length,
    entryLevelJobs: entryLevelJobs.length,
    remoteJobs: remoteJobs.length,
    featuredJobs: featuredJobs.length,
    highPayingJobs: highPayingJobs.length,
    avgRating: (mockJobs.reduce((sum, job) => sum + job.rating, 0) / mockJobs.length).toFixed(1),
  }
})()

const getCategoryFromJob = (job) => {
  const title = job.title.toLowerCase()
  const categoryMap = {
    "Technology & Engineering": ["developer", "software", "engineer"],
    "Data & Analytics": ["data", "scientist", "analyst"],
    "Design & User Experience": ["designer", "ui", "ux"],
    "Product & Management": ["product", "manager"],
    "DevOps & Cloud Infrastructure": ["devops", "cloud"],
    "Mobile Development": ["mobile", "app"],
    "Quality Assurance": ["qa", "test"],
    "Technical Writing": ["writer", "technical"],
    Cybersecurity: ["security", "cyber"],
    "Energy & Petroleum": ["oil", "petroleum"],
    "Banking & Finance": ["bank"],
  }

  return (
    Object.entries(categoryMap).find(([_, keywords]) =>
      keywords.some((keyword) => title.includes(keyword))
    )?.[0] || "Other Opportunities"
  )
}

const getDescriptionForCategory = (category) => {
  const descriptions = {
    "Technology & Engineering": "Build the future with cutting-edge software development and engineering solutions",
    "Data & Analytics": "Drive insights and decision-making through data science and analytics",
    "Design & User Experience": "Create beautiful and intuitive user experiences and interfaces",
    "Product & Management": "Lead teams and drive product strategy across various industries",
    "DevOps & Cloud Infrastructure": "Manage scalable infrastructure and deployment pipelines",
    "Mobile Development": "Develop innovative mobile applications for iOS and Android platforms",
    "Quality Assurance": "Ensure software quality through comprehensive testing and automation",
    "Technical Writing": "Create clear and comprehensive technical documentation",
    Cybersecurity: "Protect organizations from security threats and vulnerabilities",
    "Energy & Petroleum": "Work in specialized energy and petroleum industry roles",
    "Banking & Finance": "Build careers in financial services and banking sectors",
  }
  return descriptions[category] || "Explore exciting opportunities in this specialized field"
}

const jobCategories = (() => {
  const categoryMap = {}

  mockJobs.forEach((job) => {
    const category = getCategoryFromJob(job)
    if (!categoryMap[category]) {
      categoryMap[category] = { jobs: [], companies: new Set(), salaries: [] }
    }
    categoryMap[category].jobs.push(job)
    categoryMap[category].companies.add(job.company)

    const salaryMatch = job.salary.match(/\$(\d[\d,]*)/g)
    if (salaryMatch?.length >= 2) {
      const min = parseInt(salaryMatch[0].replace(/[$,]/g, ""))
      const max = parseInt(salaryMatch[1].replace(/[$,]/g, ""))
      categoryMap[category].salaries.push({ min, max })
    }
  })

  return Object.entries(categoryMap).map(([title, data], index) => {
    const salaryRange =
      data.salaries.length > 0
        ? `$${Math.min(...data.salaries.map((s) => s.min)).toLocaleString()} - $${Math.max(...data.salaries.map((s) => s.max)).toLocaleString()}`
        : "$30,000 - $50,000"

    return {
      id: index + 1,
      title,
      description: getDescriptionForCategory(title),
      openings: `${data.jobs.length} opening${data.jobs.length !== 1 ? "s" : ""}`,
      salaryRange,
      companies: Array.from(data.companies).slice(0, 4),
      jobs: data.jobs,
    }
  })
})()

const EXPLORE_DATA = {
  careerFacts: [
    {
      icon: Building2,
      title: "Active Job Openings",
      description: `${stats.totalJobs} current opportunities across professional fields`,
    },
    { icon: Users, title: "Top Companies", description: `${stats.companies} leading companies actively hiring talent` },
    {
      icon: TrendingUp,
      title: "High Ratings",
      description: `${stats.avgRating}/5.0 average company rating from employees`,
    },
    {
      icon: Star,
      title: "Featured Positions",
      description: `${stats.featuredJobs} premium opportunities with top benefits`,
    },
  ],
  sections: [
    {
      title: "Exciting Job Openings Available – Apply Now!",
      subtitle: `Join leading companies with ${stats.totalJobs} current openings across technology and business`,
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-white",
      textColor: "text-green-600",
    },
    {
      title: "Entry Level Positions Available",
      subtitle: "Perfect for fresh graduates and career starters. Training and mentorship provided.",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-white",
      textColor: "text-purple-600",
      features: [
        { icon: Briefcase, text: `${stats.entryLevelJobs} Entry & Mid-Level Positions` },
        { icon: Users, text: "Mentorship & Training" },
        { icon: TrendingUp, text: "Clear Career Progression" },
      ],
    },
    {
      title: "Remote Work Opportunities",
      subtitle: `${stats.remoteJobs} flexible remote positions available across multiple fields`,
      gradient: "from-indigo-500 to-indigo-600",
      bgColor: "bg-white",
      textColor: "text-indigo-600",
      features: [
        { icon: Globe, text: "Work From Anywhere" },
        { icon: Clock, text: "Flexible Schedules" },
        { icon: TrendingUp, text: "Competitive Remote Pay" },
      ],
    },
    {
      title: "High-Paying Career Opportunities",
      subtitle: `${stats.highPayingJobs} positions offering $100,000+ with excellent benefits packages`,
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-white",
      textColor: "text-orange-600",
      features: [
        { icon: Star, text: `${stats.highPayingJobs} Six-Figure Salaries` },
        { icon: Building2, text: "Industry-Leading Companies" },
        { icon: TrendingUp, text: "Senior & Executive Roles" },
      ],
    },
    {
      title: "Part-Time & Contract Opportunities",
      subtitle: "Flexible work arrangements perfect for work-life balance",
      gradient: "from-teal-500 to-teal-600",
      bgColor: "bg-white",
      textColor: "text-teal-600",
      features: [
        { icon: Users, text: "Flexible Arrangements" },
        { icon: Clock, text: "Choose Your Hours" },
        { icon: MapPin, text: "Local & Remote Options" },
        { icon: TrendingUp, text: "Growth Opportunities" },
      ],
    },
  ],
}

const CareerFactCard = ({ fact }) => {
  const Icon = fact.icon
  return (
    <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
      <p className="text-gray-600 text-sm">{fact.description}</p>
    </div>
  )
}

const JobCategoryCard = ({ category, onApply }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 min-h-[480px] flex flex-col">
    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center text-white">
        <Briefcase className="h-16 w-16 mx-auto mb-2" />
        <h4 className="text-lg font-semibold">{category.openings}</h4>
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
      <div className="space-y-2 mb-4">
        {[
          { label: "Available Positions", value: category.openings, color: "text-green-600" },
          { label: "Salary Range", value: category.salaryRange, color: "text-blue-600" }
        ].map(({ label, value, color }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-500">{label}:</span>
            <span className={`font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Featured Companies:</p>
        <div className="flex flex-wrap gap-1">
          {category.companies.slice(0, 2).map(company => (
            <span key={company} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{company}</span>
          ))}
          {category.companies.length > 2 && <span className="text-xs text-gray-500">+{category.companies.length - 2} more</span>}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Sample Positions:</p>
        <div className="space-y-1">
          {category.jobs.slice(0, 2).map(job => (
            <div key={job.id} className="text-xs text-gray-700">
              <span className="font-medium">{job.title}</span> at {job.company}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onApply}
        aria-label={`View positions for ${category.title}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>View Positions</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
)
const ApplySection = ({ section, onApply, isReversed = false }) => {
  const visualTitles = { Entry: "Start Your Journey", High: "Premium Positions", Remote: "Work Remotely" }
  const visualDescriptions = { Entry: "Build your career with guidance", High: "Top-tier compensation", Remote: "Location independence" }

  const getVisualTitle = () => Object.entries(visualTitles).find(([key]) => section.title.includes(key))?.[1] || "Flexible Options"
  const getVisualDescription = () => Object.entries(visualDescriptions).find(([key]) => section.title.includes(key))?.[1] || "Work your way"

  const content = (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
      <p className="text-lg mb-6 opacity-90">{section.subtitle}</p>
      {section.features && (
        <div className="space-y-3 mb-8">
          {section.features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="flex items-center space-x-3">
                <Icon className="h-5 w-5 opacity-80" />
                <span>{feature.text}</span>
              </div>
            )
          })}
        </div>
      )}
      <button
        onClick={onApply}
        className={`${section.bgColor} ${section.textColor} font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-colors duration-200`}
        aria-label={`${section.features ? "Explore" : "Apply"} positions in section`}
      >
        {section.features ? "Explore Positions" : "Apply Now"}
      </button>
    </div>
  )

  const visual = section.features && (
    <div className="relative">
      <div className="bg-white/20 rounded-2xl p-8 text-center">
        <div className="bg-white/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="h-12 w-12 text-white" />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">{getVisualTitle()}</h4>
        <p className="text-white/80">{getVisualDescription()}</p>
      </div>
    </div>
  )

  return (
    <div className={`py-16 bg-gradient-to-r ${section.gradient}`}>
      <div className="max-w-6xl mx-auto px-4">
        {section.features ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {isReversed ? [visual, content] : [content, visual]}
          </div>
        ) : (
          <div className="text-center">{content}</div>
        )}
      </div>
    </div>
  )
}

const ExploreYourFuture = () => {
  const navigate = useNavigate()
  const handleApplyNow = () => navigate("/job-applications")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Your Future Career</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">Your Gateway to the Perfect Career Opportunity</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are a premier career portal dedicated to connecting professionals with the best job opportunities. Whether you are a fresh graduate, an experienced professional, or someone looking for a career change, we help you find the perfect position that matches your skills and ambitions. Currently featuring {stats.totalJobs} active opportunities across {stats.companies} leading companies.
          </p>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">Your Career Journey Starts Here</h3>
              <h4 className="text-2xl font-semibold mb-6">Real Opportunities, Real Companies</h4>
              <p className="text-lg mb-8 text-blue-100">
                Discover amazing career opportunities in today's dynamic job market. From entry-level positions to executive roles, find your perfect match among our {stats.totalJobs} current openings at {stats.companies} top companies.
              </p>
              <button
                onClick={handleApplyNow}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center space-x-2"
                aria-label="Browse job applications"
              >
                <span>Browse {stats.totalJobs} Jobs</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="bg-blue-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Your Future Career Awaits</h3>
                <p className="text-blue-100">Join thousands of professionals who have built successful careers</p>
                <div className="mt-4 text-sm text-blue-200">
                  <div>★ {stats.avgRating}/5.0 Average Company Rating</div>
                  <div>{stats.featuredJobs} Featured Premium Positions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXPLORE_DATA.careerFacts.map((fact, index) => (
              <CareerFactCard key={index} fact={fact} />
            ))}
          </div>
        </div>
      </div>

      {EXPLORE_DATA.sections.map((section, index) => (
        <ApplySection
          key={index}
          section={section}
          onApply={handleApplyNow}
          isReversed={index % 2 === 1}
        />
      ))}

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore All Career Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map(category => (
              <JobCategoryCard
                key={category.id}
                category={category}
                onApply={handleApplyNow}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their dream jobs through our platform. With {stats.totalJobs} active positions and {stats.companies} top companies, your next opportunity is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleApplyNow}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              aria-label="Browse all positions"
            >
              <span>Browse All {stats.totalJobs} Positions</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleApplyNow}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200"
              aria-label="Apply now"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreYourFuture
