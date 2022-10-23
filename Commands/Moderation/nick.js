const { Client, SlashCommandBuilder, PermissionFlagBits, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");
const Schema = require("../../Models/Warn");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("nick")
        .setDescription("Nicknames a member in your guild. **ADMIN**")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => 
            option.setName("target")
                .setDescription("Select the user you wish to nickname.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("nickname")
                .setDescription("What are you changing their name to?")
        ),

    async execute(interaction) {
        const { guild, options } = interaction

        const user = options.getUser("target")
        const member = guild.members.cache.get(user.id);
        const nickname = options.getString("nickname")

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)

        const successEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Nicked**")
            .setDescription(`Succesfully nicked${user}.`)
            .addFields(
                { name: "New Name", value: `${nickname}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });


        try {
            let ts = Date.now();

            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();

            actualDate = year + "-" + month + "-" + date;
            
            member.setNickname(nickname);
            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
    }
}