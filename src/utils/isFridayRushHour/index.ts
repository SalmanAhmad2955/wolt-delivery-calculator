const isFridayRushHour = (orderTime: Date): boolean => {
  const orderDate = new Date(orderTime);

  // get day of the week (0 is Sunday, 1 is Monday, ..., 5 is Friday)
  const dayOfWeek = orderDate.getUTCDay();
  const isFriday = dayOfWeek === 5;

  // get hours in UTC
  const hours = orderDate.getHours();

  // check if it's rush hour (3 PM to 7 PM UTC) on a Friday
  const isRushHour = isFriday && hours >= 15 && hours < 19;

  return isRushHour;
};

export default isFridayRushHour;
