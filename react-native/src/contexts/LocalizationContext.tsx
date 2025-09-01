import React from 'react';

interface LocalizationContextType {
  locale?: string;
  setLocale?: (locale: string) => void;
  t: (key: string, options?: any) => string;
}

const defaultT = (key: string, options?: any): string => key;

export const LocalizationContext = React.createContext<LocalizationContextType>({
  t: defaultT,
});