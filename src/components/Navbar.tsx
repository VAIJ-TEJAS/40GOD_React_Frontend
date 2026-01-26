import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./../css/Button.css";
import god from "./../assets/logo1.png";
import "./../App.css";
import Logo from "./Logo";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropDown = () => {
    handleMenuToggle();
  };

  const toggleShopDropDown = () => {
    setIsShopOpen(!isShopOpen);
  };

  const handleLogout = () => {
    // Clear all user-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    
    // Clear any axios default headers
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = "/";
    }
  };

  const handleLoginCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsShopOpen(false);
    }
  };

  useEffect(() => {
    handleLoginCheck();
    
    // Listen for storage changes (e.g., login from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        handleLoginCheck();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="z-40">
        {/* Center Logo */}
        <div className="absolute w-full justify-center">
          <Logo />
        </div>

      <nav className="flex items-start justify-between absolute w-full px-2 sm:px-4 pt-2 sm:pt-4">
        {/* Left Logo */}
        <div className="hidden sm:flex">
          <img
            onClick={toggleDropDown}
            className={`w-20 hover:cursor-pointer ${isOpen ? "moved-right" : "moved-original"}`}
            src={god}
            alt="40.G.O.D"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))" }}
          />
        </div>

        {/* Left Mobile Logo */}
        <div className="sm:hidden z-50">
          <img
            onClick={toggleDropDown}
            className="w-16  hover:cursor-pointer"
            src={god}
            alt="40.G.O.D"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))" }}
          />
        </div>

        {/* Right Nav Desktop */}
        <div className="flex gap-6 font-bold">
          {!isLoggedIn && (
            <NavLink className="hidden sm:inline-block hover:text-white text-gray-300" to="/login">
              LOGIN
            </NavLink>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hidden sm:inline-block hover:text-white text-gray-300"
            >
              LOGOUT
            </button>
          )}
          <NavLink className="hover:text-white text-gray-300" to="/bag">
            BAG
          </NavLink>
          {isLoggedIn && (
          <NavLink className="hidden sm:inline-block hover:text-white text-gray-300" to="/account">
            ACCN
          </NavLink>
          )}
        </div>
      </nav>

      {/* Dropdown Mobile Menu */}
      <div className="relative z-40">
        {isOpen && (
          <div className="sm:hidden dropdown-animation">
            <div className="dropdown-content flex flex-col items-center text-center">
              <ul className="w-full max-w-md text-xl font-semibold mt-8 border-b">
                {!isLoggedIn && (
                  <li 
                    className="py-3 border-gray-300 cursor-pointer"
                    onClick={() => {
                      window.location.href = "/login"
                      toggleDropDown();
                    }}
                  >
                    Login
                  </li>
                )}
                {isLoggedIn && (
                  <li
                    className="py-3 border-gray-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                )}
                {isLoggedIn && (
                <li
                  className="py-3 border-gray-300 cursor-pointer"
                  onClick={() => {
                    window.location.href = "/account"
                    toggleDropDown();
                  }}
                >
                  Account
                </li>
                )}
                <li
                  className="py-3 border-gray-300 cursor-pointer"
                  onClick={toggleShopDropDown}
                >
                  Shop
                </li>
                {isShopOpen && (
                    <div
                      className="text-lg font-medium py-2 cursor-pointer"
                      onClick={() => {
                        window.location.href = "/t-shirt"
                        toggleDropDown();
                      }}
                    >
                      T-Shirt
                    </div>
                )}
                <li
                  className="py-3 border-gray-300 cursor-pointer"
                  onClick={() => {
                    window.location.href = "/bag"
                    toggleDropDown();
                  }}
                >
                  Bag
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div className="dropdownr-animation hidden sm:block p-4 pt-16">
          <div aria-orientation="vertical" aria-labelledby="menu-button">
            <NavLink
              to="/t-shirt"
              className="font-bold text-2xl text-gray-300 hover:text-white transition duration-300"
              role="menuitem"
              onClick={toggleDropDown}
            >
              T-Shirt
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
