import { useCallback } from 'react';
import { useWebSocket } from "../context/SocketContext";
import { toast } from 'react-toastify';
import useConversation from '../zustand/useConversation';

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

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    if (data.event === 'JOIN_ROOM') {
                        if (data.status === 'success') {
                            toast.success(`Joined room "${roomName}" successfully!`);
                            setSelectedConversation({ name: roomName, type: 1 });
                            resolve();
                        } else if (data.status === 'error') {
                            toast.error(`Error joining room: ${data.mes}`);
                            reject(new Error(data.mes));
                        }
                    }
                };
            } else {
                reject(new Error('WebSocket is not connected.'));
            }
        });
    }, [webSocket, setSelectedConversation]);

    return { joinRoom };
};

export default useJoinRoom;
