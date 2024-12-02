// src/ThemeContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { debounce } from "lodash";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 시스템 다크모드 기본 감지
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 초기 테마 설정 (로컬 스토리지 or 시스템 기본값)
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light')
  );

  useEffect(() => {
    // 현재 테마를 HTML 태그의 data-theme 속성에 반영
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(
    debounce(() => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, 300),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ThemeContext를 사용하기 쉽게 하는 Hook
export const useTheme = () => useContext(ThemeContext);
