const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { google } = require("googleapis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("list mules and balances"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .addFields()
      .setTimestamp()
      

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
      range: "Sheet1!A:B",
    });

    if (getRows.data.values.length > 0) {
      for (let i = 0; i < getRows.data.values.length; i++) {
        const row = getRows.data.values[i];
        embed.addFields({ name: `${row[0]}`, value: `${row[1]}` });
      }
    } else {
      embed.setDescription("No balances added to the list!");
    }

    await interaction.reply({ embeds: [embed] });
  },
};
