import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCircleArrowRight } from 'react-icons/fa6';
import useCreateRoom from "../../hooks/userCreatRoom";
import useJoinRoom from "../../hooks/useJoinRoom";
import "../css/Custom.css"
interface SearchButtonProps {
    onShowMessages: (username: string) => void; // Callback to show messages for a username
    onOpenRoom: (roomName: string) => void; // Callback to open room after creating it
}

const SearchButton: React.FC<SearchButtonProps> = ({ onShowMessages, onOpenRoom }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const { createRoom } = useCreateRoom();
    const {joinRoom} = useJoinRoom();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRightButtonClick = () => {
        if (username.trim() !== ''  && isChecked)  {

                joinRoom(username).then(() => {
                    onOpenRoom(username);
                });


            setUsername('');
                setIsChecked(false);

        }
        else {

            onShowMessages(username);
            setUsername('');
        }
    };

    const handleAddIconClick = () => {
        if (username.trim() !== '' && isChecked) {
            createRoom(username).then(() => {
            });
            setUsername('');
            setIsChecked(false);
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
                    className='w-44 text-white input input-bordered rounded-full custom-placeholder bg-cyan-600'
                />
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='checkbox checkbox-primary  ml-2 mt-1'
                />
                {isChecked && (
                    <div
                        className=' h-8 ml-2 mt-1 0 cursor-pointer rounded icon-container'
                        onClick={handleAddIconClick} // Set the event handler for the icon
                    >
                        <IoMdAddCircleOutline className="icon-add"  size={30}  />
                    </div>
                )}
                <div
                    className='  icon-container  h-8 ml-2 w-8 justify-center flex items-center mt-1 cursor-pointer rounded '
                    onClick={handleRightButtonClick}
                >
                    <FaCircleArrowRight className="icon-right" size={26} />
                </div>
            </form>
            <div>
                <p className='text-sm text-white text-center -mt-2 ml-24'>Room</p>
            </div>
        </div>
    );
};

export default SearchButton;
