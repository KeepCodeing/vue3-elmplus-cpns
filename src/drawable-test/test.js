function debounce(fn, limit) {
  const timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arg), limit);
  };
}

function throttle(fn, limit) {
  let prev = new Date().getTime();

  return function (...arg) {
    const now = new Date.getTime();
    if (now - prev < limit) return;
    prev = now;
    fn.apply(this, arg);
  };
}

Function.prototype.myApply = function (thisArg, ...arg) {
  const fn = this;

  thisArg =
    thisArg !== undefined && thisArg !== null ? Object(thisArg) : window;

  thisArg.fn = fn;

  const result = thisArg.fn(...arg);

  delete thisArg;

  return result;
};

Function.prototype.myBind = function (thisArg) {
  const fn = this;

  function thisProxy(...arg) {
    thisArg =
      thisArg !== undefined && thisArg !== null ? Object(thisArg) : window;

    thisArg.fn = fn;

    const result = thisArg.fn(...arg);

    delete thisArg;

    return result;
  }

  return thisProxy;
};

const fn = function (x, y, z) {
  console.log(this.x, this.y, this.z, x, y, z);
};

fn.myApply({ x: 3, y: 4, z: 5 }, 1, 2, 3);

fn(1, 2, 3);

function deepCopy(obj, vist = new WeakMap()) {
  if (vist.has(obj)) return obj;
  if (typeof obj === "function") return obj;
  if (obj !== null && typeof obj !== "object") return obj;

  const newObj = Array.isArray(obj) ? [] : {};

  vist.set(obj, newObj);

  for (const key in obj) {
    newObj[key] = deepCopy(obj[key]);
  }

  return newObj;
}
