export const formatDate = (date: Date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  return `${month}/${day}/${year}`;
};
