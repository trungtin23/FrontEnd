import React from 'react';
import SearchButton from './SearchButton';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import { useWebSocket } from '../../context/WebSocketContext';

const Sidebar: React.FC = () => {
    const { webSocket, connectWebSocket } = useWebSocket();

    return (
        <div className='border-r w-400 border-slate-500 p-4 flex flex-col overflow-auto'>
            <SearchButton />
            <Conversations />
            <LogoutButton webSocket={webSocket} connectWebSocket={connectWebSocket} />
        </div>
    );
};

export default Sidebar;
