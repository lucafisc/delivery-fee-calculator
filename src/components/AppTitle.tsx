import React from 'react'

export default function AppTitle (): JSX.Element {
  return (
    <div className="flex justify-end cursor-default">
      <h1 data-test-id="appTitle" className="flex flex-col text-2xl">
        <span>Delivery</span>
        <span>Fee</span>
        <span>Calculator</span>
      </h1>
    </div>
  )
}
