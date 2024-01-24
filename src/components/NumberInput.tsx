import React from 'react'

interface Props {
  testId: string
  label: string
  hint: string
  decoration?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  changeHandle: (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => void
}

export default function NumberInput ({
  testId,
  label,
  hint,
  decoration,
  value,
  setValue,
  changeHandle
}: Props): JSX.Element {
  const hintId = `${label}-hint`

  return (
    <div className="flex flex-col">
      <label htmlFor={label}>
        {label}
        <span aria-hidden={true}> *</span>
      </label>
      <div className="flex items-center">
        <input
          id={label}
          data-test-id={testId}
          aria-describedby={hintId}
          type="text"
          value={value}
          onChange={(event) => { changeHandle(event.target.value, setValue) }}
          className="w-full rounded-xl text-black font-bold p-2 px-6 mt-2 text-right bg-slate-800 text-white text-3xl h-20 hover:cursor-select"
        ></input>
        <span className="pl-4 pt-2 text-3xl font-bold w-12" aria-hidden="true">
          {decoration}
        </span>
      </div>
      <span className='italic text-gray-400' id={hintId}>{hint}</span>
    </div>
  )
}
