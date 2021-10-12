export const getRandomNumber = (maxNumber) => Math.floor((Math.random() * (maxNumber)));

export const getNextRoundRobin = (total, current) => {
  if (current === (total - 1)) {
    return 0;
  }
  return current + 1;
};
