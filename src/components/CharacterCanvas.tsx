/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ACCESSORY_CATEGORIES } from "./config";

interface CharacterCanvasProps {
  selectedAccessories: Record<string, string | null>;
  onReset: () => void;
}

export default function CharacterCanvas({
  selectedAccessories,
  onReset,
}: CharacterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const baseImageRef = useRef<HTMLImageElement>(null);

  const TEMPLATE_IMAGE_URL = "/template.png";

  // Load template image once
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = TEMPLATE_IMAGE_URL;
    img.onload = () => {
      baseImageRef.current = img;
      setIsImageLoaded(true);
    };
  }, []);

  // Draw canvas with layered images
  useEffect(() => {
    if (!canvasRef.current || !isImageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const drawLayers = async () => {
      // 1. Draw selected fond (background)
      const fondsId = selectedAccessories.fonds;
      const selectedFond = fondsId
        ? ACCESSORY_CATEGORIES.fonds.options.find((o) => o.id === fondsId)
        : ACCESSORY_CATEGORIES.fonds.options[0]; // Default to first (base.jpg)

      if (selectedFond && selectedFond.type === "image") {
        const fondImg = new Image();
        fondImg.crossOrigin = "anonymous";
        fondImg.src = selectedFond.value;
        await new Promise((resolve) => {
          fondImg.onload = () => {
            ctx.drawImage(fondImg, 0, 0, width, height);
            resolve(null);
          };
        });
      }

      // 2. Draw template.png over the background
      if (baseImageRef.current) {
        ctx.drawImage(baseImageRef.current, 0, 0, width, height);
      }

      // 3. Draw Accessories on top of template
      const drawOrder = [
        "eyes",
        "mouth",
        "clothes",
        "hair",
        "badges",
        "accessories",
      ];

      for (const category of drawOrder) {
        const accessory = selectedAccessories[category];
        if (!accessory) continue;

        const categoryData =
          ACCESSORY_CATEGORIES[category as keyof typeof ACCESSORY_CATEGORIES];
        if (!categoryData) continue;

        const { position, options } = categoryData;
        const option = options.find((o: any) => o.id === accessory);

        if (option) {
          ctx.save();

          if (option.type === "emoji" || option.type === "text") {
            ctx.translate(
              position.x,
              position.y + ((option as any).yOffset || 0)
            );
            const scale = (option as any).scale || 1;
            ctx.font = `${scale * 40}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(option.value, 0, 0);
          } else if (option.type === "image") {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = option.value;
            await new Promise((resolve) => {
              img.onload = () => {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(null);
              };
            });
          }

          ctx.restore();
        }
      }
    };

    drawLayers();
  }, [selectedAccessories, isImageLoaded]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const link = document.createElement("a");
      link.download = "rocky-head.png";
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert(
        "Unable to download image (browser security). Try taking a screenshot."
      );
    }
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob: Blob | null) => {
        if (!blob) return;
        const file = new File([blob], "personnage.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Mon Personnage",
            text: "Regarde le personnage que j'ai créé !",
            files: [file],
          });
        } else {
          alert("Native sharing is not supported on this browser.");
        }
      });
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center w-fit max-w-[90%] lg:mb-0 mb-5">
      <div
        className="bg-[#1E1917] rounded-3xl shadow-2xl border border-[#463832]/50 w-full lg:p-6 p-4"
        style={{
          backgroundColor: "rgba(30, 25, 23, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Canvas Section */}
        <div
          className="flex flex-col items-center justify-center flex-1"
          style={{
            minWidth: 0,
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-[#463832] bg-white shadow-xl lg:max-w-[450px] lg:max-h-[450px] max-w-[600px]"
            style={{
              minWidth: "250px",
              minHeight: "250px",
            }}
          >
            <canvas
              ref={canvasRef}
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-[#8B7355]">
                Loading...
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section - Right Side */}
        <div className="flex justify-center h-full lg:mt-5 mt-2 lg:gap-5 gap-2">
          <Button
            onClick={onReset}
            variant="outline"
            className="bg-[#5A4A3A] border-[#5A4A3A] text-white hover:bg-[#6B5B4D] transition-all lg:rounded rounded-xl shadow-lg"
            style={{
              width: "100%",
              padding: "min(1rem, 2vh) min(1.5rem, 2vw)",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              minHeight: "35px",
            }}
          >
            <RotateCcw
              style={{
                width: "clamp(16px, 2vw, 20px)",
                height: "clamp(16px, 2vw, 20px)",
                marginRight: "0.5rem",
              }}
            />
            Reset
          </Button>

          <Button
            onClick={handleDownload}
            className="bg-[#8B7355] text-white hover:bg-[#A68A6D] transition-all lg:rounded rounded-xl shadow-lg"
            style={{
              width: "100%",
              padding: "min(1rem, 2vh) min(1.5rem, 2vw)",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              minHeight: "35px",
            }}
          >
            <Download
              style={{
                width: "clamp(16px, 2vw, 20px)",
                height: "clamp(16px, 2vw, 20px)",
                marginRight: "0.5rem",
              }}
            />
            <p className="hidden sm:block">Download</p>
            <p className="block sm:hidden">Save</p>
          </Button>

          <Button
            onClick={handleShare}
            variant="secondary"
            className="bg-[#5A4A3A] text-white hover:bg-[#6B5B4D] transition-all lg:rounded rounded-xl shadow-lg"
            style={{
              width: "100%",
              padding: "min(1rem, 2vh) min(1.5rem, 2vw)",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              minHeight: "35px",
            }}
          >
            <Share2
              style={{
                width: "clamp(16px, 2vw, 20px)",
                height: "clamp(16px, 2vw, 20px)",
                marginRight: "0.5rem",
              }}
            />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
