import React, { useEffect, useState } from 'react'
import './App.css'
import AppTitle from './components/AppTitle'
import NumberInput from './components/NumberInput'
import DateInput from './components/DateInput'
import PrimaryButton from './components/PrimaryButton'
import TotalFee from './components/TotalFee'
import {
  hasSpaces,
  isNotNumber,
  isNotDecimalNumber,
  hasMoreThanTwoDecimals
} from './functions/InputValidation'
import { getFee } from './functions/FeeCalculator'

function App (): JSX.Element {
  const [cartValue, setCartValue] = useState('')
  const [deliveryDistance, setDeliveryDistance] = useState('')
  const [numberOfItems, setNumberOfItems] = useState('')
  const [orderTime, setOrderTime] = useState<Date | null>(null)
  const [deliveryFee, setDeliveryFee] = useState(-1)

  const handleIntegerInput = (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    if (isNotNumber(newValue)) return
    if (hasSpaces(newValue)) return
    if (newValue[0] === '0') return

    setValue(newValue)
  }

  const handleFloatInput = (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    if (isNotDecimalNumber(newValue)) return
    if (hasMoreThanTwoDecimals(newValue)) return
    if (hasSpaces(newValue)) return
    if (newValue[0] === '0' && newValue.length > 1 && newValue[1] !== '.') return

    setValue(newValue)
  }

  const handleFloatBlur = (): void => {
    let newValue = cartValue

    if (newValue[0] === '.') newValue = '0' + newValue
    if (newValue[newValue.length - 2] === '.') newValue = newValue + '0'

    setCartValue(newValue)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const cartValueFloat = parseFloat(cartValue)
    const deliveryDistanceInt = parseInt(deliveryDistance)
    const numberOfItemsInt = parseInt(numberOfItems)

    if (
      isNaN(cartValueFloat) ||
      isNaN(deliveryDistanceInt) ||
      isNaN(numberOfItemsInt) ||
      (orderTime == null) ||
      isNaN(new Date(orderTime).getTime())
    ) { return }

    const fee = getFee(cartValueFloat, deliveryDistanceInt, numberOfItemsInt, orderTime)
    setDeliveryFee(fee)
  }

  useEffect(() => {
    setDeliveryFee(-1)
  }, [cartValue, deliveryDistance, numberOfItems, orderTime])

  return (
    <div className="bg-slate-900 text-white rounded-3xl w-full max-w-4xl mx-auto shadow-md py-6 px-8">
      <AppTitle />
      <form
        data-test-id="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-4 w-full sm:w-3/4"
      >
        <NumberInput
          testId="cartValue"
          label={'Cart value'}
          hint="Must be a value in euros (€)."
          decoration={'€'}
          value={cartValue}
          setValue={setCartValue}
          changeHandle={handleFloatInput}
          blurHandle={handleFloatBlur}
        />
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
          hint="Must be a whole number."
          value={numberOfItems}
          setValue={setNumberOfItems}
          changeHandle={handleIntegerInput}
        />

        <DateInput
          testId="orderTime"
          label="Order Time"
          hint="Must be a date in the DD.MM.YYYY HH:MM format."
          value={orderTime}
          setValue={setOrderTime}
        />

        <PrimaryButton type="submit" label="Calculate" />
      </form>
      <TotalFee deliveryFee={deliveryFee} />
    </div>
  )
}

export default App
