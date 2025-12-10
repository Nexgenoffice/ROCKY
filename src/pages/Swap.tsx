import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

const Swap = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { nightMode, lightsOn } = useTheme();

  const getBackgroundImage = () => {
    if (!nightMode) return "url(/pres3.png)";
    return lightsOn ? "url(/nuit_lum.png)" : "url(/nuuit_sans_lum.png)";
  };

  useEffect(() => {
    const img = new Image();
    const imageSrc = !nightMode ? '/pres3.png' : (lightsOn ? '/nuit_lum.png' : '/nuuit_sans_lum.png');
    img.src = imageSrc;
    img.onload = () => setImageLoaded(true);
  }, [nightMode, lightsOn]);

  return (
    <>
      {/* Theme Toggle Buttons */}
      <ThemeToggle />

      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Fond avec parallax */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: "100% auto",
            backgroundPosition: "center -100px",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Filtre flou */}
        <div 
          className="absolute inset-0 backdrop-blur-xl bg-black/30"
          style={{ zIndex: 1 }}
        />

        {/* Coming Soon Text */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <h1
            className="text-9xl font-black uppercase"
            style={{
              fontFamily: "Gaegu, cursive",
              color: "#D4A574",
              textShadow: "6px 6px 0px rgba(0,0,0,0.3), -3px -3px 0px rgba(255,255,255,0.2)",
            }}
          >
            Coming Soon
          </h1>
        </div>
      </div>
    </>
  );
};

export default Swap;
