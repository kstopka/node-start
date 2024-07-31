const XLSX = require("xlsx");
const path = require("path");

const saveData = (codeValue, sendValue = "true", fileName = "data") => {
  const filePath = path.join(__dirname, `${fileName}.xlsx`);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === codeValue) {
      data[i][1] = sendValue;
      break;
    }
  }

  const newWorksheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[sheetName] = newWorksheet;

  XLSX.writeFile(workbook, filePath);
};

module.exports = { saveData };
