// Conversations.tsx

import React from 'react';
import useGetUserList from '../../hooks/useGetUserList';
import Conversation from './Conversation';

const Conversations: React.FC = () => {
    const usernames = useGetUserList();


    return (
        <div className=''>
            {usernames.map((user    ) => (
                <Conversation
                    key={user.id}
                    name={user.name} // Use 'name' as username prop
                    actionTime={user.actionTime} // Pass actionTime to Conversation if needed
                    id={user.id}
                    type={user.type}
                />
            ))}
        </div>
    );
};

export default Conversations;
