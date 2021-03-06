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
import Login from "./login/login";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/redux.interfaces";
import { logOut } from "../../redux/reducers/user";
import { logoutFetch } from "../../api";

interface IHeaderLink {
  text: string;
  route?: string;
  onClick?: () => void;
}

const Header = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((store: IStore) => store.user);
  const dispatch = useDispatch();
  const [isOpenedLogin, setIsOpenedLogin] = useState(false);
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

  const logout = () => {
    dispatch(logOut());
    logoutFetch();
  };

  return (
    <div className="header__wrapper">
      {isOpenedLogin && <Login closeLogin={() => setIsOpenedLogin(false)} />}
      <div className="header__linksContainer">
        {user.authorized ? (
          <HeaderLink text={t("common.logout")} onClick={logout} />
        ) : (
          <HeaderLink
            text={t("common.login")}
            onClick={() => setIsOpenedLogin(true)}
          />
        )}
      </div>
      <div className="header__linksContainer">
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
    </div>
  );
};

const HeaderLink = ({ text, route, onClick }: IHeaderLink) => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      onClick={() => {
        route && navigate(route);
        onClick && onClick();
      }}
    >
      {text}
    </Button>
  );
};

export default Header;
