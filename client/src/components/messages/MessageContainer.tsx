import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { WebSocketAPI } from '../../context/WebSocketAPI'; // Import WebSocketAPI

interface MessageContainerProps {
    webSocketAPI: WebSocketAPI | null;
    recipient: string; // Người nhận tin nhắn
}

const MessageContainer: React.FC<MessageContainerProps> = ({ webSocketAPI, recipient }) => {
    const [messages, setMessages] = useState<string[]>([]);

    // Sử dụng useEffect để lắng nghe tin nhắn mới từ WebSocket
    useEffect(() => {
        const handleWebSocketMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message.event === 'RECEIVE_MESSAGE') {
                const newMessage = message.data;
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        };

        if (webSocketAPI?.getSocket()) {
            webSocketAPI?.getSocket().addEventListener('message', handleWebSocketMessage);
        }

        return () => {
            if (webSocketAPI?.getSocket()) {
                webSocketAPI?.getSocket().removeEventListener('message', handleWebSocketMessage);
            }
        };
    }, [webSocketAPI]);

    const sendMessage = (messageContent: string) => {
        if (webSocketAPI && recipient && messageContent.trim() !== '') {
            webSocketAPI.sendMessageToUser(recipient, messageContent);
        }
    };

    return (
        <div className='flex flex-col w-full'>
            <div className='bg-slate-300 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text'>Tin nhắn tới:</span>
                <span className='text-gray-500 font-bold'>{recipient}</span>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                {messages.map((message, index) => (
                    <Message key={index} sender={recipient} content={message} timestamp={''} />
                ))}
            </div>
            <div className="mt-auto">
                <MessageInput webSocketAPI={webSocketAPI} recipient={recipient} sendMessage={sendMessage}
                              />
            </div>
        </div>
    );
};

export default MessageContainer;
