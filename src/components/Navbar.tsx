import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./../css/Button.css";
import god from "./../assets/logo1.png";
import "./../App.css";
import Logo from "./Logo";
import { CurrencyContext } from "../context/CurrencyContext";
import axios from "axios";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [showCartNotification, setShowCartNotification] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, rate } = useContext(CurrencyContext);

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
    setUserName("");
    setCartItemCount(0);
    
    // Clear any axios default headers
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = "/";
    }
  };

  const handleLoginCheck = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token) {
      setIsLoggedIn(true);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.username || user.email || "User");
        } catch (e) {
          setUserName("User");
        }
      }
      fetchCartItemCount();
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setCartItemCount(0);
    }
  };

  const fetchCartItemCount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/cart-items/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const totalItems = response.data.reduce(
          (sum: number, item: any) => sum + (item.quantity || 0),
          0
        );
        const previousCount = cartItemCount;
        setCartItemCount(totalItems);
        
        // Show notification if cart count increased
        if (totalItems > previousCount && previousCount > 0) {
          setShowCartNotification(true);
          setTimeout(() => setShowCartNotification(false), 3000);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsShopOpen(false);
      setShowSearch(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/t-shirt?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setIsOpen(false);
      setIsShopOpen(false);
    }
  };

  useEffect(() => {
    handleLoginCheck();
    
    // Listen for storage changes (e.g., login from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        handleLoginCheck();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Fetch cart count when route changes
    if (isLoggedIn) {
      fetchCartItemCount();
    }
  }, [location.pathname, isLoggedIn]);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`z-40 ${isScrolled ? 'bg-black bg-opacity-50 backdrop-blur-sm' : ''} transition-all duration-300`}>
        {/* Center Logo */}
        <div className="absolute w-full justify-center">
          <Logo />
        </div>

      <nav className={`flex items-start justify-between absolute w-full px-2 sm:px-4 pt-2 sm:pt-4 ${isScrolled ? 'py-2' : ''} transition-all duration-300`}>
        {/* Left Logo */}
        <div className="hidden sm:flex items-center gap-4">
          <img
            onClick={toggleDropDown}
            className={`w-20 hover:cursor-pointer transition-transform ${isOpen ? "moved-right" : "moved-original"}`}
            src={god}
            alt="40.G.O.D"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))" }}
          />
          {isLoggedIn && userName && (
            <span className="text-gray-300 text-sm hidden lg:block">
              Welcome, {userName}
            </span>
          )}
        </div>

        {/* Left Mobile Logo */}
        <div className="sm:hidden z-50">
          <img
            onClick={toggleDropDown}
            className="w-16 hover:cursor-pointer"
            src={god}
            alt="40.G.O.D"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 1))" }}
          />
        </div>

        {/* Right Nav Desktop */}
        <div className="flex gap-4 sm:gap-6 font-bold items-center">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            className="hidden sm:inline-block hover:text-white text-gray-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {!isLoggedIn && (
            <NavLink className="hidden sm:inline-block hover:text-white text-gray-300 transition" to="/login">
              LOGIN
            </NavLink>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hidden sm:inline-block hover:text-white text-gray-300 transition"
            >
              LOGOUT
            </button>
          )}
          <NavLink 
            className="hover:text-white text-gray-300 relative transition" 
            to="/bag"
          >
            BAG
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </NavLink>
          {isLoggedIn && (
          <NavLink className="hidden sm:inline-block hover:text-white text-gray-300 transition" to="/account">
            ACCN
          </NavLink>
          )}
          {/* Currency Display */}
          <div className="hidden lg:flex items-center gap-2 text-gray-300 text-sm">
            <span>{currency}</span>
            <span className="text-xs">({(rate * 100).toFixed(0)}%)</span>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm p-4 z-50">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search products..."
              className="flex-1 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-opacity-40"
              autoFocus
            />
            <button
              type="submit"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={toggleSearch}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
          Item added to cart!
        </div>
      )}

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
