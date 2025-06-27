import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {

    if (!isOpen) return;
    return (
        <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50 ' >
            <div className="relative p-4 w-full max-w-2xl max-h-full ">
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 ">
                    {/* modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 ">
                        <h3 className='text-lg font-medium text-gray-900 dark:text-white' >{title}</h3>
                        <button type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-6 w-6 inline-flex justify-center items-center cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white ' onClick={onClose} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                            </svg>
                        </button>
                    </div>
                    {/* modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal