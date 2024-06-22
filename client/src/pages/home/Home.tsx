import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useWebSocket } from '../../context/WebSocketContext';

const Home: React.FC = () => {
    const { webSocket, connectWebSocket } = useWebSocket();

    return (
        <div className="bg-white h-full p-4">
            <h1 className="text-black font-bold text-2xl mb-4 text-center">Messaging</h1>
            <div className="flex items-center justify-center mb-4">
                <div className="border-2 border-gray-400 flex h-700 w-900">
                    <Sidebar />
                    {/* <MessageContainer webSocket={webSocket} /> */}
                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;Lập trình FE-2024- Nhóm 4.
            </p>
        </div>
    );
};

export default Home;
