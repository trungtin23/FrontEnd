import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import {WebSocketAPI} from "../../context/WebSocketAPI";


interface MessageInputProps {
    webSocketAPI: WebSocketAPI | null;
    recipient: string; // Thêm recipient để gửi tin nhắn cho người nhận cụ thể
}

interface MessageInputProps {
    webSocket: WebSocket | null;
    sendMessage: (messageContent: string) => void; // Thêm thuộc tính sendMessage
}
const MessageInput: React.FC<MessageInputProps> = ({ webSocketAPI, recipient }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== '' && webSocketAPI) {
            if (recipient) {
                webSocketAPI.sendMessageToUser(recipient, message); // Gửi tin nhắn cho người dùng cụ thể
            } else {
                // Xử lý gửi tin nhắn đến phòng nếu cần
            }
            setMessage(''); // Xóa nội dung trong input sau khi gửi tin nhắn
        }
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 my-3 flex'>
            <div className='w-full'>
                <input
                    type="text"
                    className='border-2 border-gray-200 text-xl rounded block p-2 bg-white text-black w-full'
                    placeholder={`Nhập tin nhắn cho ${recipient}...`}
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
