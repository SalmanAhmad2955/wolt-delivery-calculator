const calculateItemSurcharge = (numItems: number): number => {
  const itemSurchargeRate = 0.5;
  const bulkFeeThreshold = 5;
  const bulkFeeRate = 1.2;

  let itemSurcharge = 0;

  // Check if the number of items exceeds the bulk fee threshold
  if (numItems >= bulkFeeThreshold) {
    // Calculate surcharge for each item above the threshold
    const surchargePerItem = (numItems - bulkFeeThreshold) * itemSurchargeRate;
    itemSurcharge =
      surchargePerItem < bulkFeeRate ? surchargePerItem : bulkFeeRate;
  }

  return itemSurcharge;
};

export default calculateItemSurcharge;
