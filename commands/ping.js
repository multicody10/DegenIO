const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const buttonrow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('open-ticket')
					.setLabel('Open Ticket')
					.setStyle('SUCCESS'),
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Ticket')
			.setURL('')
			.setDescription('Click the button to open a ticket!');

		await interaction.reply({ content: ' ', embeds: [embed], components: [buttonrow] });
	},
};