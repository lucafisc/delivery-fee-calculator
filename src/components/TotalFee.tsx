import React, { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'

interface Props {
  deliveryFee: number
}

export default function TotalFee ({ deliveryFee }: Props): JSX.Element {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const feeContainer = document.getElementById('feeContainer')

    if (feeContainer != null) {
      feeContainer.classList.add('fee-animation')

      setTimeout(() => {
        feeContainer.classList.remove('fee-animation')
      }, 500)
    }
  }, [deliveryFee])

  function formatCurrency (value: number): string {
    if (value === -1) {
      return '--'
    }

    const isDecimal = value % 1 !== 0
    const formattedValue = isDecimal ? value.toFixed(2) : value.toString()
    return `${formattedValue}€`
  }

  const handleCopyToClipboard = (): void => {
    const feeContainer = document.getElementById('feeContainer')

    if (feeContainer != null) {
      const feeText = formatCurrency(deliveryFee)
      void navigator.clipboard.writeText(feeText)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
      <div className="flex justify-between mt-4 flex-col gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl ">Total fee:</h1>
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl relative">
          {copied && (
            <div className="absolute fee-animation -top-10 left-0 bg-green-500 text-white px-2 py-1 rounded">
              Copied!
            </div>
          )}
          {deliveryFee !== -1 && <button
            aria-label='Copy to clipboard'
            onClick={handleCopyToClipboard}
            className="cursor-pointer pr-2 aspect-square active:scale-95 transition-all opacity-60
            hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <FiCopy className="text-xl" />
          </button>}
          <h1
            data-test-id="fee"
            id="feeContainer"
            className="text-5xl font-bold"
          >
            {formatCurrency(deliveryFee)}
          </h1>
        </div>
      </div>
  )
}
