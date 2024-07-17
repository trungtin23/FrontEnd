import React, {useEffect} from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useGetMessage from "../../hooks/useGetMessage";
import useConversation from "../../zustand/useConversation";

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

const MessageContainer: React.FC = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // cleanup function (unmounts)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);
    if (!selectedConversation) {
        return <div className="flex flex-col w-full p-4">Vui lòng chọn người dùng để gửi tin nhắn!!!</div>;
    }
    return (
        <div className='flex flex-col w-full h-full'>
            <div className='bg-slate-300 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text'>Tin nhắn tới:</span>
                <span className='text-gray-500 font-bold'>{selectedConversation.name}</span>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                <Messages />
            </div>
            <div className="mt-auto">
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageContainer;
