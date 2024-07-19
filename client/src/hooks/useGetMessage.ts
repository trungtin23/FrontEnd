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
        if (!selectedConversation?.name) return;

        const getMessage = async () => {
            try {
                if (webSocket) {
                    // Clear previous messages if any
                    setMessages([]);

                    // Send request to get messages
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

                    // Handle incoming messages
                    const handleMessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (data.event === 'GET_ROOM_CHAT_MES' || data.event === 'GET_PEOPLE_CHAT_MES') {
                            const messageList: Message[] = data.data.map((message: Message) => ({
                                id: message.id,
                                name: message.name,
                                to: message.to,
                                mes: message.mes,
                                type: message.type,
                                createAt: message.createAt,
                            }));
                            setMessages(messageList);
                        } else if (data.event === 'SEND_CHAT') {
                            const newMessage: Message = {
                                id: data.id,
                                name: data.name,
                                to: data.to,
                                mes: data.mes,
                                type: data.type,
                                createAt: data.createAt,
                            };
                            setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
                        }
                    };

                    webSocket.addEventListener('message', handleMessage);

                    return () => {
                        // Cleanup listener
                        webSocket.removeEventListener('message', handleMessage);
                    };
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        getMessage();
    }, [selectedConversation?.name, webSocket, setMessages]);

    return messages;
};

export default useGetMessage;
