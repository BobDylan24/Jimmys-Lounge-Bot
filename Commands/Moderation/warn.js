const { Client, SlashCommandBuilder, PermissionFlagBits, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");
const Schema = require("../../Models/Warn");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warns a member in your guild. **ADMIN**")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => 
            option.setName("target")
                .setDescription("Select the user you wish to warn.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("What is the reason of the warn?")
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
            .setTitle("**:white_check_mark: Warned**")
            .setDescription(`Succesfully warned ${user}.`)
            .addFields(
                { name: "Reason", value: `${reason}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });


        try {
            let ts = Date.now();

            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();

            actualDate = year + "-" + month + "-" + date;

            if(Schema.findOne({userId: member.id}))
            {
                if(Schema.findOne({userId: member.id, number: 1}))
                {   
                    Schema.findOneAndReplace({userId: member.id}, {$set:{number: 2}},function(err, doc){
                        if(err){
                            console.error(err);
                        }

                        console.log(doc)
                    })
                }else if(Schema.findOne({userId: member.id, number:2}))
                {
                    Schema.findOneAndReplace({userId: member.id}, {$set:{number: 3}}, function(err, doc){
                        if(err){
                            console.error(err);
                        }

                        console.log(doc)
                    })
                } else if(Schema.findOne({userId: member.id, number:3}))
                {
                    Schema.findOneAndReplace({userId: member.id}, {$set:{number: 4}},function(err, doc){
                        if(err) {
                            console.log(err);
                        }

                        console.log(doc);
                    })
                }
            }
            else {
                var dbStuff = new Schema({ userId: member.id, reason: reason, Date: actualDate, staffId: interaction.user.name, number: 1});
                dbStuff.save(function (err, DB) {
                    if(err) return console.error(err);
                    console.log("New user has been warned. Saved to database.")
                })
            }

            interaction.reply({ embeds: [successEmbed], ephemeral: true });
            //await guild.channels.cache.get('1031302408934015016').send(`${interaction.member.name} has muted ${user} for the time ${time} for the reason ${reason}`)
        } catch (err) {
            console.log(err);
        }
    }
}