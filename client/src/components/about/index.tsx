import { useTranslation } from "react-i18next";
import "./about.scss";
import AboutImg from "./images/about.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about__wrapper">
      <div className="about__content">
        <div className="about__description">
          <h1>{t("about.title")}</h1>
          <p>{t("about.description")}</p>
        </div>
        <div className="about__image">
          <img src={AboutImg} alt={t("about.belavia")} />
        </div>
      </div>
    </div>
  );
};

export default About;
