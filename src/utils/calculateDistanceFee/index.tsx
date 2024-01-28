const calculateDistanceFee = (distance: number): number => {
  if (distance <= 1000) return 2;
  const baseFee = 2;
  const additionalDistance = distance - 1000;

  let additionalFee = 0;

  if (additionalDistance > 0) {
    additionalFee = ((additionalDistance + 499) / 500) | 0;
  }
  return baseFee + additionalFee;
};

export default calculateDistanceFee;
