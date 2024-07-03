import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";

interface MessageInputProps {
    webSocket: WebSocket | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ webSocket }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const handleSendMessage = () => {
            const sendMessageData = {
                action: 'onchat',
                data: {
                    event: 'SEND_CHAT',
                    data: {
                        type: 'room',
                        to: 'abc', // Replace with the actual recipient or room ID
                        mes: message,
                    },
                },
            };

            const jsonString = JSON.stringify(sendMessageData);

        };
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 my-3 flex'>
            <div className='w-full'>
                <input
                    type="text"
                    className='border-2 border-gray-200 text-xl rounded block p-2 bg-white text-black w-full'
                    placeholder='Nhập tin nhắn ở đây...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button  type='submit' className='bg-white rounded-half flex items-center justify-center ml-3 border-2 border-black w-10'>
                <BsSend />
            </button>
        </form>
    );
};

export default MessageInput;
