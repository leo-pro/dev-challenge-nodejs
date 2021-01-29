const CSVToJSON = require('csvtojson');
const fs = require('fs');

function convertCsvToJson(fileInput, fileOutput){
  CSVToJSON().fromFile(fileInput)
  .then(data => {
    data.forEach((item) => {
      item['group'] = item['group'].split(',') || item.group.split('/');
      item['email Pedagogical Responsible'] = item['email Pedagogical Responsible'].split('/');
    });
    
    const json = JSON.stringify(data); 
    fs.writeFileSync(fileOutput, json); 
    console.log('CSV Converted with success');

  }).catch(err => {
      console.log(err);
  });
} 

convertCsvToJson('input.csv','output.json');