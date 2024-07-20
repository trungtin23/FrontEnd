import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useSendMessage from "./useSendMessage";

interface User {
    name: string;
    actionTime: string;
    id: string;
    type: number; //

}

const useGetUserList = () => {
    const { setMessages, addMessage } = useConversation(); // Thêm hàm addMessage từ useConversation
    const { webSocket } = useWebSocket();

    const [usernames, setUsernames] = useState<User[]>([]);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);


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
                    setIsWebSocketOpen(false);
                }

                webSocket.onopen = () => {
                    setIsWebSocketOpen(true);
                };

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.event === 'GET_USER_LIST' && Array.isArray(data.data)) {
                        const userList = data.data.map((user: User, idx: number) => ({
                            name: user.name,
                            actionTime: user.actionTime,
                            type : user.type,
                            id: idx.toString() // Ensure id is a string
                        }));
                        setUsernames(userList);
                    } else if (data.event === 'SEND_CHAT') {
                        addMessage(data.data);
                        console.log(data.data)


                    } else {

                    }
                };
                }
            } catch (error) {
                console.error('Error while fetching user list:', error);
            }
        };

        getUserList();
    }, [webSocket, setMessages, addMessage]); // Thêm addMessage vào dependency array

    return usernames;
};

export default useGetUserList;
