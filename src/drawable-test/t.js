// console.log(1);

// setTimeout(function () {
//   console.log(2);
// }, 0);

// Promise.resolve()
//   .then(function () {
//     console.log(3);
//   })
//   .then(function () {
//     console.log("4.我是新增的微任务");
//   });

// console.log(5);

// const str = "asfs123fasde;lkjjiwdf2;kj;;l;io55fsa";

// const res = [...str]
//   .filter(
//     (item) =>
//       "0".charCodeAt(0) <= item.charCodeAt(0) &&
//       item.charCodeAt(0) <= "9".charCodeAt(0)
//   )
//   .join("");

// console.log(res);

// let str = `https://xxx.com/detail?id=1&name=abc`;

// const res = {};
// console.log(
//   str
//     .split("?")[1]
//     .split("&")
//     .map((item) => {
//       const li = item.split("=");
//       const key = li[0],
//         val = li[1];
//       return { [key]: val };
//     })
//     .reduce((prev, now) => {
//       const key = Object.keys(now)[0];
//       prev[key] = now[key];
//       return prev;
//     }, {})
// );

// const arr = ["a", ["b"], [1, 2, 3], [4], [6, 7, [8]]];

// // console.log(arr.flat(Infinity));

// const result = [];
// function myFlat(arr) {
//   for (const item of arr) {
//     // console.log(item);
//     if (Array.isArray(item)) {
//       // console.log(item);
//       myFlat(item);
//     } else {
//       result.push(item);
//     }
//   }
// }

// myFlat(arr);

// console.log(result);

console.log("log1");

setTimeout(() => {
  console.log("timeout 1");
  setTimeout(() => {
    console.log("timeout 2");
  });
  new Promise(function (resolve, reject) {
    console.log("promise1");
    resolve();
  }).then(() => {
    console.log("promise2");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise3");
  reject();
}).catch(() => {
  console.log("promise4");
});

console.log("log2");
