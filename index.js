const FS = require('fs');
const DISCORD = require('discord.js');
const { timeStamp } = require('console');

const CLIENT = new DISCORD.Client();

const PREFIX = '/';
CLIENT.commands = new DISCORD.Collection();

const COMMANDFILES  = FS.readdirSync('./commands').filter(file => file.endsWith('.js'));
const COOLDOWNS = new DISCORD.Collection();

for(const file of COMMANDFILES){
    const COMMAND = require(`./commands/${file}`);
    CLIENT.commands.set(COMMAND.name, COMMAND);
}

CLIENT.on('ready', () => {
    console.log('DegenIO ready!');
});

CLIENT.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const ARGS = message.content.slice(PREFIX.length).trim().split(/ +/);
    const COMMANDNAME = ARGS.shift().toLowerCase();

    const COMMAND = CLIENT.commands.get(COMMANDNAME)
		|| CLIENT.commands.find(cmd => cmd.aliases && cmd.aliases.includes(COMMANDNAME));

    if(!COMMAND) return;


    //DM handler
    if (COMMAND.guildOnly && message.channel.type === 'dm') {
        message.reply('I can\'t execute that command inside DMs!');
        return;
    }

    //cooldown handler
    if(!COOLDOWNS.has(COMMAND.name)){
        COOLDOWNS.set(COMMAND.name, new DISCORD.Collection())
    }
    const NOW = Date.now();
    const TIMESTAMPS = COOLDOWNS.get(COMMAND.name);
    const COOLDOWNAMOUNT = (COMMAND.cooldown || 3) * 1000;

    if(TIMESTAMPS.has(message.author.id)){
        const EXPIRATIONTIME = TIMESTAMPS.get(message.author.id) + COOLDOWNAMOUNT;

        if(NOW < EXPIRATIONTIME){
            const TIMELEFT = (EXPIRATIONTIME - NOW) / 1000;
            return message.reply(`Slow down! Please wait ${TIMELEFT.toFixed(1)} more second(s)!`);
        }
    }
    TIMESTAMPS.set(message.author.id, NOW);
    setTimeout(() => TIMESTAMPS.delete(message.author.id), COOLDOWNAMOUNT);

    //dynamic command handler
    try {
        COMMAND.execute(CLIENT, message, ARGS);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

//notify on member leave
CLIENT.on('guildMemberRemove', member => {
    member.guild.channels.get('598649816532385798').send('**' + member.user.username + '** has left the server.');
})

CLIENT.login(require ('./config.json').BOT_TOKEN);
