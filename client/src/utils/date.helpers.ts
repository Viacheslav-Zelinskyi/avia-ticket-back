import moment from "moment";

const getTimeOfset = (timezone: string) => {
  const timeOffset = moment().zone(timezone).utcOffset();
  const localTimeOffset = moment().utcOffset();

  return timeOffset - localTimeOffset;
};

export const getDateFromTimestamp = (timestamp: number, timezone?: string) => {
  const timeDifference = timezone ? getTimeOfset(timezone) : 0;
  const date = new Date(timestamp * 1000 - timeDifference * 60 * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
