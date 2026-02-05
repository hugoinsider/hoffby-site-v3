"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "pt-BR" | "en-US";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const dictionary = {
  "pt-BR": {
    "login.title": "Acesse sua conta",
    "login.email": "E-mail",
    "login.password": "Senha",
    "login.button": "Entrar",
    "dashboard.title": "Meus Cursos",
    "course.modules": "Módulos",
    "course.progress": "Progresso",
    "admin.title": "Painel do Professor",
    "common.back": "Voltar",
    "common.save": "Salvar",
    "common.cancel": "Cancelar",
  },
  "en-US": {
    "login.title": "Login to your account",
    "login.email": "Email",
    "login.password": "Password",
    "login.button": "Login",
    "dashboard.title": "My Courses",
    "course.modules": "Modules",
    "course.progress": "Progress",
    "admin.title": "Professor Dashboard",
    "common.back": "Back",
    "common.save": "Save",
    "common.cancel": "Cancel",
  },
};

export const PlatformI18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("pt-BR");

  // Persist preference if needed, or default to generic
  useEffect(() => {
    const saved = localStorage.getItem("platform-locale") as Locale;
    if (saved) setLocale(saved);
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("platform-locale", newLocale);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    // @ts-ignore
    let value = dictionary[locale][key];
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const usePlatformI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("usePlatformI18n must be used within a PlatformI18nProvider");
  }
  return context;
};
