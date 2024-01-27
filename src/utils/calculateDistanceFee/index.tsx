const calculateDistanceFee = (distance: number): number => {
  const baseFee = 2;
  const additionalDistance = distance - 1000;

  let additionalFee = 0;

  if (additionalDistance > 0) {
    additionalFee = ((additionalDistance + 499) / 500) | 0;
  }

  // Minimum fee is always 1€
  return baseFee + (additionalFee >= 1 ? additionalFee : 1);
};

export default calculateDistanceFee;
