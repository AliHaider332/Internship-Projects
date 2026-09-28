import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import PDFUploader from './components/PDFUploader';
import ChatBot from './components/ChatBot';
import './App.css';

/* Persistent theme hook */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

function App() {
  const [currentView, setCurrentView] = useState('upload');
  const [theme, setTheme] = useTheme();

  const handleGoToChat = () => setCurrentView('chat');

  const handleBackToUpload = () => {
    setCurrentView('upload');
    toast('Upload a new PDF to continue chatting');
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen relative overflow-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text-primary))]">
      {/* Subtle monochrome shapes */}
      <div className="bg-blob w-[28rem] h-[28rem] -top-32 -left-32" />
      <div className="bg-blob w-[28rem] h-[28rem] top-1/2 -right-32" />
      <div className="bg-blob w-96 h-96 bottom-0 left-1/3" />

      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 4000,
          className: '!font-medium',
          style: {
            background: 'rgb(var(--surface))',
            color: 'rgb(var(--text-primary))',
            boxShadow: '3px 3px 0 0 rgb(var(--text-primary))',
            borderRadius: '12px',
            border: '2px solid rgb(var(--text-primary))',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: 'rgb(220 38 38)',
              secondary: 'rgb(var(--surface))',
            },
          },
          error: {
            iconTheme: {
              primary: 'rgb(220 38 38)',
              secondary: 'rgb(var(--surface))',
            },
          },
          loading: {
            iconTheme: {
              primary: 'rgb(var(--text-primary))',
              secondary: 'rgb(var(--surface))',
            },
          },
        }}
      />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-xl bg-[rgb(var(--surface))] border-2 border-[rgb(var(--text-primary))] text-[rgb(var(--text-primary))] shadow-sharp-sm hover:shadow-sharp flex items-center justify-center transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] focus-ring"
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="relative z-10 app">
        {currentView === 'upload' ? (
          <PDFUploader key="upload" handleGoToChat={handleGoToChat} />
        ) : (
          <ChatBot key="chat" onBackToUpload={handleBackToUpload} />
        )}
      </div>
    </div>
  );
}

export default App;