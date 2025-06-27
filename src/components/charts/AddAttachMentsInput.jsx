import React, { useState } from 'react'
import { HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachMentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    // function to handle adding an option
    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
        }
        setOption("")
    };

    // function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    }


    return (
        <div>
            {attachments.map((item, index) => (
                <div key={item} className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-3 rounded-md mb-3 mt-2 ' >
                    <div className="flex-1 flex items-center gap-3  ">
                        <LuPaperclip className='text-gray-400' />
                        <p className='text-xs text-black font-medium '>{item}</p>
                    </div>
                    <button onClick={() => handleDeleteOption(index)} className='cursor-pointer' >
                        <HiOutlineTrash className='text-lg text-red-500 ' />
                    </button>
                </div>
            ))}

            <div className="flex items-center gap-5 mt-4 ">
                <div className="flex-1 flex items-center gap-3 border border-gray-100  rounded-md px-3 ">
                    <LuPaperclip className='text-gray-400' />
                    <input type="text"
                        placeholder='Add File Link'
                        value={option}
                        onChange={({ target }) => setOption(target.value)}
                        className='w-full text-[13px] text-black outline-none bg-white py-2 '
                    />
                </div>


                <button className='card-btn text-nowrap ' onClick={handleAddOption} >
                    <HiPlus className='text-lg' />Add
                </button>
            </div>
        </div>
    )
}

export default AddAttachMentsInput