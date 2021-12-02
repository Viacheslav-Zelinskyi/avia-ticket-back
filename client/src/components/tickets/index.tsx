import "./tickets.scss";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import stepContent from "./steps";
import { ICountry, IPeopleCounter, ITicket } from "../../models/ticket.interfaces";
import { getCountries } from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IStore } from "../../models/redux.interfaces";

const { Step } = Steps;

const Tickets = () => {
  const { t } = useTranslation();

  const ticket: ITicket = useSelector((store: IStore) => store.ticket);

  const navigate = useNavigate();

  const [countries, setCountries] = useState<Array<ICountry>>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRoundTrip, setIsRoundTrip] = useState<number>(1);
  const [peopleCounter, setPeopleCounter] = useState<IPeopleCounter>({
    adult: 0,
    childrens: 0,
    infants: 0,
  });

  useEffect(() => {
    getCountries()
      .then((countries) => setCountries(countries))
      .catch((err) => alert(err));
  }, []);

  const stepProps = {
    setCurrentStep: setCurrentStep,
    currentStep: currentStep,
    setIsRoundTrip: setIsRoundTrip,
    isRoundTrip: isRoundTrip,
    setPeopleCounter: setPeopleCounter,
    peopleCounter: peopleCounter,
    countries: countries,
    ticket: ticket,
    navigate: navigate,
  };

  return (
    <div className="tickets__wrapper">
      <div className="tickets__container">
        <Steps current={currentStep}>
          <Step title={t("steps.firstStep")} />
          <Step title={t("steps.secondStep")} />
          <Step title={t("steps.thirdStep")} />
          <Step title={t("steps.fourthStep")} />
          <Step title={t("steps.fifthStep")} />
        </Steps>
        {stepContent[currentStep](stepProps)}
      </div>
    </div>
  );
};

export default Tickets;
