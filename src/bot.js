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

const games = {};

client.on('messageCreate', (message) => {
    let args = message.content.substring(COMMAND_PREFIX.length).split(" ");


    switch(args[0]) {
        case 'help':
            if (args[1]) {
                const invalidMessage = {
                    color: 0xFF0000,
                    title: 'Invalid command',
                    description: 'The bot could not recognize your request, if you having trouble type `!help` for full details'
                };

                message.reply({ embeds: [invalidMessage] });
                break;
            }

            const helpEmbed = {
                color: 0x0099ff,
                title: 'Guess the word!',
                description: 'Type `!start` to begin the game. A new word will be randomized and you can start guessing by hinting a letter with command `!letter [letter]`, or eventually guessing the word typing `!guess [word]`\n\nUse `!stop` to stop an ongoing game or surrender.',
                footer: {
                    text: 'Enjoy the game!',
                },
            };
            message.reply({ embeds: [helpEmbed] });
            break;

        case 'start':
            if (args[1]) {
                const invalidMessage = {
                    color: 0xFF0000,
                    title: 'Invalid command',
                    description: 'The bot could not recognize your request, if you having trouble type `!help` for full details'
                };

                message.reply({ embeds: [invalidMessage] });
                break;
            }

            if (!games[message.channel.id]) {
                const word = generateRandomWord();

                games[message.channel.id] = {
                    word: word,
                    guesses: [],
                    triesLeft: 6 //to be adjusted
                }

                //To be removed
                console.log('the game started')
                message.channel.send(word)

            } else {
                const onGoingMessage = {
                    color: 0xFF0000,
                    title: 'Could not start the game!',
                    description: 'Unfortunately there is a game ongoing, to start a new game you have to finish this one first. You could also surrender or cancel the game using command `!stop`'
                };

                message.reply({ embeds: [onGoingMessage] });
            }
            break;
    }
});

client.login(token)