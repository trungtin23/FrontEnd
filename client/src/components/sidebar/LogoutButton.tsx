import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import useLogout from "../../hooks/useLogout";



const LogoutButton: React.FC = () => {
    const {loading, logout} = useLogout();



    return (
        <div className='flex items-end mt-auto cursor-pointer' >
            <div>
                        <CiLogout />
                    </div>
            <p onClick={logout} className='ml-2 text-sm'>Đăng xuất</p>
        </div>
    );
};

export default LogoutButton;
