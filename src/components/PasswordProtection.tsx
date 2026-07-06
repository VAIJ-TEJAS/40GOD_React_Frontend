import React, { useState, useEffect } from 'react';
import bg from "../assets/background/Backgroud.jpeg";

const PasswordProtection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Temporarily disabled localStorage check for testing
    // const auth = localStorage.getItem('isAuthenticated');
    // if (auth === 'true') {
    //   setIsAuthenticated(true);
    // }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '411040') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl">
      <img
        src={bg}
        alt="40.G.O.D rose background"
        className="absolute w-screen h-full object-cover brightness-50 -z-10"
      />
      <div className="text-center">
        <h2 className="god-text text-white text-4xl md:text-6xl mb-2">Enter Password</h2>
        <p className="my-text text-gray-300 mb-6">Enter password to access and shop</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="my-text px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 w-64 text-center"
          />
          {error && <p className="text-red-400 text-sm">Incorrect password</p>}
          <button
            type="submit"
            className="my-text px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors w-64"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
