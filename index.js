const { google } = require('googleapis');
const dotenv = require("dotenv");
const express = require('express');

dotenv.config();
const app = express();

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./creds.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const spreadsheetId = process.env.spreadsheetId;

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1"
    })

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A2:B2",
        valueInputOption: "USER_ENTERED",
        resource: {
           values: [ ["13", "250M"] ]
        }
    });


    res.send(getRows.data);

});


app.listen(8080, (req, res) => console.log('running on 8080'));