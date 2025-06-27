import { ArrowRight, Building2, Users, TrendingUp, Star, Briefcase, MapPin, Globe, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EXPLORE_DATA = {
  jobCategories: [
    {
      id: 1,
      title: "Retail & Customer Service Jobs",
      description: "Exciting opportunities in retail and customer service",
      openings: "50+ openings",
      salaryRange: "$25,000 - $45,000",
      companies: ["Target", "Walmart", "Best Buy", "Home Depot"],
    },
    {
      id: 2,
      title: "Hospitality & Tourism",
      description: "Join the thriving hospitality industry",
      openings: "200+ openings",
      salaryRange: "$30,000 - $80,000",
      companies: ["Marriott", "Hilton", "Hyatt", "Four Seasons"],
    },
    {
      id: 3,
      title: "Construction & Engineering",
      description: "Build the future with infrastructure projects",
      openings: "150+ openings",
      salaryRange: "$40,000 - $120,000",
      companies: ["Bechtel", "Turner", "Skanska", "Fluor"],
    },
  ],
  careerFacts: [
    { icon: Building2, title: "Growing Job Market", description: "Thousands of new opportunities across industries" },
    { icon: Users, title: "Diverse Workforce", description: "Inclusive workplaces welcoming all backgrounds" },
    { icon: TrendingUp, title: "Career Growth", description: "Excellent advancement opportunities available" },
    { icon: Star, title: "Competitive Benefits", description: "Great salary packages and comprehensive benefits" },
  ],
  sections: [
    {
      title: "Exciting Job Openings Available – Apply Now!",
      subtitle: "Join leading companies and start your career in various industries",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-white",
      textColor: "text-green-600",
    },
    {
      title: "Entry Level Positions Available",
      subtitle: "Perfect for fresh graduates and career starters. No experience required for many positions.",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-white",
      textColor: "text-purple-600",
      features: [
        { icon: Briefcase, text: "100+ Entry Level Positions" },
        { icon: Users, text: "Training Provided" },
        { icon: TrendingUp, text: "Career Growth Opportunities" },
      ],
    },
    {
      title: "Work From Home Opportunities",
      subtitle: "Flexible remote positions available across multiple industries",
      gradient: "from-indigo-500 to-indigo-600",
      bgColor: "bg-white",
      textColor: "text-indigo-600",
      features: [
        { icon: Globe, text: "Work Anywhere" },
        { icon: Clock, text: "Flexible Hours" },
        { icon: TrendingUp, text: "Great Pay" },
      ],
    },
    {
      title: "High-Paying Career Opportunities",
      subtitle: "Explore lucrative positions with excellent salary packages and benefits.",
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-white",
      textColor: "text-orange-600",
      features: [
        { icon: Star, text: "$60,000+ Annual Salaries" },
        { icon: Building2, text: "Fortune 500 Companies" },
        { icon: TrendingUp, text: "Executive Level Positions" },
      ],
    },
    {
      title: "Part-Time & Flexible Positions",
      subtitle: "Perfect for students, parents, or anyone seeking work-life balance",
      gradient: "from-teal-500 to-teal-600",
      bgColor: "bg-white",
      textColor: "text-teal-600",
      features: [
        { icon: Users, text: "Student Friendly" },
        { icon: Clock, text: "Flexible Schedule" },
        { icon: MapPin, text: "Local Opportunities" },
        { icon: TrendingUp, text: "Growth Potential" },
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
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <Briefcase className="h-16 w-16 text-white" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 mb-4">{category.description}</p>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Available Jobs:</span>
          <span className="font-semibold text-green-600">{category.openings}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Salary Range:</span>
          <span className="font-semibold text-blue-600">{category.salaryRange}</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Top Companies:</p>
        <div className="flex flex-wrap gap-1">
          {category.companies.slice(0, 2).map((company) => (
            <span key={company} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {company}
            </span>
          ))}
          {category.companies.length > 2 && (
            <span className="text-xs text-gray-500">+{category.companies.length - 2} more</span>
          )}
        </div>
      </div>
      <button
        onClick={onApply}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Apply Now</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
)

const ApplySection = ({ section, onApply, isReversed = false }) => {
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
      >
        {section.features ? `Apply for ${section.title.split(" ")[0]} Jobs` : "Apply Now"}
      </button>
    </div>
  )

  const visual = section.features && (
    <div className="relative">
      <div className="bg-white/20 rounded-2xl p-8 text-center">
        <div className="bg-white/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="h-12 w-12 text-white" />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">
          {section.title.includes("Entry")
            ? "Start Your Career Journey"
            : section.title.includes("High")
              ? "High Salary Positions"
              : "Flexible Work Options"}
        </h4>
        <p className="text-white/80">
          {section.title.includes("Entry")
            ? "Begin with entry-level positions and grow"
            : section.title.includes("High")
              ? "Competitive compensation packages"
              : "Work on your terms"}
        </p>
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
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            Your Gateway to the Perfect Job Opportunity
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are a premier job portal dedicated to connecting job seekers with the best career opportunities. Whether
            you are a fresh graduate, an experienced professional, or someone looking for a career change, we help you
            find the perfect job that matches your skills and ambitions.
          </p>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">Your Career Journey Starts Here</h3>
              <h4 className="text-2xl font-semibold mb-6">For new opening Jobs</h4>
              <p className="text-lg mb-8 text-blue-100">
                Discover amazing career opportunities in today's dynamic job market. From entry-level positions to
                executive roles, find your perfect match today.
              </p>
              <button
                onClick={handleApplyNow}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Apply now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="bg-blue-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Your Future Awaits</h3>
                <p className="text-blue-100">Join thousands of professionals who have built successful careers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us for Your Career?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXPLORE_DATA.careerFacts.map((fact, index) => (
              <CareerFactCard key={index} fact={fact} />
            ))}
          </div>
        </div>
      </div>

      {EXPLORE_DATA.sections.map((section, index) => (
        <ApplySection key={index} section={section} onApply={handleApplyNow} isReversed={index % 2 === 1} />
      ))}

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore All Job Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPLORE_DATA.jobCategories.map((category) => (
              <JobCategoryCard key={category.id} category={category} onApply={handleApplyNow} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their dream jobs through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Browse All Jobs</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleApplyNow}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200"
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
