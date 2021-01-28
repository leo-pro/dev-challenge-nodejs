const CSVToJSON = require('csvtojson');
const fs = require('fs');

function readCSV(fileInput, fileOutput){
  CSVToJSON().fromFile(fileInput)
  .then(data => {
      json = JSON.stringify(data); 
      fs.writeFileSync(fileOutput, json); 
      console.log('CSV Converted with success');
  }).catch(err => {
      console.log(err);
  });
}

readCSV('input.csv','output.json');