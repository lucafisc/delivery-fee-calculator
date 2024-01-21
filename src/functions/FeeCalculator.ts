export const getFee = (
  cartValue: number,
  deliveryDistance: number,
  numberOfItems: number,
  orderTime: Date
) => {
  let fee: number = 0;

  // Check if delivery is free
  if (cartValue >= 200) return fee;

  // Add fee for orders under 10.00
  if (cartValue < 10) {
    const difference = (10.0 - cartValue).toFixed(2);
    fee += parseFloat(difference);
  }

  // Add base delivery fee
  fee += 2.0;
  let remainingDistance = deliveryDistance - 1000;

  // Add additional delivery fee for every 500m[]
  while (remainingDistance > 0) {
    fee += 1.0;
    remainingDistance -= 500;
  }

  // Add bulk fee for more than 12 items
  if (numberOfItems > 12) {
    fee += 1.2;
  }

  // Add fee for every item after the first 4
  let remainingItems = numberOfItems - 4;
  while (remainingItems > 0) {
    fee += 0.5;
    remainingItems -= 1;
  }

  // Check if date is Friday between 3 and 7 PM
  const isFriday = orderTime.getDay() === 5; // Friday === 5
  const isBetween3And7PM =
    orderTime.getHours() >= 15 && orderTime.getHours() < 19;

  // Add rush hour fee
  if (isFriday && isBetween3And7PM) {
    fee *= 1.2;
  }

  // Set maximum fee to 15.00
  if (fee > 15) fee = 15.0;

  return fee;
};
