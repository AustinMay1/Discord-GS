const { SlashCommandSubcommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName("ping")
    .setDescription("return pong"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReplay: true,
    });

    const newMessage = `Pong`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
