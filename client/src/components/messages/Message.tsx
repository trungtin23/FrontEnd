import React, { useEffect, useState } from 'react';

interface MessageProps {
  webSocket: WebSocket;
  chatName: string; // Tên phòng hoặc người cần lấy tin nhắn
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ webSocket, chatName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);



  return (
      <div className='p-4'>
        {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.sender === 'Obi-Wan Kenobi' ? 'chat-start' : 'chat-end'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="chat-header">
                {msg.sender}
                <time className="text-xs opacity-50 ml-2">{msg.timestamp}</time>
              </div>
              <div className="chat-bubble">{msg.message}</div>
              <div className="chat-footer opacity-50">
                {msg.sender === 'Obi-Wan Kenobi' ? 'Delivered' : 'Seen'}
              </div>
            </div>
        ))}
      </div>
  );
};

export default Message;
