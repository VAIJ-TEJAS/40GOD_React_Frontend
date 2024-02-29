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
            <nav className="fixed z-30 bg-transparent flex w-full justify-between p-6">
            <div className="relative flex items-center">
    <img src={logo} alt="Logo" onClick={toggleDropDown} className="slow-spin w-10  stop-spin sm:w-20 sm:h-20" style={{ filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.8))' }}/>
    <img className="w-10 h-8 absolute z-0 ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5))' }} />
</div>

                <div className="space-x-4">
                    <button className="my-text text-xl text-gray-700" onClick={openModal}>
                        Login
                    </button>
                    <NavLink className="my-text text-xl text-gray-700" to="/Bag">
                        {' '}
                        Bag{' '}
                    </NavLink>
                    <NavLink className="my-text text-xl text-gray-700" to="/account">
                        {' '}
                        Accn{' '}
                    </NavLink>
                </div>
            </nav>
            <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20 ${isModalOpen ? 'block' : 'hidden'}`} onClick={closeModal}></div>
            <div className="absolute top-0 w-full bg-transparent z-10 flex justify-center items-center p-6">
                <div className="flex z-50 items-center">
                    <NavLink to="/">
                        {' '}
                        <img className="w-36 h-25 " src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0.8, 0.8))' }} />
                    </NavLink>
                </div>
            </div>
            {isOpen && (
                <div className="fixed z-10 mt-20 p-3 pt-12">
                    <NavLink to="/Option1" className="my-text text-gray-700 block font-bold text-xl hover:text-gray-400 py-2">
                        New
                    </NavLink>
                    <NavLink to="/Option2" className="my-text text-gray-700 block font-bold text-xl hover:text-gray-400 py-2">
                        Dripped
                    </NavLink>
                    <NavLink to="/Option3" className="my-text text-gray-700 block font-bold text-xl hover:text-gray-400 py-2">
                        All
                    </NavLink>
                </div>
            )}
            <Login isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default NavBar;
