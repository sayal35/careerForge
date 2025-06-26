import { useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";

const FileUpload = ({
  label,
  name,
  file,
  onFileChange,
  error,
  accept = ".pdf,.doc,.docx",
  maxSize = 5 * 1024 * 1024, // 5MB
  required = false,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (selectedFile) => {
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        onFileChange(null, "Please upload a PDF or Word document");
        return;
      }

      // Validate file size
      if (selectedFile.size > maxSize) {
        onFileChange(
          null,
          `File size must be less than ${maxSize / 1024 / 1024}MB`
        );
        return;
      }

      onFileChange(selectedFile, null);
    }
  };

  const removeFile = () => {
    onFileChange(null, null);
  };

  return (
    <div className="form-field">
      <label className="form-field__label block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50 scale-[1.02]"
            : error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {file ? (
          <div className="flex items-center justify-center space-x-3 animate-[fadeIn_0.3s_ease-out]">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your resume here, or{" "}
              <span className="text-blue-600">browse</span>
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX (max {maxSize / 1024 / 1024}MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="form-field__error text-red-600 text-sm mt-1 flex items-center animate-[slideIn_0.2s_ease-out]">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
