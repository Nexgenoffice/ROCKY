import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

const ComingSoon = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { nightMode, lightsOn } = useTheme();

  const getBackgroundImage = () => {
    if (!nightMode) return "url(/murd.png)";
    return "url(/murd_n.png)";
  };

  useEffect(() => {
    const img = new Image();
    const imageSrc = !nightMode ? '/murd.png' : '/murd_n.png';
    img.src = imageSrc;
    img.onload = () => setImageLoaded(true);
  }, [nightMode, lightsOn]);

  return (
    <>
      {/* Theme Toggle Buttons */}
      <ThemeToggle />

      <div className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* Fond avec mode nuit */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        {/* Overlay sombre */}
        <div 
          className="absolute inset-0 bg-black/40"
          style={{ zIndex: 1 }}
        />
        
        {/* Texte Coming Soon au premier plan */}
        <h1 
          className="relative text-5xl sm:text-7xl md:text-9xl font-black uppercase text-center px-4"
          style={{
            zIndex: 2,
            fontFamily: "Gaegu, cursive",
            color: "#D4A574",
            textShadow: "6px 6px 0px rgba(0,0,0,0.3), -3px -3px 0px rgba(255,255,255,0.2)",
          }}
        >
          Coming Soon
        </h1>
      </div>
    </>
  );
};

export default ComingSoon;
