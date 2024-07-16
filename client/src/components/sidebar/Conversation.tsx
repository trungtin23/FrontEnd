import React from 'react';

interface ConversationProps {
    username: string;

}

const Conversation: React.FC<ConversationProps> = ({ username }) => {
    return (
        <div
            className='flex gap-2 items-center p-2 rounded w-full cursor-pointer hover:bg-slate-300'

        >
            <div className="avatar p-2 w-60 h-16">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-medium text-sm text-black mt-2 ml-3'>{username}</p>
                    </div>
                </div>
            </div>
            <div className='text-xs'>
                <time dateTime="2021-08-26 13:00:00">2021-08-26 13:00:00</time>
            </div>
        </div>
    );
};

export default Conversation;
