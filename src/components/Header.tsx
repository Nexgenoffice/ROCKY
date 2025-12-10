import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  let closeTimeout: ReturnType<typeof setTimeout> | null = null;

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    setIsToolsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsToolsOpen(false);
    }, 300);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav className="container mx-auto px-6 py-8">
        <ul className="flex items-center justify-center gap-16">
          <li>
            <Link
              to="/"
              className="relative text-white text-2xl font-bold tracking-wide transition-all group"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Home
              <span
                className={`absolute bottom-[-6px] left-0 h-[2px] bg-white transition-all duration-300 ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </li>
          
          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span 
              className="relative text-white text-2xl font-bold tracking-wide transition-all cursor-pointer group flex items-center gap-2"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Tools
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`}
              />
              <span
                className={`absolute bottom-[-6px] left-0 h-[2px] bg-white transition-all duration-300 ${
                  isActive('/pfp-generator') || isActive('/meme-generator') || isActive('/rocky-game')
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </span>
            
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white/10 backdrop-blur-xl rounded-2xl py-3 min-w-[220px] border border-white/20 shadow-2xl transition-all duration-300 ${
                isToolsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <Link
                to="/pfp-generator"
                className="block px-8 py-3 text-white text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                Pfp Generator
              </Link>
              <Link
                to="/meme-generator"
                className="block px-8 py-3 text-white text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                Meme Generator
              </Link>
              <Link
                to="/rocky-game"
                className="block px-8 py-3 text-white text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                Rocky Game
              </Link>
            </div>
          </li>

          <li>
            <Link
              to="/swap"
              className="relative text-white text-2xl font-bold tracking-wide transition-all group"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Swap
              <span
                className={`absolute bottom-[-6px] left-0 h-[2px] bg-white transition-all duration-300 ${
                  isActive('/swap') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </li>

          <li>
            <Link
              to="/team"
              className="relative text-white text-2xl font-bold tracking-wide transition-all group"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Team
              <span
                className={`absolute bottom-[-6px] left-0 h-[2px] bg-white transition-all duration-300 ${
                  isActive('/team') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
