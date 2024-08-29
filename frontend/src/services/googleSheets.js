import axios from "axios";

const SHEET_ID = "122Zus-59S7D7AlvdEdtNuVvLpPMSYDzZ63Fq56LaaHw"; // Use environment variable for Sheet ID
const API_KEY = "AIzaSyDmnlCT2lMSNacnH2Xor_F-uobY55FFOvM"; // Use environment variable for API key

const SHEET_NAME = "CurrentJO"; // Replace with your actual sheet name

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=RAW&key=${API_KEY}`;

export const appendRow = async (data) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        range: SHEET_NAME,
        majorDimension: "ROWS",
        values: [data],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data successfully appended:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error writing to Google Sheets:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
