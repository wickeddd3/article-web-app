export const isoStringToDate = (isoString: string) => {
  if (!isoString) return "";
  // Convert to a Date object
  const dateObj = new Date(isoString);
  // Extract the date in `YYYY-MM-DD` format
  const formattedDate = dateObj.toISOString().split("T")[0];
  return formattedDate;
};

export const getCurrentDateString = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
