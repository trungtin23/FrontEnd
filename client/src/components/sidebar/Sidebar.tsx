import React from 'react';
import SearchButton from './SearchButton';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import useConversation from "../../zustand/useConversation";
import "../css/Custom.css"
const Sidebar: React.FC = () => {
    const { setSelectedConversation } = useConversation();

    const handleShowMessages = (username: string) => {
        setSelectedConversation({ name: username, type: "people" });
    };

    const handleOpenRoom = (roomName: string) => {
        setSelectedConversation({ name: roomName, type: "group" });
    };

    return (
        <div className='border-r w-80 border-gray-500 flex flex-col overflow-y-auto custom-scrollbar'>
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
