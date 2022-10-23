const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("denysuggestion")
        .setDescription("Deny a suggestion. **ADMIN**")
        .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("The ID of the suggestion. (message ID)")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("suggestion");
        const channel = interaction.guild.channels.cache.find(c => c.id === `suggestions` && c.type === 'text');

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`This Suggesstion has been denied!`)
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });


            await guild.channels.cache.get('1033048683530432635').messages.fetch(name).then(message => {
                message.edit({
                    embeds: ([embed])
                })
                message.reactions.removeAll().catch(error => console.error("Error removing the reactions off the suggestion message."))
            })
        interaction.reply({ content: "Suggesstion has been denied.", ephemeral: true });
    }
}