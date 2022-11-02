import funds from "./data/funds.json" assert { type: "json" };
import portFolios from "./data/portfolio.json" assert { type: "json" };
import fundPrices from "./fund_prices.json" assert { type: "json" };

// local array to hold all the necessary options
const portfolio = [];

//creating hashmap for easy lookup
const hash = {};
const priceHash = {};

//creating an array to store all the necessary options
funds.forEach((fund) => {
  portfolio.push({
    name: fund.name,
    symbol: fund.symbol,
    assetClass: fund.assetClass,
  });
});

portFolios.forEach((portfolio) => {
  hash[portfolio.symbol]
    ? (hash[portfolio.symbol] = "")
    : (hash[portfolio.symbol] = portfolio.shares);
});

portfolio.forEach((folio) => {
  if (folio.symbol in hash) {
    folio["shares"] = hash[folio.symbol];
  }
});

fundPrices.forEach((fundPrice) => {
  priceHash[fundPrice.symbol]
    ? (priceHash[fundPrice.symbol] = "")
    : (priceHash[fundPrice.symbol] = fundPrice.price);
});

portfolio.forEach((folio) => {
  if (folio.symbol in priceHash) {
    folio["price"] = priceHash[folio.symbol];
  }
});
// Global variable to print the total
let total = 0;
// This look  up table is for step 3
const assetClass = {};

// printing individual price and shares for each item
portfolio.forEach((folio) => {
  if (!folio.shares) return;

  // updated the variable to add all the assets
  let individualTotal = folio.shares * folio.price;
  total += individualTotal;
  assetClass[folio.assetClass]
    ? (assetClass[folio.assetClass] += +individualTotal.toFixed(2))
    : (assetClass[folio.assetClass] = +individualTotal.toFixed(2));
  console.log(
    `${folio.name} : ${folio.shares} shares at $${
      folio.price
    } ea. -- $${individualTotal.toFixed(2)}
    `
  );
});
console.log(`Total: $${total}`);

export { assetClass, total };
