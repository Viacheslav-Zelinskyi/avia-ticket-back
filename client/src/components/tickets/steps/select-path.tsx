import { Select, Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ICountry, ITicket } from "../../../models/ticket.interfaces";
import {
  setDestination,
  setDestinationTimezone,
  setFrom,
  setFromTimezone,
} from "../../../redux/reducers/ticket";
import "./steps.scss";

interface ICountrySelector {
  values: Array<string>;
  countries: Array<ICountry>;
  defaultValue: string | undefined;
}

interface ISelectPathProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  countries: Array<ICountry>;
  ticket: ITicket;
}

enum CountrySelectorType {
  From = "From",
  To = "To",
}

const { Option } = Select;

const SelectPath = ({
  setCurrentStep,
  currentStep,
  countries,
  ticket,
}: ISelectPathProps) => {
  const { t } = useTranslation();

  return (
    <div className="step__wrapper">
      <div className="step__container">
        <CountrySelector
          values={[CountrySelectorType.From, CountrySelectorType.To]}
          countries={countries}
          defaultValue={ticket?.to || undefined}
        />
      </div>
      <div className="step__submit">
        <Button
          type="primary"
          size="large"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!(ticket.from && ticket.to)}
        >
          {t("common.submit")}
        </Button>
      </div>
    </div>
  );
};

const CountrySelector = ({
  values,
  countries,
  defaultValue,
}: ICountrySelector) => {
  const dispatch = useDispatch();

  const setTravelRoute = (index: number, value: string) => {
    if (value === CountrySelectorType.From) {
      dispatch(setFrom(countries[index].name.common));
      dispatch(setFromTimezone(countries[index].timezones[0]));
    } else {
      dispatch(setDestination(countries[index].name.common));
      dispatch(setDestinationTimezone(countries[index].timezones[0]));
    }
  };

  return (
    <>
      {values.map((value, index) => (
        <Select
          defaultValue={index === 1 ? defaultValue : undefined}
          placeholder={value}
          size="large"
          className="step__selector"
          onChange={(name: string, option: any) =>
            setTravelRoute(option.key, value)
          }
        >
          {countries.map((country: ICountry, index) => (
            <Option value={country.name.common} key={index}>
              {country.name.common}
            </Option>
          ))}
        </Select>
      ))}
    </>
  );
};

export default SelectPath;
