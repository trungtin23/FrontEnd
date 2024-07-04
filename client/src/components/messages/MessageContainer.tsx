import React from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';

interface MessageContainerProps {
    webSocket: WebSocket | null;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ webSocket }) => {
    return (
        <div className='flex flex-col w-full'>
            <div className='bg-slate-300 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text'>Tin nhắn tới:</span>
                <span className='text-gray-500 font-bold'>Mai Xuân Thức</span>
            </div>
            <Messages />
            <MessageInput webSocket={null} />
        </div>
    );
};

export default MessageContainer;
