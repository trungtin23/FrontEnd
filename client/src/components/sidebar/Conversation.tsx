import React from 'react';

import useConversation from "../../zustand/useConversation"; // Assuming you're using React Router for navigation
import { FaTrash } from 'react-icons/fa'; // Import icon for trash


interface ConversationProps {
    name: string;
    id: string;
    actionTime: string;
    type : number
}
const adjustTimeByHours = (dateString: string, hours: number) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toLocaleString('en-US'); // Cập nhật theo múi giờ Việt Nam
};
const Conversation: React.FC<ConversationProps> = ({ id,name,actionTime, type }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === id;
    const handleClick = () => {
        setSelectedConversation({ _id: id, name, actionTime ,type});


    };

    const avatarUrl = `https://picsum.photos/seed/${name}/50/50`;
    const adjustedActionTime = adjustTimeByHours(actionTime, 7);

    return (
        <div
            className={`flex gap-2 items-center p-2 rounded w-full cursor-pointer hover:text-black hover:bg-slate-400 ${isSelected ? 'bg-cyan-500' : ''}`}
            onClick={handleClick}
        >
            <div className="avatar p-2 w-60 h-16">
                <div className="w-12 h-12 rounded-full ring  ring-offset-base-100 ring-offset-2">
                    <img src={avatarUrl} alt="User Avatar"/>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-medium text-sm text-white mt-2 ml-3'>
                            {type===1 ? "[GROUP]" : ""} {name}
                        </p>
                    </div>
                </div>
            </div>
            <div className='text-xs text-white'>
                <time >{adjustedActionTime}</time>
            </div>




        </div>
    );
};

export default Conversation;
