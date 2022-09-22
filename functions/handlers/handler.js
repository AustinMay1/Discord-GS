const fs = require("fs");
const { REST, Routes } = require("discord.js");
const dotenv = require('dotenv');

dotenv.config();

module.exports = (client) => {
  client.handler = async () => {
    const cmdFolder = fs.readdirSync("./commands");
    for (const folder of cmdFolder) {
      const cmdFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArr } = client;
      for (const file of cmdFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArr.push(command.data.toJSON());
        console.log(`command: ${command.data.name} has passed through handler`);
      }
    }

    const clientId = "1022252916293255228";

    const rest = new REST({ version: "9" }).setToken(process.env.discordToken);
    try {
      console.log("Refreshing application (/) commands");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArr,
      });

      console.log("(/) reload successful.");
    } catch (error) {
      console.error(error);
    }
  };
};
