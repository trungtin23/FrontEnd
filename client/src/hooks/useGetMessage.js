import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetMessage = (username) => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    useEffect(() => {
        if (!username) return;

        const getMessage = async () => {
            try {
                setLoading(true);
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'GET_PEOPLE_CHAT_MES',
                        data: { user: username },
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setMessages(data);
                };
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getMessage();
    }, [username, webSocket, setMessages]);

    return [messages, loading] ;
};

export default useGetMessage;
