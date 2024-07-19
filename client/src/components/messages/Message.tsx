import React from 'react';
import {useAuthContext} from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import {id} from "date-fns/locale";

interface MessageProps {
   message : any
}
const adjustTimeByHours = (dateString: string, hours: number) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }); // Cập nhật theo múi giờ Việt Nam
};
const Message: React.FC<MessageProps> = ({ message }) => {
    // Logic to determine if the message is sent or received
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.name === authUser.username;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic; // Use profilePic from conversation
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const adjustedCreateAt = adjustTimeByHours(message.createAt, 7); // Cộng thêm 7 giờ
    const avatarUrl = `https://picsum.photos/seed/${message.name}/50/50`; // Random avatar URL

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
            <div className="chat-header">
                <span>{  message.name}</span>
                <time className="text-xs opacity-50"></time>
            </div>
            <div className="chat-bubble text-white ${bubbleBgColor} ${shakeClass}">
                <p> {message.mes}</p>
            </div>
            {/* Optional: Display 'Delivered' message for sent messages */}
            {  <div className="chat-footer opacity-50"> {adjustedCreateAt}</div>}
        </div>
    );
};

export default Message;


