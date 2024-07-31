const path = require("path");
const XLSX = require("xlsx");

const getData = (fileName = "data") => {
  const filePath = path.join(__dirname, `${fileName}.xlsx`);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
  return data;
};

module.exports = { getData };
