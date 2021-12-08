import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { IPeopleCounter } from "../../models/ticket.interfaces";
import "./peopleCounter.scss";

enum passengersType {
  adult,
  childrens,
  infants,
}

type PassengersType = "adult" | "childrens" | "infants";

interface IPeopleCounterProps {
  labels: string[];
  setPeopleCounter: React.Dispatch<React.SetStateAction<any>>;
  peopleCounter: IPeopleCounter | undefined;
}

const PeopleCounter = ({
  labels,
  setPeopleCounter,
  peopleCounter,
}: IPeopleCounterProps) => {
  const increaseCounter = (index: number) =>
    setPeopleCounter(
      peopleCounter && {
        ...peopleCounter,
        [passengersType[index] as PassengersType]:
          +peopleCounter[passengersType[index] as PassengersType] + 1,
      }
    );

  const decreaseCounter = (index: number) => {
    setPeopleCounter(
      peopleCounter && {
        ...peopleCounter,
        [passengersType[index]]:
          peopleCounter[passengersType[index] as PassengersType] <= 0
            ? 0
            : peopleCounter[passengersType[index] as PassengersType] - 1,
      }
    );
  };

  return (
    <div>
      {labels.map((label: string, index: number) => (
        <div className="peopleCounter">
          <h2>{label}</h2>
          <div className="peopleCounter__counterBtn">
            <Button shape="circle" onClick={() => decreaseCounter(index)}>
              <MinusOutlined />
            </Button>
            <span>
              {peopleCounter &&
                peopleCounter[passengersType[index] as PassengersType]}
            </span>
            <Button shape="circle" onClick={() => increaseCounter(index)}>
              <PlusOutlined />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleCounter;
