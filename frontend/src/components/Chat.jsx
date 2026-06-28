import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/slices/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/slices/constants";
import EmojiPicker from "emoji-picker-react";
import { useState as useEmojiState } from "react";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Chat fetch error:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .chat-root {
          max-width: 780px;
          margin: 24px auto;
          height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 24px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .chat-header {
          padding: 18px 24px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(139,92,246,0.12);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .chat-header-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid rgba(139,92,246,0.2);
        }

        .chat-header-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .chat-header-sub {
          font-size: 0.72rem;
          color: rgba(167,139,250,0.7);
          margin: 0;
        }

        .online-dot {
          width: 8px;
          height: 8px;
          background: #34d399;
          border-radius: 50%;
          margin-left: auto;
          box-shadow: 0 0 8px rgba(52,211,153,0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(139,92,246,0.2) transparent;
        }

        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.2); border-radius: 4px; }

        .msg-row {
          display: flex;
          flex-direction: column;
          max-width: 70%;
          animation: msgIn 0.2s ease;
        }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .msg-row.mine {
          align-self: flex-end;
          align-items: flex-end;
        }

        .msg-row.theirs {
          align-self: flex-start;
          align-items: flex-start;
        }

        .msg-sender {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .msg-bubble {
          padding: 10px 16px;
          border-radius: 18px;
          font-size: 0.88rem;
          line-height: 1.5;
          word-break: break-word;
        }

        .msg-bubble.mine {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(124,58,237,0.3);
        }

        .msg-bubble.theirs {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(139,92,246,0.15);
          color: rgba(255,255,255,0.85);
          border-bottom-left-radius: 4px;
        }

        .msg-time {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.25);
          margin-top: 4px;
          padding: 0 4px;
        }

        .empty-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.2);
          font-size: 0.88rem;
          gap: 8px;
        }

        .empty-chat-icon { font-size: 2.5rem; opacity: 0.4; }

        .chat-input-area {
          padding: 16px 20px;
          border-top: 1px solid rgba(139,92,246,0.12);
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          padding: 11px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 14px;
          color: #fff;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .chat-input:focus {
          border-color: rgba(139,92,246,0.5);
          background: rgba(255,255,255,0.08);
        }

        .chat-input::placeholder { color: rgba(255,255,255,0.2); }

        .send-btn {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(124,58,237,0.35);
          flex-shrink: 0;
        }

        .send-btn:hover {
          filter: brightness(1.15);
          transform: scale(1.06);
          box-shadow: 0 6px 22px rgba(124,58,237,0.5);
        }

        .send-btn:active { transform: scale(0.95); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
      `}</style>

      <div className="chat-root">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-icon">💬</div>
          <div>
            <p className="chat-header-title">Chat</p>
            <p className="chat-header-sub">Real-time messaging</p>
          </div>
          <div className="online-dot" />
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-chat">
              <div className="empty-chat-icon">👋</div>
              <span>Say hello and start the conversation!</span>
            </div>
          )}

          {messages.map((msg, index) => {
            const isMe = user.firstName === msg.firstName;
            return (
              <div key={index} className={`msg-row ${isMe ? "mine" : "theirs"}`}>
                <span className="msg-sender">{msg.firstName} {msg.lastName}</span>
                <div className={`msg-bubble ${isMe ? "mine" : "theirs"}`}>
                  {msg.text}
                </div>
                <span className="msg-time">Just now</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        // TO:
<div style={{ position: "relative" }}>
  {/* Emoji Picker */}
  {showEmojiPicker && (
    <div style={{
      position: "absolute",
      bottom: "70px",
      left: "16px",
      zIndex: 1000,
    }}>
      <EmojiPicker
        theme="dark"
        onEmojiClick={(emojiData) => {
          setNewMessage((prev) => prev + emojiData.emoji);
          setShowEmojiPicker(false);
        }}
        height={380}
        width={300}
        searchDisabled={false}
        skinTonesDisabled={true}
        previewConfig={{ showPreview: false }}
      />
    </div>
  )}

  <div className="chat-input-area">
    {/* Emoji toggle button */}
    <button
      onClick={() => setShowEmojiPicker((prev) => !prev)}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        background: showEmojiPicker
          ? "rgba(124,58,237,0.25)"
          : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(139,92,246,0.2)",
        color: "#a78bfa",
        fontSize: "1.2rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
      title="Emoji"
    >
      😊
    </button>

    <input
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      className="chat-input"
      placeholder="Type a message..."
      // Close picker when typing
      onFocus={() => setShowEmojiPicker(false)}
    />

    <button
      onClick={sendMessage}
      className="send-btn"
      disabled={!newMessage.trim()}
    >
      ➤
    </button>
  </div>
</div>
      </div>
    </>
  );
};

export default Chat;