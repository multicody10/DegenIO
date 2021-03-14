module.exports = {
    name: 'remindme',
    description: 'Alert user with a message in a sepcified countdown',
    guildOnly: false,
    cooldown: 5,
    execute(client, message, args){
        if(args.length < 2){
            message.reply("Syntax is:\n``/remindme {number}{h/m/s} {message}``");
            return;
        }

        var timeArg = args[0];
        var alertArg = "";
        args.forEach(element => {
            if(element != args[0]){
                alertArg = alertArg + ' ' + element;
            }
        });

        var milliseconds = timeToMilliseconds(timeArg);
        if(milliseconds == -1){
            message.reply("Syntax is:\n``/remindme {number}{h/m/s} {message}``");
            return;
        } else if(milliseconds > 604800000){
            message.reply("You cannot set a reminder that far into the future! Limit: 1 week.");
            return;
        }

        message.reply('Okay! I will remind you in ' + timeArg + '.');
        var interval = setTimeout(function () {
            message.reply(alertArg)
            .catch(console.error);
        }, milliseconds);
    }
}

function timeToMilliseconds(timeString){
    var timeCode = timeString[timeString.length - 1];
    var time = parseInt(timeString.slice(0, timeString.length - 1));

    switch(timeCode){
        case 'h':
            milliseconds = time * 60 * 60 * 1000;
            return milliseconds;
        case 'm':
            milliseconds = time * 60 * 1000;
            return milliseconds;
        case 's':
            milliseconds = time * 1000;
            return milliseconds;
        default:
            return -1;
    }
}