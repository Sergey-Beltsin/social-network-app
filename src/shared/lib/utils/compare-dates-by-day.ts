export const compareDatesByDay = (
  firstDate: Date | string,
  secondDate: Date | string,
): boolean => {
  const currentFirstDate: Date = new (window.Date as any)(firstDate);
  const currentSecondDate: Date = new (window.Date as any)(secondDate);

  return (
    currentFirstDate.getDate() !== currentSecondDate.getDate() ||
    currentFirstDate.getMonth() !== currentSecondDate.getMonth() ||
    currentFirstDate.getFullYear() !== currentSecondDate.getFullYear()
  );
};
