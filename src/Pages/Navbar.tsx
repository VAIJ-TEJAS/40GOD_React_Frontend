import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Button.css';
import god from './../assets/logo1.png';
import './../App.css';
import Logo from '../components/logo';
const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };
    const toggleShopDropDown = () => {
        setIsShopOpen(!isShopOpen);
    };








    return (
        <div>
        <nav className="absolute z-50  flex justify-between  sm:pt-8" style={{ width: '100%' }}>
            <div className="select-none fixed flex z-20 hidden sm:block items-center justify-center">
                <img onClick={toggleDropDown} className={`w-6 z-50 sm:w-16 h-6 sm:h-12 z-0 ml-2 sm:ml-5 ${isOpen ? 'moved-right' : 'moved-original'}`} src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
            </div>
    
            <div className="fixed block sm:hidden z-20 flex items-center mb-60">
                <img onClick={toggleDropDown} className="w-6 sm:w-10 h-6 sm:h-8 z-0 ml-2 sm:ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
            </div>
    
            <div className='absolute z-1  justify-center' style={{ width: '100%' }}>
                {/* Place your Logo component here */}
                <Logo />
            </div>


                <div className="relative">
                    {isOpen && (
                        <div className="sm:hidden dropdown-animation">
                            <div className="dropdown-content">
                                <h2 className="text-lg font-bold mt-4 mb-8  my-text">Menu</h2>
                                <ul>
                                    <li className='my-text font-bold p-4 m-4 ml-0 pl-2'>Login</li>
                                    <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/account'}>Account</li>
                                    <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={toggleShopDropDown}>Shop</li>

                                    {isShopOpen && (
                                        <div className='ml-4'>
                                            <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option1'}>New</li>
                                            <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option2'}>Dripped</li>
                                            <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option3'}>All</li>
                                        </div>)}
                                    <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/bag'}>Bag</li>

                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="fixed right-0 space-x-6 z-20 ">
                    <NavLink className="my-text font-bold text-gray-700 hover:text-gray-400 text-base sm:text-xl text-gray-700" to="/login">
                        Login
                    </NavLink>
                    <NavLink className="my-text font-bold text-gray-700 hover:text-gray-400 text-base sm:text-xl text-gray-700" to="/Bag">
                        Bag
                    </NavLink>
                    <NavLink className="my-text text-gray-700 block hover:text-gray-400 font-bold sm:text-xl hidden sm:inline-block text-gray-700" to="/account">
                        Accn
                    </NavLink>
                </div>
            </nav>


            {isOpen && (
                <div
                    className="dropdownr-animation hidden sm:block fixed left-0 z-50 mt-16 sm:mt-20 p-2 sm:p-3 pt-8 sm:pt-12  bg-trasparent  ">
                    <div
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <NavLink
                            to="/Option1"
                            className="block px-4 py-2 my-text font-bold text-2xl  text-gray-600 hover:text-gray-100 transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            New
                        </NavLink>
                        <NavLink
                            to="/Option2"
                            className="block px-4 py-4 my-text font-bold text-2xl  text-gray-600 hover:text-gray-100 transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            Dripped
                        </NavLink>
                        <NavLink
                            to="/Option3"
                            className="block my-text font-bold text-2xl px-4 py-4  text-gray-600 hover:text-gray-100 transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            All
                        </NavLink>
                    </div>
                </div>
            )}


        </div>
    );
};

export default NavBar;
