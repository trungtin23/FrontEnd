import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import Conversation from './Conversation';
import { WebSocketAPI } from '../../context/WebSocketAPI';

interface User {
    username: string;
}

const Conversations: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { webSocket } = useWebSocket();

    useEffect(() => {
        const fetchUsers = () => {
            if (webSocket) {
                const webSocketAPI = new WebSocketAPI(webSocket);
                webSocketAPI.getUserList();
            }

            const handleWebSocketMessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                if (message.event === 'USER_LIST') {
                    const users = message.data;
                    setUsers(users);
                }
            };

            webSocket?.addEventListener('message', handleWebSocketMessage);

            return () => {
                webSocket?.removeEventListener('message', handleWebSocketMessage);
            };
        };

        fetchUsers();
    }, [webSocket]);

    return (
        <div>
            {users.map(user => (
                <Conversation
                    key={user.username}
                    username={user.username}

                />
            ))}
        </div>
    );
};

export default Conversations;
