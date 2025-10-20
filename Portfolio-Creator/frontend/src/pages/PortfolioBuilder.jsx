import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA_FETCH } from '../../server';
import ResumeForm from '../components/ResumeForm';
import { Code, Eye, Copy, Check, Monitor, Smartphone, Laptop, Maximize2, Minimize2 } from 'lucide-react';

export default function Portfolio_Builder() {
  const [portfolio, setPortfolio] = useState({ html: '', css: '', js: '' });
  const [activeTab, setActiveTab] = useState('html');
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [copyStates, setCopyStates] = useState({
    html: false,
    css: false,
    js: false,
  });
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isFullScreen, setIsFullScreen] = useState(false);
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
      setCopyStates((prev) => ({ ...prev, [tabName]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [tabName]: false }));
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
      setCopyStates((prev) => ({ ...prev, [tabName]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [tabName]: false }));
      }, 2000);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
          <motion.button
            onClick={() => copyToClipboard(code, activeTab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-4 right-4 z-10 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg backdrop-blur-sm ${
              copyStates[activeTab]
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-700 hover:shadow-xl'
            } border`}
          >
            {copyStates[activeTab] ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </motion.button>
        )}

        {/* Code Display */}
        <pre className="h-full w-full bg-gradient-to-br from-gray-900 to-slate-900 text-green-400 p-8 overflow-auto text-sm whitespace-pre pt-20 font-mono">
          <code>
            {code ||
              `// No ${activeTab.toUpperCase()} code generated yet.\n// Fill out the form and click "Generate Portfolio" to get started.`}
          </code>
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

  const previewDeviceStyles = {
    desktop: 'w-full h-full',
    tablet: 'max-w-2xl h-full mx-auto border-x-8 border-gray-800 rounded-xl',
    mobile: 'max-w-sm h-full mx-auto border-4 border-gray-800 rounded-3xl'
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex ${
        isMobile ? 'flex-col' : 'flex-row'
      } relative transition-all duration-300 overflow-hidden font-sans`}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* 🧾 Left Section – Form (Hidden in fullscreen mode) */}
      {(!isFullScreen || isMobile) && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-lg shadow-xl relative transition-all duration-200 flex flex-col border-r border-gray-200/60"
          style={{ width: isMobile ? '100%' : `${leftWidth}%` }}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Portfolio Builder</h1>
            </div>
            <p className="text-blue-100 text-sm">
              Fill out your details and generate a beautiful portfolio website instantly
            </p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-400">
            <div className="p-6">
              <ResumeForm onSubmit={handleFormSubmit} />
            </div>
          </div>

          {/* 🔄 Loader Overlay */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 mt-6 font-semibold text-lg"
              >
                Generating Your Portfolio...
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 mt-2 text-sm"
              >
                AI is crafting your perfect website
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* 🪟 Draggable Divider (Desktop Only) */}
      {!isMobile && !isFullScreen && (
        <motion.div
          onMouseDown={handleMouseDown}
          whileHover={{ scale: 1.1 }}
          className="w-2 cursor-col-resize bg-gradient-to-b from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 relative group"
        >
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </motion.div>
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
              isMobile ? 'w-full h-[70vh]' : isFullScreen ? 'w-full' : 'flex-1'
            } flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden`}
          >
            {/* 🧩 Tabs Header */}
            <div className="flex justify-between items-center border-b border-gray-300 bg-white/80 backdrop-blur-lg px-6 py-4 shadow-sm flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {['html', 'css', 'js'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveTab(tab);
                      setShowPreview(false);
                    }}
                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border backdrop-blur-sm ${
                      activeTab === tab && !showPreview
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent'
                        : 'bg-white/80 hover:bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border backdrop-blur-sm flex items-center gap-2 ${
                    showPreview
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-transparent'
                      : 'bg-white/80 hover:bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Live Preview' : 'Show Preview'}
                </motion.button>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Preview Device Selector */}
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 bg-gray-100 rounded-xl p-1"
                  >
                    {[
                      { device: 'mobile', icon: Smartphone, label: 'Mobile' },
                      { device: 'tablet', icon: Laptop, label: 'Tablet' },
                      { device: 'desktop', icon: Monitor, label: 'Desktop' }
                    ].map(({ device, icon: Icon, label }) => (
                      <button
                        key={device}
                        onClick={() => setPreviewDevice(device)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          previewDevice === device
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title={label}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Full Screen Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullScreen}
                  className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2"
                  title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
                >
                  {isFullScreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </motion.button>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  AI Generated
                </div>
              </div>
            </div>

            {/* 💻 Main Content Area - Full Height */}
            <div className="flex-1 flex flex-col min-h-0 p-6">
              {!showPreview ? (
                <div className="flex flex-col h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
                  {/* Code Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-slate-900 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm font-medium">
                        {activeTab.toUpperCase()} • Portfolio Generator
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      Click the copy button to copy the code
                    </div>
                  </div>

                  {/* Code Content - Full Height */}
                  <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800 hover:scrollbar-thumb-blue-400">
                    {renderCode()}
                  </div>
                </div>
              ) : (
                <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
                  {/* Preview Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-slate-900 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm font-medium">
                        Live Preview • {previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)} View
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      Interactive Preview
                    </div>
                  </div>

                  {/* Preview Content - Full Height */}
                  <div className="h-full bg-gray-100 p-6">
                    <div className={`${previewDeviceStyles[previewDevice]} bg-white shadow-2xl transition-all duration-300`}>
                      <iframe
                        srcDoc={createPreview()}
                        title="Portfolio Preview"
                        sandbox="allow-scripts allow-same-origin"
                        className="w-full h-full rounded-b-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧑‍💻 Empty State */}
      {!hasPortfolio && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            isMobile ? 'w-full h-80' : 'flex-1'
          } flex justify-center items-center p-8`}
        >
          <div className="text-center max-w-md">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              👨‍💻
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Your Portfolio Awaits
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fill out the form and click <span className="font-semibold text-blue-600">"Generate Portfolio"</span> to see your AI-generated code and live preview here.
            </p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-gray-400"
            >
              ↓ Fill out the form on the left to get started
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}