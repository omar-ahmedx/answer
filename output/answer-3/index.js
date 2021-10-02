const csv = require("csvtojson");
csv()
  .fromFile("../../input/question-3/main.csv")
  .then((obj) => {
    process(obj);
  });

function process(data) {
  let sorted = data.sort(function (a, b) {
    return (
      Number(b["Red Cards"]) - Number(a["Red Cards"]) ||
      Number(b["Yellow Cards"]) - Number(a["Yellow Cards"])
    );
  });
  write(sorted);
}

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "./main.csv",
  header: [
    { id: "Team", title: "Team" },
    { id: "Yellow Cards", title: "Yellow Cards" },
    { id: "Red Cards", title: "Red Cards" },
  ],
});

function write(data) {
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
}
