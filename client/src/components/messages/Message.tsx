import React from 'react';
import {useAuthContext} from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

interface MessageProps {
   message : any
}

const Message: React.FC<MessageProps> = ({ message }) => {
    // Logic to determine if the message is sent or received
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.name === authUser.username;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
            {  <div className="chat-footer opacity-50"> {message.createAt}</div>}
        </div>
    );
};

export default Message;


