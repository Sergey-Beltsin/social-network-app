export const getFormattedTime = (time: number): string => {
  if (time >= 10) {
    return time.toString();
  }
  return `0${time}`;
};
