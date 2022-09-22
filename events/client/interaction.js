module.exports = {
  name: "interaction",
  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong executing this command.`,
          ephemeral: true,
        });
      }
    }
  },
};
