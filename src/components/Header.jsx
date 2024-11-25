const Header = () => {
  const handleLogin = () => {
    window.location.href = "/api/auth/google";
  };
  return (
    <header className="bg-red-500 text-white flex justify-between items-center px-4 py-2">
      <nav className="flex space-x-4">
        <button className="bg-red-700 px-4 py-2 rounded-full">Search</button>
        <button>Pokedex</button>
        <button>Teams</button>
        <button>Who's That Pokemon</button>
      </nav>
      <div
        className="w-8 h-8 bg-red-700 rounded-full"
        onClick={handleLogin}
      ></div>
    </header>
  );
};

export default Header;
