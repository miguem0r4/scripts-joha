const http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

let networkDrive = require("windows-network-drive");


networkDrive.unmount("X")
    .then(function () {
        console.log("unmount")
    });


/**
 * https://github.com/larrybahr/windows-network-drive
 * Mount the local C: as Z:
 */
networkDrive.mount("\\\\AMENAZA\\c$", "X", undefined, undefined)
    .then(function (driveLetter) {
        const fs = require("fs");
        const path = require("path");
        let filePath;


        filePath = path.join(driveLetter + ":\\", "\\Users\\miguelangel\\Desktop\\unidad-red\\archivo.xlsx");
        var XLSX = require('xlsx')
        var workbook = XLSX.readFile(filePath);
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData);


        /**
         * This will create a file at "Z:\message.txt" with the contents of "text"
         * NOTE: Make sure to escape '\' (e.g. "\\" will translate to "\")
         */
        /*filePath = path.join(driveLetter + ":\\", "message.txt");
        fs.writeFile(filePath, "text", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });*/
    });


var file = 'C:\\Users\\miguelangel\\Desktop\\unidad-red\\archivo.xlsx';

var XLSX = require('xlsx')
var workbook = XLSX.readFile(file);
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
//console.log(xlData);


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});