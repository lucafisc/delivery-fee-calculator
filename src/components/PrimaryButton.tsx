import React from 'react'

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  label: string
}

export default function PrimaryButton ({ type, label }: Props): JSX.Element {
  return (
    <button
      className="bg-white text-black rounded-full text-3xl w-48 cursor-pointer p-2 transition-all
      hover:bg-orange-300 active:scale-95 active:bg-orange-500 active:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      type={type}
      aria-label={label}
    >
      {label}
    </button>
  )
}
