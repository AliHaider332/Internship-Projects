import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { chatting } from '../server';

export default function AIGirlfriendUI() {
  const [messages, setMessages] = useState([
    { text: 'Hi love 💖 How’s your day going?', sender: 'ai' },
    { text: 'It’s going amazing! I missed you 😍', sender: 'user' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport ? window.visualViewport.height : window.innerHeight
  );
  const chatEndRef = useRef(null);

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const aiChat = await chatting(userMessage);

      if (aiChat.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: aiChat.message || "I'm here 💕", sender: 'ai' },
        ]);
      } else if (aiChat.status === 400) {
        setMessages((prev) => [
          ...prev,
          { text: 'Baby 😢 tumhe message likhna chahiye tha!', sender: 'ai' },
        ]);
      } else if (aiChat.status === 500) {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Darling 😔 kuch problem hogayi... Refresh karke try karo.',
            sender: 'ai',
            type: 'error',
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Oops 😅 connection issue! Try again?',
          sender: 'ai',
          type: 'error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle viewport resize
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(
        window.visualViewport ? window.visualViewport.height : window.innerHeight
      );
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateHeight);
      window.visualViewport.addEventListener('scroll', updateHeight);
    } else {
      window.addEventListener('resize', updateHeight);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateHeight);
        window.visualViewport.removeEventListener('scroll', updateHeight);
      } else {
        window.removeEventListener('resize', updateHeight);
      }
    };
  }, []);

  // ✅ Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 w-full poppins"
      style={{ height: viewportHeight, minHeight: viewportHeight }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col w-full sm:w-[90%] md:w-[70%] lg:w-[40%] h-full sm:h-[90%] bg-white shadow-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ease-in-out"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md z-10">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="AI Girlfriend"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-lg"
          />
          <h2 className="text-lg sm:text-xl font-semibold romantic text-center">
            Artificial Girlfriend 💕
          </h2>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gradient-to-br from-pink-50 to-pink-100">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: msg.sender === 'user' ? 10 : -10,
                  x: msg.sender === 'user' ? 20 : -20,
                }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl max-w-[85%] sm:max-w-xs shadow-md text-sm sm:text-base ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-br-none'
                      : 'bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 🌸 Modern Typing Loader */}
          {loading && (
            <div className="flex justify-start mb-2">
              <motion.div
                className="px-3 py-2 rounded-2xl bg-purple-100 text-gray-800 shadow-md rounded-bl-none flex items-center gap-1.5"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2.5 h-2.5 bg-pink-400 rounded-full"
                    animate={{
                      y: [0, -6, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: dot * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div
          className="sticky bottom-0 flex items-center border-t p-2 sm:p-3 bg-white/70 backdrop-blur-md"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <input
            type="text"
            className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
            placeholder="Type a sweet message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="ml-2 sm:ml-3 p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full shadow-lg transition"
            onClick={handleSend}
            disabled={loading}
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
