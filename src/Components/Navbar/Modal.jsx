import React from 'react';

const Modal = ({ closeModal, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    aria-label="Close"
                >
                    {/* Use a simple "X" instead of &times; */}
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
