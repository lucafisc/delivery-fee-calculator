import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  testId: string
  label: string
  hint: string
  value: Date | null
  setValue: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function DateInput(
  {
    testId,
    label,
    hint,
    value,
    setValue
  }: Props
): JSX.Element {
  const hintId = `${testId}-hint`

  return (
    <div
      className="flex flex-col sm:pr-12">
      <label htmlFor={label} className='font-bold'>
        {label}
        <span aria-hidden={true}> *</span>
      </label>
      <DatePicker
        id={label}
        selected={value}
        onChange={(date: Date) => { setValue(date) }}
        showTimeSelect
        required
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="dd.MM.yyyy HH:mm"
        closeOnScroll={true}
        customInput={
          <input
            data-test-id={testId} aria-describedby={hintId} type="text"
            onFocus={e => e.target.blur()} 
          />}
        className="w-full h-16 p-2 px-6 mt-2 text-3xl font-bold text-right text-black text-white border border-zinc-500 rounded-xl bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
      />
      <span className='italic text-gray-400' id={hintId}>{hint}</span>
    </div>
  )
}
