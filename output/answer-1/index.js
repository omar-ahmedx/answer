let fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "./main.csv",
  header: [
    { id: "year", title: " " },
    { id: "population", title: "Population" },
    { id: "violent", title: "Violent" },
    { id: "property", title: "property" },
    { id: "murder", title: "Murder" },
    { id: "forcible_rape", title: "Forcible_Rape" },
    { id: "robbery", title: "Robbery" },
    { id: "aggravated_assault", title: "Aggravated_Assault" },
    { id: "burglary", title: "Burglary" },
    { id: "larceny_theft", title: "Larceny_Theft" },
    { id: "vehicle_theft", title: "Vehicle_Theft" },
  ],
});
let data = fs
  .readFileSync("../../input/question-1/main.csv")
  .toString()
  .split("\n")
  .map((e) => e.trim())
  .map((e) => e.split(",").map((e) => e.trim()));

let decade1 = [],
  decade2 = [],
  decade3 = [],
  decade4 = [],
  decade5 = [],
  decade6 = [];

for (let i = 1; i < data.length; i++) {
  if (data[i][0] >= 1960 && data[i][0] < 1970) {
    decade1.push(data[i]);
  } else if (data[i][0] >= 1970 && data[i][0] < 1980) {
    decade2.push(data[i]);
  } else if (data[i][0] >= 1980 && data[i][0] < 1990) {
    decade3.push(data[i]);
  } else if (data[i][0] >= 1990 && data[i][0] < 2000) {
    decade4.push(data[i]);
  } else if (data[i][0] >= 2000 && data[i][0] < 2010) {
    decade5.push(data[i]);
  } else if (data[i][0] >= 2010 && data[i][0] < 2020) {
    decade6.push(data[i]);
  }
}
let final = [];
function sum(decade) {
  let violent = 0,
    property = 0,
    murder = 0,
    forcible_rape = 0,
    robbery = 0,
    aggravated_assault = 0,
    burglary = 0,
    larceny_theft = 0,
    vehicle_theft = 0;
  for (let i = 0; i < decade.length; i++) {
    violent += +decade[i][3];
    property += +decade[i][4];
    murder += +decade[i][5];
    forcible_rape += +decade[i][6];
    robbery += +decade[i][7];
    aggravated_assault += +decade[i][8];
    burglary += +decade[i][9];
    larceny_theft += +decade[i][10];
    vehicle_theft += +decade[i][11];
  }

  let obj = {
    year: decade[0][0],
    population: decade[decade.length - 1][1],
    violent,
    property,
    murder,
    forcible_rape,
    robbery,
    aggravated_assault,
    burglary,
    larceny_theft,
    vehicle_theft,
  };
  final.push(obj);
}

function write() {
  sum(decade1);
  sum(decade2);
  sum(decade3);
  sum(decade4);
  sum(decade5);
  sum(decade6);

  csvWriter
    .writeRecords(final)
    .then(() => console.log("The CSV file was written successfully"));
}
write();
