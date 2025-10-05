import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
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

  // ✅ Detect keyboard resize using visualViewport
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

  // ✅ Always scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 poppins w-full poppins"
      style={{ height: viewportHeight, minHeight: viewportHeight }}
    >
      <div className="flex flex-col w-full max-w-md h-full bg-white shadow-2xl sm:rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md z-10">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="AI Girlfriend"
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
          />
          <h2 className="text-xl font-semibold romantic">Artificial Girlfriend 💕</h2>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-pink-50 to-pink-100">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-br-none'
                    : 'bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-2">
              <div className="px-4 py-2 rounded-2xl bg-purple-100 text-gray-800 shadow-md rounded-bl-none">
                <span className="typing-dots"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div
          className="sticky bottom-0 flex items-center border-t p-3 bg-white/70 backdrop-blur-md"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} // ✅ for iOS notch
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Type a sweet message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="ml-2 p-3 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full hover:scale-105 shadow-lg transition"
            onClick={handleSend}
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
