require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);
});

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`../src/commands/${file}`);
    client.commands.set(command.name, command);
}

const COMMAND_PREFIX = '!';
let games = {};

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;

    const args = message.content.slice(COMMAND_PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        games = command.execute(message, args, games) || games;
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

// --------------- Slash Commands development (Not ready) ----------------------
const slashCommands = require('./slashCommands');
client.once('ready', async () => {
    try {
        for (const command of slashCommands) {
            await client.application.commands.create(command, process.env.guild_id);
        }
        console.log('Slash commands registered!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    try {
        if (commandName === 'primeiro') {
            const startCommand = require('./commands/primeiro');
            await startCommand.execute(interaction);
        } else if (commandName === 'segundo') {
            const guessCommand = require('./commands/segundo');
            await guessCommand.execute(interaction);
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        await interaction.reply('There was an error handling your interaction.');
    }
});

client.login(process.env.token);