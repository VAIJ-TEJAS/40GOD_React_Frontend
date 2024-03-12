import React, { useState, useEffect } from 'react';
import SignUpPage from './SignUp';
import bg2 from '../assets/background/b2.jpeg';
import axios from 'axios';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


   

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            if (!isSignUpOpen) {
                const response = await axios.post('/auth/', formData);
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Logged in successfully!', response.data);
                onClose()
            } else {

            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

        setFormData({
            username: '',
            password: ''
        });

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(() => {

        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');

        if (token) {
            const user = JSON.parse(userJson!);
            console.log(user);
            console.log('User is already logged in with token:', token);
        } 
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="bg-white relative w-auto max-w-md mx-auto my-6 rounded-lg">
                <div className="absolute opacity-20 inset-0 bg-cover bg-center z-0">
                    <img src={bg2} alt="bg" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lhttp://localhost:5173/historyg " />
                </div>
                <div className="rounded-lg shadow-lg relative flex flex-col w-full p-8">
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
                    <div>
                        {!isSignUpOpen && (
                          <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                  Email
                              </label>
                              <input
                                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                                  type="text"
                                  id="username"
                                  name="username"
                                  placeholder="Username"
                                  value={formData.username}
                                  onChange={handleChange}
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
                                  value={formData.password}
                                  onChange={handleChange}
                                  required 
                              />
                          </div>
                      </form>
                      
                        )}
                        {isSignUpOpen && <SignUpPage onClose={() => setIsSignUpOpen(false)} />}

                        <div className="flex justify-between items-center">
                            {!isSignUpOpen && (
                                <>
                                    <button className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  >
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
