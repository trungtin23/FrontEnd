import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useSendMessage();
    const { selectedConversation } = useConversation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedConversation) return; // Trim whitespace and check for empty message

        await sendMessage(selectedConversation.name, message, selectedConversation.type); // Use the selected conversation's name and type
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 my-3 flex'>
            <div className='w-full'>
                <input
                    type="text"
                    className='border-2 border-gray-200 text-xl rounded block p-2 bg-white text-black w-full'
                    placeholder={`Nhập tin nhắn ở đây`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button type='submit' className='bg-white rounded-half flex items-center justify-center ml-3 border-2 border-black w-10'>
                <BsSend />
            </button>
        </form>
    );
};

export default MessageInput;
