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

                webSocket.onmessage = (event) => {

                    const data = JSON.parse(event.data);
                        console.log(data)

                        if (data.event ='JOIN_ROOM' && data.status === 'success') {
                            toast.success(`Joined room "${roomName}" successfully!`);
                            setSelectedConversation({ name: roomName, type: 1 });

                        }
                                    else if (data.status === 'error') {

                            toast.error(`Error joining room: ${data.mes}`


                            );

                        }
                }



            } else {
                toast.error('WebSocket is not connected.');
                reject(new Error('WebSocket is not connected.'));
            }
        });
    }, [webSocket, setSelectedConversation]);

    return { joinRoom };
};

export default useJoinRoom;
