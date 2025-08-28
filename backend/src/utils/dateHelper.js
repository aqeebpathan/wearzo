export const getStartOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
};

export const getStartOfWeek = () => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0
  const date = new Date(now.setDate(now.getDate() - day));
  date.setHours(0, 0, 0, 0);
  return date;
};

export function getRandomArrivalDate() {
  const today = new Date();
  const maxDays = 7;

  const randomOffset = Math.floor(Math.random() * (maxDays + 1)); // 0 to 7
  const arrivalDate = new Date(today);
  arrivalDate.setDate(today.getDate() + randomOffset);

  return arrivalDate;
}
