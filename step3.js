import { assetClass, total } from "./step2.js";

// console.log(assetClass, total);
// for (let prop in assetClass) {
//   console.log(`${prop} : ${+((assetClass[prop] / total) * 100).toFixed(2)}%`);
// }
console.log("Asset Class Breakdown");
Object.keys(assetClass).forEach((key) => {
  console.log(`${key} : ${+((assetClass[key] / total) * 100).toFixed(2)}%`);
});
