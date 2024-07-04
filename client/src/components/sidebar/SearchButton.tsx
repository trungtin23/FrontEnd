import React, { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCircleArrowRight } from "react-icons/fa6";
import "../css/Custom.css"
const SearchButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className=' mt-4'>
            <form className="flex">
                <input
                    type="text"
                    placeholder='Tên của phòng hoặc người khác'

                    className='w-44 text-white input input-bordered rounded-full custom-placeholder '
                />
                <input
                    type="checkbox"
                    defaultChecked={isChecked}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-primary ml-2 mt-2"

                />
                {isChecked && (
                    <div className="bg-blue-200 h-8 ml-2 mt-1 hover:bg-blue-700 cursor-pointer rounded">
                        <IoMdAddCircleOutline size={30} />
                    </div>
                )}
                <div className="bg-blue-200 hover:bg-blue-700 h-8 ml-2 w-8 justify-center flex items-center mt-1 cursor-pointer rounded">
                    <FaCircleArrowRight style={{ color: "black" }} size={24} />
                </div>
            </form>
            <div>
                <p className="text-xs text-center -mt-3 ml-28 ">
                    Phòng
                </p>
            </div>
        </div>
    );
}

export default SearchButton;
