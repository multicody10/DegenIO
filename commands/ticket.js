const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Makes a ticket!'),
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

		await interaction.guild.channels.cache.get('980721430578757632').send({ content: ' ', embeds: [embed], components: [buttonrow] });
		interaction.reply({ content: 'Your ticket has been opened!', ephemeral: true });
	},
};