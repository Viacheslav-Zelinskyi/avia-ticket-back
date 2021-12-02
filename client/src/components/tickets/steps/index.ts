import Summary from "./summary";
import SelectPath from "./select-path";
import SelectPassengers from "./select-passengers";
import SelectDate from "./select-date";
import SelectFlight from "./select-flight";

const steps = [SelectPath, SelectDate, SelectFlight, SelectPassengers, Summary];

export default steps;
