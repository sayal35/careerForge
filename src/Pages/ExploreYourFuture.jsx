import { ArrowRight, Building2, Users, TrendingUp, Star, Briefcase, MapPin, Globe, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EXPLORE_DATA = {
  jobCategories: [
    {
      id: 1,
      title: "Business & Finance Field",
      description: "Exciting opportunities in business operations and financial services",
      openings: "50+ openings",
      salaryRange: "$25,000 - $45,000",
      companies: ["Corporate Banks", "Investment Firms", "Consulting Groups", "Financial Services"],
    },
    {
      id: 2,
      title: "Healthcare & Medical Field",
      description: "Join the essential healthcare and medical services industry",
      openings: "200+ openings",
      salaryRange: "$30,000 - $80,000",
      companies: ["Hospitals", "Clinics", "Medical Centers", "Healthcare Systems"],
    },
    {
      id: 3,
      title: "Technology & Engineering Field",
      description: "Build the future with technology and engineering solutions",
      openings: "150+ openings",
      salaryRange: "$40,000 - $120,000",
      companies: ["Tech Companies", "Engineering Firms", "Software Houses", "IT Services"],
    },
  ],
  careerFacts: [
    {
      icon: Building2,
      title: "Growing Field Market",
      description: "Thousands of new opportunities across professional fields",
    },
    { icon: Users, title: "Diverse Workforce", description: "Inclusive workplaces welcoming all backgrounds" },
    { icon: TrendingUp, title: "Career Growth", description: "Excellent advancement opportunities available" },
    { icon: Star, title: "Competitive Benefits", description: "Great salary packages and comprehensive benefits" },
  ],
  sections: [
    {
      title: "Exciting Field Openings Available – Apply Now!",
      subtitle: "Join leading companies and start your career in various professional fields",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-white",
      textColor: "text-green-600",
    },
    {
      title: "Entry Level Fields Available",
      subtitle: "Perfect for fresh graduates and career starters. No experience required for many fields.",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-white",
      textColor: "text-purple-600",
      features: [
        { icon: Briefcase, text: "100+ Entry Level Fields" },
        { icon: Users, text: "Training Provided" },
        { icon: TrendingUp, text: "Career Growth Opportunities" },
      ],
    },
    {
      title: "Remote Work Fields",
      subtitle: "Flexible remote opportunities available across multiple professional fields",
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
      title: "High-Paying Career Fields",
      subtitle: "Explore lucrative fields with excellent salary packages and benefits.",
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-white",
      textColor: "text-orange-600",
      features: [
        { icon: Star, text: "$60,000+ Annual Salaries" },
        { icon: Building2, text: "Fortune 500 Companies" },
        { icon: TrendingUp, text: "Executive Level Fields" },
      ],
    },
    {
      title: "Part-Time & Flexible Fields",
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
        {[
          { label: "Available Fields", value: category.openings, color: "text-green-600" },
          { label: "Salary Range", value: category.salaryRange, color: "text-blue-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-500">{label}:</span>
            <span className={`font-semibold ${color}`}>{value}</span>
          </div>
        ))}
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
  const getVisualTitle = () => {
    if (section.title.includes("Entry")) return "Start Your Field Journey"
    if (section.title.includes("High")) return "High Salary Fields"
    return "Flexible Work Fields"
  }

  const getVisualDescription = () => {
    if (section.title.includes("Entry")) return "Begin with entry-level fields and grow"
    if (section.title.includes("High")) return "Competitive compensation packages"
    return "Work on your terms"
  }

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
        {section.features ? `Apply for ${section.title.split(" ")[0]} Fields` : "Apply Now"}
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

  const heroContent = {
    title: "Explore Your Future Career Field",
    subtitle: "Your Gateway to the Perfect Career Field Opportunity",
    description:
      "We are a premier career portal dedicated to connecting professionals with the best field opportunities. Whether you are a fresh graduate, an experienced professional, or someone looking for a career change, we help you find the perfect field that matches your skills and ambitions.",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{heroContent.title}</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{heroContent.subtitle}</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{heroContent.description}</p>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">Your Career Field Journey Starts Here</h3>
              <h4 className="text-2xl font-semibold mb-6">For new opening Fields</h4>
              <p className="text-lg mb-8 text-blue-100">
                Discover amazing career opportunities in today's dynamic field market. From entry-level fields to
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
                <h3 className="text-2xl font-bold text-white mb-4">Your Future Field Awaits</h3>
                <p className="text-blue-100">Join thousands of professionals who have built successful careers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us for Your Career Field?</h2>
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore All Career Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPLORE_DATA.jobCategories.map((category) => (
              <JobCategoryCard key={category.id} category={category} onApply={handleApplyNow} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Career Field Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their dream fields through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { text: "Browse All Fields", style: "bg-white text-blue-600 hover:bg-blue-50" },
              { text: "Apply Now", style: "bg-green-500 hover:bg-green-600 text-white", onClick: handleApplyNow },
            ].map(({ text, style, onClick }) => (
              <button
                key={text}
                onClick={onClick}
                className={`${style} font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
              >
                <span>{text}</span>
                {text === "Browse All Fields" && <ArrowRight className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreYourFuture
