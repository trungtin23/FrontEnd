import React from 'react';
import Message from './Message';

interface MessageData {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isSent: boolean;
}

interface MessagesProps {
    messages: MessageData[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
    return (
        <div className="p-4">
            {messages.map(message => (
                <Message
                    key={message.id}
                    sender={message.sender}
                    content={message.content}
                    timestamp={message.timestamp}
                    isSent={message.isSent}
                />
            ))}
        </div>
    );
};

export default Messages;
