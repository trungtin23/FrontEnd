import React, {useEffect} from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useGetMessage from "../../hooks/useGetMessage";
import useConversation from "../../zustand/useConversation";
import {useAuthContext} from "../../context/AuthContext";
import {TiMessages} from "react-icons/ti";



const MessageContainer: React.FC = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);
    if (!selectedConversation) {

        return <div className='flex items-center justify-center w-full h-full'>
            <div
                className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome👋 {authUser.username} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>;

    }




    return (
        <div className='flex flex-col w-full h-full'>
            <div className='bg-cyan-500 px-2 py-3 mb-2 items-center text-center'>
                <span className='label-text text-white'>To : </span>
                <span className='text-white font-bold'>

                    {selectedConversation.name}
                </span>

            </div>
            <div className='flex-1  overflow-y-auto custom-scrollbar'>
                <Messages     />
            </div>
            <div className="mt-auto">
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageContainer;
