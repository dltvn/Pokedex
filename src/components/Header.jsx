import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const links = [
    { path: "/search", label: "Search" },
    { path: "/pokedex", label: "Pokedex" },
    { path: "/teams", label: "Teams" },
    { path: "/who-is-that-pokemon", label: "Who's That Pokemon" },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

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

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-3xl text-red-700"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? (
          <FaBars style={{ stroke: "black", strokeWidth: 30, transform: "rotate(90deg)" }} />
        ) : (
          <FaBars style={{ stroke: "black", strokeWidth: 30 }} />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full h-[calc(100vh-50px)] bg-red-500 bg-opacity-20 backdrop-blur-md shadow-lg md:hidden top-[50px]">
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

      {/* Login Icon */}
      <div
        className="w-8 h-8 bg-red-700 rounded-full hover:bg-red-800 border-2 border-black"
        onClick={handleLogin}
      ></div>
    </header>
  );
};

export default Header;
