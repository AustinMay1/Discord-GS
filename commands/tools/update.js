const { SlashCommandBuilder } = require("discord.js");
const { google } = require("googleapis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updatebal")
    .setDescription("update a mules balance")
    .addStringOption((option) =>
      option.setName("mulename").setDescription("name of mule")
    )
    .addStringOption((option) =>
      option.setName("amount").setDescription("amount of gp to add")
    ),
  async execute(interaction, client) {
    const mule = interaction.options.getString("mulename");
    const balance = interaction.options.getString("amount");

    const muleId = await mule;

    const auth = new google.auth.GoogleAuth({
      keyFile: "./creds.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const spreadsheetId = process.env.spreadsheetId;

    const googClient = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: googClient });

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1",
    });

    const data = getRows.data.values.find((row) => row[0] === muleId);







  }

};
