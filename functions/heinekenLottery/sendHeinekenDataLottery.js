const axios = require("axios");
require("dotenv").config();
const { saveData } = require("./saveData");

const { name, surname, email, phone, agreement1, agreement2, cookie } =
  process.env;

const sendHeinekenDataLottery = async (code) => {
  const data = {
    code,
    name,
    surname,
    email,
    phone,
    agreement1,
    agreement2,
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      Origin: "https://iframe-loteria-pl.heineken.com",
      Referer: "https://iframe-loteria-pl.heineken.com/?token=",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      Cookie: cookie,
    },
  };

  try {
    const response = await axios.post(
      "https://iframe-loteria-pl.heineken.com/api/saveform",
      new URLSearchParams(data),
      config
    );
    if (!response.data) {
      saveData(code, "error");
    }
    if (response.data && !response.data.wynik.includes("Ups")) {
      saveData(code);
      console.log("OK!: ", code);
    }
    if (response.data && response.data.wynik.includes("Ups")) {
      saveData(code, "Ups!");
      console.log("Ups!: ", code);
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

module.exports = { sendHeinekenDataLottery };
