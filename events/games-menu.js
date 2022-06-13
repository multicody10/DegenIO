const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const games = new Map();
games.set('Counter Strike: Global Offensive', '889042335747420180');
games.set('Rocket League', '889043548945649726');
games.set('Minecraft', '889042410452172810');
games.set('Vintage Story', '889046869248987176');
games.set("No Man's Sky", '889043469262278696');
games.set('Jackbox', '899188320528109588');
games.set('Stellaris', '900488433531772998');
games.set('Dead by Daylight', '964277954383319091');
const gamesValues = [...games.values()];


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            // If the button is the game menu button
            if (interaction.customId === 'games-button') {
                const member = interaction.guild.members.cache.get(interaction.user.id);
                // Build the game selection menu
                const gamePickerButtons = new MessageActionRow();
                const gamePickerButtons2 = new MessageActionRow();
                var i = 0;
                games.forEach((value, key) => {
                    const gameButton = new MessageButton();
                    gameButton.setLabel(key);
                    gameButton.setCustomId(value);
                    if (member.roles.cache.some(role => role.id === value)) {
                        gameButton.setStyle('SUCCESS');
                    } else {
                        gameButton.setStyle('SECONDARY');
                    }
                    switch (key) {
                        case 'Counter Strike: Global Offensive':
                            gameButton.setEmoji('889054613578338345');
                            break;
                        case 'Rocket League':
                            gameButton.setEmoji('889054628220657694');
                            break;
                        case 'Minecraft':
                            gameButton.setEmoji('889054670838968380');
                            break;
                        case 'Vintage Story':
                            gameButton.setEmoji('889054706423447562');
                            break;
                        case "No Man's Sky":
                            gameButton.setEmoji('889054732939825184');
                            break;
                        case 'Jackbox':
                            gameButton.setEmoji('899188066110038058');
                            break;
                        case 'Stellaris':
                            gameButton.setEmoji('900590499369455616');
                            break;
                        case 'Dead by Daylight':
                            gameButton.setEmoji('964277566510858260');
                            break;
                        default:
                            gameButton.setEmoji('🎮');
                    }
                    i++;
                    if (i <= 5) {
                        gamePickerButtons.addComponents(gameButton);
                    } else {
                        gamePickerButtons2.addComponents(gameButton);
                    }
                });
                const gamePickerEmbed = new MessageEmbed()
                    .setColor('#663399')
                    .setTitle('Choose Games')
                    .setURL('')
                    .setDescription('Click the buttons below to toggle game notifications.');
                interaction.reply({ embeds: [gamePickerEmbed], components: [gamePickerButtons, gamePickerButtons2], ephemeral: true });
            }

            // If the button is contained in games
            if (gamesValues.includes(interaction.customId)) {
                const gameRole = interaction.guild.roles.cache.find(r => r.id == interaction.customId)
                const member = interaction.guild.members.cache.get(interaction.user.id);

                if (!member.roles.cache.some(role => role === gameRole)) {
                    member.roles.add(gameRole);
                    const gameChoiceEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('You are now subscribed to ' + gameRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [gameChoiceEmbed], ephemeral: true });
                } else {
                    member.roles.remove(gameRole);
                    const gameChoiceEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('You are no longer subscribed to ' + gameRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [gameChoiceEmbed], ephemeral: true });
                }
            }
        }
    }
};