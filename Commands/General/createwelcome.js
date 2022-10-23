const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const Schema = require("../../Models/Welcome");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('createwelcome')
    .setDescription('Set your welcome channel and message for when a member joins your guild.')
    .addStringOption(option =>
        option.setName('channel')
        .setDescription('The channel ID for your welcome message.')
        .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('message')
        .setDescription('The message you want to be for the welcome message. **ADMIN**')
        .setRequired(true)
    ),
    async execute(interaction) {
        const channel = interaction.options.getString('channel');
        const message = interaction.options.getString('message');
        var dbStuff = new Schema({ Guild: interaction.guild.id, Channel: channel, Msg: message});

        dbStuff.save(function (err, DB) {
            if(err) return console.error(err);
            console.log(DB.name + " saved to welcome collection")
        })
        return interaction.reply({content: 'Saved the welcome channel and message to the database.', ephemeral: true});
    },
};