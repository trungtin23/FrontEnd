import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const { setMessages } = useConversation();
    const { webSocket } = useWebSocket();
    interface Message {
        // Define the structure of your message object
        id: number;
        text: string;
        sender: string;
        // Add more properties as needed
    }
    const sendMessage = async (username: string, message: string) => {
        try {
            if (webSocket) {
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'SEND_CHAT',
                        data: {type: 'people', to: username, mes: message}
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setMessages((prevMessages: Message[]) => [...prevMessages, data]);
                };
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { sendMessage };
};

export default useSendMessage;
