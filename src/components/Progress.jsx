import React from 'react'

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-cyan-600 border border-cyan-500/50 ";
            case "Completed":
                return "text-indigo-500 bg-indigo-600 border border-indigo-500/50 ";
            default:
                return "text-violet-500 bg-violet-600 border border-violet-500/10 ";
        }
    }

    return (
        <div className='w-full bg-gray-200 rounded-full h-1.5 ' >
            <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium `} style={{ width: `${progress}%` }} >

            </div>
        </div>
    )
}

export default Progress