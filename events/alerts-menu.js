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
                const alertRole = interaction.guild.roles.cache.find(r => r.id == interaction.customId)
                const member = interaction.guild.members.cache.get(interaction.user.id);

                if (!member.roles.cache.some(role => role === alertRole)) {
                    member.roles.add(alertRole);
                    const alertChoiceEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('You are now subscribed to ' + alertRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [alertChoiceEmbed], ephemeral: true });
                } else {
                    member.roles.remove(alertRole);
                    const alertChoiceEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('You are no longer subscribed to ' + alertRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [alertChoiceEmbed], ephemeral: true });
                }
            }
        }
    }
};