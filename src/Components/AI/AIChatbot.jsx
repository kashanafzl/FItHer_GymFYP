import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane, FaComments } from "react-icons/fa";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your Fitness AI Coach 💪\n\nAsk me anything about fitness, diet, or workouts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/ai/chat", {
        message: input,
        history: messages.slice(-6).map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      });

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, something went wrong. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FLOATING ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all hover:scale-110 active:scale-95"
        aria-label="AI Chatbot"
      >
        {open ? <FaTimes size={20} /> : <FaComments size={22} />}

        {!open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
        )}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[80vh] bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-base">Fitness AI Coach</h3>
              <p className="text-orange-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                Online • Ready to help
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-lg"
            >
              <FaTimes />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0a]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "model" && (
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                    <FaRobot className="text-white text-xs" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : "bg-[#1a1a1a] text-gray-200 border border-gray-800 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                  <FaRobot className="text-white text-xs" />
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* QUICK SUGGESTIONS */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {[
                "Weight loss tips",
                "Best abs workout",
                "How to get more protein?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs bg-[#1a1a1a] border border-gray-800 text-gray-300 px-3 py-1.5 rounded-full hover:border-orange-500 hover:text-orange-500 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div className="p-3 border-t border-gray-800 bg-[#0f0f0f] flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 bg-black border border-gray-700 rounded-2xl px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 resize-none max-h-24"
              style={{ minHeight: "42px" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0 transition"
            >
              <FaPaperPlane size={15} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }

        .overflow-y-auto::-webkit-scrollbar { width: 6px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: #0a0a0a; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #f97316; }
      `}</style>
    </>
  );
}