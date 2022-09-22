const { google } = require("googleapis");
const dotenv = require("dotenv");
const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();
client.commandArr = [];

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.events();
client.handler();

dotenv.config();
const app = express();

//Connecting Google Sheets API
app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./creds.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const spreadsheetId = process.env.spreadsheetId;

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A2:B2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[]],
    },
  });

  res.send(getRows.data);
});

client.login(process.env.discordToken);
app.listen(8080, (req, res) => console.log("running on 8080"));
