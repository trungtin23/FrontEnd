// useSendMessage.ts
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const { addMessage } = useConversation();
    const { webSocket } = useWebSocket();

    const sendMessage = async (username: string, message: string, type: string) => {
        try {
            if (webSocket) {
                const messageData = {
                    action: 'onchat',
                    data: {
                        event: 'SEND_CHAT',
                        data: {
                            type: type === "group" ? "room" : "people",
                            to: username,
                            mes: message,
                        }
                    }
                };

                console.log('Sending message:', messageData); // Log the message being sent

                webSocket.send(JSON.stringify(messageData));


            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
