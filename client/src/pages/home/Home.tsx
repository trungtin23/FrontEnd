import React, { useState } from 'react';
import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';
import "../../index.css";

const HomeContent: React.FC = () => {
    const [recipient, setRecipient] = useState<string | null>(null);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

    const handleShowMessages = (username: string) => {
        setRecipient(username);
    };
    const handleConversationClick = (username: string) => {
        setSelectedConversation(username);
    };

    return (
        <div className=" shadow-md  h-full p-4 items-center justify-center    ">
            <h1 className=" text-white font-bold text-2xl mb-4 text-center">Messaging</h1>
            <div className="border border-gray-500 shadow-2xl flex items-center justify-center bg-gray-400 bg-clip-padding mb-4  w-900 m-auto rounded-lg  backdrop-blur-lg bg-opacity-0">
                <div className="border-2 border-gray-400 flex h-700 w-900">
                    <Sidebar />

                        <div className="flex-1">
                            <div className=" rounded-lg h-full ">
                                <MessageContainer  />
                            </div>
                        </div>

                </div>
            </div>
            <p className="text-center text-gray-200 text-xs">
                &copy; Lập trình FE-2024- Nhóm 4.
            </p>
        </div>
    );
};

export default HomeContent;
