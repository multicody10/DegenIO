const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, MessageActionRow, TextInputComponent, MessageEmbed, Modal } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'open-ticket') {
        // Create the modal
        const modal = new Modal()
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
        modal.addComponents(firstActionRow, secondActionRow);
        // Show the modal to the user
        await interaction.showModal(modal);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    const ticketSubject = interaction.fields.getTextInputValue('ticketNameInput');
    const ticketMessage = interaction.fields.getTextInputValue('ticketMessageInput');

    let channel = interaction.guild.channels.create("ticket-" + (Math.random() * 50), { type: 'GUILD_TEXT' });
    (await channel).setParent('982042135253618738');

    const embed = new MessageEmbed()
        .setColor('#1ec45b')
        .setTitle(ticketSubject)
        .setURL('')
        .setDescription(ticketMessage);

    let userID = '<@' + interaction.user.id + '> Here is your ticket!'
    await interaction.guild.channels.cache.get((await channel).id).send({ content: userID, embeds: [embed] });
    interaction.reply({ content: 'Your ticket has been created!', ephemeral: true });
});

client.login(token);