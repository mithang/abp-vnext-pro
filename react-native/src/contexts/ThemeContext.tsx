import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface AppTheme {
  mode: 'light' | 'dark';
  primaryColor: string;
  colors: ThemeColors;
}

interface ThemeContextType {
  theme: AppTheme;
  setThemeMode: (mode: 'light' | 'dark') => void;
  setPrimaryColor: (color: string) => void;
}

const lightColors: ThemeColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b',
  textSecondary: '#64748b',
};

const darkColors: ThemeColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
};

const predefinedColors = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#6366f1', // Indigo (default)
  '#10b981', // Green
  '#f97316', // Orange
];

const createTheme = (mode: 'light' | 'dark', primaryColor: string): AppTheme => {
  const baseColors = mode === 'light' ? lightColors : darkColors;
  return {
    mode,
    primaryColor,
    colors: {
      ...baseColors,
      primary: primaryColor,
    },
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(createTheme('light', '#6366f1'));

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const savedMode = await AsyncStorage.getItem('theme_mode');
      const savedColor = await AsyncStorage.getItem('theme_primary_color');
      
      const mode = (savedMode as 'light' | 'dark') || 'light';
      const primaryColor = savedColor || '#6366f1';
      
      setTheme(createTheme(mode, primaryColor));
    } catch (error) {
      console.log('Error loading theme from storage:', error);
    }
  };

  const setThemeMode = async (mode: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('theme_mode', mode);
      setTheme(createTheme(mode, theme.primaryColor));
    } catch (error) {
      console.log('Error saving theme mode:', error);
    }
  };

  const setPrimaryColor = async (color: string) => {
    try {
      await AsyncStorage.setItem('theme_primary_color', color);
      setTheme(createTheme(theme.mode, color));
    } catch (error) {
      console.log('Error saving primary color:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { predefinedColors };
