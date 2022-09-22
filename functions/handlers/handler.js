const fs = require("fs");

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
          commandArr.push(command, command.data.toJSON());
          console.log(`command: ${command.data.name} has passed through handler`);
      }
    }
  };
};
