/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Upload, Palette } from "lucide-react";
import { useRef, useState } from "react";
import { ACCESSORY_CATEGORIES } from "./config";

interface AccessorySelectorProps {
  selectedAccessories: Record<string, string | null>;
  onSelect: (category: string, id: string | null) => void;
}

export default function AccessorySelector({
  selectedAccessories,
  onSelect,
}: AccessorySelectorProps) {
  const allCategories = Object.values(ACCESSORY_CATEGORIES);
  const mainCategories = allCategories.filter(
    (cat) => !["clothes", "accessories", "fonds"].includes(cat.id)
  );
  const secondaryCategories = allCategories.filter((cat) =>
    ["clothes", "accessories", "fonds"].includes(cat.id)
  );
  const categories = [...mainCategories, ...secondaryCategories];

  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onSelect("fonds", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorButtonClick = () => {
    if (colorButtonRef.current) {
      const rect = colorButtonRef.current.getBoundingClientRect();
      setColorPickerPosition({
        x: rect.right + 10,
        y: rect.top
      });
      setShowColorPicker(!showColorPicker);
    }
  };

  const predefinedColors = [
    "#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#FFD700", "#4B0082",
    "#E6E6FA", "#F0E68C", "#87CEEB", "#90EE90", "#FFB6C1"
  ];

  return (
    <div className="flex flex-col lg:h-[480px] lg:w-[550px] lg:max-w-auto max-w-[600px] w-[90%] bg-transparent">
      <div
        className="flex flex-col h-full rounded-3xl shadow-2xl border border-[#463832]/50 lg:overflow-hidden overflow-visible"
        style={{
          backgroundColor: "rgba(30, 25, 23, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="lg:p-6 p-4 lg:pb-3 pb-2 lg:pt-4 pt-3 border-b border-[#463832]/50 w-full">
          <h2 className="lg:text-2xl text-xl font-bold text-[#D4C5B5] text-center">
            Customization
          </h2>
        </div>

        <div className="flex-1 overflow-scroll flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="lg:p-4 p-3">
              <div className="w-full rounded-2xl border border-[#463832] bg-[#2A2320] lg:p-1 p-2 shadow-lg">
                <div className="flex flex-wrap gap-1 justify-center">
                  {[...mainCategories, ...secondaryCategories].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={cn(
                        "px-2 py-1.5 rounded-xl text-xs font-medium transition-all flex text-center min-w-0",
                        activeTab === cat.id
                          ? "bg-[#8B7355] text-white shadow-md"
                          : "text-[#8B7355] hover:text-[#D4C5B5] hover:bg-[#463832]/50"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 lg:overflow-hidden">
              <div
                className="h-full lg:p-4 p-3 lg:overflow-y-auto"
                style={{ 
                  maxHeight: "320px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#8B7355 transparent"
                }}
              >
                {categories.map((cat) => (
                  <TabsContent key={cat.id} value={cat.id} className="mt-0">
                    <div className="grid sm:grid-cols-5 grid-cols-4 lg:gap-3 gap-2 pb-4">
                      <button
                        onClick={() => onSelect(cat.id, null)}
                        className={cn(
                          "aspect-square rounded-2xl border flex items-center justify-center transition-all hover:scale-105 shadow-lg",
                          !selectedAccessories[cat.id]
                            ? "border-[#8B7355] bg-[#3A312A] ring-2 ring-[#8B7355]/30 shadow-[#8B7355]/20"
                            : "border-[#463832] bg-[#3A312A] hover:border-[#6B5B4D] hover:shadow-xl"
                        )}
                      >
                        <span className="text-xs text-[#8B7355] font-medium">
                          None
                        </span>
                      </button>

                      {/* Upload button et Color picker pour backgrounds */}
                      {cat.id === "fonds" && (
                        <>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                              "aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all hover:scale-105 shadow-lg gap-1",
                              "border-[#463832] bg-[#3A312A] hover:border-[#6B5B4D] hover:shadow-xl"
                            )}
                          >
                            <Upload className="w-5 h-5 text-[#8B7355]" />
                            <span className="text-[10px] text-[#8B7355] font-medium">
                              Upload
                            </span>
                          </button>
                          
                          <button
                            ref={colorButtonRef}
                            onClick={handleColorButtonClick}
                            className={cn(
                              "aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all hover:scale-105 shadow-lg gap-1",
                              selectedAccessories.fonds?.startsWith('#')
                                ? "border-[#8B7355] bg-[#3A312A] ring-2 ring-[#8B7355]/30 shadow-[#8B7355]/20"
                                : "border-[#463832] bg-[#3A312A] hover:border-[#6B5B4D] hover:shadow-xl"
                            )}
                          >
                            <Palette className="w-5 h-5 text-[#8B7355]" />
                            <span className="text-[10px] text-[#8B7355] font-medium">
                              Color
                            </span>
                          </button>
                        </>
                      )}

                      {cat.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => onSelect(cat.id, option.id)}
                          className={cn(
                            "aspect-square rounded-2xl border flex items-center justify-center text-2xl transition-all hover:scale-105 shadow-lg overflow-hidden",
                            selectedAccessories[cat.id] === option.id
                              ? "border-[#8B7355] bg-[#3A312A] ring-2 ring-[#8B7355]/30 shadow-[#8B7355]/20"
                              : "border-[#463832] bg-[#3A312A] hover:border-[#6B5B4D] hover:shadow-xl"
                          )}
                          style={
                            option.type === "color"
                              ? {
                                  backgroundColor: option.value,
                                  border: `2px solid ${
                                    selectedAccessories[cat.id] === option.id
                                      ? "#8B7355"
                                      : "#463832"
                                  }`,
                                }
                              : {}
                          }
                        >
                          {option.type === "color" ? (
                            ""
                          ) : option.type === "image" ? (
                            <img
                              src={option.value}
                              alt={
                                (option as unknown as any).label || option.value
                              }
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            option.value
                          )}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Custom Color Picker Modal */}
      {showColorPicker && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowColorPicker(false)}
          />
          <div
            className="fixed z-50 bg-[#1E1917] rounded-3xl shadow-2xl border-2 border-[#8B7355] p-6"
            style={{
              left: `${colorPickerPosition.x}px`,
              top: `${colorPickerPosition.y}px`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <h3 className="text-white font-bold mb-4 text-center">Choose Color</h3>
            
            {/* Predefined Colors Grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setCustomColor(color);
                    onSelect("fonds", color);
                    setShowColorPicker(false);
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all hover:scale-110 shadow-lg",
                    customColor === color ? "border-white ring-2 ring-white/50" : "border-[#463832]"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    onSelect("fonds", e.target.value);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  style={{ width: '48px', height: '48px' }}
                />
                <div 
                  className="w-12 h-12 rounded-full border-2 border-[#8B7355] cursor-pointer shadow-lg"
                  style={{ backgroundColor: customColor }}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      onSelect("fonds", e.target.value);
                    }
                  }}
                  className="w-full bg-[#3A312A] text-white px-3 py-2 rounded-xl border border-[#463832] focus:border-[#8B7355] focus:outline-none"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
