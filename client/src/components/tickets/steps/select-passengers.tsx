import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IPeopleCounter } from "../../../models/ticket.interfaces";
import { setPassengers } from "../../../redux/reducers/ticket";
import "./steps.scss";
import { PeopleCounter } from "../../index";

interface ISelectPassengersProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setPeopleCounter: React.Dispatch<React.SetStateAction<any>>;
  peopleCounter: IPeopleCounter;
}

const SelectPassengers = ({
  setCurrentStep,
  currentStep,
  setPeopleCounter,
  peopleCounter,
}: ISelectPassengersProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isEmptyForm =
    peopleCounter.adult === 0 &&
    peopleCounter.childrens === 0 &&
    peopleCounter.infants === 0;

  const savePassengersNumber = () => {
    setCurrentStep(currentStep + 1);

    dispatch(setPassengers(peopleCounter));
  };

  return (
    <div className="step__wrapper">
      <div className="step__container">
        <div>
          <PeopleCounter
            labels={[
              t("tickets.adult"),
              t("tickets.childrens"),
              t("tickets.infants"),
            ]}
            setPeopleCounter={setPeopleCounter}
            peopleCounter={peopleCounter}
          />
        </div>
      </div>
      <div className="step__submit">
        <Button
          type="primary"
          size="large"
          onClick={savePassengersNumber}
          disabled={isEmptyForm}
        >
          {t("common.submit")}
        </Button>
      </div>
    </div>
  );
};

export default SelectPassengers;
