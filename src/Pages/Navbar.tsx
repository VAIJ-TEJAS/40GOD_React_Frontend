import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/Button.css';
import god from './../assets/logo1.png';
import './../App.css';
import Logo from '../components/logo';
const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };
    const toggleShopDropDown = () => {
        setIsShopOpen(!isShopOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(false); 
        }
    }, []); 






    return (
        <div >
        <nav className="absolute z-40 pt-4 flex justify-between  " style={{ width: '100%' }}>
            <div className="select-none fixed flex z-20 hidden sm:block items-center justify-center">
                <img onClick={toggleDropDown} className={`w-6 z-50 sm:w-16 h-6 sm:h-12 z-0 ml-2 sm:ml-5 ${isOpen ? 'moved-right' : 'moved-original'}`} src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
            </div>
    
            <div className="fixed block sm:hidden z-[9999] flex items-center mb-60">
                <img onClick={toggleDropDown} className="w-8 sm:w-10 h-6 sm:h-6  ml-2 sm:ml-5" src={god} alt="God" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))' }} />
            </div>
    
            <div className="absolute   left-0 w-full  justify-center h-16 ">
  <Logo />
</div>



                <div className="relative z-[100]">
                    {isOpen && (
                        <div className="sm:hidden dropdown-animation ">
                          <div className="dropdown-content flex flex-col items-center text-center px-4 py-6 ">
  <h2 className="text-2xl sm:text-3xl font-bold mb-8 my-text"></h2>
  <ul className="w-full max-w-md">
    {isLoggedIn && (
      <li className="my-text text-xl font-semibold py-3  border-gray-300 cursor-pointer">
        Login
      </li>
    )}
    <li
      className="my-text text-xl font-semibold py-3  border-gray-300 cursor-pointer"
      onClick={() => window.location.href = '/account'}
    >
      Account
    </li>
    <li
      className="my-text text-xl font-semibold py-3  border-gray-300 cursor-pointer"
      onClick={toggleShopDropDown}
    >
      Shop
    </li>

    {isShopOpen && (
      <div className="ml-4">
        <li
          className="my-text text-lg font-medium py-2 cursor-pointer"
          onClick={() => window.location.href = '/T-Shirt'}
        >
          T-Shirt
        </li>
        {/* <li
          className="my-text text-lg font-medium py-2 cursor-pointer"
          onClick={() => window.location.href = '/Dripped'}
        >
          Dripped
        </li>
        <li
          className="my-text text-lg font-medium py-2 cursor-pointer"
          onClick={() => window.location.href = '/All'}
        >
          All
        </li> */}
      </div>
    )}

    <li
      className="my-text text-xl font-semibold py-3 border-b border-gray-300 cursor-pointer"
      onClick={() => window.location.href = '/bag'}
    >
      Bag
    </li>
  </ul>
</div>

                        </div>
                    )}
                </div>

                <div className="fixed right-0 space-x-6 z-20 ">
                {isLoggedIn && (  <NavLink className="my-text hiden font-bold  hover:text-white hidden sm:inline-block text-base sm:text-xl text-gray-300" to="/login">
                        Login
                    </NavLink>)}
                    <NavLink className="p-4 my-text font-bold  hover:text-white text-base sm:text-xl text-gray-300" to="/Bag">
                        Bag
                    </NavLink>
                    <NavLink className="pr-6 my-text  block hover:text-white font-bold sm:text-xl hidden sm:inline-block text-gray-300" to="/account">
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
                            to="/T-Shirt"
                            className="block px-4 py-2 my-text font-bold text-2xl  text-gray-300 hover:text-white transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            T-Shirt
                        </NavLink>
                        {/* <NavLink
                            to="/Dripped"
                            className="block px-4 py-4 my-text font-bold text-2xl  text-gray-300 hover:text-white transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            Dripped
                        </NavLink>
                        <NavLink
                            to="All"
                            className="block my-text font-bold text-2xl px-4 py-4  text-gray-300 hover:text-white transition duration-300"
                            role="menuitem"
                            onClick={toggleDropDown}
                        >
                            All
                        </NavLink> */}
                    </div>
                </div>
            )}


        </div>
    );
};

export default NavBar;
