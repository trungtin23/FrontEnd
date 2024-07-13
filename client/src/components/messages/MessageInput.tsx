import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";



interface MessageInputProps {

    recipient: string; // Thêm recipient để gửi tin nhắn cho người nhận cụ thể
}

interface MessageInputProps {
    webSocket: WebSocket | null;
    sendMessage: (messageContent: string) => void; // Thêm thuộc tính sendMessage
}
const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');


    return (
        <form  className='px-4 my-3 flex'>
            <div className='w-full'>
                <input
                    type="text"
                    className='border-2 border-gray-200 text-xl rounded block p-2 bg-white text-black w-full'
                    placeholder={`Nhập tin nhắn cho }...`}
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
