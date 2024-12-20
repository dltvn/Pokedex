import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';

const links = [
  { path: "/search", label: "Search" },
  { path: "/pokedex", label: "Pokedex" },
  { path: "/teams", label: "Teams" },
  { path: "/who-is-that-pokemon", label: "Who's That Pokemon" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [user, setUser] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await axios.get("/api/auth");
    if (data.user) {
      setUser(data.user);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    toast.info("Logout successful!", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "dark",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const currentLink = links.find((link) => link.path === location.pathname) || links[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-red-500 flex justify-between items-center px-4 py-2 border-b-2 border-black z-10">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-6 py-2 rounded-3xl ${
              location.pathname === link.path
                ? "bg-red-700 border-black border-2"
                : "hover:bg-red-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Single Title Display */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 text-lg text-black">{currentLink.label}</div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-3xl text-red-700"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? (
          <FaBars
            style={{
              stroke: "black",
              strokeWidth: 30,
              transform: "rotate(90deg)",
            }}
          />
        ) : (
          <FaBars style={{ stroke: "black", strokeWidth: 30 }} />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full h-[calc(100vh-50px)] bg-red-500 bg-opacity-20 backdrop-blur-md shadow-lg md:hidden top-[50px] text-center">
          <nav className="flex flex-col items-start space-y-2 p-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`w-full px-4 py-2 rounded-full border-2 border-black hover:bg-black hover:bg-opacity-25 hover:border-black ${
                  location.pathname === link.path
                    ? "bg-black bg-opacity-25 text-black"
                    : "border-transparent"
                }`}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* User Info */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="hidden md:inline-block text-black font-medium" onClick={handleLogout}>{user.name || "Guest"}</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-black" onClick={handleLogout}>
              <img
                src={user.picture} // User's image or default
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </>
        ) : (
          <div
            className="w-8 h-8 bg-red-700 rounded-full hover:bg-red-800 border-2 border-black"
            onClick={handleLogin}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;
