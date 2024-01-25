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
  blurHandle?: () => void
}

export default function NumberInput ({
  testId,
  label,
  hint,
  decoration,
  value,
  setValue,
  changeHandle,
  blurHandle
}: Props): JSX.Element {
  const hintId = `${label}-hint`

  return (
    <div className="flex flex-col">
      <label className='font-bold' htmlFor={label}>
        {label}
        <span aria-hidden={true}> *</span>
      </label>
      <div className="flex items-center">
        <input
          id={label}
          data-test-id={testId}
          aria-describedby={hintId}
          required
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(event) => { changeHandle(event.target.value, setValue) }}
          onBlur={blurHandle}
          className="w-full h-16 p-2 px-6 mt-2 text-3xl font-bold text-right text-black text-white border border-white rounded-xl bg-slate-800 hover:cursor-select focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        ></input>
        <span
          className={`pl-4 pt-2 text-3xl font-bold w-12 ${decoration === undefined ? 'hidden' : ''} sm:block`}
          aria-hidden="true"
        >
          {decoration}
        </span>
      </div>
      <span className='italic text-gray-400' id={hintId}>{hint}</span>
    </div>
  )
}
