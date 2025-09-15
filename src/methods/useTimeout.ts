export const useTimeout = (ms = 250) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
