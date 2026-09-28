import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { loadPDF } from '../utils/pdfLoader';

/* ---------- Inline SVG icons ---------- */
const Icon = {
  File: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  Upload: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Alert: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const MAX_SIZE = 10 * 1024 * 1024;

/* ========================================================= */
const PDFUploader = ({ handleGoToChat }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      const msg = 'Please select a valid PDF file';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (file.size > MAX_SIZE) {
      const msg = 'File size must be less than 10MB';
      setError(msg);
      toast.error(msg);
      return;
    }
    setSelectedFile(file);
    setError('');
    toast.success('PDF selected');
  }, []);

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDragOver = (e) => { e.preventDefault(); if (!isLoading) setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const handleUploadClick = () => { if (!isLoading) fileInputRef.current?.click(); };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast('File removed');
  };

  const processPDF = async () => {
    if (!selectedFile) {
      const msg = 'Please select a PDF file';
      setError(msg);
      toast.error(msg);
      return;
    }
    setIsLoading(true);
    setError('');
    const loadingToast = toast.loading('Processing PDF…');

    try {
      const result = await loadPDF(selectedFile);
     if (result?.success) {
  toast.success('Ready! Starting chat…', { id: loadingToast });
  handleGoToChat();
}  else {
        const msg = result?.message || 'Something went wrong processing the PDF';
        toast.error("Server Issue");
        setError(msg);
      }
    } catch (err) {
      const msg = err?.message || 'Error processing PDF';
      setError(msg);
      toast.error("Server Issue");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = !selectedFile || isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-lg">
        {/* Card — sharp borders, hard shadow */}
        <div className="relative bg-[rgb(var(--surface))] border-2 border-[rgb(var(--text-primary))] rounded-2xl p-7 sm:p-9 shadow-[8px_8px_0_0_rgb(10_10_10)] dark:shadow-[8px_8px_0_0_rgb(245_245_245)] transition-all animate-fade-in-up">

          {/* ---------- Header ---------- */}
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-[rgb(var(--accent))] rounded-2xl items-center justify-center mb-5 shadow-[4px_4px_0_0_rgb(10_10_10)] dark:shadow-[4px_4px_0_0_rgb(245_245_245)]">
              <Icon.File className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[rgb(var(--text-primary))] mb-2">
              PDF Assistant
            </h1>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Upload a PDF and chat with AI about its contents
            </p>
          </div>

          {/* ---------- Dropzone ---------- */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload PDF"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUploadClick();
              }
            }}
            className={[
              'relative border-2 border-dashed rounded-xl p-6 mb-6 transition-all cursor-pointer group outline-none',
              isDragging
                ? 'border-[rgb(var(--accent))] bg-red-50 dark:bg-red-950/20 scale-[1.02]'
                : selectedFile
                  ? 'border-[rgb(var(--text-primary))] bg-neutral-50 dark:bg-neutral-900/50'
                  : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/30 hover:border-[rgb(var(--text-primary))]',
              error ? 'border-[rgb(var(--accent))] bg-red-50 dark:bg-red-950/20 animate-shake' : '',
              isLoading ? 'pointer-events-none opacity-70' : '',
              'focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]',
            ].join(' ')}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileInput}
              className="hidden"
            />

            {selectedFile ? (
              <div className="text-center animate-fade-in">
                <div className="inline-flex w-14 h-14 bg-[rgb(var(--accent))] rounded-full items-center justify-center mb-3">
                  <Icon.Check className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-black truncate px-4">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))] font-medium">
                    {formatFileSize(selectedFile.size)}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[rgb(var(--accent))] rounded">
                    Ready
                  </span>
                </div>
                <button
                  onClick={removeFile}
                  aria-label="Remove file"
                  className="absolute top-3 right-3 p-1.5 text-[rgb(var(--text-secondary))] hover:text-white hover:bg-[rgb(var(--accent))] rounded-lg transition-all focus-ring"
                >
                  <Icon.Close className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 border-2 border-dashed border-neutral-400 dark:border-neutral-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-[rgb(var(--text-primary))] transition-colors">
                  <Icon.Upload className="w-6 h-6 text-[rgb(var(--text-primary))]" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[rgb(var(--text-primary))]">
                    Click to upload or drag &amp; drop
                  </p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    PDF up to 10 MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ---------- Error ---------- */}
          {error && !isLoading && (
            <div role="alert" className="mb-4 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 border-2 border-[rgb(var(--accent))] rounded-lg animate-fade-in">
              <Icon.Alert className="w-5 h-5 text-[rgb(var(--accent))] shrink-0 mt-0.5" />
              <p className="text-sm text-[rgb(var(--accent))] font-semibold">{error}</p>
            </div>
          )}

          {/* ---------- CTA ---------- */}
          <button
            onClick={processPDF}
            disabled={disabled}
            className={[
              'group w-full py-4 px-6 rounded-xl font-bold text-base transition-all relative overflow-hidden focus-ring',
              disabled
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed border-2 border-transparent'
                : 'bg-[rgb(var(--text-primary))] text-[rgb(var(--bg))] border-2 border-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))] hover:border-[rgb(var(--accent))] shadow-[4px_4px_0_0_rgb(10_10_10)] dark:shadow-[4px_4px_0_0_rgb(245_245_245)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
            ].join(' ')}
          >
            {!disabled && (
              <span className="pointer-events-none absolute inset-0 animate-shimmer opacity-20" />
            )}

            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Processing…</span>
              </span>
            ) : (
              <span className="relative flex items-center justify-center gap-2">
                <Icon.Chat className="w-5 h-5" />
                <span>Start Chatting</span>
                <Icon.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>

          {/* ---------- Footer ---------- */}
          <p className="text-center text-xs text-[rgb(var(--text-secondary))] mt-4 flex items-center justify-center gap-1.5">
            <Icon.Lock className="w-3.5 h-3.5" />
            Processed locally and securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;