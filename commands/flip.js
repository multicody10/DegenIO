module.exports = {
    name: 'flip',
    description: 'Flips a coin',
    guildOnly: false,
    dmOnly: false,
    cooldown: 2,
    execute(client, message, args, discord){
        if(args.length > 0){
            message.reply("Syntax is:\n``/flip``");
            return;
        }

        let flipResult = getHeadsTails();
        message.reply(`**${flipResult}**.`);
    }
}


function getHeadsTails(){
    let flip = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    if(flip == 1){
        return "Heads";
    } else if(flip == 2) {
        return "Tails";
    }
}