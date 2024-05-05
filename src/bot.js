require('dotenv').config();

const { token } = process.env;
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
});

const COMMAND_PREFIX = '!';
const { generateRandomWord } = require('./words');

client.on('messageCreate', (message) => {
    let args = message.content.substring(COMMAND_PREFIX.length).split(" ");


    switch(args[0]) {
        case 'help':
            const helpEmbed = {
                color: 0x0099ff,
                title: 'Guess the word!',
                description: 'Type `!start` to begin the game. A new word will be randomized and you can start guessing by hinting a letter with command `!letter [letter]`, or eventually guessing the word typing `!guess [word]`.',
                footer: {
                    text: 'Enjoy the game!',
                },
            };
            message.reply({ embeds: [helpEmbed] });
            break;
    }
});

client.login(token)