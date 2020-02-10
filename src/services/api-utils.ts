export const isValidDate = (date: Date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return !isNaN(date.getTime());
  }
  return false;
};

/**
 * Returns date as formated string: 2020-02-15
 */
export const getDateAsString = (date: Date) => {
  const monthNum = date.getMonth() + 1;
  const dayNum = date.getDate();
  const month = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
  const day = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
  return `${date.getFullYear()}-${month}-${day}`;
};
