import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatting } from '../../server';

const ChatBot = ({ onBackToUpload }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I've processed your PDF and I'm ready to answer your questions. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesContainerRef = useRef();
  const messagesEndRef = useRef();
  const typingIntervalRef = useRef(null);
  const showScrollButtonRef = useRef(false);
  const scrollButtonRef = useRef();

  // Simple scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    hideScrollButton();
  };

  const hideScrollButton = () => {
    if (scrollButtonRef.current) {
      scrollButtonRef.current.style.display = 'none';
    }
    showScrollButtonRef.current = false;
  };

  const showScrollButton = () => {
    if (scrollButtonRef.current) {
      scrollButtonRef.current.style.display = 'flex';
    }
    showScrollButtonRef.current = true;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Handle scroll events without state updates
  useEffect(() => {
    const handleScroll = () => {
      const container = messagesContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop >= scrollHeight - clientHeight - 50;
      
      if (!isAtBottom && !showScrollButtonRef.current) {
        showScrollButton();
      } else if (isAtBottom && showScrollButtonRef.current) {
        hideScrollButton();
      }
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []); // Empty dependency array - this runs once

  // Auto-scroll when new messages are added and we're at bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop >= scrollHeight - clientHeight - 50;
    
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]); // Only run when messages change

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: crypto.randomUUID(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const thinkingId = crypto.randomUUID();
    const thinkingMessage = {
      id: thinkingId,
      text: '',
      isUser: false,
      isTypingIndicator: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await chatting(inputMessage);

      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId));

      const botId = crypto.randomUUID();
      const botMessage = {
        id: botId,
        text: '',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);

      const calculateSpeed = (textLength) => {
        if (textLength <= 50) return 0;
        if (textLength <= 200) return 10;
        if (textLength <= 1000) return 20;
        return 30;
      };

      const speed = calculateSpeed(response.length);

      if (speed === 0) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId ? { ...msg, text: response } : msg
          )
        );
        setIsTyping(false);
      } else {
        let currentText = '';
        let currentIndex = 0;

        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }

        typingIntervalRef.current = setInterval(() => {
          if (currentIndex < response.length) {
            currentText += response[currentIndex];
            currentIndex++;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === botId ? { ...msg, text: currentText } : msg
              )
            );

            // Auto-scroll during typing if we're near bottom
            const container = messagesContainerRef.current;
            if (container) {
              const { scrollTop, scrollHeight, clientHeight } = container;
              const isAtBottom = scrollTop >= scrollHeight - clientHeight - 100;
              if (isAtBottom) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }
            }
          } else {
            if (typingIntervalRef.current) {
              clearInterval(typingIntervalRef.current);
              typingIntervalRef.current = null;
            }
            setIsTyping(false);
          }
        }, speed);
      }
    } catch (error) {
      console.error('Chat error:', error);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: '⚠️ Sorry, I encountered an error while processing your request. Please try again.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const clearChat = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    setMessages([messages[0]]);
    toast.success('Chat cleared!');
    hideScrollButton();
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style>{`
        @keyframes enhancedBlink {
          0% { opacity: 0.2; transform: scale(0.8); }
          25% { opacity: 0.8; transform: scale(1.1); }
          50% { opacity: 1; transform: scale(1.2); }
          75% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.2; transform: scale(0.8); }
        }
        .animate-enhanced-blink {
          animation: enhancedBlink 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToUpload}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 group"
              aria-label="Back to upload"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">PDF Assistant</h2>
                <p className="text-sm text-green-600 font-medium flex items-center">
                  
                  Online • Ready to help
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 group"
            title="Clear chat"
            aria-label="Clear chat"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 hover:scrollbar-thumb-blue-400 scrollbar-thumb-rounded-full"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                  message.isUser
                    ? 'bg-linear-to-r from-blue-500 to-blue-600'
                    : 'bg-linear-to-r from-purple-500 to-purple-600'
                }`}
              >
                {message.isUser ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )}
              </div>

              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                  message.isUser
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }`}
              >
                {message.isTypingIndicator ? (
                  <div className="flex space-x-2 py-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 bg-linear-to-r from-purple-500 to-purple-600 rounded-full animate-enhanced-blink"
                        style={{ animationDelay: `${i * 0.3}s`, animationFillMode: 'both' }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                )}

                <div className={`flex justify-end mt-2 text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button - controlled via refs instead of state */}
        <button
          ref={scrollButtonRef}
          onClick={scrollToBottom}
          className="fixed right-6 bottom-28 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-2xl group"
          aria-label="Scroll to bottom"
          style={{ display: 'none' }}
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Input Section */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-end space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your PDF document..."
              className="w-full px-5 py-4 border border-gray-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white/50 transition-all duration-300 placeholder-gray-400 pr-12"
              disabled={isTyping}
            />
            {isTyping && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-enhanced-blink"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`p-4 rounded-2xl transition-all duration-300 transform ${
              !inputMessage.trim() || isTyping
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105 active:scale-95 hover:shadow-xl'
            }`}
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ChatBot;