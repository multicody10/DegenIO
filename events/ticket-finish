const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        const ticketName = interaction.fields.getTextInputValue('ticketNameInput');
        const ticketMessage = interaction.fields.getTextInputValue('ticketMessageInput');

        let channel = interaction.guild.channels.create("ticket-" + (Math.random() * 10), { type: 'GUILD_TEXT' });
        (await channel).setParent('982042135253618738');

        const ticketWriteEmbed = new MessageEmbed()
            .setColor('#1ec45b')
            .setTitle(ticketName)
            .setURL('')
            .setDescription(ticketMessage);

        let userID = '<@' + interaction.user.id + '> Here is your ticket!'
        await interaction.guild.channels.cache.get((await channel).id).send({ content: userID, embeds: [ticketWriteEmbed] });
        interaction.reply({ content: 'Your ticket has been created!', ephemeral: true });
    },
};