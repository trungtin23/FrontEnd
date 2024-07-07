import React from 'react';

interface MessageProps {
    sender: string;
    content: string;
    timestamp: string;
    isSent?: boolean;
}

const Message: React.FC<MessageProps> = ({ sender, content, timestamp, isSent }) => {
    return (
        <div className={`chat ${isSent ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <div className="chat-header">
                {sender}
                <time className="text-xs opacity-50">{timestamp}</time>
            </div>
            <div className="chat-bubble">{content}</div>
            {isSent && <div className="chat-footer opacity-50">Delivered</div>}
        </div>
    );
};

export default Message;
