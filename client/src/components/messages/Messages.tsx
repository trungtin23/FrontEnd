import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const Messages = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://140.238.54.136:8080/chat');
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWebSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
      <div className='overflow-auto'>
        {webSocket && (
            <>
              <Message webSocket={webSocket} chatName="SomeChatName" />
              <Message webSocket={webSocket} chatName="SomeChatName" />
              <Message webSocket={webSocket} chatName="SomeChatName" />
              <MessageInput webSocket={webSocket} />
            </>
        )}
      </div>
  );
};

export default Messages;
