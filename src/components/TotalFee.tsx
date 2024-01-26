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
      <div className="flex flex-col justify-between gap-4 mt-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl" id="totalFeeLabel">Total fee:</h1>
        <div className={`relative flex items-center p-4 ${deliveryFee === -1 ? 'bg-zinc-800 justify-end' : 'bg-emerald-800 justify-between'} rounded-xl transition-all duration-500`}>
          {copied && (
            <div className="absolute left-0 px-2 py-1 text-white bg-green-500 rounded fee-animation -top-10">
              Copied!
            </div>
          )}
          {deliveryFee !== -1 && <button
            aria-label='Copy to clipboard'
            onClick={handleCopyToClipboard}
            className="pr-2 transition-all cursor-pointer aspect-square active:scale-95 opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <FiCopy className="text-xl" />
          </button>}
          <h1
            data-test-id="fee"
            id="feeContainer"
            className="text-5xl font-bold"
            aria-live="polite"
          >
            {formatCurrency(deliveryFee)}
          </h1>
        </div>
      </div>
  )
}
