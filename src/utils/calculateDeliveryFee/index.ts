import isFridayRushHour from "../isFridayRushHour";
import calculateItemSurcharge from "../calculateItemSurcharge";

interface FormState {
  cartValue: number;
  deliveryDistance: number;
  numItems: number;
  orderTime: string;
}
const deliveryFeeCalculator = (formState: FormState): number => {
  const baseFee = 2;
  const feePerKm = 1;
  const rushHourMultiplier = isFridayRushHour(formState.orderTime) ? 1.2 : 1;

  let calculatedFee = baseFee * rushHourMultiplier;

  // Small order surcharge
  if (formState.cartValue < 10) {
    calculatedFee += 10 - formState.cartValue;
  }

  // Delivery fee based on distance
  const distanceInKm = formState.deliveryDistance / 1000;
  const additionalDistanceFee =
    distanceInKm - 1 > 0 ? ((distanceInKm - 1) / 0.5) * 1 : 0;
  calculatedFee += additionalDistanceFee * feePerKm;

  // Surcharge for number of items
  const itemSurcharge = calculateItemSurcharge(formState.numItems);
  calculatedFee += itemSurcharge;

  // Bulk fee for more than 12 items
  if (formState.numItems > 12) {
    calculatedFee += 1.2;
  }

  // Maximum delivery fee is 15€
  if (calculatedFee > 15) {
    calculatedFee = 15;
  }

  return calculatedFee;
};

export default deliveryFeeCalculator;
