import { useState } from "react"
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  Calendar,
  Building,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { mockJobs } from "../assets/jobsData"

const getJobCategory = (job) => {
  const title = job.title.toLowerCase()
  const categoryMap = {
    "Software Development": ["developer", "software", "engineer"],
    "Data & Analytics": ["data", "scientist", "analyst"],
    Design: ["designer", "ui", "ux"],
    Management: ["product", "manager"],
    "DevOps & Cloud": ["devops", "cloud"],
    "Mobile Development": ["mobile", "app"],
    "Quality Assurance": ["qa", "test"],
    "Technical Writing": ["writer", "technical"],
    Cybersecurity: ["security", "cyber"],
    "Energy & Petroleum": ["oil", "petroleum"],
    "Banking & Finance": ["bank"],
  }

  return (
    Object.entries(categoryMap).find(([_, keywords]) => keywords.some((keyword) => title.includes(keyword)))?.[0] ||
    "Other"
  )
}

const categories = ["All", ...new Set(mockJobs.map(getJobCategory)).values()].sort()

const JobCard = ({ job, onApply }) => {
  const jobDetails = [
    { icon: MapPin, text: job.location },
    { icon: Clock, text: job.type },
    { icon: DollarSign, text: job.salary },
    { icon: Users, text: job.experience },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {job.featured && (
                <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Featured</span>
              )}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {getJobCategory(job)}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span>{job.rating}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <Building className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <img
            src={job.image || "/placeholder.svg?height=60&width=60"}
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2 mb-4">
          {jobDetails.map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <Icon className="h-4 w-4" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits Include:</h4>
          <div className="flex flex-wrap gap-1">
            {job.benefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {benefit}
              </span>
            ))}
            {job.benefits.length > 3 && <span className="text-xs text-gray-500">+{job.benefits.length - 3} more</span>}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>
              Posted{" "}
              {new Date(job.postedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        <button
          onClick={() => onApply(job.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Apply for This Position</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const JobApplications = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const filteredJobs =
    selectedCategory === "All" ? mockJobs : mockJobs.filter((job) => getJobCategory(job) === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/explore")}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Explore</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Available Career Opportunities</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our current {mockJobs.length} job openings and start your application process today
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
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

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredJobs.length}</span> position
              {filteredJobs.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={(jobId) => navigate(`/apply?jobId=${jobId}`)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600 mb-4">Try selecting a different category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View All Positions
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See the Perfect Position?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit a general application and we'll notify you when matching positions become available
          </p>
          <button
            onClick={() => navigate("/apply")}
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Submit General Application
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobApplications
