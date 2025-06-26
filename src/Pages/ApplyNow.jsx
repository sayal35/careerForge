import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Upload,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { useFormValidation } from "../hooks/useFormValidation";
import { validationRules } from "../utils/validationRules";
import { jobRoles } from "../assets/jobsData";
import FormField from "../components/Forms/FormField";
import FileUpload from "../components/Forms/FileUpload";

const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

const StatusMessage = ({ type, title, message, onClose }) => {
  const styles = {
    success: {
      container: "bg-green-50 border-green-200 animate-[slideIn_0.3s_ease-out]",
      icon: "text-green-600",
      title: "text-green-800",
      message: "text-green-700",
    },
    error: {
      container: "bg-red-50 border-red-200 animate-[slideIn_0.3s_ease-out]",
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
    },
  };

  const currentStyle = styles[type];
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`mb-8 p-6 border rounded-xl ${currentStyle.container}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Icon className={`h-6 w-6 mr-3 ${currentStyle.icon}`} />
          <div>
            <h3 className={`text-lg font-semibold ${currentStyle.title}`}>
              {title}
            </h3>
            <p className={currentStyle.message}>{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

const ApplyNow = () => {
  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    role: "",
    resume: null,
    coverLetter: "",
    experience: "",
    expectedSalary: "",
    availableDate: "",
    linkedinUrl: "",
    portfolioUrl: "",
  };

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    validateForm,
    resetForm,
  } = useFormValidation(initialFormData, validationRules);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFileChange = (file, error) => {
    setFormData((prev) => ({ ...prev, resume: file }));
    if (error) {
      setErrors((prev) => ({ ...prev, resume: error }));
    } else {
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      resetForm();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="apply-now min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="apply-now__container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="apply-now__title text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apply for Your Dream Job
          </h1>
          <p className="apply-now__description text-lg text-gray-600 max-w-2xl mx-auto">
            Take the next step in your career journey. Fill out the application
            form below and let us help you find the perfect opportunity.
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <StatusMessage
            type="success"
            title="Application Submitted Successfully!"
            message="We'll review your application and get back to you within 2-3 business days."
            onClose={() => setSubmitStatus(null)}
          />
        )}

        {submitStatus === "error" && (
          <StatusMessage
            type="error"
            title="Submission Failed"
            message="There was an error submitting your application. Please try again."
            onClose={() => setSubmitStatus(null)}
          />
        )}

        {/* Application Form */}
        <div className="apply-now__form-container bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-[slideUp_0.6s_ease-out]">
          <form onSubmit={handleSubmit} className="apply-now__form space-y-8">
            {/* Personal Information Section */}
            <div className="form-section">
              <h2 className="form-section__title text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  placeholder="Enter your full name"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="your.email@example.com"
                  icon={Mail}
                  required
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder="+1 (555) 123-4567"
                  icon={Phone}
                  required
                />

                <FormField
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleInputChange}
                  error={errors.experience}
                  placeholder="e.g., 3"
                  min="0"
                  max="50"
                  required
                />
              </div>
            </div>

            {/* Job Information Section */}
            <div className="form-section">
              <h2 className="form-section__title text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                Job Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Desired Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  error={errors.role}
                  required
                >
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:-translate-y-0.5 focus:shadow-[0_4px_12px_rgba(59,130,246,0.15)] ${
                      errors.role
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select a role</option>
                    {jobRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField
                  label="Expected Salary (USD)"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  error={errors.expectedSalary}
                  placeholder="e.g., 75000"
                  required
                />

                <FormField
                  label="Available Start Date"
                  name="availableDate"
                  type="date"
                  value={formData.availableDate}
                  onChange={handleInputChange}
                  error={errors.availableDate}
                  min={new Date().toISOString().split("T")[0]}
                  className="md:col-span-2"
                  required
                />
              </div>
            </div>

            {/* Documents Section */}
            <div className="form-section">
              <h2 className="form-section__title text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Upload className="h-6 w-6 mr-3 text-blue-600" />
                Documents
              </h2>

              <FileUpload
                label="Resume/CV"
                name="resume"
                file={formData.resume}
                onFileChange={handleFileChange}
                error={errors.resume}
                required
              />
            </div>

            {/* Additional Information Section */}
            <div className="form-section">
              <h2 className="form-section__title text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 mr-3 text-blue-600" />
                Additional Information
              </h2>

              <div className="space-y-6">
                <FormField
                  label="LinkedIn Profile (Optional)"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  error={errors.linkedinUrl}
                  placeholder="https://linkedin.com/in/yourprofile"
                />

                <FormField
                  label="Portfolio Website (Optional)"
                  name="portfolioUrl"
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  error={errors.portfolioUrl}
                  placeholder="https://yourportfolio.com"
                />

                <FormField
                  label="Cover Letter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  error={errors.coverLetter}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  required
                >
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows="6"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none focus:-translate-y-0.5 focus:shadow-[0_4px_12px_rgba(59,130,246,0.15)] ${
                      errors.coverLetter
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  />
                </FormField>

                <div className="flex justify-between items-center">
                  <span></span>
                  <p className="text-sm text-gray-500">
                    {formData.coverLetter.length} characters (minimum 50)
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="form-submit__button w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Upload className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
