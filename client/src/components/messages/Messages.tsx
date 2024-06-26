import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const Messages = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);


  return (
      <div className='overflow-auto'>
        {webSocket && (
            <>
              <Message webSocket={webSocket} chatName="SomeChatName" />

              <MessageInput webSocket={webSocket} />
            </>
        )}
      </div>
  );
};

export default Messages;
