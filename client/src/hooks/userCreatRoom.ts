import { useCallback } from 'react';
import { useWebSocket } from "../context/SocketContext";
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications

const useCreateRoom = () => {
    const { webSocket } = useWebSocket();

    const createRoom = useCallback((roomName: string) => {
        if (webSocket) {
            const createRoomMessage = JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'CREATE_ROOM',
                    data: { name: roomName }
                }
            });

            console.log('Sending create room request:', createRoomMessage); // Log the message being sent
            webSocket.send(createRoomMessage);

            webSocket.onmessage = (event) => {
                console.log('Received message:', event.data); // Log the incoming message

                const data = JSON.parse(event.data);

                if (data.event === 'CREATE_ROOM') {
                    if (data.status === 'success') {
                        // Room created successfully
                        console.log(`Room "${roomName}" created successfully!`);
                        toast.success(`Room "${roomName}" created successfully!`);
                    } else if (data.status === 'error') {
                        // Room already exists
                        console.log(`Error creating room: ${data.mes}`);
                        toast.error(`Error: ${data.mes}`);
                    }
                }
            };
        } else {
            console.log('WebSocket is not connected');
        }
    }, [webSocket]);

    return { createRoom };
};

export default useCreateRoom;
