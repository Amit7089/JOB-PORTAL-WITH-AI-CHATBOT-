import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      user: false,
      text: "Hello! I am JobBot 🤖, your AI assistant. Ask me anything about jobs, resumes, or interviews!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { user: true, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5011/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { user: false, text: data.reply || "No response from AI." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Error connecting to AI server 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Avatar Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300 z-50"
            title="Chat with JobBot"
          >
            🤖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 w-96 max-h-[70vh] bg-white shadow-2xl rounded-3xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 flex justify-between items-center rounded-t-3xl">
              <h3 className="font-semibold text-lg">💬 JobBot AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-2">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] px-3 py-2 rounded-xl shadow-sm break-words ${
                    m.user
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-100 self-start text-left"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <p className="text-sm text-gray-500 animate-pulse">JobBot is typing...</p>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="flex p-3 border-t bg-gray-50">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="border rounded-xl p-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl ml-2 hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatBot;
