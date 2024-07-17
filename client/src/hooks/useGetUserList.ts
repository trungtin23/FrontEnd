import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

interface User {
    name: string;
    actionTime: string;
    id : string
}

const useGetUserList = () => {
    const { setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    const [usernames, setUsernames] = useState<User[]>([]);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false); // State to track WebSocket open state

    useEffect(() => {
        const getUserList = async () => {
            try {
                if (webSocket) {


                if (webSocket && webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({
                        action: 'onchat',
                        data: {
                            event: 'GET_USER_LIST',
                        }
                    }));
                } else {
                    setIsWebSocketOpen(false); // WebSocket is not open
                }

                webSocket.onopen = () => {
                    setIsWebSocketOpen(true); // WebSocket is open
                };

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.event === 'GET_USER_LIST' && Array.isArray(data.data)) {
                        const userList = data.data.map((user: User,idx:number) => ({
                            name: user.name,
                            actionTime: user.actionTime,
                            id : idx
                        }));
                        setUsernames(userList);
                        setMessages(data.data);
console.log(data.data)
                    } else if (typeof data === 'object') {

                    } else {
                        console.error('Unexpected data format received:', data);
                    }
                };
                }
            } catch (error) {
                console.error('Error while fetching user list:', error);
            }
        };

        getUserList();
    }, [webSocket, setMessages]);

    return usernames;
};

export default useGetUserList;
