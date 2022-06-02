# DegenIO
Discord bot for The Degenerate Hideout.

Uses Node.js and Discord.js


# Start Locally
Run these commands:
```npm init```

```npm install discord.js```

```npm install @discordjs/rest discord-api-types```

```npm deploy-commands.js``` (do this everytime you add a new command file)

Make a `config.json` somewhere in the root folder and inside it put
```
{
	"clientId": "bot-client/app-id",
	"guildId": "server-id",
	"token": "bot-token"
}
```
Replacing these with your own values.

Finally

```npm index.js```