import { themeKey, themes } from "./constants/themes.constants";

export const setTheme = (themeName: string) => {
  localStorage.setItem(themeKey, themeName);
  document.documentElement.className = themeName;
};

export const keepTheme = () => {
  if (localStorage.getItem(themeKey)) {
    if (localStorage.getItem(themeKey) === themes.dark) {
      setTheme(themes.dark);
    } else if (localStorage.getItem(themeKey) === themes.light) {
      setTheme(themes.light);
    }
  } else {
    setTheme(themes.light);
  }
};
