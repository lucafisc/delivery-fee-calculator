import { useEffect, useState } from "react";
import NumberInput from "./components/NumberInput";
import "./App.css";
import {
  hasSpaces,
  isNotNumber,
  isNotDecimalNumber,
  hasMoreThanTwoDecimals,
} from "./functions/InputValidation";
import { getFee } from "./functions/FeeCalculator";
import FeeCard from "./components/FeeCard";
import PrimaryButton from "./components/PrimaryButton";

function App() {
  const [cartValue, setCartValue] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(-1);

  const handleIntegerInput = (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (isNotNumber(newValue)) return;
    if (hasSpaces(newValue)) return;
    if (newValue[0] === "0") return;

    setValue(newValue);
  };

  const handleFloatInput = (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (isNotDecimalNumber(newValue)) return;
    if (hasMoreThanTwoDecimals(newValue)) return;
    if (hasSpaces(newValue)) return;
    if (newValue[0] === "0" && newValue[1] && newValue[1] !== ".") return;

    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cartValueFloat = parseFloat(cartValue);
    const deliveryDistanceInt = parseInt(deliveryDistance);
    const numberOfItemsInt = parseInt(numberOfItems);

    if (
      isNaN(cartValueFloat) ||
      isNaN(deliveryDistanceInt) ||
      isNaN(numberOfItemsInt)
    )
      return;

    const fee = getFee(cartValueFloat, deliveryDistanceInt, numberOfItemsInt);
    setDeliveryFee(fee);
  };

  useEffect(() => {
    setDeliveryFee(-1);
  }, [cartValue, deliveryDistance, numberOfItems]);




  return (
    <div className="bg-black text-white rounded-3xl w-full max-w-3xl mx-auto shadow-md p-8">
      <div className="flex justify-end cursor-default">
        <h1 data-test-id="appTitle" className="font-light text-2xl flex flex-col">
          <span>Delivery</span>
          <span>Fee</span>
          <span>Calculator</span>
        </h1>
      </div>
      <form
        data-test-id="form"
        onSubmit={handleSubmit}
        className="flex flex-col mt-8 w-full sm:w-3/4"
      >
        <NumberInput
          testId="cartValue"
          label={"Cart value"}
          decoration={"€"}
          tabIndex={1}
          value={cartValue}
          setValue={setCartValue}
          changeHandle={handleFloatInput}
        />
        <NumberInput
          testId="deliveryDistance"
          label={"Delivery distance"}
          decoration={"m"}
          tabIndex={2}
          value={deliveryDistance}
          setValue={setDeliveryDistance}
          changeHandle={handleIntegerInput}
        />
        <NumberInput
          testId="numberOfItems"
          label={"Number of items"}
          tabIndex={3}
          value={numberOfItems}
          setValue={setNumberOfItems}
          changeHandle={handleIntegerInput}
        />
        <PrimaryButton type="submit" label="Calculate" tabIndex={4}/>
      </form>
    <FeeCard deliveryFee={deliveryFee} />
    </div>
  );
}

export default App;
