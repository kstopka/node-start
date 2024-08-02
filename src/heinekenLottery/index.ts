import axios, { AxiosRequestConfig } from "axios";
import { config } from "dotenv";
import { addToJson } from "./addToJson";
config();

const { name, surname, email, phone, agreement1, agreement2, cookie } =
  process.env as Record<string, string>;

const sendHeinekenDataLottery = async (code: string): Promise<void> => {
  const data = {
    code,
    name,
    surname,
    email,
    phone,
    agreement1,
    agreement2,
  };
  const config: AxiosRequestConfig = {
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
      new URLSearchParams(data as any),
      config
    );
    if (!response.data) {
      console.log("error");
    }
    if (response.data && !response.data.wynik.includes("Ups")) {
      console.log("OK!: ", code);
      addToJson(code);
    }
    if (response.data && response.data.wynik.includes("Ups")) {
      console.log("Ups!: ", code);
      console.log("Ups!: ", response.data.wynik);
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

export { sendHeinekenDataLottery };
