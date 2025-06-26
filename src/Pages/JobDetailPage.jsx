import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  DollarSign,
  Star,
  Calendar,
  CheckCircle,
  Briefcase,
  Clock,
  Users,
  Award,
  Target,
  Gift,
  ArrowRight,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { mockJobs } from "../assets/jobsData";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = mockJobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The job you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleApplyNow = () => {
    navigate("/apply");
  };

  const handleBackToJobs = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToJobs}
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors animate-[fadeIn_0.3s_ease-out]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Jobs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out]">
              {job.featured && (
                <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ⭐ Featured Job
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Building2 className="h-5 w-5" />
                      <span className="text-lg">{job.company}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-semibold">{job.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {job.applicants} applicants
                  </p>
                </div>
              </div>

              {/* Job Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Briefcase className="h-5 w-5" />
                  <span>
                    {job.type} • {job.experience}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="h-5 w-5" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {getDaysRemaining(job.deadline)} days left to apply
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {job.fullDescription}
              </p>
            </div>

            {/* Job Description & Responsibilities */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out] [animation-delay:0.1s]">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out] [animation-delay:0.2s]">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Requirements & Qualifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out] [animation-delay:0.3s]">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Gift className="h-6 w-6 mr-3 text-blue-600" />
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Culture */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out] [animation-delay:0.4s]">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Join {job.company}?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At {job.company}, we believe in fostering a collaborative and
                  innovative work environment where every team member can
                  thrive. Our company culture is built on the foundation of
                  continuous learning, mutual respect, and delivering
                  exceptional results.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Join a team of passionate professionals who are dedicated to
                  pushing the boundaries of technology and creating solutions
                  that make a real impact. We offer opportunities for
                  professional growth, mentorship, and the chance to work on
                  cutting-edge projects that shape the future of our industry.
                </p>
              </div>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-[slideUp_0.6s_ease-out] [animation-delay:0.5s]">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Apply
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Ready to take the next step in your career? We'd love to hear
                  from you! Click the "Apply Now" button to submit your
                  application through our streamlined process.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Application Requirements:
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Updated resume/CV</li>
                    <li>• Cover letter explaining your interest</li>
                    <li>• Portfolio (if applicable)</li>
                    <li>• References (optional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-[slideUp_0.6s_ease-out] [animation-delay:0.6s] sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ready to Apply?
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">
                    {formatDate(job.postedDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium text-red-600">
                    {formatDate(job.deadline)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applicants:</span>
                  <span className="font-medium">{job.applicants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{job.experience}</span>
                </div>
              </div>

              <button
                onClick={handleApplyNow}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-[0_8px_15px_-3px_rgba(37,99,235,0.3)]"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Application takes 5-10 minutes to complete
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-[slideUp_0.6s_ease-out] [animation-delay:0.7s]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                About {job.company}
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{job.company}</h4>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{job.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                A leading technology company focused on innovation and creating
                exceptional digital experiences. We're committed to building
                products that make a difference and fostering a culture of
                continuous learning and growth.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>
                    careers@{job.company.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span>
                    www.{job.company.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-[slideUp_0.6s_ease-out] [animation-delay:0.8s]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Job Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Total Applicants
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {job.applicants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Days Remaining
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {getDaysRemaining(job.deadline)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">
                      Company Rating
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {job.rating}/5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Job Type</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {job.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-[slideUp_0.6s_ease-out] [animation-delay:0.9s]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-3">
                {mockJobs
                  .filter(
                    (j) => j.id !== job.id && j.experience === job.experience
                  )
                  .slice(0, 3)
                  .map((similarJob) => (
                    <button
                      key={similarJob.id}
                      onClick={() => navigate(`/jobs/${similarJob.id}`)}
                      className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm">
                        {similarJob.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {similarJob.company}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {similarJob.salary}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
