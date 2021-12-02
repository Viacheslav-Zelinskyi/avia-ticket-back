import { DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { Moment } from "moment";
import "./steps.scss";
import { setDepartureDate } from "../../../redux/reducers/ticket";
import { useTranslation } from "react-i18next";
import { ITicket } from "../../../models/ticket.interfaces";

interface ISelectDateProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  ticket: ITicket;
}

const dateFormat = "DD.MM.YYYY HH:mm";

const SelectDate = ({ setCurrentStep, currentStep, ticket }: ISelectDateProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setDate = (date: Moment | null) => {
    dispatch(setDepartureDate(date?.unix() || null));
  };

  return (
    <div className="step__wrapper">
      <div className="step__container">
        <DatePicker
          showTime
          size="large"
          format={dateFormat}
          minuteStep={15}
          className="step__selector"
          onChange={setDate}
        />
      </div>
      <div className="step__submit">
        <Button
          type="primary"
          size="large"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!(ticket.departureDate)}
        >
          {t("common.submit")}
        </Button>
      </div>
    </div>
  );
};

export default SelectDate;
