import React from 'react';
import Message from './Message';
import useGetMessage from "../../hooks/useGetMessage";

interface MessageData {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isSent: boolean;
}

const Messages: React.FC = () => {
    const [messages, loading ] = useGetMessage(); // Retrieve messages and loading state from useGetMessage hook

    if (loading) {
        return <div>Loading messages...</div>; // Optional: Show loading indicator
    }

    // Ensure messages is an array of MessageData
    if (!Array.isArray(messages)) {
        return <div>Error: Messages data is not in expected format.</div>; // Handle unexpected data format
    }

    return (
        <div className="p-4">
            {messages.map((message: MessageData) => (
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
