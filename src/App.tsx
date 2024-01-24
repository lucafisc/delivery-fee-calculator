import React, { useEffect, useState } from 'react'
import NumberInput from './components/NumberInput'
import './App.css'
import {
  // hasSpaces,
  // isNotNumber
  // isNotDecimalNumber,
  // hasMoreThanTwoDecimals
} from './functions/InputValidation'
import { getFee } from './functions/FeeCalculator'
import TotalFee from './components/TotalFee'
import PrimaryButton from './components/PrimaryButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AppTitle from './components/AppTitle'

function App(): JSX.Element {
  // const [cartValue, setCartValue] = useState('')
  const [deliveryDistance, setDeliveryDistance] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(-1)
  const [orderTime, setOrderTime] = useState<Date | null>(null)

  const handleIntegerInput = (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ): void => {
    const newNumber = newValue === '' ? 0 : parseInt(newValue)
    setValue(newNumber)
  }

  // const handleFloatInput = (
  //   newValue: string,
  //   setValue: React.Dispatch<React.SetStateAction<string>>
  // ): void => {
  //   if (isNotDecimalNumber(newValue)) return
  //   if (hasMoreThanTwoDecimals(newValue)) return
  //   if (hasSpaces(newValue)) return
  //   if (newValue[0] === '0' && (newValue[1] !== '') && newValue[1] !== '.') return

  //   setValue(newValue)
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    // const cartValueFloat = parseFloat(cartValue)
    const deliveryDistanceInt = deliveryDistance
    const numberOfItemsInt = numberOfItems

    if (
      // isNaN(cartValueFloat) ||
      isNaN(deliveryDistanceInt) ||
      isNaN(numberOfItemsInt) ||
      (orderTime == null) ||
      isNaN(new Date(orderTime).getTime())
    ) { return }

    const fee = getFee(10, deliveryDistanceInt, numberOfItemsInt, orderTime)
    setDeliveryFee(fee)
  }

  useEffect(() => {
    setDeliveryFee(-1)
  }, [deliveryDistance, numberOfItems, orderTime])

  return (
    <div className="bg-slate-900 text-white rounded-3xl w-full max-w-4xl mx-auto shadow-md p-8">
      <AppTitle />
      <form
        data-test-id="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-8 w-full sm:w-3/4"
      >
        {/* <NumberInput
          testId="cartValue"
          label={'Cart value'}
          hint="Must be a value in euros (€)."
          decoration={'€'}
          value={cartValue}
          setValue={setCartValue}
          changeHandle={handleFloatInput}
        /> */}
        <NumberInput
          testId="deliveryDistance"
          label={'Delivery distance'}
          hint="Must be a distance in meters (m) with no decimals."
          decoration={'m'}
          value={deliveryDistance}
          setValue={setDeliveryDistance}
          changeHandle={handleIntegerInput}
        />
        <NumberInput
          testId="numberOfItems"
          label={'Number of items'}
          hint="Must be a whole number and at least 1."
          value={numberOfItems}
          setValue={setNumberOfItems}
          changeHandle={handleIntegerInput}
        />

        <div
          className="flex flex-col pr-12">
          <label htmlFor="orderDateTime">
            Order Time
            <span aria-hidden={true}> *</span>
          </label>
          <DatePicker
            id="orderDateTime"
            selected={orderTime}
            onChange={(date: Date) => { setOrderTime(date) }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="dd.MM.yyyy HH:mm"
            closeOnScroll={true}
            customInput={<input data-test-id="orderTime" aria-describedby="DateHint" type="text" />}
            className="w-full rounded-xl text-black font-bold p-2 px-6 mt-2 text-right bg-slate-800 text-white text-3xl h-20"
          />
          <span className='italic text-gray-400' id="DateHint">Must be a date in the DD.MM.YYYY HH:MM format.</span>
        </div>
        <PrimaryButton type="submit" label="Calculate" />
      </form>
      <TotalFee deliveryFee={deliveryFee} />
    </div>
  )
}

export default App
