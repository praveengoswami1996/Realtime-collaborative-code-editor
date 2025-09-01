import React, { useState } from "react";
import { Send, User } from "lucide-react";

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Wilson",
      message:
        "Hey everyone! Just pushed the latest changes to the API endpoints.",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      user: "Mike Chen",
      message:
        "Great work! I can see the improvements. Should we update the frontend accordingly?",
      timestamp: "2:35 PM",
    },
    {
      id: 3,
      user: "John Doe",
      message: "Yes, I'm working on that right now. Give me about 10 minutes.",
      timestamp: "2:36 PM",
      isOwn: true,
    },
    {
      id: 4,
      user: "Emma Davis",
      message:
        "I noticed a small issue in line 45. The error handling could be more robust.",
      timestamp: "2:38 PM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message via Socket.IO
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Session Chat</h3>
        <p className="text-xs text-gray-400 mt-1">Real-time collaboration</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex space-x-2 ${
              msg.isOwn ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={12} className="text-gray-300" />
            </div>
            <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium text-gray-300">
                  {msg.user}
                </span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <div
                className={`inline-block px-3 py-2 rounded-lg text-sm ${
                  msg.isOwn
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-700"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
