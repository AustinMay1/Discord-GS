const { SlashCommandBuilder } = require("discord.js");
const { google } = require("googleapis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("remove a mule and its balance")
    .addStringOption((option) =>
      option.setName("mulename").setDescription("name of mule")
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

    const data = getRows.data.values.find(row => row[0] === muleId);

		if (!data) {
			return interaction.reply("Mule does not exist! Use /addmule")
		} 

		let toUpdate;

		for (let i = 0; i < getRows.data.values.length; i++) {
			const row = getRows.data.values[i];
			if (row[0] === muleId) {
				toUpdate = i;
			}
    }
    
    let range = "Sheet1!A" + (toUpdate + 1) + ":B" + (toUpdate + 1);

		await googleSheets.spreadsheets.values.batchClear({
			auth,
            spreadsheetId,
            ranges: range
		}).catch(console.error)

    return interaction.reply(`${muleId} has been removed`);
	}
}