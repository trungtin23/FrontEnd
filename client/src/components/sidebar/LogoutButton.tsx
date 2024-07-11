import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';



const LogoutButton: React.FC = () => {
    const navigate = useNavigate();



    return (
        <div className='flex items-end mt-auto cursor-pointer' >
            <div>
                <CiLogout />
            </div>
            <p className='ml-2 text-sm'>Đăng xuất</p>
        </div>
    );
};

export default LogoutButton;
