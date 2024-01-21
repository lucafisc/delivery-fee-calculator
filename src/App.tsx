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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [cartValue, setCartValue] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(-1);
  const [orderTime, setOrderTime] = useState(null);

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
    //check if oderTime is a valid date

    if (
      isNaN(cartValueFloat) ||
      isNaN(deliveryDistanceInt) ||
      isNaN(numberOfItemsInt) ||
      !orderTime ||
      isNaN(new Date(orderTime).getTime()) 
    )
      return;

    const fee = getFee(cartValueFloat, deliveryDistanceInt, numberOfItemsInt);
    setDeliveryFee(fee);
  };

  useEffect(() => {
    setDeliveryFee(-1);
  }, [cartValue, deliveryDistance, numberOfItems, orderTime]);

  return (
    <div className="bg-black text-white rounded-3xl w-full max-w-3xl mx-auto shadow-md p-8">
      <div className="flex justify-end cursor-default">
        <h1
          data-test-id="appTitle"
          className="text-2xl flex flex-col"
        >
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

        <fieldset
        className="mt-8 flex flex-col">
            <label htmlFor="orderDateTime">Order Time</label>
            <DatePicker
              id="orderDateTime"
              selected={orderTime}
              onChange={(date: Date) => setOrderTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="dd.MM.yyyy HH:mm"
              closeOnScroll={true}
              tabIndex={4}
              
              customInput={<input data-test-id="orderTime" type="text" />}
              // data-test-id="orderTime"
              className="w-10/12 rounded-full text-black font-bold p-2 px-6 mt-2 hover:bg-orange-200 transition-all text-right"
            />
        </fieldset>

        <PrimaryButton type="submit" label="Calculate" tabIndex={5} />
      </form>
      <FeeCard deliveryFee={deliveryFee} />
    </div>
  );
}

export default App;
