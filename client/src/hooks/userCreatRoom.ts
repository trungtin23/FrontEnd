// hooks/useCreateRoom.js
import { useWebSocket } from "../context/SocketContext";
import toast from "react-hot-toast";

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

                    if (data.event === 'CREATE_ROOM' && data.status==="succes") {
                        console.log("Server response:", data);
                        toast.success('Tạo room thành công!!!');

                    } else if (data.status === 'error') {

                        toast.error('Room đã tồn tại!!!');
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
