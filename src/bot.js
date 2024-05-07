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
const { generateRandomWord, numOfGuesses } = require('./words');
const { embedMessage } = require('./embedMessage');

const games = {};

client.on('messageCreate', (message) => {
    let args = message.content.substring(COMMAND_PREFIX.length).split(" ");


    switch(args[0]) {
        case 'help':
            if (args[1]) {
                const invalidMessage = embedMessage(0xFF0000, 'Invalid command', 'The bot could not recognize your request, if you having trouble type `!help` for full details', '');

                message.reply({ embeds: [invalidMessage] });
                break;
            }
            
            const helpMessage = embedMessage(0x0099FF, 'Guess the word!', 'Type `!start` to begin the game. A new word will be randomized and you can start guessing by hinting a letter with command `!letter [letter]`, or eventually guessing the word typing `!guess [word]`\n\nUse `!stop` to stop an ongoing game or surrender.', '');

            message.reply({ embeds: [helpMessage] });
            break;

        case 'start':
            if (args[1]) {
                const invalidMessage = embedMessage(0xFF0000, 'Invalid command', 'The bot could not recognize your request, if you having trouble type `!help` for full details');

                message.reply({ embeds: [invalidMessage] });
                break;
            }

            if (!games[message.channel.id]) {
                const { category, word } = generateRandomWord();

                games[message.channel.id] = {
                    category: category,
                    word: word,
                    guesses: [], 
                    triesLeft: numOfGuesses(word)
                }

                //To be removed
                console.log('the game started')
                message.channel.send(word)

            } else {
                const onGoingMessage = embedMessage(0xFF0000, 'Could not start the game!', 'Unfortunately there is a game ongoing, to start a new game you have to finish this one first. You could also surrender or cancel the game using command `!stop`');
                message.reply({ embeds: [onGoingMessage] });
            }
            break;

        case 'stop':
            if (args[1]) {
                const invalidMessage = embedMessage(0xFF0000, 'Invalid command', 'The bot could not recognize your request, if you having trouble type `!help` for full details');

                message.reply({ embeds: [invalidMessage] });
                break;
            }

            delete games[message.channel.id];

            const stopMessage = embedMessage(0xFFFF00, 'Game over', 'You decided to cancel an ongoing game, now you can start a new one using command `!start`')
            message.reply({ embeds: [stopMessage] });
            break;
    }
});

client.login(token)