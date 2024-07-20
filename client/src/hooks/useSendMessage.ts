import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import useGetUserList from "./useGetUserList";

const useSendMessage = () => {
    const { addMessage } = useConversation();
    const { webSocket } = useWebSocket();
    const { selectedConversation } = useConversation();
    const { authUser } = useAuthContext();

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


                webSocket.send(JSON.stringify(messageData));

                // Add the message to local state immediately
                const newMessage = {
                    id: Date.now(), // Generate a unique id for the message
                    name: authUser.username,
                    to: selectedConversation.name,
                    mes: message,
                    type,
                    createAt: new Date().toISOString(), // Use ISO string for timestamp
                };
                addMessage(newMessage); // Update the state with the new message

                // Request to update user list
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'GET_USER_LIST',
                    }
                }));

            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
