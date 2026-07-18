import React, { createContext, useContext, useState } from 'react';
import en from '../translations/en';
import es from '../translations/es';
import fr from '../translations/fr';
import de from '../translations/de';
import hi from '../translations/hi';
import te from '../translations/te';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'te';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translationMap: Record<Language, Record<string, any>> = {
  en,
  es,
  fr,
  de,
  hi,
  te,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translations = translationMap[language] ?? translationMap['en'];

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};