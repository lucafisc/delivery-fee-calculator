import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  testId: string
  label: string
  hint: string
  value: Date | null
  setValue: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function DateInput (
  {
    testId,
    label,
    hint,
    value,
    setValue
  }: Props
): JSX.Element {
  const hintId = `${label}-hint`

  return (
        <div
            className="flex flex-col sm:pr-12">
            <label htmlFor={label}>
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
                customInput={<input data-test-id={testId} aria-describedby={hintId} type="text" />}
                className="w-full rounded-xl text-black font-bold p-2 px-6 mt-2 text-right bg-slate-800 text-white text-3xl h-16"
            />
            <span className='italic text-gray-400' id={hintId}>{hint}</span>
        </div>
  )
}
