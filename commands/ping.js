const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, Modal } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const selectrow = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select Menu')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		const buttonrow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('button1')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('button2')
					.setLabel('Secondary')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('button3')
					.setLabel('Success')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('button4')
					.setLabel('Danger')
					.setStyle('DANGER'),
				new MessageButton()
					.setURL('http://rabl.tv/ombi/')
					.setLabel('Link')
					.setStyle('LINK'),
			);
		await interaction.reply({ content: 'Pong!', components: [selectrow, buttonrow] });
	},
};