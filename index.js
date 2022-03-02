import * as lena from "./commons.js";

// console.log(lena.getMockData("node-01"));
lena.getMockDataByType("ApplicationServer").forEach((item) => {
  for (var name in item) {
    console.log(`${name} : ${item[name]}`);
  }
});
console.log(lena.getMockData("node-01").name);
