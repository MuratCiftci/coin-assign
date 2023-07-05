import { Button } from "@nextui-org/react";
import React from "react";
import { Duration } from "./MarketChart";

type Props = {
  selectedDuration: number;
  handleSelectDuration: (duration: Duration) => void
};

const ButtonGroup = ({ selectedDuration, handleSelectDuration }: Props) => {
    console.log(selectedDuration , "selectedDuration")
  return (
    <Button.Group color="primary" ghost>
      <Button
        className={selectedDuration === 1 ? "active" : ""}
        onClick={() => handleSelectDuration(1)}
      >
        24 saat
      </Button>
      <Button
        className={selectedDuration === 7 ? "active" : ""}
        onClick={() => handleSelectDuration(7)}
      >
        7 gün
      </Button>
      <Button
        className={selectedDuration === 30 ? "active" : ""}
        onClick={() => handleSelectDuration(30)}
      >
        30 gün
      </Button>
      <Button
        className={selectedDuration === 365 ? "active" : ""}
        onClick={() => handleSelectDuration(365)}
      >
        1 yıl
      </Button>
    </Button.Group>
  );
};

export default ButtonGroup;
