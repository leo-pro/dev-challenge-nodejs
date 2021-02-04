const csv = require('csv-parser');
const fs = require('fs');
const _ = require('lodash');

const fileInput = 'input.csv';
const outputPath = 'output.json';
const results = [];

fs.createReadStream(fileInput)
  .pipe(csv(
    ['fullname','eid','email Student','phone Student','email Pedagogical Responsible','phone Pedagogical Responsible','email Financial Responsible','phone Financial Responsible','group1','group2','invisible','see_all']
  ))
  .on('data', (data) => {
    results.push({
        fullname: data['fullname'],
        eid: data['eid'],
        groups: [
          ...data['group1'].split(/,|\//g).filter(function (el) {  return el != null && el != ''; }),
          ...data['group2'].split(/,|\//g).filter(function (el) {  return el != null && el !== ''}),
        ],
        addresses:[
          {
            type: "email",
            tags: [
              "Student"
            ],
            address: [
              ...data['email Student'].split(/,|\//g)
            ],
          }
        ],
        invisible: !data['invisible'] ? false : data['invisible'] == 'no'? false: true,
        see_all: !data['see_all'] ? false : data['see_all'] === 'yes'? true : false
      })
    }
  )
  .on('end', () => {
    fs.writeFileSync(outputPath, JSON.stringify(results.slice(1)));
    console.log(results.slice(1));
  });