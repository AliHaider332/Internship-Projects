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

  // ✅ Send message (UNCHANGED)
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

  // ✅ Handle viewport resize (UNCHANGED)
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

  // ✅ Auto-scroll (UNCHANGED)
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full poppins bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200"
      style={{ height: viewportHeight, minHeight: viewportHeight }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="
          flex flex-col w-full h-full
          sm:w-[92%] sm:h-[92%] sm:max-w-md
          md:w-[70%] md:max-w-lg
          lg:w-[45%] lg:max-w-xl
          bg-white/95 backdrop-blur-xl
          shadow-[0_20px_60px_-15px_rgba(236,72,153,0.35)]
          border border-white/60
          sm:rounded-[28px] overflow-hidden
        "
      >
        {/* ================= Header ================= */}
        <div className="
          sticky top-0 z-10 flex items-center gap-3
          px-4 py-3.5
          bg-gradient-to-r from-pink-500 via-pink-500 to-rose-400
          text-white
          shadow-[0_4px_20px_-4px_rgba(236,72,153,0.5)]
        ">
          <div className="relative flex-none">
            <img
              src="https://i.pravatar.cc/100?img=47"
              alt="AI Girlfriend"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/90 shadow-md object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>

          <div className="flex-1 min-w-0 leading-tight">
            <h2 className="text-base sm:text-lg font-semibold romantic truncate">
              Artificial Girlfriend 💕
            </h2>
            <p className="text-[11px] sm:text-xs text-white/85 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
              {loading ? 'Typing…' : 'Online now'}
            </p>
          </div>
        </div>

        {/* ================= Chat Window ================= */}
        <div className="
          flex-1 overflow-y-auto scroll-slim
          px-3 sm:px-4 py-4
          bg-gradient-to-b from-pink-50/60 via-white to-purple-50/60
        ">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: msg.sender === 'user' ? 8 : -8,
                  x: msg.sender === 'user' ? 16 : -16,
                }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`flex mb-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={[
                    'px-3.5 py-2.5 sm:px-4 sm:py-3',
                    'rounded-2xl max-w-[82%] sm:max-w-[75%]',
                    'text-[14px] sm:text-[15px] leading-relaxed',
                    'break-words [overflow-wrap:anywhere]',
                    'shadow-sm',
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-br-md shadow-pink-500/25'
                      : msg.type === 'error'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 rounded-bl-md'
                        : 'bg-white text-slate-800 border border-pink-100 rounded-bl-md shadow-purple-500/5',
                  ].join(' ')}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 🌸 Typing Loader */}
          {loading && (
            <div className="flex justify-start mb-3">
              <motion.div
                className="
                  px-4 py-3 rounded-2xl rounded-bl-md
                  bg-white border border-pink-100 shadow-sm
                  flex items-center gap-1.5
                "
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2 h-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: dot * 0.18,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* ================= Input Bar ================= */}
        <div
          className="
            sticky bottom-0 flex items-center gap-2
            px-3 py-3
            bg-white/85 backdrop-blur-xl
            border-t border-pink-100
          "
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
        >
          <input
            type="text"
            className="
              flex-1 min-w-0
              px-4 py-2.5
              rounded-full
              border border-pink-200
              bg-pink-50/50
              text-[14px] sm:text-[15px] text-slate-800
              placeholder-pink-400/70
              focus:outline-none focus:border-pink-400 focus:bg-white
              focus:ring-2 focus:ring-pink-300/40
              transition-all
            "
            placeholder="Type a sweet message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            className="
              flex-none ml-1
              p-2.5 sm:p-3
              bg-gradient-to-br from-pink-500 to-rose-500
              text-white rounded-full
              shadow-lg shadow-pink-500/40
              hover:shadow-xl hover:shadow-pink-500/50
              transition-shadow
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}