import React from 'react';
import { useNavigate } from 'react-router-dom';
import useConversation from "../../zustand/useConversation"; // Assuming you're using React Router for navigation
import { FaTrash } from 'react-icons/fa'; // Import icon for trash

interface ConversationProps {
    name: string;
    id: string;
    actionTime: string;
    type : number
}

const Conversation: React.FC<ConversationProps> = ({ id,name,actionTime, type }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { removeConversation } = useConversation();

    const isSelected = selectedConversation?._id === id;
    const handleClick = () => {
        setSelectedConversation({ _id: id, name, actionTime ,type});

    };
    const handleDelete = () => {
        // Call function to remove conversation
        removeConversation(id); // Ensure removeConversation is defined in your zustand store
    };
    return (
        <div
            className={`flex gap-2 items-center p-2 rounded w-full cursor-pointer hover:bg-slate-300 ${isSelected ? 'bg-gray-400' : ''}`}
            onClick={handleClick}
        >
            <div className="avatar p-2 w-60 h-16">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                         alt="User Avatar"/>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-medium text-sm text-black mt-2 ml-3'>{name}</p>
                    </div>
                </div>
            </div>
            <div className='text-xs'>
                <time dateTime="2021-08-26 13:00:00">{actionTime}</time>
            </div>

                <button onClick={handleDelete} className="text-red-300">
                    <FaTrash/>
                </button>


        </div>
    );
};

export default Conversation;
