// components/PDFUploader.js
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { loadPDF } from '../utils/pdfLoader';

const PDFUploader = ({ handleGoToChat }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFileSelect = (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      const errorMsg = 'Please select a valid PDF file';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = 'File size must be less than 10MB';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSelectedFile(file);
    setError('');
    toast.success('PDF selected successfully!');
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);

    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError('');

    // Reset the file input when removing file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast('File removed');
  };

  const processPDF = async () => {
    // Check if a file is selected
    if (!selectedFile) {
      const errorMsg = 'Please select a PDF file';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
  
    // Reset previous errors and show loading state
    setIsLoading(true);
    setError('');
    const loadingToast = toast.loading('Processing PDF...');
  
    try {
      // Call the function that processes or loads the PDF
      const result = await loadPDF(selectedFile);
  
      // Optional: Log result for debugging
      console.log('PDF load result:', result);
  
      // Check if the PDF was processed successfully
      if (result?.status === 200) {
        toast.success('PDF successfully processed! Ready for chat.', {
          id: loadingToast,
        });
  
        // Navigate or open chat interface
        handleGoToChat();
      } else {
        const msg = result?.message || 'Something went wrong while processing the PDF';
        toast.error(msg, { id: loadingToast });
        setError(msg);
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMsg = err?.message || 'Error processing PDF';
      console.error('PDF processing error:', err);
      setError(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      // Hide loading state no matter what
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105">
          {/* Animated Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              PDF AI Assistant
            </h1>
            <p className="text-gray-600 text-sm">
              Upload your PDF and chat with AI about its content
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-6 mb-6 transition-all duration-300 cursor-pointer group ${
              isDragging
                ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30'
            } ${error ? 'border-red-500 bg-red-50 animate-shake' : ''}`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />

            {selectedFile ? (
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-700">
                    Click to upload PDF
                  </p>
                  <p className="text-sm text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-2">Max 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Process Button */}
          <button
            onClick={processPDF}
            disabled={!selectedFile || isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform ${
              !selectedFile || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
                : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Start Chatting</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;
