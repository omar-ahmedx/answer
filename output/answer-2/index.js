const csv = require("csvtojson");
csv()
  .fromFile("../../input/question-2/main.csv")
  .then((obj) => {
    process(obj);
  });

function process(data) {
  let occupation = {},
    temp;

  for (let i = 0; i < data.length; i++) {
    temp = data[i].occupation;
    if (temp in occupation) {
      if (+occupation[temp].min > +data[i].age) {
        occupation[temp].min = data[i].age;
      }
      if (+occupation[temp].max < +data[i].age) {
        occupation[temp].max = data[i].age;
      }
    } else {
      occupation[temp] = data[i];
      occupation[temp].min = data[i].age;
      occupation[temp].max = data[i].age;
    }
  }

  let dataArray = [];
  Object.values(occupation).forEach((val) => dataArray.push(val));
  console.log(occupation);
  write(dataArray);
}

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "./main.csv",
  header: [
    { id: "occupation", title: "occupation" },
    { id: "min", title: "min" },
    { id: "max", title: "max" },
  ],
});

function write(data) {
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
}
