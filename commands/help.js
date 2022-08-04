const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(`Commands of ${client.user.username}`)
    .setColor("#00FFFF")
    .setDescription("**Please Select a category to view all its commands**")
    .addField(
      `Links:`,
      `<:lucaslogo:992889484809085048> - [Invite Link](https://discord.com/api/oauth2/authorize?client_id=1002996487426412587&permissions=8&scope=bot%20applications.commands)`,
      false
    )
    .setTimestamp()
    .setFooter(
      `Requested by ${message.author.username} `,
      message.author.displayAvatarURL()
    );

  const giveaway = new MessageEmbed()
    .setTitle("Categories » Giveaway")
    .setColor("#00FFFF")
    .setDescription("```yaml\nHere are the giveaway commands:```")
    .addFields(
      {
        name: "Create / Start",
        value: `Start a giveaway in your guild!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "Edit",
        value: `Edit an already running giveaway!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "End",
        value: `End an already running giveaway!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "List",
        value: `List all the giveaways running within this guild!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "Pause",
        value: `Pause an already running giveaway!\n > **Type: __\`slash\`__**`,
        inline: true,
      },
      {
        name: "Reroll",
        value: `Reroll an ended giveaway!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "Resume",
        value: `Resume a paused giveaway!\n > **Type: __\`slash\`__**`,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter(
      `Requested by ${message.author.username} | GiveawayBot`,
      message.author.displayAvatarURL()
    );

  const general = new MessageEmbed()
    .setTitle("Categories » General")
    .setColor("#00FFFF")
    .setDescription("```yaml\nHere are the general bot commands:```")
    .addFields(
      {
        name: "Help",
        value: `Shows all available commands to this bot!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "Invite",
        value: `Get the bot's invite link!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      },
      {
        name: "Ping",
        value: `Check the bot's websocket latency!\n > **Types: __\`slash\` / \`message\`__**`,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter(
      `Requested by ${message.author.username} | GiveawayBot`,
      message.author.displayAvatarURL()
    );

  const components = (state) => [
    new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Please Select a Category")
        .setDisabled(state)
        .addOptions([
          {
            label: `Giveaways`,
            value: `giveaway`,
            description: `View all the giveaway based commands!`,
            emoji: `<a:tada:1001871255781261392>`,
          },
          {
            label: `General`,
            value: `general`,
            description: `View all the general bot commands!`,
            emoji: `<a:DesignS:1001726054894948454>`,
          },
        ])
    ),
  ];

  const initialMessage = await message.reply({
    embeds: [embed],
    components: components(false),
  });

  const filter = (interaction) => interaction.user.id === message.author.id;

  const collector = message.channel.createMessageComponentCollector({
    filter,
    componentType: "SELECT_MENU",
    time: 300000,
  });

  collector.on("collect", (interaction) => {
    if (interaction.values[0] === "giveaway") {
      interaction.update({ embeds: [giveaway], components: components(false) });
    } else if (interaction.values[0] === "general") {
      interaction.update({ embeds: [general], components: components(false) });
    }
  });
  collector.on("end", () => {
    initialMessage.edit({ components: components(true) });
  });
};
