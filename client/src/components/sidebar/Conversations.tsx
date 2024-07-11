import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../../context/SocketContext';
import Conversation from './Conversation';


interface User {
    username: string;
}

const Conversations: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { webSocket } = useWebSocket();


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
