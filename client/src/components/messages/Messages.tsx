import React, {useEffect, useRef} from 'react';
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

    // Reverse the array to display newer messages at the bottom
    const reversedMessages = [...messages].reverse();
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); // Cuộn xuống dưới khi messages thay đổi

    return (
        <div className="p-4 flex flex-col space-y-2">
            {reversedMessages.map((message: MessageData) => (
                <Message
                    key={message.id}
                    message={message}
                    // Check if type is 1 for sent messages
                />
            ))}
            <div ref={endOfMessagesRef} /> {/* Giúp cuộn đến cuối */}
        </div>
    );
};

export default Messages;
