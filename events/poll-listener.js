const { MessageEmbed } = require('discord.js');

client.db = require("quick.db");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'poll-vote-up' || interaction.customId === 'poll-vote-up') {
                client.db.push(`polls.p${interaction.message.id}.members`, interaction.user.id);
            }
        }
    },
};