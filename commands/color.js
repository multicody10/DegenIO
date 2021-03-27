module.exports = {
    name: 'color',
    description: 'Changes the user\'s role color',
    guildOnly: true,
    dmOnly: false,
    cooldown: 5,
    execute(client, message, args, discord){
        if(args.length != 1){
            message.reply("Syntax is:\n``/color {color name}``\n``/color {#RRGGBB}``.");
            return;
        }
        
        var color = args[0].toLowerCase();
        if(!color.startsWith("#")){
            color = checkKnownColors(color);
            if(color == "FAIL"){
                message.reply("I can't find that color! :no_entry_sign:\nTry using a hex color code: <https://www.color-hex.com/>\n``/color #RRGGBB``");
                return;
            }
        }

        message.guild.roles.cache.forEach(role => {
            if(role.id === message.member.roles.highest.id){
                role.edit({
                    color: color
                });
                message.reply("I've updated your role color! :white_check_mark:");
                return;
            }
        });
    }
}

function checkKnownColors(color){
    switch(color){
        case "red":
            color = "#FF0000";
            break;
        case "green":
            color = "#00FF00";
            break;
        case "blue":
            color = "#0000FF";
            break;
        case "yellow":
            color = "#FFFF00";
            break;
        case "orange":
            color = "#FF6600";
            break;
        case "purple":
            color = "#6600FF";
            break;
        case "pink":
            color = "#FFC0CB";
            break;
        case "white":
            color = "#FFFFFF";
            break;
        case "black":
            color = "#010101";
            break;
        default:
            color = "FAIL";
    }
    return color;
}