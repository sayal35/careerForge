import { useState } from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  selectedExperience,
  setSelectedExperience,
  locations,
  jobTypes,
  experienceLevels,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    selectedLocation || selectedJobType || selectedExperience;

  return (
    <div className="search-filters bg-white rounded-2xl shadow-xl p-6 mb-8 animate-[slideUp_0.6s_ease-out]">
      {/* Search Bar */}
      <div className="search-bar relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar__input w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg focus:-translate-y-0.5 focus:shadow-[0_4px_12px_rgba(59,130,246,0.15)]"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="filter-toggle flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="clear-filters text-sm text-red-600 hover:text-red-700 flex items-center space-x-1 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="filter-options grid grid-cols-1 md:grid-cols-3 gap-4 animate-[slideDown_0.3s_ease-out]">
          <div className="filter-option">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-option">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-option">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Levels</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
