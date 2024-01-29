import isFridayRushHour from "../isFridayRushHour";
import calculateItemSurcharge from "../calculateItemSurcharge";
import calculateDistanceFee from "../calculateDistanceFee";

interface FormState {
  cartValue: number;
  deliveryDistance: number;
  numItems: number;
  orderTime: Date;
}
const deliveryFeeCalculator = (formState: FormState): number => {
  let calculatedFee = 0;

  // check if cart value is greater or equal to  200€
  if (formState.cartValue >= 200) {
    return calculatedFee;
  }

  // calcluate delivery fee based on cart value
  if (formState.cartValue < 10) {
    calculatedFee += 10 - formState.cartValue;
  }

  // calculate delivery fee based on distance
  const distanceFee = calculateDistanceFee(formState.deliveryDistance);
  calculatedFee += distanceFee;

  // calculate surcharge for number of items
  const itemSurcharge = calculateItemSurcharge(formState.numItems);
  calculatedFee += itemSurcharge;

  //  check if it's rush hour
  const rushHourMultiplier = isFridayRushHour(formState.orderTime) ? 1.2 : 1;
  calculatedFee *= rushHourMultiplier;
  calculatedFee = +calculatedFee.toFixed(2);

  // delivery fee can never be more than 15€
  if (calculatedFee > 15) {
    calculatedFee = 15;
  }

  return calculatedFee;
};

export default deliveryFeeCalculator;
