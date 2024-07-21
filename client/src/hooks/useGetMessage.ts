import { useEffect } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { toast } from 'react-toastify';

interface Message {
    id: number;
    name: string;
    to: string;
    mes: string;
    type: number;
    createAt: string;
}

interface RoomData {
    id: number;
    name: string;
    own: string;
    userList: { id: number; name: string }[];
    chatData: Message[];
}

const useGetMessage = () => {
    const { messages, setMessages, selectedConversation, setSelectedConversation } = useConversation();
    const { webSocket } = useWebSocket();

    useEffect(() => {
        if (!selectedConversation?.name || !webSocket) return;

        const getMessage = async () => {
            try {
                setMessages([]);

                const eventType = selectedConversation.type === 1 ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES";

                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: eventType,
                        data: {
                            name: selectedConversation.name,
                            page: 1,
                        }
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log(data)
                    if (data.event === 'GET_PEOPLE_CHAT_MES') {
                        const messageList: Message[] = data.data.map((message: any) => ({
                            id: message.id,
                            name: message.name,
                            to: message.to,
                            mes: message.mes,
                            type: message.type,
                            createAt: message.createAt,
                        }));
                        setMessages(messageList);
                    } else if (data.event === 'GET_ROOM_CHAT_MES') {
                        const roomData: RoomData = data.data;
                        const messageList: Message[] = roomData.chatData.map((message: any) => ({
                            id: message.id,
                            name: message.name,
                            to: message.to,
                            mes: message.mes,
                            type: message.type,
                            createAt: message.createAt,
                        }));
                        setMessages(messageList);
                    }
                };


            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        getMessage();
    }, [selectedConversation?.name, selectedConversation?.type, webSocket, setMessages, setSelectedConversation]);

    return messages;
};

export default useGetMessage;
