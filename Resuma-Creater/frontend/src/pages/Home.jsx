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

  const renderCode = () => {
    let code = '';
    if (activeTab === 'html') code = portfolio.html;
    if (activeTab === 'css') code = portfolio.css;
    if (activeTab === 'js') code = portfolio.js;

    return (
      <pre
        className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-auto text-sm h-[70vh] shadow-inner 
        scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800 hover:scrollbar-thumb-indigo-400 transition-all duration-200"
      >
        <code>{code || '// No code generated yet.'}</code>
      </pre>
    );
  };

  const createPreview = () => {
    const { html, css, js } = portfolio;
    return `
      <html>
        <head><style>${css}</style></head>
        <body>${html}<script>${js}</script></body>
      </html>
    `;
  };

  const hasPortfolio = portfolio.html || portfolio.css || portfolio.js;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex ${
        isMobile ? 'flex-col' : 'flex-row'
      } relative transition-all duration-300`}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* 🧾 Left Section – Form */}
      <div
        className="bg-white shadow-lg relative transition-all duration-200"
        style={{ width: isMobile ? '100%' : `${leftWidth}%` }}
      >
        <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 hover:scrollbar-thumb-indigo-400">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">
            AI Portfolio Builder
          </h1>
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>

        {/* 🔄 Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-solid"></div>
            <p className="text-indigo-600 mt-3 font-semibold">
              Generating Portfolio...
            </p>
          </div>
        )}
      </div>

      {/* 🪟 Draggable Divider (Desktop Only) */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
        ></div>
      )}

      {/* 💻 Right Section – Preview */}
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
              isMobile ? 'w-full ' : 'flex-1'
            } p-6 bg-gray-50 flex flex-col overflow-hidden x`}
          >
            <div className="w-full max-w-5xl  mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
              {/* 🧩 Tabs Header */}
              <div className="flex justify-between items-center border-b border-gray-300 bg-gray-100 px-4 py-2.5 flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {['html', 'css', 'js'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setShowPreview(false);
                      }}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                        activeTab === tab && !showPreview
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                      showPreview
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {showPreview ? 'Hide Preview' : 'Live Preview'}
                  </button>
                </div>
                <div className="text-xs text-gray-500">🧠 Generated Output</div>
              </div>

              {/* 💻 Main Content Area */}
              <div className="p-4 bg-gray-900 text-white flex-1 overflow-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800 hover:scrollbar-thumb-indigo-400">
                {!showPreview ? (
                  renderCode()
                ) : (
                  <iframe
                    srcDoc={createPreview()}
                    title="Portfolio Preview"
                    sandbox="allow-scripts"
                    className="w-full h-[100vh] rounded-xl shadow-lg border border-gray-300 bg-white"
                  ></iframe>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧑‍💻 Placeholder */}
      {!hasPortfolio && !loading && (
        <div className="flex-1 flex justify-center items-center p-6 text-gray-500 text-lg font-medium">
          🧑‍💻 Your generated portfolio will appear here after you submit the
          form.
        </div>
      )}
    </div>
  );
}
