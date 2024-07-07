import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaCircleArrowRight } from 'react-icons/fa6';

interface SearchButtonProps {
    onInitiateChat: (username: string) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onInitiateChat }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInitiateChat = () => {
        if (username.trim() !== '') {
            onInitiateChat(username);
            setUsername('');
        }
    };

    return (
        <div className='mt-4'>
            <form className='flex items-center'>
                <input
                    type='text'
                    placeholder='Tên của phòng hoặc người khác'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-44 text-white input input-bordered rounded-full custom-placeholder bg-slate-400'
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
                        onClick={handleInitiateChat}
                    >
                        <IoMdAddCircleOutline size={30} />
                    </div>
                )}
                <div
                    className='bg-blue-200 hover:bg-blue-700 h-8 ml-2 w-8 justify-center flex items-center mt-1 cursor-pointer rounded'
                    onClick={handleInitiateChat}
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
