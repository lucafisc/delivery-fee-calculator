import React from 'react'

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  label: string
}

export default function PrimaryButton ({ type, label }: Props): JSX.Element {
  return (
    <button
      className="w-48 p-2 text-3xl text-black transition-all bg-white rounded-full cursor-pointer hover:bg-orange-600 hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      type={type}
      aria-label={label}
    >
      {label}
    </button>
  )
}
