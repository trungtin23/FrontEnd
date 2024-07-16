import React, { useState } from 'react';
import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';
import { useWebSocket } from '../../context/SocketContext';

const HomeContent: React.FC = () => {
    const { webSocket, connectWebSocket } = useWebSocket();
    const [recipient, setRecipient] = useState<string | null>(null);

    const handleShowMessages = (username: string) => {
        setRecipient(username);
    };

    return (
        <div className="bg-white h-full p-4">
            <h1 className="text-black font-bold text-2xl mb-4 text-center">Messaging</h1>
            <div className="flex items-center justify-center mb-4">
                <div className="border-2 border-gray-400 flex h-700 w-900">
                    <Sidebar onShowMessages={handleShowMessages} />
                    {recipient && (
                        <div className="flex-1">
                            <div className=" rounded-lg h-full ">
                                <MessageContainer recipient={recipient} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy; Lập trình FE-2024- Nhóm 4.
            </p>
        </div>
    );
};

export default HomeContent;
