const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Makes a ticket!'),
	async execute(interaction) {
		const cmdIssuer = interaction.guild.members.cache.get(interaction.user.id);
		if (cmdIssuer.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			const ticketPanel = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('open-ticket')
						.setLabel('Open Ticket')
						.setStyle('SUCCESS')
						.setEmoji('🎫'),
				);

			const ticketEmbed = new MessageEmbed()
				.setColor('#5973af')
				.setTitle('Ticket')
				.setURL('')
				.setDescription('Click the button to open a ticket!');

			await interaction.guild.channels.cache.get('980721430578757632').send({ content: ' ', embeds: [ticketEmbed], components: [ticketPanel] });
			interaction.reply({ content: 'Your ticket menu has been created!', ephemeral: true });
		}
	},
};