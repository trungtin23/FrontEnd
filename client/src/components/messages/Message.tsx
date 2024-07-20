import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { Twemoji } from 'react-emoji-render'; // Import Twemoji or Emojione from react-emoji-render

interface MessageProps {
         message: {

        name: string;
        to: string;
        mes: string;
        type: number;
        createAt: string;
        shouldShake?: boolean;
    }
}

const adjustTimeByHours = (dateString: string, hours: number) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }); // Adjust to Vietnam time zone
};

const Message: React.FC<MessageProps> = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.name === authUser.username;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-cyan-500" : "bg-slate-300";
    const adjustedCreateAt = adjustTimeByHours(message.createAt, 7);
    const avatarUrl = `https://picsum.photos/seed/${message.name}/50/50`; // Fallback image URL

    const shakeClass = message.shouldShake ? "shake" : "";



    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src={avatarUrl} // Fallback image
                    />
                </div>
            </div>
            <div className="chat-header text-white -ml-3">
                <span>{message.name}</span>
            </div>
            <div className={`chat-bubble text-black ${bubbleBgColor} ${shakeClass}`}>
                {message.mes}
            </div>
            <div className="chat-footer text-white">
                <time className="text-xs opacity-50">{adjustedCreateAt}</time>

            </div>
        </div>
    );
};

export default Message;
