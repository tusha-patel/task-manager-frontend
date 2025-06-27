import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { LuUser } from 'react-icons/lu'
import { CiUser } from "react-icons/ci";
const AvatarGroup = ({ avatars, maxVisible }) => {

    return (
        <div className='flex items-center ' >
            {avatars.slice(0, maxVisible).map((avatar, index) => (
                <img src={avatar || "/profile.svg"} alt={`Avatar ${index}`} key={index}
                    className='w-9 h-9 rounded-full border-2 object-cover border-white -ml-3 first:ml-0   '
                />
            ))}
            {avatars.length > maxVisible && (
                <div className="w-9 h-9 rounded-full flex justify-center items-center text-black bg-blue-50 text-sm font-medium border-2 border-white -ml-3 ">
                    <HiPlus />
                </div>
            )}

        </div>
    )
}

export default AvatarGroup