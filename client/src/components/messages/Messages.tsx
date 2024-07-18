import React from 'react';
import Message from './Message';
import useGetMessage from "../../hooks/useGetMessage";

interface MessageData {
    id: string;
    name: string;
    to: string;
    mes: string;
    type: number; // Assuming type is 0 for received and 1 for sent
    createAt: string;
}

const Messages: React.FC = () => {
    const messages: MessageData[] = useGetMessage();

    return (
        <div className="p-4 flex flex-col space-y-2">
            {messages.map((message: MessageData) => (
                <Message
                    key={message.id}
                    id={message.id}
                    sender={message.name}
                    to={message.to}
                    content={message.mes}
                    timestamp={message.createAt}
                     // Check if type is 1 for sent messages
                />
            ))}
        </div>
    );
};

export default Messages;
