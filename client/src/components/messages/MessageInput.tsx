import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';


const MessageInput: React.FC = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useSendMessage();
    const { selectedConversation } = useConversation();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedConversation) return; // Trim whitespace and check for empty message

        await sendMessage(selectedConversation.name, message, selectedConversation.type); // Use the selected conversation's name and type
        setMessage("");
    };

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prev => prev + emoji.native);
    };

    return (
        <div className="relative">
            {showEmojiPicker && (
                <div className='absolute bottom-12 left-0 z-10'>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
            )}
            <form onSubmit={handleSubmit} className='px-4 my-3 flex'>
                <div className='w-full'>
                    <input
                        type="text"
                        className='border-2 border-gray-200 text-sm rounded block p-2 bg-white text-black w-full'
                        placeholder={`Enter message here...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className='bg-white rounded-half flex items-center justify-center border-2 border-black w-10'
                >
                    😀
                </button>
                <button type='submit'
                        className='bg-white rounded-half flex items-center justify-center border-2 border-black w-10'>
                    <BsSend/>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
