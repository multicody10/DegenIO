module.exports = {
    name: 'help',
    description: 'Returns a list of commands',
    guildOnly: false,
    dmOnly: false,
    cooldown: 5,
    execute(client, message, args, discord){
        message.reply("```/ping\nReturns the bot's latency in ms."
        + "\n\n/color {color name or #RRGGBB}\nChanges the user's main role color."
        + "\n\n/remindme {number}{h/m/s} {message}\nSends a reminder to the user after a specifed time with a message."
        + "\n\n/roll [max]\nRolls a number from 1-20 unless a max is supplied."
        + "\n\n/flip\nFlips a coin and returns heads or tails.```");
    }
}