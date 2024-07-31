const { getData } = require("./getData");
const { sendHeinekenDataLottery } = require("./sendHeinekenDataLottery");

const heinekenLottery = async () => {
  try {
    const data = getData();
    const filteredData = data.filter(
      (item) => item.isSend !== "true" && item.isSend !== "Ups!"
    );
    console.log("filteredData", filteredData);
    for ({ code } of filteredData) {
      await sendHeinekenDataLottery(code);
    }
  } catch {
    console.log("heinekenLottery error");
  }
};

module.exports = { heinekenLottery };
