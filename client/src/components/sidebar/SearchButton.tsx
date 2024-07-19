import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCircleArrowRight } from 'react-icons/fa6';
import useCreateRoom from "../../hooks/userCreatRoom";
import useJoinRoom from "../../hooks/useJoinRoom";

interface SearchButtonProps {
    onShowMessages: (username: string) => void; // Callback to show messages for a username
    onOpenRoom: (roomName: string) => void; // Callback to open room after creating it
}

const SearchButton: React.FC<SearchButtonProps> = ({ onShowMessages, onOpenRoom }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const { createRoom } = useCreateRoom(); // Hook to create room
    const { joinRoom } = useJoinRoom(); // Hook to create room

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRightButtonClick = () => {
        if (username.trim() !== '') {
            if (isChecked) {
                // Create room if checkbox is checked
                joinRoom(username).then(() => {
                    onOpenRoom(username); // Open room dialog with the new room
                });
                setUsername(''); // Clear the input field after action
                setIsChecked(false); // Reset the checkbox
            } else {
                // Show messages if checkbox is not checked
                onShowMessages(username); // Call the callback to show messages for the entered username
                setUsername(''); // Clear the input field after action
            }
        }
    };

    const handleAddIconClick = () => {
        if (username.trim() !== '' && isChecked) {
            createRoom(username).then(() => {
                onOpenRoom(username); // Open the room dialog
            });
            setUsername(''); // Clear the input field
            setIsChecked(false); // Reset the checkbox
        }
    };

    return (
        <div className='mt-4'>
            <form className='flex items-center' onSubmit={(e) => e.preventDefault()}>
                <input
                    type='text'
                    placeholder='Enter username or room name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-44 text-white input input-bordered rounded-full custom-placeholder bg-slate-300'
                />
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='checkbox checkbox-primary ml-2 mt-2'
                />
                {isChecked && (
                    <div
                        className='bg-blue-200 h-8 ml-2 mt-1 hover:bg-blue-700 cursor-pointer rounded'
                        onClick={handleAddIconClick} // Set the event handler for the icon
                    >
                        <IoMdAddCircleOutline size={30} />
                    </div>
                )}
                <div
                    className='bg-blue-200 hover:bg-blue-700 h-8 ml-2 w-8 justify-center flex items-center mt-1 cursor-pointer rounded'
                    onClick={handleRightButtonClick}
                >
                    <FaCircleArrowRight style={{ color: 'black' }} size={24} />
                </div>
            </form>
            <div>
                <p className='text-xs text-center -mt-3 ml-28'>Phòng</p>
            </div>
        </div>
    );
};

export default SearchButton;
