
import React, { useState } from 'react';
import SignUpPage from './SignUp';
import bg2 from '../assets/background/b2.jpeg'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
    };

    const handleLoginClick = () => {
        setIsSignUpOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignUpOpen) {
            console.log('Signing up...');
        } else {
            console.log('Logging in...');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
           
            <div className=" bg-white relative w-auto max-w-md mx-auto my-6 rounded-lg ">
            <div className="absolute opacity-20 inset-0 bg-cover bg-center z-0">
           <img src={bg2} alt="bg" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lhttp://localhost:5173/historyg " />
            </div>
                <div className="  rounded-lg shadow-lg relative flex flex-col w-full p-8">
            
                    <button
                        className="absolute top-0 right-0 mt-4 mr-4 text-2xl cursor-pointer focus:outline-none text-white" // Add text-white class
                        onClick={onClose}
                    >
                        &times;
                    </button>
                  


                    <h1 className="text-xl text-gray-600 font-semibold mb-4">Login or Create Account</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-800 mb-4">
                        Enter your credentials to login or create a new account.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {!isSignUpOpen && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {isSignUpOpen && <SignUpPage onClose={() => setIsSignUpOpen(false)} />}


                        <div className="flex justify-between items-center">
                            {!isSignUpOpen && (
                                <>
                                  <button className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLoginClick} type="button">
    Login
</button>
                                    <button className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSignUpClick}>
                                        Sign Up
                                    </button>
                                    <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onClose}>
                                        Cancel
                                    </button>
                                </>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
