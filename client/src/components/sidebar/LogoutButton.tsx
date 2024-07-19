import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import useLogout from "../../hooks/useLogout";



const LogoutButton: React.FC = () => {
    const { logout} = useLogout();



    return (
        <div className='flex items-end mt-auto cursor-pointer' >
            <div className="text-white">
                        <CiLogout />
                    </div>
            <p onClick={logout} className='ml-2 text-sm text-white'>Đăng xuất</p>
        </div>
    );
};

export default LogoutButton;
