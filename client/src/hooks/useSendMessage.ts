import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import {useContext} from "react";
import {useAuthContext} from "../context/AuthContext";
import useGetUserList from "./useGetUserList";

const useSendMessage = () => {
    const { addMessage } = useConversation();
    const { webSocket } = useWebSocket();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const {authUser} = useAuthContext();

    const sendMessage = async (username: string, message: string, type: number) => {
        try {
            if (webSocket) {
                const messageData = {
                    action: 'onchat',
                    data: {
                        event: 'SEND_CHAT',
                        data: {
                            type: type === 1 ? "room" : "people",
                            to: username,
                            mes: message,
                        }
                    }
                };

                console.log('Sending message:', messageData); // Log the message being sent

                webSocket.send(JSON.stringify(messageData));

                // Add the message to local state immediately
                const newMessage = {
                    id: Date.now(), // Generate a unique id for the message
                    name: authUser.username ,
                    to: selectedConversation.name,
                    mes: message,
                    type,
                    createAt: new Date().toISOString(), // Set the creation time
                };
                addMessage(newMessage); // Update the state with the new message
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
