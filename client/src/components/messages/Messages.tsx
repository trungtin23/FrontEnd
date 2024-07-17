import React from 'react';
import Message from './Message';
import useGetMessage from "../../hooks/useGetMessage";

interface MessageData {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isSent: boolean;
    recipient: string; // Người nhận tin nhắn

}
interface MessagesProps {
    recipient: string;
}
const Messages: React.FC  = () => {


    // Ensure messages is an array of MessageData

    return (
        <div className="p-4">

                <Message

                />

        </div>
    );
};

export default Messages;
