const { Client, SlashCommandBuilder, PermissionFlagBits, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .addSubcommand(subcommand => subcommand.setName("add").setDescription('Adds a role to a member.').addUserOption(option => option.setName("target").setDescription("Select the user you wish to add the role to.").setRequired(true)).addRoleOption(option => option.setName("role").setDescription("The role (id) you want to add to the user.")))
        .addSubcommand(subcommand => subcommand.setName("remove").setDescription('Removes a role from a member.').addUserOption(option => option.setName("target").setDescription("Select the user you wish to remove the role from.").setRequired(true)).addRoleOption(option => option.setName("role").setDescription("The role (id) you want to from from the user.")))
        .setDescription("Roles")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const { guild, options } = interaction

        const user = options.getUser("target")
        const member = guild.members.cache.get(user.id);
        const role = options.getRole("role");

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)

        if(interaction.options.getSubcommand() === "add")
        {
            const successEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Added Role**")
            .setDescription(`Succesfully added the role to the  ${user}.`)
            .setColor(0x5fb041)
            .setTimestamp();

            
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            

        try {
            await member.roles.add(role);

            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
        }
        else if(interaction.options.getSubcommand() === "remove")
        {
            const successEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Removed Role**")
            .setDescription(`Succesfully removed the role from the  ${user}.`)
            .setColor(0x5fb041)
            .setTimestamp();

            
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            

        try {
            await member.roles.remove(role);

            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
        }
    }
}