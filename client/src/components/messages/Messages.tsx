import React, {useEffect, useRef} from 'react';
import Message from './Message';
import useGetMessage from "../../hooks/useGetMessage";
import { Emoji } from 'emoji-mart';

interface MessageData {
    id: string;
    name: string;
    to: string;
    mes: string;
    type: number;
    createAt: string;
}

const Messages: React.FC = () => {
    const messages: MessageData[] = useGetMessage();


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

                 message={message}/>
            ))}
            <div ref={endOfMessagesRef} /> {/* Giúp cuộn đến cuối */}
        </div>
    );
};

export default Messages;
