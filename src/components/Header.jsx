import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const links = [
    { path: "/search", label: "Search" },
    { path: "/pokedex", label: "Pokedex" },
    { path: "/teams", label: "Teams" },
    { path: "/who-is-that-pokemon", label: "Who's That Pokemon" },
  ];

  const handleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <header className="bg-red-500 flex justify-between items-center px-4 py-2">
      <nav className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded rounded-3xl ${
              location.pathname === link.path
                ? "bg-red-700 font-bold border-2 border-black"
                : "hover:bg-red-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div
        className="w-8 h-8 bg-red-700 rounded-full hover:bg-red-800"
        onClick={handleLogin}
      ></div>
    </header>
  );
};

export default Header;
