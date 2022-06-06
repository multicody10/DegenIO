const { MessageActionRow, TextInputComponent, Modal } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'open-ticket') {
            // Create the modal
            const ticketModal = new Modal()
                .setCustomId('ticketModal')
                .setTitle('Start a ticket');
            // Add components to modal
            // Create the text input components
            const ticketName = new TextInputComponent()
                .setCustomId('ticketNameInput')
                // The label is the prompt the user sees for this input
                .setLabel("Subject")
                // Short means only a single line of text
                .setStyle('SHORT')
                .setRequired(true);
            const ticketMessage = new TextInputComponent()
                .setCustomId('ticketMessageInput')
                .setLabel("Message")
                // Paragraph means multiple lines of text.
                .setStyle('PARAGRAPH')
                .setRequired(true);
            // An action row only holds one text input,
            // so you need one action row per text input.
            const firstActionRow = new MessageActionRow().addComponents(ticketName);
            const secondActionRow = new MessageActionRow().addComponents(ticketMessage);
            // Add inputs to the modal
            ticketModal.addComponents(firstActionRow, secondActionRow);
            // Show the modal to the user
            await interaction.showModal(ticketModal);
        }
    },
};