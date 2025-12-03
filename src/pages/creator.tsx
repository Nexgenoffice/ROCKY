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

  return (
    <div className="h-full w-full flex flex-col lg:justify-center items-center">
      <h1
        className="font-bold sm:text-6xl text-4xl lg:mb-10 lg:mt-0 mt-10 text-white"
        // style={{ fontWeight: "bold", color: "#D4C5B5" }}
      >
        ROCKY'S HEAD <br />
        GENERATOR
      </h1>
      <div className="flex lg:flex-row lg:flex-wrap flex-col items-center lg:mt-0 mt-10 lg:justify-center overflow-hidden max-w-7xl mx-auto lg:gap-5 lg:px-5">
        {/* Left Side - Canvas */}

        <CharacterCanvas
          selectedAccessories={selectedAccessories}
          onReset={handleReset}
        />

        <AccessorySelector
          selectedAccessories={selectedAccessories}
          onSelect={handleSelect}
        />
      </div>{" "}
    </div>
  );
}
