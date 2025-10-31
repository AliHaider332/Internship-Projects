// App.js
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import PDFUploader from './components/PDFUploader';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('upload');
  const handleGoToChat = () => {
    setCurrentView('chat');
    // toast('Successfully Ready for Chat');
  };
  const handleBackToUpload = () => {
    setCurrentView('upload');
    toast('Upload a new PDF to continue chatting');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#334155',
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="app">
        {currentView === 'upload' ? (
          <PDFUploader handleGoToChat={handleGoToChat} />
        ) : (
          <ChatBot onBackToUpload={handleBackToUpload} />
        )}
      </div>
    </div>
  );
}

export default App;
