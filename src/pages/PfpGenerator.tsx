import { useState } from "react";
import Creator from "./creator";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";

const PfpGenerator = () => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<"what" | "contributions" | "traits">("what");
  const [isClosing, setIsClosing] = useState(false);
  const { nightMode } = useTheme();

  const closePopup = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setShowInfoPopup(false);
      setIsClosing(false);
    }, 300);
  };

  const getBackgroundImage = () => {
    return nightMode ? "url(/murd_n.png)" : "url(/murd.png)";
  };

  return (
    <>
      {/* Theme Toggle Buttons - Fixed outside main container */}
      <ThemeToggle />

      {/* Info Button - Fixed outside main container */}
      <button
        onClick={() => setShowInfoPopup(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 cursor-pointer"
        style={{ zIndex: 60, pointerEvents: 'auto' }}
      >
        <div
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/30 cursor-pointer ${
            showInfoPopup
              ? 'bg-[#D4A574] scale-110 shadow-2xl shadow-[#D4A574]/50'
              : 'bg-white/20 backdrop-blur-md hover:bg-white/30 hover:scale-110'
          }`}
        >
          <span
            className="text-white text-2xl md:text-3xl font-bold"
            style={{
              fontFamily: "Gaegu, cursive",
            }}
          >
            ?
          </span>
        </div>
      </button>

      <div
        className="lg:fixed relative"
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          backgroundImage: getBackgroundImage(),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "white",
          display: "flex",
          flexDirection: "column",
          transition: "background-image 0.5s ease",
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 bg-black/40 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Info Popup */}
      {showInfoPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
          style={{
            animation: isClosing
              ? "fadeOut 0.3s ease-out forwards"
              : "fadeIn 0.3s ease-out forwards",
            pointerEvents: isClosing ? "none" : "auto",
          }}
        >
          <div
            className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-3xl w-full mx-4 border-4 md:border-8 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing
                ? "scaleOut 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) forwards"
                : "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full text-2xl md:text-3xl font-black hover:scale-110 transition-transform border-2 md:border-4 border-black shadow-lg flex items-center justify-center"
              style={{
                color: "#D4A574",
              }}
            >
              ×
            </button>

            {/* Tabs */}
            <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b-2 md:border-b-4 border-black pb-2">
              <button
                onClick={() => setActiveTab("what")}
                className={`px-3 md:px-6 py-2 md:py-3 text-lg md:text-2xl font-bold rounded-t-xl md:rounded-t-2xl transition-all border-2 md:border-4 border-black ${
                  activeTab === "what"
                    ? "shadow-md -mb-2"
                    : "hover:bg-pink-200"
                }`}
                style={{ 
                  fontFamily: "Gaegu, cursive",
                  backgroundColor: activeTab === "what" ? "#D4A574" : "#E8D4C0",
                  color: activeTab === "what" ? "white" : "#8B6F47"
                }}
              >
                What is this App
              </button>
              <button
                onClick={() => setActiveTab("contributions")}
                className={`px-3 md:px-6 py-2 md:py-3 text-lg md:text-2xl font-bold rounded-t-xl md:rounded-t-2xl transition-all border-2 md:border-4 border-black ${
                  activeTab === "contributions"
                    ? "shadow-md -mb-2"
                    : "hover:bg-pink-200"
                }`}
                style={{ 
                  fontFamily: "Gaegu, cursive",
                  backgroundColor: activeTab === "contributions" ? "#D4A574" : "#E8D4C0",
                  color: activeTab === "contributions" ? "white" : "#8B6F47"
                }}
              >
                Contributions
              </button>
              <button
                onClick={() => setActiveTab("traits")}
                className={`px-3 md:px-6 py-2 md:py-3 text-lg md:text-2xl font-bold rounded-t-xl md:rounded-t-2xl transition-all border-2 md:border-4 border-black ${
                  activeTab === "traits"
                    ? "shadow-md -mb-2"
                    : "hover:bg-pink-200"
                }`}
                style={{ 
                  fontFamily: "Gaegu, cursive",
                  backgroundColor: activeTab === "traits" ? "#D4A574" : "#E8D4C0",
                  color: activeTab === "traits" ? "white" : "#8B6F47"
                }}
              >
                Special Traits
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[200px] md:min-h-[300px]">
              {activeTab === "what" ? (
                <div>
                  <h2
                    className="text-3xl md:text-5xl font-black mb-4 md:mb-6 uppercase"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      color: "#D4A574",
                      textShadow: "none",
                      filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.2))",
                    }}
                  >
                    Rocky's Head Generator
                  </h2>
                  <p
                    className="text-gray-800 text-lg md:text-2xl leading-relaxed mb-3 md:mb-4"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      fontWeight: 400,
                    }}
                  >
                    Create your own unique Rocky's Head character! Mix and match different accessories, hairstyles, clothes, and backgrounds to design your perfect avatar.
                  </p>
                  <p
                    className="text-gray-800 text-lg md:text-2xl leading-relaxed"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      fontWeight: 400,
                    }}
                  >
                    Use the random button for inspiration or craft your character piece by piece. Download your creation when you're done!
                  </p>
                </div>
              ) : activeTab === "contributions" ? (
                <div>
                  <h2
                    className="text-3xl md:text-5xl font-black mb-4 md:mb-6 uppercase"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      color: "#D4A574",
                      textShadow: "none",
                      filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.2))",
                    }}
                  >
                    Contributors
                  </h2>
                  <div
                    className="text-gray-800 text-lg md:text-2xl leading-relaxed space-y-2 md:space-y-3"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      fontWeight: 400,
                    }}
                  >
                    <p><strong>Design & Art:</strong> The Rocky's Head Team</p>
                    <p><strong>Development:</strong> Nexgen & Novee</p>
                    <p><strong>Special Thanks:</strong> Our amazing community for their support and feedback!</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2
                    className="text-3xl md:text-5xl font-black mb-4 md:mb-6 uppercase"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      color: "#D4A574",
                      textShadow: "none",
                      filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.2))",
                    }}
                  >
                    Special Traits
                  </h2>
                  <div
                    className="text-gray-800 text-lg md:text-2xl leading-relaxed space-y-3 md:space-y-4"
                    style={{
                      fontFamily: "Gaegu, cursive",
                      fontWeight: 400,
                    }}
                  >
                    <div>
                      <p className="font-bold mb-2">Accessories:</p>
                      <div className="flex items-center gap-3">
                        <span>Syderal</span>
                        <a
                          href="https://x.com/Syderal_Sydney"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full hover:bg-blue-400 transition-colors text-base md:text-lg"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span>X</span>
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold mb-2">Badges:</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span>Asu</span>
                          <a
                            href="https://x.com/LastButterfly21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full hover:bg-blue-400 transition-colors text-base md:text-lg"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>X</span>
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>Xeno</span>
                          <a
                            href="https://x.com/0xLordXeno"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full hover:bg-blue-400 transition-colors text-base md:text-lg"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>X</span>
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>Cepodr</span>
                          <a
                            href="https://x.com/cepodr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full hover:bg-blue-400 transition-colors text-base md:text-lg"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>X</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

        <div
          style={{
            display: "flex",
            width: "100%",
            position: "relative",
            zIndex: 10,
          }}
          className="min-h-screen pt-20"
        >
          <Creator />
        </div>
      </div>
    </>
  );
};

export default PfpGenerator;
