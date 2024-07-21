import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import useGetUserList from "./useGetUserList";

const useSendMessage = () => {
    const { addMessage } = useConversation();
    const { webSocket } = useWebSocket();
    const { selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    const adjustTimeByHours = (dateString: number, hours: number) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + hours);
        return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }); // Adjust to Vietnam time zone
    };
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


                const newMessage = {
                    id: Date.now(), // Generate a unique id for the message
                    name: authUser.username,
                    to: selectedConversation.name,
                    mes: message,
                    type,
                    createAt:  adjustTimeByHours(Date.now(),-7)
                };
                addMessage(newMessage); // Update the state with the new message


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
