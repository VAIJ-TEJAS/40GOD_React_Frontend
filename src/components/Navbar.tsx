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
    setIsOpen(!isOpen);
  };

  const toggleShopDropDown = () => {
    setIsShopOpen(!isShopOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="z-50">
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
      <div className="relative">
        {isOpen && (
          <div className="sm:hidden dropdown-animation">
            <div className="dropdown-content flex flex-col items-center text-center px-4 py-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 my-text"></h2>
              <ul className="w-full max-w-md">
                {!isLoggedIn && (
                  <li className="my-text text-xl font-semibold py-3 border-gray-300 cursor-pointer">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li
                    className="my-text text-xl font-semibold py-3 border-gray-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                )}
                <li
                  className="my-text text-xl font-semibold py-3 border-gray-300 cursor-pointer"
                  onClick={() => (window.location.href = "/account")}
                >
                  Account
                </li>
                <li
                  className="my-text text-xl font-semibold py-3 border-gray-300 cursor-pointer"
                  onClick={toggleShopDropDown}
                >
                  Shop
                </li>

                {isShopOpen && (
                  <div className="ml-4">
                    <li
                      className="my-text text-lg font-medium py-2 cursor-pointer"
                      onClick={() => (window.location.href = "/t-shirt")}
                    >
                      T-Shirt
                    </li>
                  </div>
                )}
                <li
                  className="my-text text-xl font-semibold py-3 border-b border-gray-300 cursor-pointer"
                  onClick={() => (window.location.href = "/bag")}
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
