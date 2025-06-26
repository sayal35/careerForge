import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Users,
  Briefcase,
  Star,
  ArrowRight,
} from "lucide-react";

const JobCard = ({ job, index, savedJobs, onToggleSave }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
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

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div
      className={`job-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-[slideUp_0.6s_ease-out] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] ${
        job.featured ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {job.featured && (
        <div className="job-card__featured bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-t-xl">
          ⭐ Featured Job
        </div>
      )}

      <div className="job-card__content p-6">
        {/* Header */}
        <div className="job-card__header flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={job.logo || "/placeholder.svg"}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="job-card__title text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center space-x-1 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">{job.company}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onToggleSave(job.id)}
            className="job-card__save p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {savedJobs.has(job.id) ? (
              <BookmarkCheck className="h-5 w-5 text-blue-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Job Info */}
        <div className="job-card__info space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
            <span className="text-gray-400">•</span>
            <Briefcase className="h-4 w-4" />
            <span>{job.type}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="job-card__description text-gray-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Requirements */}
        <div className="job-card__requirements mb-4">
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 2).map((req, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{job.requirements.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="job-card__footer flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{job.applicants} applicants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>{job.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{getDaysRemaining(job.deadline)} days left</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          className="job-card__action mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-[0_8px_15px_-3px_rgba(37,99,235,0.3)]"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
