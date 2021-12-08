import { Select } from "antd";
import { ICountry } from "../../../../models/ticket.interfaces";
import "./countrySelector.scss";

interface ICountrySelectorProps {
  countries: Array<ICountry>;
  placeholders: Array<string>;
  defaultValues: Array<string | undefined>;
  onChange: (country: string, index: number) => void;
}

const { Option } = Select;

export const CountrySelector = ({
  countries,
  placeholders,
  defaultValues,
  onChange,
}: ICountrySelectorProps) => (
  <div className="countrySelector__wrapper">
    {placeholders.map((value, index) => (
      <div className="countrySelector__select">
        <span>{value}:</span>
        <Select
          placeholder={value}
          defaultValue={defaultValues && defaultValues[index]}
          size="large"
          className="step__selector"
          onChange={(value) => onChange(value, index)}
        >
          {countries.map((country: ICountry) => (
            <Option value={country.name.common}>{country.name.common}</Option>
          ))}
        </Select>
      </div>
    ))}
  </div>
);
