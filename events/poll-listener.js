const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'poll-vote-up' || interaction.customId === 'poll-vote-up') {
                
            }
        }
    },
};