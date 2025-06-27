const ApplyNow = () => {
  return (
    <section className="apply-now min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 sm:py-12 px-4">
      <div className="apply-now__container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="apply-now__title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Apply for Your Dream Job
          </h1>
          <p className="apply-now__description text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Take the next step in your career journey. Fill out the application
            form below and let us help you find the perfect opportunity.
          </p>
        </div>

        <div className="apply-now__form-container bg-white rounded-2xl shadow-xl animate-[slideUp_0.6s_ease-out] max-w-2xl mx-auto">
          <div className="w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSekBlJuPcNjHVOD_bH-7UVuWcfrlMdKwAg-J5G44dvZ9nR-rg/viewform?embedded=true"
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="rounded-2xl"
              title="Job Application Form"
            >
              Loading…
            </iframe>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              What to Expect Next
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-blue-600 font-bold text-base sm:text-lg">
                    1
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Application Review
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Our team will review your application within 2-3 business
                  days.
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-blue-600 font-bold text-base sm:text-lg">
                    2
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Initial Screening
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Qualified candidates will be contacted for a phone or video
                  screening.
                </p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-blue-600 font-bold text-base sm:text-lg">
                    3
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Final Interview
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Successful candidates will be invited for a final interview
                  with the team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
              If you have any questions about the application process or need
              assistance, don't hesitate to reach out to our HR team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="mailto:hr@company.com"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
              >
                Contact HR Team
              </a>
              <a
                href="tel:+1234567890"
                className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
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
