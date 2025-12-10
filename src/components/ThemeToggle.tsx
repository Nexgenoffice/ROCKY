import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { nightMode, setNightMode, lightsOn, setLightsOn } = useTheme();

  return (
    <>
      {/* Night mode toggle button */}
      <button
        onClick={() => setNightMode(!nightMode)}
        className="fixed top-6 right-8 group cursor-pointer"
        style={{ zIndex: 60, pointerEvents: 'auto' }}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/30 cursor-pointer ${
            nightMode
              ? 'bg-[#1a1a2e] scale-110 shadow-2xl shadow-blue-500/30'
              : 'bg-white/20 backdrop-blur-md hover:bg-white/30 hover:scale-110'
          }`}
        >
          {nightMode ? (
            <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14 9.79 9.79 0 0 0 2.1-.22 8.11 8.11 0 0 1-7.18 4.32z"/>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.5a5.5 5.5 0 1 1 5.5-5.5 5.51 5.51 0 0 1-5.5 5.5zm0-9a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zM12 5a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm0 14a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm12.66-6.66a1 1 0 0 0 .71-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 .7.29zM6.34 17.66a1 1 0 0 0-.7.29l-.71.71a1 1 0 0 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41 1 1 0 0 0-.71-.29zm12.02.29a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 1.41-1.41zM7.05 6.34a1 1 0 0 0 .7-.29 1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 .71.29z"/>
            </svg>
          )}
        </div>
      </button>

      {/* Light switch button - only visible in night mode */}
      {nightMode && (
        <button
          onClick={() => setLightsOn(!lightsOn)}
          className="fixed top-6 right-28 group cursor-pointer"
          style={{ zIndex: 60, pointerEvents: 'auto' }}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/30 cursor-pointer ${
              lightsOn
                ? 'bg-yellow-500/80 scale-110 shadow-2xl shadow-yellow-500/50'
                : 'bg-gray-700/80 hover:bg-gray-600/80 hover:scale-110'
            }`}
          >
            <svg className={`w-8 h-8 ${lightsOn ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 11.7V16h-4v-2.3C8.48 12.63 7 11 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2-1.48 3.63-3 4.7z"/>
            </svg>
          </div>
        </button>
      )}
    </>
  );
};
