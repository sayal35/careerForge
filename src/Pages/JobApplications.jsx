import { useState } from "react"
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Users, Star, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const JOB_DATA = {
  roles: [
    {
      id: 1,
      title: "Business Operations Field",
      company: "TechCorp Solutions",
      location: "Remote / On-site",
      type: "Full-time",
      salary: "$35,000 - $45,000",
      experience: "Entry Level",
      category: "Business Operations",
      description:
        "Handle business operations, resolve operational issues, and provide excellent service across multiple channels.",
      requirements: [
        "Business administration background",
        "Strong communication skills",
        "Computer proficiency",
        "Problem-solving abilities",
      ],
      benefits: ["Health insurance", "Paid time off", "Training provided", "Career advancement"],
      urgent: false,
    },
    {
      id: 2,
      title: "Marketing & Sales Field",
      company: "Retail Plus",
      location: "Multiple Locations",
      type: "Part-time / Full-time",
      salary: "$28,000 - $40,000",
      experience: "Entry Level",
      category: "Marketing & Sales",
      description:
        "Develop marketing strategies, manage sales processes, maintain client relationships, and achieve targets.",
      requirements: ["Marketing experience preferred", "Flexible schedule", "Team player", "Sales-oriented mindset"],
      benefits: ["Employee discount", "Flexible hours", "Commission opportunities", "Health benefits"],
      urgent: true,
    },
    {
      id: 3,
      title: "Administrative Services Field",
      company: "Business Solutions Inc",
      location: "Office-based",
      type: "Full-time",
      salary: "$32,000 - $42,000",
      experience: "1-2 years",
      category: "Administrative Services",
      description:
        "Provide administrative support, manage office operations, handle correspondence, and maintain business processes.",
      requirements: [
        "Office administration experience",
        "Microsoft Office proficiency",
        "Organizational skills",
        "Professional communication",
      ],
      benefits: ["Health insurance", "Retirement plan", "Paid holidays", "Professional development"],
      urgent: false,
    },
    {
      id: 4,
      title: "Supply Chain & Logistics Field",
      company: "Logistics Pro",
      location: "Warehouse Facility",
      type: "Full-time",
      salary: "$30,000 - $38,000",
      experience: "Entry Level",
      category: "Supply Chain & Logistics",
      description: "Manage supply chain operations, coordinate logistics, and maintain inventory systems.",
      requirements: [
        "Physical ability for operations",
        "Attention to detail",
        "Team collaboration",
        "Safety-conscious",
      ],
      benefits: ["Health coverage", "Overtime opportunities", "Safety training", "Career growth"],
      urgent: true,
    },
    {
      id: 5,
      title: "Information Management Field",
      company: "InfoTech Services",
      location: "Remote",
      type: "Part-time / Full-time",
      salary: "$25,000 - $35,000",
      experience: "Entry Level",
      category: "Information Management",
      description: "Manage information systems, verify data accuracy, and maintain database integrity.",
      requirements: ["Data management skills", "Attention to detail", "Computer skills", "Data accuracy focus"],
      benefits: ["Remote work", "Flexible schedule", "Training provided", "Growth opportunities"],
      urgent: false,
    },
    {
      id: 6,
      title: "Hospitality Services Field",
      company: "Fine Dining Group",
      location: "Service Locations",
      type: "Part-time / Full-time",
      salary: "$25,000 - $35,000 + Tips",
      experience: "Entry Level",
      category: "Hospitality Services",
      description:
        "Provide hospitality services, manage customer experience, deliver excellent service in hospitality environment.",
      requirements: ["Customer service skills", "Flexible schedule", "Team player", "Professional appearance"],
      benefits: ["Tips", "Service discounts", "Flexible hours", "Advancement opportunities"],
      urgent: true,
    },
    {
      id: 7,
      title: "Transportation Services Field",
      company: "Quick Delivery Co",
      location: "Local Routes",
      type: "Part-time / Full-time",
      salary: "$30,000 - $45,000",
      experience: "Entry Level",
      category: "Transportation Services",
      description: "Manage transportation services, maintain delivery schedules, and provide customer service.",
      requirements: [
        "Valid driver's license",
        "Clean driving record",
        "Own vehicle preferred",
        "GPS navigation skills",
      ],
      benefits: ["Mileage reimbursement", "Flexible schedule", "Performance bonuses", "Insurance coverage"],
      urgent: false,
    },
    {
      id: 8,
      title: "Client Relations Field",
      company: "Professional Services LLC",
      location: "Office Front Desk",
      type: "Full-time",
      salary: "$28,000 - $36,000",
      experience: "Entry Level",
      category: "Client Relations",
      description: "Manage client relations, handle communications, schedule appointments, and provide client support.",
      requirements: ["Professional demeanor", "Communication skills", "Computer skills", "Multitasking ability"],
      benefits: ["Health insurance", "Paid time off", "Professional environment", "Skill development"],
      urgent: false,
    },
  ],
  categories: [
    "All",
    "Business Operations",
    "Marketing & Sales",
    "Administrative Services",
    "Supply Chain & Logistics",
    "Information Management",
    "Hospitality Services",
    "Transportation Services",
    "Client Relations",
  ],
}

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
              {job.urgent && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Urgent</span>
              )}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {job.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
          <Briefcase className="h-8 w-8 text-blue-600 flex-shrink-0" />
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

        {[
          { title: "Key Requirements", items: job.requirements, icon: Star, color: "text-yellow-500" },
          { title: "Benefits Include", items: job.benefits, color: "text-green-800", bgColor: "bg-green-100" },
        ].map(({ title, items, icon: Icon, color, bgColor }) => (
          <div key={title} className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}:</h4>
            {Icon ? (
              <ul className="text-xs text-gray-600 space-y-1">
                {items.slice(0, 2).map((item, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <Icon className={`h-3 w-3 ${color}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-1">
                {items.slice(0, 2).map((item, index) => (
                  <span key={index} className={`text-xs ${bgColor} ${color} px-2 py-1 rounded-full`}>
                    {item}
                  </span>
                ))}
                {items.length > 2 && <span className="text-xs text-gray-500">+{items.length - 2} more</span>}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => onApply(job.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Apply for This Field</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  </div>
)

const EmptyState = ({ onShowAll }) => (
  <div className="text-center py-12">
    <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No fields found</h3>
    <p className="text-gray-600 mb-4">Try selecting a different category.</p>
    <button
      onClick={onShowAll}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
    >
      View All Fields
    </button>
  </div>
)

const JobApplications = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredJobs =
    selectedCategory === "All" ? JOB_DATA.roles : JOB_DATA.roles.filter((job) => job.category === selectedCategory)

  const handleApplyForJob = (jobId) => navigate(`/apply?jobId=${jobId}`)
  const handleBackToExplore = () => navigate("/explore")
  const handleGeneralApplication = () => navigate("/apply")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={handleBackToExplore}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Explore</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Available Career Fields</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our current field openings and start your application process today
            </p>
          </div>
        </div>
      </div>

      <CategoryFilter
        categories={JOB_DATA.categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredJobs.length}</span> field
              {filteredJobs.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApplyForJob} />
              ))}
            </div>
          ) : (
            <EmptyState onShowAll={() => setSelectedCategory("All")} />
          )}
        </div>
      </div>

      <div className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See the Perfect Field?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit a general application and we'll notify you when matching fields become available
          </p>
          <button
            onClick={handleGeneralApplication}
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
