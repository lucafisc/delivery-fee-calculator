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
import TotalFee from "./components/TotalFee";
import PrimaryButton from "./components/PrimaryButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppTitle from "./components/AppTitle";

function App() {
  const [cartValue, setCartValue] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(-1);
  const [orderTime, setOrderTime] = useState<Date | null>(null);

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

    const fee = getFee(cartValueFloat, deliveryDistanceInt, numberOfItemsInt, orderTime);
    setDeliveryFee(fee);
  };

  useEffect(() => {
    setDeliveryFee(-1);
  }, [cartValue, deliveryDistance, numberOfItems, orderTime]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl w-full max-w-4xl mx-auto shadow-md p-8">
     <AppTitle />
      <form
        data-test-id="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-8 w-full sm:w-3/4"
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
        className="flex flex-col pr-12">
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
              className="w-full rounded-xl text-black font-bold p-2 px-6 mt-2 text-right bg-slate-800 text-white text-3xl h-20"
            />
        </fieldset>
        <PrimaryButton type="submit" label="Calculate" tabIndex={5} />
      </form>
      <TotalFee deliveryFee={deliveryFee} />
    </div>
  );
}

export default App;
