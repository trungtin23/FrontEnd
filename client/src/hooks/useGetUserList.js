import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetUserList = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages } = useConversation();
    const { webSocket } = useWebSocket();

    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const getUserList = async () => {
            try {
                setLoading(true);
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'GET_USER_LIST',
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    if (Array.isArray(data)) {
                        const userList = data.map(user => user.username);
                        setUsernames(userList);
                        setMessages(data); // Assuming this is still needed for messages
                    } else if (typeof data === 'object') {
                        // Handle single object data format if needed
                        // Example: setUsernames([data.username]);
                        console.log('Received single object:', data);
                    } else {
                        console.error('Unexpected data format received:', data);
                    }
                };
            } catch (error) {
                console.error('Error while fetching user list:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserList();
    }, [webSocket, setMessages]);

    return {usernames, loading};
};

export default useGetUserList;
