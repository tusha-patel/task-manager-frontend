import React from 'react'

import AuthImage from "../../assets/img/auth.png"

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className="w-screen h-screen lg:w-[60vw] px-13 py-5  ">
                <h2 className='text-xl font-bold text-black ' >Task Manager</h2>
                {children}
            </div>
            <div className="hidden lg:flex w-[40vw] bg-blue-50  ">
                <img src={AuthImage} alt="auth image" className='w-[100%]' />
            </div>
        </div>
    )
}

export default AuthLayout