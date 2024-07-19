import { useCallback } from 'react';
import { useWebSocket } from "../context/SocketContext";
import toast from "react-hot-toast";
import useConversation from '../zustand/useConversation';
import 'react-toastify/dist/ReactToastify.css';
import "../components/css/Custom.css"
const useJoinRoom = () => {
    const { webSocket } = useWebSocket();
    const { setSelectedConversation } = useConversation();

    const joinRoom = useCallback((roomName: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (webSocket) {
                const joinRoomMessage = JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'JOIN_ROOM',
                        data: { name: roomName }
                    }
                });

                webSocket.send(joinRoomMessage);

                const handleWebSocketMessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                        console.log(data)

                        if (data.status === 'success') {
                            toast.success(`Joined room "${roomName}" successfully!`);
                            setSelectedConversation({ name: roomName, type: 1 });

                        } else if (data.status === 'error') {

                            toast.error(`Error joining room: ${data.mes}`


                            );

                        }

                };

                // Add event listener for handling WebSocket messages
                webSocket.addEventListener('message', handleWebSocketMessage);

                // Ensure to clean up event listeners to prevent memory leaks
                return () => {
                    webSocket.removeEventListener('message', handleWebSocketMessage);
                };

            } else {
                toast.error('WebSocket is not connected.');
                reject(new Error('WebSocket is not connected.'));
            }
        });
    }, [webSocket, setSelectedConversation]);

    return { joinRoom };
};

export default useJoinRoom;
