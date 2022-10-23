const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Suggest something.")
        .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("Your suggestion.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe your suggestion.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("suggestion");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`A suggestion made by ${member}`)
            .addFields(
                { name: "Suggestion", value: `${name}` },
                { name: "Description", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('1033048683530432635').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Your suggestion has been succesfully submitted.", ephemeral: true });
    }
}