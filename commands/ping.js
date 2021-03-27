module.exports = {
    name: 'ping',
    description: 'Returns the latency of the bot in ms',
    guildOnly: false,
    dmOnly: false,
    cooldown: 5,
    execute(client, message, args, discord){
        message.reply('Awaiting ping...:bar_chart:').then(resultMessage =>{
            resultMessage.edit(`:ping_pong: ${resultMessage.createdTimestamp - message.createdTimestamp}ms`);
        });
    }
}