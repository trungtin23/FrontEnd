import React from 'react';
import SearchButton from './SearchButton';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import useConversation from "../../zustand/useConversation";

const Sidebar: React.FC = () => {
    const { setSelectedConversation } = useConversation();

    const handleShowMessages = (username: string) => {
        setSelectedConversation({ name: username, type: "people" });
        // Open the messages dialog for the selected conversation
    };

    const handleOpenRoom = (roomName: string) => {
        setSelectedConversation({ name: roomName, type: "group" });
        // Open the room dialog for the selected room
    };

    return (
        <div className='border-r w-80 border-gray-500 flex flex-col overflow-auto'>
            <div className="p-2">
                <SearchButton onShowMessages={handleShowMessages} onOpenRoom={handleOpenRoom} />
            </div>

            <div className='mt-4 flex-1'>
                <Conversations />
            </div>

            <div className="p-2">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar;
