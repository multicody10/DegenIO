# DegenIO
Discord bot for The Degenerate Hideout.

Uses Node.js and Discord.js


# Start Locally
Run these commands:

```
npm install discord.js
```

```
npm install @discordjs/rest discord-api-types
```

Whenever you make a new command file run:
```
node deploy-commands.js
```

Make a `config.json` somewhere in the root folder and inside it put:
```
{
	"clientId": "bot-client/app-id",
	"guildId": "server-id",
	"token": "bot-token"
}
```
Replacing these with your own values.

Finally

```
node index.js
```
