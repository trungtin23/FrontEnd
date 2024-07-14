import React from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useGetMessage from "../../hooks/useGetMessage";

interface MessageData {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isSent: boolean;
}

interface MessageContainerProps {
    recipient: string; // Người nhận tin nhắn
}

const MessageContainer: React.FC<MessageContainerProps> = ({ recipient }) => {
    const [messages, loading] = useGetMessage(recipient); // Using recipient to fetch messages

    return (
        <div className='flex flex-col w-full'>
            <div className='bg-slate-300 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text'>Tin nhắn tới:</span>
                <span className='text-gray-500 font-bold'>{recipient}</span>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                {loading ? (
                    <div>Loading messages...</div>
                ) : (
                    <Messages/>
                )}
            </div>
            <div className="mt-auto">
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageContainer;
