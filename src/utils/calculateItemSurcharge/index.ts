const calculateItemSurcharge = (numItems: number): number => {
  const bultFee = 1.2;
  const itemSurcharge = 0.5;
  if (numItems <= 4) {
    return 0;
  }

  if (numItems <= 12) {
    return (numItems - 4) * itemSurcharge;
  }

  return (numItems - 4) * itemSurcharge + bultFee;
};

export default calculateItemSurcharge;
