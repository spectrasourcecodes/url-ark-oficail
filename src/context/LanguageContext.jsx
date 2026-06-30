import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    dashboard: 'Dashboard',
    market: 'Market',
    invest: 'Invest',
    withdraw: 'Withdraw',
    profile: 'Profile',
    support: 'Support',
    home: 'Home',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    logout_success: 'Logout successful',
    logout_failed: 'Logout failed',
  },
  pt: {
    dashboard: 'Dashboard',
    market: 'Mercado',
    invest: 'Investir',
    withdraw: 'Sacar',
    profile: 'Perfil',
    support: 'Suporte',
    home: 'Início',
    login: 'Entrar',
    register: 'Cadastrar',
    logout: 'Sair',
    logout_success: 'Logout realizado com sucesso',
    logout_failed: 'Falha ao sair',
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'pt';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);