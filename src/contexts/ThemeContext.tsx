import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  nightMode: boolean;
  setNightMode: (value: boolean) => void;
  lightsOn: boolean;
  setLightsOn: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [nightMode, setNightMode] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);

  return (
    <ThemeContext.Provider value={{ nightMode, setNightMode, lightsOn, setLightsOn }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
