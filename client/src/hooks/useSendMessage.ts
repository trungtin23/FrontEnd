import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const { setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    interface Message {
        id: number;
        text: string;
        sender: string;
    }

    const sendMessage = async (username: string, message: string, type: string) => {
        try {
            if (webSocket) {
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'SEND_CHAT',
                        data: {
                            type: type === "group" ? "room" : "people",
                            to: username,
                            mes: message,
                        }
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
