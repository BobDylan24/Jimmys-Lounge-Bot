const { Client, SlashCommandBuilder, PermissionFlagBits, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Mute a member from the guild. **ADMIN**")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => 
            option.setName("target")
                .setDescription("Select the user you wish to unmute.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options } = interaction

        const user = options.getUser("target")
        const member = guild.members.cache.get(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)

        const successEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Unmuted**")
            .setDescription(`Succesfully Unmuted ${user}.`)
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            
        if(!convertedTime)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(0, "Unmute command ran.");

            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
    }
}