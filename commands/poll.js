const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageButton, MessageEmbed, Channel } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('makes a poll')
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('the amount of time the poll will run for (in minutes)')
                .setRequired(true)
                .addChoices(
                    { name: 'forever', value: 0 },
                    { name: '30 minutes', value: 30 },
                ))
        .addStringOption(option =>
            option.setName('question')
                .setDescription('the question to ask')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('answer1')
                .setDescription('answer 1')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('answer2')
                .setDescription('answer 2')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('answer3')
                .setDescription('answer 3')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('answer4')
                .setDescription('answer 4')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('answer5')
                .setDescription('answer 5')
                .setRequired(false)
        ),
    async execute(interaction) {
        const cmdIssuer = interaction.guild.members.cache.get(interaction.user.id);
        if (cmdIssuer.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            let poll = {
                question: interaction.options.getString('question'),
                answer1: interaction.options.getString('answer1'),
                answer1_votes: 0,
                answer2: interaction.options.getString('answer2'),
                answer2_votes: 0,
                members: [],
                startDate: interaction.createdTimestamp,
                endDate: interaction.createdTimestamp + 1000 * 60 * interaction.options.getInteger('time')
            };
            var startDate = new Date();
            startDate.setTime(interaction.createdTimestamp);
            var endDate = new Date();
            endDate.setTime(interaction.createdTimestamp + 1000 * 60 * interaction.options.getInteger('time'));

            const pollPanel = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('poll-vote-up')
                        .setLabel(interaction.options.getString('answer1') + '[0]')
                        .setStyle('SUCCESS')
                        .setEmoji('👍'),
                );
            pollPanel.addComponents(
                new MessageButton()
                    .setCustomId('poll-vote-down')
                    .setLabel(interaction.options.getString('answer2') + '[0]')
                    .setStyle('DANGER')
                    .setEmoji('👎'),
            );

            const pollEmbed = new MessageEmbed()
                .setColor('#5973af')
                .setTitle(interaction.options.getString('question'))
                .setDescription("Poll end date: ``" + endDate.toLocaleString() + "``")
                .setAuthor({
                    name: interaction.member.displayName,
                    iconURL: interaction.member.displayAvatarURL(),
                    url: 'https://discordapp.com/users/${interaction.member.id}/'
                });

            const pollMessage = await interaction.reply({ content: ' ', embeds: [pollEmbed], components: [pollPanel], fetchReply: true });
            client.db.set(`polls.p${pollMessage.id}`, poll);
            await pollMessage.startThread({
                name: '[Discussion] ' + interaction.options.getString('question'),
                autoArchiveDuration: 10080,
                reason: 'Created a poll',
            });
        }
    },
};