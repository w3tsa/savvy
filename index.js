"use strict";
// import * as dotenv from "dotenv";
import axios from "axios";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

import funds from "./data/funds.json" assert { type: "json" };

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=`;
// const url = "http://api.marketstack.com/v1/eod";
const content = [];

funds.map((fund) => {
  const price = getData(fund);
  content.push({
    symbol: fund.symbol,
    price: price,
  });
});

fs.writeFile("./fund_prices.json", JSON.stringify(content), (err) => {
  if (err) {
    console.error(err);
  }
  console.log("file written successfully");
});

async function getData(symbol) {
  try {
    const response = await axios.get(
      `${url}${symbol}&apikey=${process.env.API_KEY}`
      // `${url}?access_key=${process.env.NEW_API_KEY}&symbols=${symbol}`
    );
    const today =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      (new Date().getDate() - 1);
    // console.log("checking", response.data[0].close);
    return JSON.stringify(
      response.data["Time Series (Daily)"][today]["4. close"]
    );
  } catch (error) {
    console.error(error);
  }
}

/* 
http://api.marketstack.com/v1/eod
    ? access_key = YOUR_ACCESS_KEY
    & symbols = AAPL
*/
