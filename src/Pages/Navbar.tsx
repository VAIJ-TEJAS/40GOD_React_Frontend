import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Button.css';
import logo from './../assets/ring.png';
import god from './../assets/logo1.png';
import './../App.css';
import Login from './Modal';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div>
            <nav className="fixed z-50 bg-transparent flex w-full justify-between p-3 sm:p-6">
                <div className="relative flex items-center">
                    <img src={logo} alt="Logo" onClick={toggleDropDown} className="slow-spin w-10 stop-spin sm:w-20 sm:h-20" style={{ filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 1))' }} />
                    <img onClick={toggleDropDown} className="w-6 sm:w-10 h-6 sm:h-8 absolute z-0 ml-2 sm:ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5))' }} />
                </div>
                <div className="ml-5 sm:ml-20">
                    <NavLink to="/">
                        {' '}
                        <img className="w-24 sm:w-36 h-16 sm:h-25" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 1))' }} />
                    </NavLink>
                </div>
                <div className="space-x-4 ">
                    <button className="my-text hidden sm:inline-block text-base sm:text-xl text-gray-700" onClick={openModal}>
                        Login
                    </button>
                    <NavLink className="my-text text-base sm:text-xl text-gray-700" to="/Bag">
                        {' '}
                        Bag{' '}
                    </NavLink>
                    <NavLink className="my-text text-base sm:text-xl hidden sm:inline-block text-gray-700" to="/account">
                        {' '}
                        Accn{' '}
                    </NavLink>
                </div>
            </nav>
            <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={closeModal}></div>

            {isOpen && (
                <div className="fixed z-10 mt-16 sm:mt-20 p-2 sm:p-3 pt-8 sm:pt-12">
                    <NavLink to="/Option1" className="my-text text-gray-700 block font-bold text-base sm:text-xl hover:text-gray-400 py-1 sm:py-2">
                        New
                    </NavLink>
                    <NavLink to="/Option2" className="my-text text-gray-700 block font-bold text-base sm:text-xl hover:text-gray-400 py-1 sm:py-2">
                        Dripped
                    </NavLink>
                    <NavLink to="/Option3" className="my-text text-gray-700 block font-bold text-base sm:text-xl hover:text-gray-400 py-1 sm:py-2">
                        All
                    </NavLink>
                </div>
            )}
            <Login isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default NavBar;
