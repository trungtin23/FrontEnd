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
                // Clear previous messages if any
                setMessages([]);

                // Determine the event type based on the conversation type
                const eventType = selectedConversation.type === 1 ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES";

                // Send request to get messages
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

                // Handle incoming messages
                const handleMessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    console.log('Received message:', data); // Log incoming messages

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

                        // Optionally, handle the user list if needed
                        console.log('Room user list:', roomData.userList);
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
                    } else if (data.event === 'CREATE_ROOM') {
                        if (data.status === 'success') {
                            toast.success(`Room "${selectedConversation.name}" created successfully!`);
                            setSelectedConversation({ name: selectedConversation.name, type: 1 });
                        } else if (data.status === 'error') {
                            toast.error(`Error creating room: ${data.mes}`);
                        }
                    }
                };

                webSocket.addEventListener('message', handleMessage);

                return () => {
                    webSocket.removeEventListener('message', handleMessage);
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
