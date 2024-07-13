import React from 'react';
import SearchButton from './SearchButton';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import { useWebSocket } from '../../context/SocketContext';

const Sidebar: React.FC = () => {
    const { webSocket, connectWebSocket } = useWebSocket();


    const handleInitiateChat = (username: string) => {
        // Xử lý logic khi khởi tạo cuộc trò chuyện với username đã chọn
        console.log(`Initiating chat with ${username}`);
    };

    return (
        <div className='border-r w-400 border-gray-500 p-4 flex flex-col overflow-auto'>
            <SearchButton onInitiateChat={handleInitiateChat} />
            <div className='mt-4 flex-1'>
                <Conversations />
            </div>
            <LogoutButton  />
        </div>
    );
};

export default Sidebar;
