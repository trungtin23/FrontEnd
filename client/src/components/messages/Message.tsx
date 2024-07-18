import React from 'react';

interface MessageProps {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    to: string; // Assuming 'to' is the recipient of the message
}

const Message: React.FC<MessageProps> = ({ sender, content, timestamp, to }) => {
    // Logic to determine if the message is sent or received
    const isSentMessage = sender === 'name'; // Replace 'name' with the actual logic to determine sent messages

    return (
        <div className={`chat ${isSentMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <div className="chat-header">
                <span>{isSentMessage ? 'You' : sender}</span>
                <time className="text-xs opacity-50">{timestamp}</time>
            </div>
            <div className="chat-bubble">
                <p>{content}</p>
            </div>
            {/* Optional: Display 'Delivered' message for sent messages */}
            {isSentMessage && <div className="chat-footer opacity-50">Delivered</div>}
        </div>
    );
};

export default Message;
