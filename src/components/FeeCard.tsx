import { useEffect } from "react";

type Props = {
  deliveryFee: number;
};

export default function FeeCard({ deliveryFee }: Props) {
  useEffect(() => {
    const feeContainer = document.getElementById("feeContainer");

    if (feeContainer) {
      feeContainer.classList.add("fee-animation");

      setTimeout(() => {
        feeContainer.classList.remove("fee-animation");
      }, 1000);
    }
  }, [deliveryFee]);

  function formatCurrency(value: number): string {
    if (value === -1) {
      return "--";
    }

    const isDecimal = value % 1 !== 0;
    const formattedValue = isDecimal ? value.toFixed(2) : value.toString();
    return `${formattedValue}€`;
  }

  return (
    <div>
      <div className="flex justify-between mt-24">
        <h1 className="font-light text-2xl ">Total fee:</h1>
        <h1
          data-test-id="fee"
          id="feeContainer"
          className="text-5xl"
        >
          {formatCurrency(deliveryFee)}
        </h1>
      </div>
    </div>
  );
}
