import { useState } from "react";
import AccessorySelector from "../components/AccessorySelector";
import CharacterCanvas from "../components/CharacterCanvas";

export default function CharacterCreator() {
  const [selectedAccessories, setSelectedAccessories] = useState({
    eyes: null,
    mouth: null,
    hair: null,
    badges: null,
    beard: null,
    acc1: null,
    acc2: null,
    background: null,
  });

  const handleSelect = (category: string, id: string | null) => {
    setSelectedAccessories((prev) => ({
      ...prev,
      [category]: id,
    }));
  };

  const handleReset = () => {
    setSelectedAccessories({
      eyes: null,
      mouth: null,
      hair: null,
      badges: null,
      beard: null,
      acc1: null,
      acc2: null,
      background: null,
    });
  };

  const handleRandom = () => {
    // Import config to get all options
    import('../components/config').then((config) => {
      const categories = config.ACCESSORY_CATEGORIES;
      const randomAccessories: any = {};
      
      Object.keys(categories).forEach((category) => {
        const options = categories[category as keyof typeof categories].options;
        if (options.length > 0) {
          const randomIndex = Math.floor(Math.random() * options.length);
          randomAccessories[category] = options[randomIndex].id;
        }
      });
      
      setSelectedAccessories(randomAccessories);
    });
  };

  return (
    <div className="h-full w-full flex flex-col lg:justify-center items-center lg:overflow-hidden overflow-y-auto py-5">
      <h1
        className="font-black text-5xl lg:mb-5 lg:mt-0 mt-5 tracking-wide"
        style={{ 
          color: "#D4A574", 
          fontFamily: "Gaegu, cursive",
          textShadow: "4px 4px 0px rgba(0,0,0,0.3), -2px -2px 0px rgba(255,255,255,0.2)"
        }}
      >
        ROCKY'S HEAD GENERATOR
      </h1>
      <div className="flex lg:flex-row lg:flex-wrap flex-col items-center lg:mt-0 mt-5 lg:justify-center lg:overflow-hidden max-w-7xl mx-auto lg:gap-5 lg:px-5 pb-10">
        {/* Left Side - Canvas */}

        <CharacterCanvas
          selectedAccessories={selectedAccessories}
          onReset={handleReset}
          onRandom={handleRandom}
        />

        <AccessorySelector
          selectedAccessories={selectedAccessories}
          onSelect={handleSelect}
        />
      </div>{" "}
    </div>
  );
}
