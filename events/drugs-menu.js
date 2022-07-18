const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const drugs = new Map();
drugs.set('Stimminit', '964091786802896966');
drugs.set('Opie', '964092550145253426');
drugs.set('Bartard', '964092862541217842');
drugs.set('Dissokiddie', '964092913489412146');
drugs.set("Weediot", '964093059958702091');
drugs.set('Alc', '964093118897082402');
drugs.set('Psychie', '964093753277165568');
drugs.set('Sobertard', '964094983391031326');
const drugsValues = [...drugs.values()];


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            // If the button is the drug menu button
            if (interaction.customId === 'drugs-button') {
                const member = interaction.guild.members.cache.get(interaction.user.id);
                // Build the drug selection menu
                const drugPickerButtons = new MessageActionRow();
                const drugPickerButtons2 = new MessageActionRow();
                var i = 0;
                drugs.forEach((value, key) => {
                    const drugButton = new MessageButton();
                    drugButton.setLabel(key);
                    drugButton.setCustomId(value);
                    if (member.roles.cache.some(role => role.id === value)) {
                        drugButton.setStyle('SUCCESS');
                    } else {
                        drugButton.setStyle('SECONDARY');
                    }
                    switch (key) {
                        case 'Stimminit':
                            drugButton.setEmoji('💊');
                            break;
                        case 'Opie':
                            drugButton.setEmoji('💉');
                            break;
                        case 'Bartard':
                            drugButton.setEmoji('🤪');
                            break;
                        case 'Dissokiddie':
                            drugButton.setEmoji('🥴');
                            break;
                        case "Weediot":
                            drugButton.setEmoji('🌿');
                            break;
                        case 'Alc':
                            drugButton.setEmoji('🍷');
                            break;
                        case 'Psychie':
                            drugButton.setEmoji('🍄');
                            break;
                        case 'Sobertard':
                            drugButton.setEmoji('🕴🏻');
                            break;
                        default:
                            drugButton.setEmoji('💊');
                    }
                    i++;
                    if (i <= 5) {
                        drugPickerButtons.addComponents(drugButton);
                    } else {
                        drugPickerButtons2.addComponents(drugButton);
                    }
                });
                const drugPickerEmbed = new MessageEmbed()
                    .setColor('#663399')
                    .setTitle('Choose Drugs')
                    .setURL('')
                    .setDescription('Click the buttons below to toggle drug notifications.');
                interaction.reply({ embeds: [drugPickerEmbed], components: [drugPickerButtons, drugPickerButtons2], ephemeral: true });
            }

            // If the button is contained in drugs
            if (drugsValues.includes(interaction.customId)) {
                const drugRole = interaction.guild.roles.cache.find(r => r.id == interaction.customId)
                const member = interaction.guild.members.cache.get(interaction.user.id);

                if (!member.roles.cache.some(role => role === drugRole)) {
                    member.roles.add(drugRole);
                    const drugChoiceEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('You are now subscribed to ' + drugRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [drugChoiceEmbed], ephemeral: true });
                } else {
                    member.roles.remove(drugRole);
                    const drugChoiceEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('You are no longer subscribed to ' + drugRole.name)
                        .setURL('')
                        .setDescription('');
                    interaction.reply({ embeds: [drugChoiceEmbed], ephemeral: true });
                }
            }
        }
    }
};