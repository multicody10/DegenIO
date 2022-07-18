const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const shows = new Map();
shows.set('Marvel', '935876816030302208');
shows.set('DC', '935876622328922143');
shows.set('Star Wars', '935876884091244584');
shows.set('The Walking Dead', '948257909349941288');
const showsValues = [...shows.values()];


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            // If the button is the show menu button
            if (interaction.customId === 'shows-button') {
                const member = interaction.guild.members.cache.get(interaction.user.id);
                // Build the show selection menu
                const showPickerButtons = new MessageActionRow();
                shows.forEach((value, key) => {
                    const showButton = new MessageButton();
                    showButton.setLabel(key);
                    showButton.setCustomId(value);
                    if (member.roles.cache.some(role => role.id === value)) {
                        showButton.setStyle('SUCCESS');
                    } else {
                        showButton.setStyle('SECONDARY');
                    }
                    switch (key) {
                        case 'Marvel':
                            showButton.setEmoji('935876276009459772');
                            break;
                        case 'DC':
                            showButton.setEmoji('935876264152154202');
                            break;
                        case "Star Wars":
                            showButton.setEmoji('935876289427042335');
                            break;
                        case "The Walking Dead":
                            showButton.setEmoji('🧟');
                            break;
                        default:
                            showButton.setEmoji('📺');
                    }
                    showPickerButtons.addComponents(showButton);
                });
                const showPickerEmbed = new MessageEmbed()
                    .setColor('#663399')
                    .setTitle('Choose Shows')
                    .setURL('')
                    .setDescription('Click the buttons below to toggle show notifications.');
                interaction.reply({ embeds: [showPickerEmbed], components: [showPickerButtons], ephemeral: true });
            }

            // If the button is contained in shows
            if (showsValues.includes(interaction.customId)) {
                const showRole = interaction.guild.roles.cache.find(r => r.id == interaction.customId)
                const member = interaction.guild.members.cache.get(interaction.user.id);

                if (!member.roles.cache.some(role => role === showRole)) {
                    member.roles.add(showRole);
                    const showChoiceEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('You are now subscribed to ' + showRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [showChoiceEmbed], ephemeral: true });
                } else {
                    member.roles.remove(showRole);
                    const showChoiceEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('You are no longer subscribed to ' + showRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [showChoiceEmbed], ephemeral: true });
                }
            }
        }
    }
};