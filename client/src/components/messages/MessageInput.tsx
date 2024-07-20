import React, { useState, useEffect, useRef } from 'react';
import { BsSend } from "react-icons/bs";
import Picker from '@emoji-mart/react'; // Correct import for default export
import data from '@emoji-mart/data';
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useSendMessage();
    const { selectedConversation , setSelectedConversation} = useConversation();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedConversation) return;

        await sendMessage(selectedConversation.name, message, selectedConversation.type);
        setMessage("");


    };

    const handleEmojiSelect = (emoji: { native: string }) => {
        setMessage(prev => prev + emoji.native);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-8">
            {showEmojiPicker && (
                <div ref={emojiPickerRef} className='absolute bottom-12 left-0 z-10'>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
            )}
            <form onSubmit={handleSubmit} className='-ml-5 px-4 my-3 flex'>
                <div className='w-full'>
                    <input
                        type="text"
                        className='border-2 border-gray-200 text-sm rounded block p-2 bg-white text-black  w-500'
                        placeholder={`Enter message here...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div>

                </div>
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className='bg-white -ml-9 rounded-half flex items-center justify-center border-2 border-black w-10'
                >
                    😀
                </button>
                <button type='submit'
                        className='bg-white rounded-half flex items-center justify-center border-2 border-black w-10'>
                    <BsSend />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
