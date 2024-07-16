import { useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    const sendMessage = async (username, message) => {
        try {
            setLoading(true);
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'SEND_CHAT',
                    data: { type: 'people', to: username, mes: message }
                }
            }));

            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(prevMessages => [...prevMessages, data]);
            };
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
