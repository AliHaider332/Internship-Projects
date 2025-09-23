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
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const aiChat = await chatting(userMessage);

      if (aiChat.status === 200) {
        // normal AI reply
        setMessages((prev) => [
          ...prev,
          { text: aiChat.message || "I'm here 💕", sender: 'ai' },
        ]);
      } else if (aiChat.status === 400) {
        // input error
        setMessages((prev) => [
          ...prev,
          { text: 'Baby 😢 tumhe message likhna chahiye tha!', sender: 'ai' },
        ]);
      } else if (aiChat.status === 500) {
        // refresher/retry option
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

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 p-4 poppins min-h-[100vh] ">
      <div className="w-full max-w-md flex flex-col bg-white shadow-2xl rounded-3xl overflow-hidden min-h-[600px] max-h-[700px] custom-scroll">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="AI Girlfriend"
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
          />
          <h2 className="text-xl romantic font-semibold">
            Artificiall Girlfriend 💕
          </h2>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto h-96 bg-gradient-to-br from-pink-50 to-pink-100">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-br-none'
                    : msg.type === 'error'
                    ? 'bg-red-100 text-red-600 border border-red-300'
                    : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
                {msg.type === 'error' && (
                  <button
                    onClick={handleSend}
                    className="mt-2 px-3 py-1 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600"
                  >
                    🔄 Refresh
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Loader bubble */}
          {loading && (
            <div className="flex justify-start mb-3">
              <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 shadow-md rounded-bl-none flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="flex items-center border-t p-3 bg-white">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Type a sweet message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="ml-2 p-3 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full hover:opacity-90 shadow-lg transition"
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
