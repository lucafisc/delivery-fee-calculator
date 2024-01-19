import { useState } from 'react'
import NumberInput from './components/NumberInput';
import './App.css'
import { hasSpaces, isNotNumber, isNotDecimalNumber, hasMoreThanTwoDecimals } from './functions/InputValidation';
import { getFee } from './functions/FeeCalculator';

function App() {
  const [cartValue, setCartValue] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleIntegerInput = (newValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (isNotNumber(newValue)) return;
    if (hasSpaces(newValue)) return;
    if (newValue[0] === '0') return;

    setValue(newValue);
  }

  const handleFloatInput = (newValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (isNotDecimalNumber(newValue)) return;
    if (hasMoreThanTwoDecimals(newValue)) return;
    if (hasSpaces(newValue)) return;
    if (newValue[0] === '0' && newValue[1] && newValue[1] !== '.') return;

    setValue(newValue);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cartValueFloat = parseFloat(cartValue);
    const deliveryDistanceInt = parseInt(deliveryDistance);
    const numberOfItemsInt = parseInt(numberOfItems);

    if (isNaN(cartValueFloat) || isNaN(deliveryDistanceInt) || isNaN(numberOfItemsInt)) return;

    const fee = getFee(cartValueFloat, deliveryDistanceInt, numberOfItemsInt);
    setDeliveryFee(fee);
  }

  return (
    <div className='bg-black text-white rounded-3xl w-full max-w-3xl mx-auto shadow-md p-8'>
      <div className='flex justify-end cursor-default'>
        <h1 className='font-light text-2xl flex flex-col'>
          <span>Delivery</span>
          <span>Fee</span>
          <span>Calculator</span>
        </h1>
      </div>
        <form onSubmit={handleSubmit} className='flex flex-col mt-8 w-full sm:w-3/4'>
         <NumberInput label={"Cart value"} decoration={'€'} value={cartValue} setValue={setCartValue} changeHandle={handleFloatInput} />
         <NumberInput label={"Delivery distance"} decoration={'m'} value={deliveryDistance} setValue={setDeliveryDistance} changeHandle={handleIntegerInput} />
         <NumberInput label={"Number of items"} value={numberOfItems} setValue={setNumberOfItems} changeHandle={handleIntegerInput} />

         <button className='bg-white text-black rounded-full text-3xl w-48 mt-24 cursor-pointer p-2 transition-all hover:bg-orange-300 active:scale-95 active:bg-orange-500 active:text-white' type="submit">Calculate</button>
        </form>
      <div>
        <div className='flex justify-between mt-24 text-5xl'>
    <h1 className='font-thin'>Total fee:</h1>
          <h1 >{deliveryFee}€</h1>
        </div>
      </div>
    </div>
  )
}

export default App
