const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolepicker')
		.setDescription('Spawns a role picker menu!'),
	async execute(interaction) {
		const cmdIssuer = interaction.guild.members.cache.get(interaction.user.id);
		if (cmdIssuer.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			const rolePickerMenu = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('color-button')
						.setLabel('Name Color')
						.setStyle('SECONDARY')
						.setEmoji('🎨'),
					new MessageButton()
						.setCustomId('alerts-button')
						.setLabel('Alerts')
						.setStyle('SECONDARY')
						.setEmoji('🔔'),
					new MessageButton()
						.setCustomId('games-button')
						.setLabel('Games')
						.setStyle('SECONDARY')
						.setEmoji('🎮'),
				);

			const rolePickerMenu2 = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('shows-button')
						.setLabel('Shows')
						.setStyle('SECONDARY')
						.setEmoji('📺'),
					new MessageButton()
						.setCustomId('drugs-button')
						.setLabel('Drugs')
						.setStyle('SECONDARY')
						.setEmoji('💊'),
				);

			const rolePickerEmbed = new MessageEmbed()
				.setColor('#663399')
				.setTitle('Role Selection')
				.setDescription('Click the buttons below to open various role menus.');

			await interaction.guild.channels.cache.get('889007085063401502').send({ content: ' ', components: [rolePickerMenu, rolePickerMenu2], embeds: [rolePickerEmbed] });
			await interaction.reply({ content: 'Created a role menu!', ephemeral: true });
		}
	},
};