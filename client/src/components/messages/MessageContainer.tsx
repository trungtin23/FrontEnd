import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';


interface MessageContainerProps {

    recipient: string; // Người nhận tin nhắn
}

const MessageContainer: React.FC = ( ) => {
    const [messages, setMessages] = useState<string[]>([]);

    // Sử dụng useEffect để lắng nghe tin nhắn mới từ WebSocket



    return (
        <div className='flex flex-col w-full'>
            <div className='bg-slate-300 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text'>Tin nhắn tới:</span>
                <span className='text-gray-500 font-bold'></span>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                {messages.map((message, index) => (
                    <Message  />
                ))}
            </div>
            <div className="mt-auto">
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageContainer;
