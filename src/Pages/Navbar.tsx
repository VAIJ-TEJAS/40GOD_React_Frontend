import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Button.css';
import god from './../assets/logo1.png';
import './../App.css';
import Login from './Modal';
import Logo from'../components/logo';
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
                <div className="relative flex hidden sm:block items-center mb-60 ">
                <img onClick={toggleDropDown} className="w-6 sm:w-10 h-6 sm:h-8 z-0 ml-2 sm:ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
                </div>
                <div className="relative block sm:hidden flex  mb-60 ">
                <img onClick={toggleDropDown} className="w-6 sm:w-10 h-6 sm:h-8 z-0 ml-2 sm:ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
                </div>
               <div className=' sm:ml-40' >
                 <Logo />
               </div>
               <div className="relative">
               

      {isOpen && (
  <div className="sm:hidden dropdown-animation">
    <div className="dropdown-content">
      <h2 className="text-lg font-bold mt-4 mb-8  my-text">Menu</h2>
      <ul>
      <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/'}>Home</li>
     <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={openModal}>Login</li>
        <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/account'}>Account</li>
        <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option1'}>New</li>
        <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option2'}>Dripped</li>
        <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/Option3'}>All</li>
        <li className='my-text font-bold p-4 m-4 ml-0 pl-2' onClick={() => window.location.href = '/bag'}>Bag</li>
      
      </ul>
    </div>
  </div>
)}



    </div>
              
                <div className="space-x-6 ">
                    <button className="my-text text-gray-700 hover:text-gray-400 font-bold hidden sm:inline-block text-base sm:text-xl text-gray-700" onClick={openModal}>
                        Login
                    </button>
                    <NavLink className="my-text font-bold text-gray-700 hover:text-gray-400 text-base sm:text-xl text-gray-700" to="/Bag">

                        Bag
                    </NavLink>
                    <NavLink className="my-text text-gray-700 block hover:text-gray-400 font-bold sm:text-xl hidden sm:inline-block text-gray-700" to="/account">

                        Accn
                    </NavLink>
                </div>
            </nav>
            <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={closeModal}></div>

            {isOpen && (
                <div 
                    className="hidden  dropdown-animation sm:block fixed left-0 z-50 mt-16 sm:mt-20 p-2 sm:p-3 pt-8 sm:pt-12 rounded-md bg-trasparent ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                    <div
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <NavLink
                            to="/Option1"
                            className="block px-4 py-2 my-text font-semibold text-lg  text-gray-700 hover:bg-gray-100 transition duration-300"
                            role="menuitem"
                        >
                            New
                        </NavLink>
                        <NavLink
                            to="/Option2"
                            className="block px-4 py-2 my-text font-semibold text-lg  text-gray-700 hover:bg-gray-100 transition duration-300"
                            role="menuitem"
                        >
                            Dripped
                        </NavLink>
                        <NavLink
                            to="/Option3"
                            className="block my-text font-semibold text-lg px-4 py-2  text-gray-700 hover:bg-gray-100 transition duration-300"
                            role="menuitem"
                        >
                            All
                        </NavLink>
                    </div>
                </div>
            )}
            <Login isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default NavBar;
