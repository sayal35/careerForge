import { useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import FormfacadeEmbed from "@formfacade/embed-react";

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
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmit = () => {
    console.log("Form submitted");
    setSubmitStatus("success");

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
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

        {/* Formfacade Form Container */}
        <div className="apply-now__form-container bg-white rounded-2xl shadow-xl p-4 md:p-8 animate-[slideUp_0.6s_ease-out]">
          <div className="w-full">
            <FormfacadeEmbed
              formFacadeURL="https://formfacade.com/include/116185306238061097688/form/1FAIpQLSekBlJuPcNjHVOD_bH-7UVuWcfrlMdKwAg-J5G44dvZ9nR-rg/classic.js/?div=ff-compose"
              onSubmitForm={() => console.log("Form submitted")}
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What to Expect Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Application Review
                </h3>
                <p className="text-gray-600 text-sm">
                  Our team will review your application within 2-3 business
                  days.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Initial Screening
                </h3>
                <p className="text-gray-600 text-sm">
                  Qualified candidates will be contacted for a phone or video
                  screening.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Final Interview
                </h3>
                <p className="text-gray-600 text-sm">
                  Successful candidates will be invited for a final interview
                  with the team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about the application process or need
              assistance, don't hesitate to reach out to our HR team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:hr@company.com"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Contact HR Team
              </a>
              <a
                href="tel:+1234567890"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Call Us: (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
