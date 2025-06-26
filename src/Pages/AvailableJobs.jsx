import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { mockJobs } from "../assets/jobsData";
import JobCard from "../components/JobCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const jobsPerPage = 6;

  const locations = [...new Set(mockJobs.map((job) => job.location))];
  const jobTypes = [...new Set(mockJobs.map((job) => job.type))];
  const experienceLevels = [...new Set(mockJobs.map((job) => job.experience))];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((job) => job.location === selectedLocation);
    }

    // Job type filter
    if (selectedJobType) {
      filtered = filtered.filter((job) => job.type === selectedJobType);
    }

    // Experience filter
    if (selectedExperience) {
      filtered = filtered.filter(
        (job) => job.experience === selectedExperience
      );
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedJobType, selectedExperience, jobs]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedJobType("");
    setSelectedExperience("");
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (isLoading) {
    return (
      <section className="available-jobs min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-8 max-w-md mx-auto"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="available-jobs min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="available-jobs__container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="available-jobs__title text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Job
          </h1>
          <p className="available-jobs__description text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies. Your dream job is
            just a click away.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedJobType={selectedJobType}
          setSelectedJobType={setSelectedJobType}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          locations={locations}
          jobTypes={jobTypes}
          experienceLevels={experienceLevels}
          onClearFilters={clearFilters}
        />

        {/* Results Summary */}
        <div className="results-summary mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {indexOfFirstJob + 1}-
              {Math.min(indexOfLastJob, filteredJobs.length)}
            </span>{" "}
            of <span className="font-semibold">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="job-listings grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {currentJobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              savedJobs={savedJobs}
              onToggleSave={toggleSaveJob}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="no-results text-center py-12">
            <div className="max-w-md mx-auto">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or clearing the filters to
                see more results.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default AvailableJobs;
