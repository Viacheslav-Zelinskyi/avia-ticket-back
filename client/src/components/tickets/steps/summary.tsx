import { Card, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { ITicket } from "../../../models/ticket.interfaces";
import { addTicket } from "../../../redux/reducers/allTickets";
import { clearTicket } from "../../../redux/reducers/ticket";
import { myTicketsPath } from "../../../routes";
import { getDateFromTimestamp } from "../../../utils/date.helpers";
import "./steps.scss";

interface ISummaryProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  ticket: ITicket;
  navigate: NavigateFunction;
}

const Summary = ({ ticket, navigate }: ISummaryProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const buyTicket = () => {
    dispatch(addTicket(ticket));
    dispatch(clearTicket());

    navigate(myTicketsPath);
  };

  return (
    <div className="step__summaryContainer">
      <Card
        className="step__summaryCard"
        title={t("tickets.summary")}
        type="inner"
      >
        <p>{t("common.from") + ": " + ticket.from}</p>
        <p>{t("common.to") + ": " + ticket.to}</p>
        <p>
          {t("tickets.departureAt") +
            getDateFromTimestamp(ticket?.departureDate || 0)}
        </p>
        <p>
          {ticket.returnDate
            ? t("tickets.returnAt") + getDateFromTimestamp(ticket.returnDate)
            : null}
        </p>
        <span>{t("tickets.passengers")}</span>
        <ul>
          <li>{t("tickets.adult") + ticket?.passengers?.adult}</li>
          <li>{t("tickets.childrens") + ticket?.passengers?.childrens}</li>
          <li>{t("tickets.infants") + ticket?.passengers?.infants}</li>
        </ul>
        <div className="step__submitWrapper">
          <div className="step__submit">
            <Button type="primary" size="large" onClick={buyTicket}>
              {t("tickets.buy")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
