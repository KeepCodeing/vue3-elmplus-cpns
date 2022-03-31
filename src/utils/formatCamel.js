export const format = (str) =>
  `i${str.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
