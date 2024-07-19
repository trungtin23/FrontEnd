// hooks/useCreateRoom.js
import { useWebSocket } from "../context/SocketContext";

const useCreateRoom = () => {
    const { webSocket } = useWebSocket();

    const createRoom = (roomName: string) => {
        return new Promise((resolve, reject) => {
            if (webSocket) {
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'CREATE_ROOM',
                        data: { name: roomName }
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log(event.data)
                    if (data.event === 'CREATE_ROOM_SUCCESS') {
                        resolve(data);

                    } else if (data.event === 'CREATE_ROOM_ERROR') {
                        reject(data.error);
                    }
                };
            } else {
                reject('WebSocket not connected');
            }
        });
    };

    return { createRoom };
};

export default useCreateRoom;
