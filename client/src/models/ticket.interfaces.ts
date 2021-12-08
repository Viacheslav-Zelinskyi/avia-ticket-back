export interface IPeopleCounter {
  adult: number;
  childrens: number;
  infants: number;
}

export interface ITicket {
  from?: string;
  fromTimezone?: string;
  to?: string;
  destinationTimezone?: string;
  departureDate?: number;
  returnDate?: number;
  passengers?: IPeopleCounter;
}

export interface ICountry {
  timezones: Array<string>;
  name: {
    common: string;
  };
}
