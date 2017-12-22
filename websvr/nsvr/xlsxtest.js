var xlsx = require('node-xlsx');  
var fs = require('fs'); 
var filename='./test.xlsx';  
 console.error(filename);  
 // read from a file  
var obj = xlsx.parse(filename);  
console.log(JSON.stringify(obj));  