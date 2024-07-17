import React from 'react';
import SearchButton from './SearchButton';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';


interface SidebarProps {
    onShowMessages: (username: string) => void; // Callback to show messages for a username
}

const Sidebar: React.FC<SidebarProps> = ({ onShowMessages }) => {


    return (
        <div className='border-r w-80 border-gray-500 flex flex-col overflow-auto'>
            <div className="p-2">
                <SearchButton onShowMessages={onShowMessages} />
            </div>

            <div className='mt-4 flex-1  '>
                <Conversations   />
            </div>

            <div className="p-2">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar;
