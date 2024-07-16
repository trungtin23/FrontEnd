import React from 'react';
import Conversation from './Conversation';
import useGetUserList from "../../hooks/useGetUserList";

const Conversations: React.FC = () => {
    const{loading,usernames} = useGetUserList();

    if (loading) return <div>Loading...</div>;

    return (
        <div className='p-2'>
            {usernames.map((username: string) => (
                <Conversation
                    key={username}
                    username={username}
                />
            ))}
        </div>
    );
};

export default Conversations;
