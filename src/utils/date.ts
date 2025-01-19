export const isoStringToDate = (isoString: string) => {
  // Convert to a Date object
  const dateObj = new Date(isoString);
  // Extract the date in `YYYY-MM-DD` format
  const formattedDate = dateObj.toISOString().split("T")[0];
  return formattedDate;
};
