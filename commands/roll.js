module.exports = {
    name: 'roll',
    description: 'Rolls a random number 1-20 with range arguments',
    guildOnly: false,
    dmOnly: false,
    cooldown: 5,
    execute(client, message, args, discord){
        if(args.length > 1){
            message.reply("Syntax is:\n``/roll [max]``");
            return;
        }

        if(args[0] == null){
            var randomNumber = getRandomIntInclusive(1, 20);
        } else {
            var randomNumber = getRandomIntInclusive(1, args[0]);
        }
        
        message.reply(`rolled **${randomNumber}**.` );
    }
}

function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}