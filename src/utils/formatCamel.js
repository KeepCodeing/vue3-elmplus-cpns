export const format = (str) =>
  `i${str.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

export function kabake2Camel(sName) {
  return sName.replace(/\-[a-z]/g, function (a, b) {
    return b == 0 ? a.replace("-", "") : a.replace("-", "").toUpperCase();
  });
}

export const camel2Kabake = (str) =>
  `${str.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
