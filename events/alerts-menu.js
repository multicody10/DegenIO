const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const alerts = new Map();
alerts.set('Free Stuff Alert', '889041410953723945');
alerts.set('VC', '889042092909793280');
alerts.set('Movie', '889042145061777418');
const alertsValues = [...alerts.values()];


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            // If the button is the alert menu button
            if (interaction.customId === 'alerts-button') {
                // Build the alert menu
                const alertPickerButtons = new MessageActionRow();
                alerts.forEach((value, key) => {
                    alertPickerButtons.addComponents(
                        new MessageButton()
                            .setCustomId(value)
                            .setLabel(key)
                            .setStyle('SECONDARY')
                            .setEmoji('🔔'),
                    );
                });
                const alertPickerEmbed = new MessageEmbed()
                    .setColor('#663399')
                    .setTitle('Choose Alerts')
                    .setURL('')
                    .setDescription('Click the buttons below to toggle alert notifications.');
                interaction.reply({ embeds: [alertPickerEmbed], components: [alertPickerButtons], ephemeral: true });
            }

            // If the button is contained in alerts
            if (alertsValues.includes(interaction.customId)) {
                const role = interaction.guild.roles.cache.find(r => r.id == interaction.customId)
                const member = interaction.guild.members.cache.get(interaction.user.id);

                const alertChoiceEmbed = new MessageEmbed()
                    .setURL('')
                    .setDescription('');

                if (!member.roles.cache.some(role => role.id === role)) {
                    member.roles.add(role);
                    alertChoiceEmbed.setColor('#00ff00');
                    alertChoiceEmbed.setTitle('You are now subscribed to ' + role.name);
                } else {
                    member.roles.remove(role);
                    alertChoiceEmbed.setColor('#ff0000');
                    alertChoiceEmbed.setTitle('You are no longer subscribed to ' + role.name);
                }
                interaction.reply({ embeds: [alertChoiceEmbed], ephemeral: true });
            }
        }
    }
};