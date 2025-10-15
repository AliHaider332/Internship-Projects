import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA_FETCH } from '../../server';
import ResumeForm from '../components/ResumeForm';

export default function Home() {
  const [portfolio, setPortfolio] = useState({ html: '', css: '', js: '' });
  const [activeTab, setActiveTab] = useState('html');
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [copyStates, setCopyStates] = useState({ html: false, css: false, js: false });
  const isResizing = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Responsive mode check
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 765);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleMouseDown = () => (isResizing.current = true);
  const handleMouseUp = () => (isResizing.current = false);

  const handleMouseMove = (e) => {
    if (!isResizing.current || isMobile) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setShowPreview(false);
    try {
      const result = await DATA_FETCH(data);
      if (result?.html || result?.css || result?.js) {
        setPortfolio(result);
      }
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code, tabName) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStates(prev => ({ ...prev, [tabName]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [tabName]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyStates(prev => ({ ...prev, [tabName]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [tabName]: false }));
      }, 2000);
    }
  };

  const renderCode = () => {
    let code = '';
    if (activeTab === 'html') code = portfolio.html;
    if (activeTab === 'css') code = portfolio.css;
    if (activeTab === 'js') code = portfolio.js;

    return (
      <div className="relative h-full">
        {/* Copy Button */}
        {code && (
          <button
            onClick={() => copyToClipboard(code, activeTab)}
            className={`absolute top-4 right-4 z-10 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg ${
              copyStates[activeTab]
                ? 'bg-green-600 text-white border-green-700'
                : 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700'
            } border`}
          >
            {copyStates[activeTab] ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        )}
        
        {/* Code Display */}
        <pre className="h-full w-full bg-gray-900 text-green-300 p-6 overflow-auto text-sm whitespace-pre pt-16">
          <code>{code || `// No ${activeTab.toUpperCase()} code generated yet.\n// Fill out the form and click "Generate Portfolio" to get started.`}</code>
        </pre>
      </div>
    );
  };

  const createPreview = () => {
    const { html, css, js } = portfolio;
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>${html}<script>${js}</script></body>
      </html>
    `;
  };

  const hasPortfolio = portfolio.html || portfolio.css || portfolio.js;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex ${
        isMobile ? 'flex-col' : 'flex-row'
      } relative transition-all duration-300 overflow-hidden`}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* 🧾 Left Section – Form */}
      <div
        className="bg-white shadow-lg relative transition-all duration-200 flex flex-col"
        style={{ width: isMobile ? '100%' : `${leftWidth}%` }}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">
            AI Portfolio Builder
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Fill out your details and generate a beautiful portfolio
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 hover:scrollbar-thumb-indigo-400">
          <div className="p-6">
            <ResumeForm onSubmit={handleFormSubmit} />
          </div>
        </div>

        {/* 🔄 Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 border-solid"></div>
            <p className="text-indigo-600 mt-4 font-semibold text-lg">
              Generating Your Portfolio...
            </p>
            <p className="text-gray-500 mt-2 text-sm">
              This may take a few moments
            </p>
          </div>
        )}
      </div>

      {/* 🪟 Draggable Divider (Desktop Only) */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="w-2 cursor-col-resize bg-gray-300 hover:bg-indigo-400 transition-all duration-200 hover:w-3 relative group"
        >
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      )}

      {/* 💻 Right Section – Code & Preview */}
      <AnimatePresence>
        {hasPortfolio && !loading && (
          <motion.div
            key="portfolio-section"
            initial={{
              opacity: 0,
              y: isMobile ? 100 : 0,
              x: isMobile ? 0 : 100,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: isMobile ? 100 : 0, x: isMobile ? 0 : 100 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`${
              isMobile ? 'w-full h-[70vh]' : 'flex-1'
            } flex flex-col bg-gray-50 overflow-hidden`}
          >
            {/* 🧩 Tabs Header */}
            <div className="flex justify-between items-center border-b border-gray-300 bg-white px-6 py-3 shadow-sm flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {['html', 'css', 'js'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setShowPreview(false);
                    }}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                      activeTab === tab && !showPreview
                        ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                    showPreview
                      ? 'bg-green-600 text-white shadow-md border-green-700'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {showPreview ? 'Live Preview' : 'Show Preview'}
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Generated
              </div>
            </div>

            {/* 💻 Main Content Area - Full Height */}
            <div className="flex-1 flex flex-col min-h-0 p-6">
              {!showPreview ? (
                <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* Code Header */}
                  <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm font-medium ml-2">
                        {activeTab.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Click the copy button to copy the code
                    </div>
                  </div>
                  
                  {/* Code Content - Full Height with Scrollbars Only Here */}
                  <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800 hover:scrollbar-thumb-indigo-400">
                    {renderCode()}
                  </div>
                </div>
              ) : (
                <div className="h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* Preview Header */}
                  <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm font-medium ml-2">
                        Live Preview
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Responsive View
                    </div>
                  </div>
                  
                  {/* Preview Content - Full Height */}
                  <div className="h-full bg-white">
                    <iframe
                      srcDoc={createPreview()}
                      title="Portfolio Preview"
                      sandbox="allow-scripts allow-same-origin"
                      className="w-full h-full rounded-b-xl bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧑‍💻 Empty State */}
      {!hasPortfolio && !loading && (
        <div className={`${isMobile ? 'w-full h-64' : 'flex-1'} flex justify-center items-center p-8`}>
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">👨‍💻</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your Portfolio Awaits
            </h3>
            <p className="text-gray-500 text-sm">
              Fill out the form and click "Generate Portfolio" to see your AI-generated code and live preview here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}