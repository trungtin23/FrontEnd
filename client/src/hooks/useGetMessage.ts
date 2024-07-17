import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetMessage = (username : string) => {
    const { messages, setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    useEffect(() => {
        if (!username) return;

        const getMessage = async () => {
            try {
                if (webSocket) {


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
                }
            } catch (error) {
                console.error(error);
            } finally {

            }
        };

        getMessage();
    }, [username, webSocket, setMessages]);

    return [messages] ;
};

export default useGetMessage;
