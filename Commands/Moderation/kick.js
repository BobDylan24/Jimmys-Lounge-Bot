const { Client, SlashCommandBuilder, PermissionFlagBits, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a member from the guild. **ADMIN**")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => 
            option.setName("target")
                .setDescription("Select the user you wish to kick.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("What is the reason of the kick?")
        ),

    async execute(interaction) {
        const { guild, options } = interaction

        const user = options.getUser("target")
        const member = guild.members.cache.get(user.id);
        const reason = options.getString("reason") || "No reason provided";

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)

        const successEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Kicked**")
            .setDescription(`Succesfully kicked ${user}.`)
            .addFields(
                { name: "Reason", value: `${reason}`, inline: true },
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            
        if(!convertedTime)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.kick(reason);

            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
    }
}