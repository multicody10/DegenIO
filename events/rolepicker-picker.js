const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

const colors = new Map();
colors.set('Black', '889010456470118423');
colors.set('White', '889010144892039219');
colors.set('Silver', '889011171162726452');
colors.set('Grey', '889011214234046484');
colors.set('Red', '889009178272755722');
colors.set('Bittersweet', '889013204842340352');
colors.set('Maroon', '889011280642469949');
colors.set('Azalea', '889015157211136071');
colors.set('Hollywood Cerise', '889026228370145342');
colors.set('Green', '889009310779183184');
colors.set('Green Haze', '889015411692142642');
colors.set('Lime', '889011509328494643');
colors.set('Chelsea Cucumber', '889013861720674304');
colors.set('Olive', '889011355359805441');
colors.set('Blue', '889009367112876042');
colors.set('Polo Blue', '889015281408692246');
colors.set('Teal', '889011618774663179');
colors.set('Navy', '889011675125125170');
colors.set('Chambray', '889013266687340556');
colors.set('Aqua', '889010633155166248');
colors.set('Yellow', '889010375146754068');
colors.set('Gold', '889015568622043147');
colors.set('Orange', '889012088041787402');
colors.set('Magenta', '889010313356271618');
colors.set('Fresh Eggplant', '889011567578980393');
/*
colors.set('Violet', '889014216676245506');
colors.set('Scampi', '889013719684771851');
colors.set('Eminence', '889011933649448991');
colors.set('Purple Heart', '889026707661652030');
colors.set('Prelude', '889012316891406336');
*/


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'color-button') {
                var colorEmbedString = "\n";
                colors.forEach((value, key) => {
                    colorEmbedString += `<@&${value}> - ${key}\n`;
                })

                const member = interaction.guild.members.cache.get(interaction.user.id);
                var dropdownColorMenu = new MessageSelectMenu().setCustomId('selectColorDropdown').setPlaceholder('Select a color');
                var hasDefault = false;
                colors.forEach((value, key) => {
                    if (member.roles.cache.some(role => role.id === value) && hasDefault === false) {
                        dropdownColorMenu.addOptions([
                            {
                                label: key,
                                description: '',
                                value: value,
                                emoji: '🎨',
                                default: true
                            }
                        ]);
                        hasDefault = true;
                    } else {
                        dropdownColorMenu.addOptions([
                            {
                                label: key,
                                description: '',
                                value: value,
                                emoji: '🎨',
                            }
                        ]);
                    }
                });

                const rolePickerPickerEmbed = new MessageEmbed()
                    .setColor('#663399')
                    .setTitle('Choose Color')
                    .setURL('')
                    .setDescription(colorEmbedString);
                const rolePickerMenu = new MessageActionRow().addComponents(dropdownColorMenu);
                interaction.reply({ embeds: [rolePickerPickerEmbed], components: [rolePickerMenu], ephemeral: true });
            }
        }

        if (interaction.isSelectMenu()) {
            if (interaction.customId === "selectColorDropdown") {
                const role = interaction.guild.roles.cache.find(r => r.id == interaction.values[0])
                const member = interaction.guild.members.cache.get(interaction.user.id);
                colors.forEach(curRole => {
                    if (member.roles.cache.some(role => role.id === curRole)) {
                        member.roles.remove(curRole);
                    }
                });
                member.roles.add(role);

                const colorPickerPickedEmbed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Your color has been changed')
                    .setDescription('');

                await interaction.reply({ embeds: [colorPickerPickedEmbed], ephemeral: true });

            }
        }
    }
};