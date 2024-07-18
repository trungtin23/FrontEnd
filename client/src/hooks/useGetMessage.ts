import { useEffect } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

interface Message {
    id: number;
    name: string;
    to: string;
    mes: string;
    type: number;
    createAt: string;
}

const useGetMessage = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const { webSocket } = useWebSocket();

    useEffect(() => {
        if (!selectedConversation?._id) return;

        const getMessage = async () => {
            try {
                if (webSocket) {
                    console.log('Sending WebSocket message:', {
                        action: 'onchat',
                        data: {
                            event: selectedConversation.type === "group" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                            data: {
                                name: selectedConversation.name,
                                page: 1,
                            }
                        },
                    });

                    webSocket.send(JSON.stringify({
                        action: 'onchat',
                        data: {
                            event: selectedConversation.type === "group" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                            data: {
                                name: selectedConversation.name,
                                page: 1,
                            }
                        }
                    }));

                    webSocket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        console.log('Received WebSocket message:', data);
                        const messageList: Message[] = data.data.map((message: Message) => ({
                            id: message.id,
                            name: message.name,
                            to: message.to,
                            mes: message.mes,
                            type: message.type,
                            createAt: message.createAt,
                        }));

                        if (data.error) {
                            throw new Error(data.error);
                        }
                        setMessages(messageList);
                    };
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        getMessage();
    }, [selectedConversation?._id, webSocket, setMessages]);

    return messages;
};

export default useGetMessage;
