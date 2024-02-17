# DegenIO
Discord bot for The Degenerate Hideout.

Uses Node.js and Discord.js
![Discord_urIWT8gFta](https://github.com/multicody10/DegenIO/assets/4924142/6ecabc7f-3e2b-4789-afaa-a81c95e71e8c)
![Discord_fUgaVymSw9](https://github.com/multicody10/DegenIO/assets/4924142/894f5b01-726b-4101-b972-78a66514054b)


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
