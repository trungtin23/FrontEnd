// Conversations.tsx

import React from 'react';
import useGetUserList from '../../hooks/useGetUserList';
import Conversation from './Conversation';
import useGetMessage from "../../hooks/useGetMessage";

const Conversations: React.FC = () => {

        const usernames = useGetUserList();

    return (
        <div className=''>
            {usernames.map((user    ) => (
                <Conversation
                    key={user.id}
                    name={user.name}
                    actionTime={user.actionTime}
                    id={user.id}
                    type={user.type}
                />
            ))}
        </div>
    );
};

export default Conversations;
