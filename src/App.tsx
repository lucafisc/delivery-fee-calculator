import { useState } from 'react'
import NumberInput from './components/NumberInput';
import './App.css'
import { hasSpaces, isNotNumber, isNotDecimalNumber } from './functions/InputValidation';

function App() {
  const [cartValue, setCartValue] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');

  const handleIntegerInput = (newValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (isNotNumber(newValue)) return;
    if (hasSpaces(newValue)) return;
    if (newValue[0] === '0') return;

    setValue(newValue);
  }

  const handleFloatInput = (newValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (isNotDecimalNumber(newValue)) return;
    setValue(newValue);
  }


  // const handleStringInput = (newValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
  //   if (newValue.split('').some((char) => isNaN(Number(char)) && char !== '.')) return;
  //   if (newValue.split('.').length > 2) return;

   

  // }

  return (
    <>
      <NumberInput label={"cart value"} value={cartValue} setValue={setCartValue} changeHandle={handleFloatInput} />
      <NumberInput label={"delivery distance"} value={deliveryDistance} setValue={setDeliveryDistance} changeHandle={handleIntegerInput} />
      <NumberInput label={"number of items"} value={numberOfItems} setValue={setNumberOfItems} changeHandle={handleIntegerInput} />
    </>
  )
}

export default App
