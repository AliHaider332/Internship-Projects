import React, {
  memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatting } from '../../server';

/* =========================================================
   Inline SVG icons
   ========================================================= */
const Icon = {
  Back: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Whale: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c-4.5 0-8 3.5-8 8 0 3.5 2 6.5 5 7.7V21l3-2 3 2v-2.3c3-1.2 5-4.2 5-7.7 0-4.5-3.5-8-8-8z" />
      <path d="M9.5 11.5h.01M14.5 11.5h.01" />
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Send: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Stop: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Copy: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  Refresh: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4v6h6M20 20v-6h-6" />
      <path d="M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
    </svg>
  ),
};

/* =========================================================
   Constants
   ========================================================= */
const GREETING = {
  id: 'greeting',
  text: "Hello! I've processed your PDF and I'm ready to answer your questions. What would you like to know?",
  isUser: false,
  timestamp: new Date(),
};

const SUGGESTIONS = [
  'Summarize the key points',
  'What are the main conclusions?',
  'List any action items',
  'Explain the most technical section',
];

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/** Strip an accidental echo of the user's prompt at the start of the answer. */
const stripPromptEcho = (answer, prompt) => {
  if (!answer || !prompt) return answer || '';
  const q = prompt.trim();
  let out = answer;
  if (out.startsWith(q)) {
    out = out.slice(q.length).replace(/^[\s:：\-–—]+/, '');
  }
  // Also handle "Question: <q>\nAnswer: ..." patterns
  const re = new RegExp(`^\\s*(Q(?:uestion)?[:：]\\s*)${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(A(?:nswer)?[:：])?\\s*`, 'i');
  out = out.replace(re, '');
  return out.trim();
};

/* =========================================================
   ChatBot
   ========================================================= */
const ChatBot = ({ onBackToUpload }) => {
  const [messages, setMessages] = useState([GREETING]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const textareaRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const streamingIdRef = useRef(null);

  const isEmpty = messages.length <= 1;

  /* ---------- Helpers ---------- */
  const scrollToBottom = useCallback((smooth = true) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const updateAutoScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 120;
    shouldAutoScrollRef.current = atBottom;
    setShowScrollBtn(!atBottom);
  }, []);

  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  /* ---------- Lifecycle ---------- */
  useEffect(() => () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  }, []);

  useEffect(() => { textareaRef.current?.focus(); }, []);
  useEffect(() => { autoGrow(); }, [inputMessage, autoGrow]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateAutoScroll, { passive: true });
    updateAutoScroll();
    return () => el.removeEventListener('scroll', updateAutoScroll);
  }, [updateAutoScroll]);

  // Scroll only when user is at bottom OR when a new message is added
  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      // Use 'auto' during streaming to avoid fighting smooth animation
      scrollToBottom(!isTyping);
    }
  }, [messages, isTyping, scrollToBottom]);

  /* ---------- Send ---------- */
  const handleSendMessage = async (overrideText) => {
    const text = (overrideText ?? inputMessage).trim();
    if (!text || isTyping) return;

    // Force auto-scroll when user sends a new message
    shouldAutoScrollRef.current = true;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, isUser: true, timestamp: new Date() },
    ]);
    setInputMessage('');
    setIsTyping(true);

    const thinkingId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, isTypingIndicator: true, isUser: false, text: '' },
    ]);

    try {
      const rawResponse = await chatting(text);
      const response = stripPromptEcho(rawResponse?.toString() ?? '', text);

      if (!response) throw new Error('Empty response');

      setMessages((prev) => prev.filter((m) => m.id !== thinkingId));

      const botId = crypto.randomUUID();
      streamingIdRef.current = botId;
      setMessages((prev) => [
        ...prev,
        { id: botId, text: '', isUser: false, timestamp: new Date() },
      ]);

      const len = response.length;
      const speed = len <= 50 ? 0 : len <= 200 ? 12 : len <= 1000 ? 20 : 28;

      if (speed === 0) {
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: response } : m))
        );
        setIsTyping(false);
        streamingIdRef.current = null;
        return;
      }

      // Stream chunks (2–4 chars per tick for smoother feel)
      const charsPerTick = len > 1000 ? 4 : len > 400 ? 3 : 2;
      let i = 0;
      let buffer = '';
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      typingIntervalRef.current = setInterval(() => {
        if (i < response.length) {
          const step = Math.min(charsPerTick, response.length - i);
          buffer += response.slice(i, i + step);
          i += step;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, text: buffer } : m
            )
          );

          // Only scroll if user is at bottom
          if (shouldAutoScrollRef.current) {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          }
        } else {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          streamingIdRef.current = null;
          setIsTyping(false);
        }
      }, speed);
    } catch (err) {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      streamingIdRef.current = null;
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== thinkingId),
        {
          id: crypto.randomUUID(),
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStop = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsTyping(false);
    streamingIdRef.current = null;
  };

  const clearChat = () => {
    handleStop();
    setMessages([{ ...GREETING, timestamp: new Date() }]);
    toast.success('Chat cleared');
  };

  const canSend = inputMessage.trim().length > 0 && !isTyping;
  const canClear = messages.length > 1;

  /* =========================================================
     Render
     ========================================================= */
  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text-primary))]">

      {/* ================= Header ================= */}
      <header className="relative z-20 flex-none bg-[rgb(var(--surface))] border-b border-[rgb(var(--border-soft))]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBackToUpload}
              aria-label="Back to upload"
              className="flex-none w-9 h-9 rounded-lg text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-muted))] transition-colors flex items-center justify-center focus-ring"
            >
              <Icon.Back className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="relative flex-none">
                <div className="w-8 h-8 bg-[rgb(var(--accent))] rounded-lg flex items-center justify-center text-white">
                  <Icon.Whale className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[rgb(var(--surface))] rounded-full" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[rgb(var(--text-primary))] truncate leading-tight">
                  PDF Assistant
                </h2>
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] leading-tight">
                  {isTyping ? 'Generating…' : 'Online'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              disabled={!canClear}
              title="New chat"
              aria-label="New chat"
              className="w-9 h-9 rounded-lg text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-muted))] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center justify-center focus-ring"
            >
              <Icon.Refresh className="w-4 h-4" />
            </button>
            <button
              onClick={clearChat}
              disabled={!canClear}
              title="Clear chat"
              aria-label="Clear chat"
              className="w-9 h-9 rounded-lg text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-muted))] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center justify-center focus-ring"
            >
              <Icon.Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= Messages ================= */}
      <main
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-slim"
      >
        {isEmpty ? (
          <div className="min-h-full flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl text-center animate-fade-in-up">
              <div className="inline-flex w-14 h-14 bg-[rgb(var(--accent))] rounded-2xl items-center justify-center mb-5 shadow-[3px_3px_0_0_rgb(10_10_10)] dark:shadow-[3px_3px_0_0_rgb(245_245_245)]">
                <Icon.Sparkle className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-[rgb(var(--text-primary))]">
                How can I help you today?
              </h1>
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-8">
                Ask anything about your PDF — summaries, key points, deep dives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSendMessage(s)}
                    className="group text-left px-4 py-3 rounded-xl border border-[rgb(var(--border-soft))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--surface-muted))] transition-all focus-ring"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium text-[rgb(var(--text-primary))]">
                        {s}
                      </span>
                      <span className="flex-none text-[rgb(var(--text-tertiary))] group-hover:text-[rgb(var(--accent))] transition-colors">
                        <Icon.Send className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.map((m, idx) => (
              <MessageBlock
                key={m.id}
                message={m}
                isStreaming={m.id === streamingIdRef.current}
                isLast={idx === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        )}
      </main>

      {/* ================= Composer ================= */}
      <footer className="relative z-20 flex-none bg-[rgb(var(--bg))]">
        <div className="max-w-3xl mx-auto px-4 pb-4 pt-2">

          <div className="relative h-0">
            <button
              onClick={() => { shouldAutoScrollRef.current = true; scrollToBottom(); }}
              aria-label="Scroll to bottom"
              className={[
                'absolute -top-14 left-1/2 -translate-x-1/2 z-30 w-9 h-9',
                'bg-[rgb(var(--surface))] border border-[rgb(var(--border-soft))] rounded-full',
                'shadow-md flex items-center justify-center transition-all',
                'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--text-primary))] focus-ring',
                showScrollBtn
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-1 pointer-events-none',
              ].join(' ')}
            >
              <Icon.ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div
            className={[
              'group relative flex items-end gap-2',
              'bg-[rgb(var(--surface))] border-2 border-[rgb(var(--text-primary))] rounded-3xl',
              'shadow-[3px_3px_0_0_rgb(10_10_10)] dark:shadow-[3px_3px_0_0_rgb(245_245_245)]',
              'focus-within:border-[rgb(var(--accent))] focus-within:shadow-[3px_3px_0_0_rgb(220_38_38)]',
              'transition-all p-1.5 pl-4',
            ].join(' ')}
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message PDF Assistant…"
              disabled={isTyping}
              aria-label="Message input"
              className="flex-1 min-w-0 resize-none bg-transparent border-0 outline-none text-[14px] leading-6 py-2.5 pr-1 placeholder-[rgb(var(--text-tertiary))] text-[rgb(var(--text-primary))] disabled:opacity-60 max-h-[200px] scroll-slim"
            />

            <div className="flex items-center gap-1.5 pb-0.5">
              {isTyping ? (
                <button
                  onClick={handleStop}
                  aria-label="Stop generating"
                  className="flex-none w-9 h-9 rounded-2xl bg-[rgb(var(--surface-invert))] text-[rgb(var(--text-on-invert))] flex items-center justify-center border-2 border-[rgb(var(--surface-invert))] hover:opacity-90 transition-opacity focus-ring"
                >
                  <Icon.Stop className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!canSend}
                  aria-label="Send message"
                  className={[
                    'flex-none w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all focus-ring',
                    canSend
                      ? 'bg-[rgb(var(--accent))] border-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] hover:border-[rgb(var(--accent-hover))]'
                      : 'bg-[rgb(var(--surface-muted))] border-[rgb(var(--border-soft))] text-[rgb(var(--text-tertiary))] cursor-not-allowed',
                  ].join(' ')}
                >
                  <Icon.Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-[11px] text-[rgb(var(--text-tertiary))] mt-2 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <Icon.Lock className="w-3 h-3" />
              Answers grounded in your PDF
            </span>
            <span className="text-[rgb(var(--border-soft))]">·</span>
            <span>
              <kbd className="px-1 py-0.5 text-[10px] font-semibold text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface-muted))] border border-[rgb(var(--border-soft))] rounded">
                Enter
              </kbd>
              {' '}to send
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

/* =========================================================
   MessageBlock — memoized to prevent re-renders during streaming
   ========================================================= */
const MessageBlock = memo(function MessageBlock({ message, isStreaming, isLast }) {
  const isUser = message.isUser;
  const isIndicator = message.isTypingIndicator;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.text || '');
      setCopied(true);
      toast.success('Copied');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Copy failed');
    }
  }, [message.text]);

  if (isIndicator) {
    return (
      <div className="py-5 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="flex-none w-7 h-7 rounded-full bg-[rgb(var(--accent))] text-white flex items-center justify-center">
            <Icon.Whale className="w-4 h-4" />
          </div>
          <div className="pt-0.5">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--text-tertiary))] dot-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
              <span className="ml-1 text-xs text-[rgb(var(--text-tertiary))]">
                Thinking…
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="py-3 bubble-in-user">
        <div className="flex justify-end">
          <div className="max-w-[85%] sm:max-w-[75%] flex items-end gap-2.5">
            <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-[rgb(var(--surface-invert))] text-[rgb(var(--text-on-invert))] text-[14px] leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">
              {message.text}
            </div>
            <div className="flex-none w-7 h-7 rounded-full bg-[rgb(var(--text-primary))] text-[rgb(var(--surface))] flex items-center justify-center mb-0.5">
              <Icon.User className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 bubble-in-bot group/msg">
      <div className="flex items-start gap-3">
        <div className="flex-none w-7 h-7 rounded-full bg-[rgb(var(--accent))] text-white flex items-center justify-center mt-0.5">
          <Icon.Whale className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div
            className={[
              'prose prose-sm prose-chat max-w-none dark:prose-invert',
              'text-[14px] leading-7 text-[rgb(var(--text-primary))]',
              'break-words [overflow-wrap:anywhere]',
              'prose-p:my-2 prose-p:leading-7',
              'prose-headings:my-3 prose-headings:font-bold',
              'prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5',
              'prose-pre:my-3 prose-pre:text-xs',
              'prose-code:before:content-none prose-code:after:content-none',
            ].join(' ')}
          >
            {/* key on length forces ReactMarkdown to update text but NOT remount
                because we render the whole string each time (stable node tree) */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>

            {/* Caret rendered as a SIBLING — no remount of the markdown tree */}
            {isStreaming && (
              <span
                className="caret-blink"
                aria-hidden="true"
                style={{ verticalAlign: '-0.1em' }}
              />
            )}
          </div>

          {/* Actions */}
          {!isStreaming && message.text && (
            <div className="mt-2 flex items-center gap-1 opacity-0 group-hover/msg:opacity-100 focus-within:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                aria-label="Copy message"
                title="Copy"
                className="w-7 h-7 rounded-lg text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-muted))] flex items-center justify-center transition-colors focus-ring"
              >
                {copied
                  ? <Icon.Check className="w-3.5 h-3.5" />
                  : <Icon.Copy className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[10px] text-[rgb(var(--text-tertiary))] pl-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatBot;