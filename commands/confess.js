module.exports = {
    name: 'confess',
    description: 'Allows user to confess anonymously',
    guildOnly: false,
    dmOnly: true,
    cooldown: 5,
    execute(client, message, args, discord){
        if(args.length != 1){
            message.reply("Syntax is:\n``/confess {confession}``.");
            return;
        }

        const anonEmbed = new discord.MessageEmbed()
            .setColor('#2c2f33')
            .addFields(
                {name: '🌎 Welcome to GlobeMC! 🌎', value: 'We hope you enjoy your stay on our Discord server.'}
            );

       member.guild.channels.get(require ('./config.json').MAIN_CHAT_ID).send(anonEmbed);
    }
}