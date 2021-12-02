import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { aboutPath, homePath, myTicketsPath, ticketsPath } from "../../routes";
import Dropdown from "react-dropdown";
import DarkModeToggle from "react-dark-mode-toggle";
import "react-dropdown/style.css";
import "./header.scss";
import { useTranslation } from "react-i18next";
import { languages } from "../../utils/i18n";
import { useEffect, useState } from "react";
import { setTheme } from "../../utils/themes";
import { themeKey, themes } from "../../utils/constants/themes.constants";

interface IHeaderLink {
  text: string;
  route: string;
}

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem(themeKey) === themes.dark
  );

  useEffect(() => {
    if (isDarkMode) setTheme(themes.dark);
    else setTheme(themes.light);
  }, [isDarkMode]);

  const languagesOptions = [
    { value: languages.en, label: t("header.english") },
    { value: languages.ru, label: t("header.russian") },
  ];

  return (
    <div className="header__wrapper">
      <div className="header__links">
        <HeaderLink text={t("header.home")} route={homePath} />
        <HeaderLink text={t("header.tickets")} route={ticketsPath} />
        <HeaderLink text={t("header.myTickets")} route={myTicketsPath} />
        <HeaderLink text={t("header.about")} route={aboutPath} />
      </div>
      <div className="header__selectors">
        <Dropdown
          placeholderClassName="header__selectLanguage"
          controlClassName="header__selectLanguageInput"
          value={i18n.language}
          options={languagesOptions}
          onChange={(arg) => i18n.changeLanguage(arg.value)}
        />
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={75}
        />
      </div>
    </div>
  );
};

const HeaderLink = ({ text, route }: IHeaderLink) => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      onClick={() => navigate(route)}
    >
      {text}
    </Button>
  );
};

export default Header;
