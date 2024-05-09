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
const { generateRandomWord, numOfGuesses, spacesFormatter, matchLetter, guessReplaceFormatter } = require('./words');
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

                const encodedWord = spacesFormatter(games[message.channel.id].word)

                const startMessage = embedMessage(
                    0x0099FF, 
                    'Game on!', 
                    `Category: ${category}\n` +
                    `Number of guesses left: ${games[message.channel.id].triesLeft}\n \n` +
                    encodedWord,
                    'Any guesses?'
                )
                message.reply({ embeds: [startMessage] });

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

            const stopMessage = embedMessage(0xFFFF00, 'Game canceled', 'You decided to cancel an ongoing game, now you can start a new one using command `!start`')
            message.reply({ embeds: [stopMessage] });
            break;

        case 'letter':
            if(!games[message.channel.id]) {
                const noGameStartedMessage = embedMessage(0xFF0000, 'No game started', 'Before start guessing type `!start` to start the game');

                message.reply({ embeds: [noGameStartedMessage] });
                break;
            }

            if (!args[1]) {
                const noLetterMessage = embedMessage(0xFF0000, 'No letter guess', 'The bot could not recognize your letter guess, try input i.e. `!letter A`');

                message.reply({ embeds: [noLetterMessage] });
                break;
            }

            if (args[2]) {
                const tooManyGuessesMessage = embedMessage(0xFF0000, 'Too many guesses', 'The bot could not process your guess, try input just 1 guess per command');

                message.reply({ embeds: [tooManyGuessesMessage] });
                break;
            }

            if (args[1].length > 1) {
                const wordInLetterGuessMessage = embedMessage(0xFF0000, 'Too many letters', 'The bot could not process your guess. This command only allows 1 letter, if you want to guess the word type `!guess [word]`');

                message.reply({ embeds: [wordInLetterGuessMessage] });
                break;
            }

            const match = matchLetter(games[message.channel.id].word, args[1]);

            //Avoid repeatable guesses
            if (!games[message.channel.id].guesses.some(guess => guess.letter === args[1].toUpperCase())) {
                games[message.channel.id].guesses.push({ isCorrect: match, letter: args[1].toUpperCase()})
                games[message.channel.id].triesLeft--
            }

            if (games[message.channel.id].triesLeft === 0) {
                const gameOverMessage = embedMessage(
                    0xFF0000, 
                    'Game Over!', 
                    `You ran out of guesses :cry:\nCategory: ${games[message.channel.id].category}\nThe word was:\n \n` +
                    `${games[message.channel.id].word.toUpperCase().split('').join(' ')}`
                );

                delete games[message.channel.id];
    
                message.reply({ embeds: [gameOverMessage] });
                break;
            }

            const colorLetter = match ? 0x00FF00 : 0xFF0000
            const titleLetter = match ? 'Nice guess!' : 'Wrong guess!'
            const warningSignLetter = (games[message.channel.id].triesLeft === 1) ? ':warning:' : ''
            const encodedWord = guessReplaceFormatter(games[message.channel.id].word, games[message.channel.id].guesses)

            const letterGuessMessage = embedMessage(
                colorLetter, 
                titleLetter, 
                `Category: ${games[message.channel.id].category}\n` +
                `Number of guesses left: ${games[message.channel.id].triesLeft} ${warningSignLetter}\n \n` +
                `${encodedWord}` +
                `\n \n:no_entry: Guesses: ${games[message.channel.id].guesses.filter(guess => !guess.isCorrect).map(guess => guess.letter).join(', ')}`,
            )

            message.reply({ embeds: [letterGuessMessage] });
            break;

        case 'guess':
            if(!games[message.channel.id]) {
                const noGameStartedMessage = embedMessage(0xFF0000, 'No game started', 'Before start guessing type `!start` to start the game');

                message.reply({ embeds: [noGameStartedMessage] });
                break;
            }

            if (!args[1]) {
                const noGuessMessage = embedMessage(0xFF0000, 'No guess inputted', 'The bot could not recognize your guess, try input i.e. `!guess car`');

                message.reply({ embeds: [noGuessMessage] });
                break;
            }

            if (!games[message.channel.id].guesses.some(guess => guess.letter === args.slice(1).join(" ").toUpperCase())) {
                games[message.channel.id].guesses.push({ isCorrect: matchLetter, letter: args.slice(1).join(" ").toUpperCase()})
                games[message.channel.id].triesLeft--
            }
            
            const matchGuess = games[message.channel.id].word.toUpperCase() === args.slice(1).join(" ").toUpperCase()

            if (!matchGuess && games[message.channel.id].triesLeft === 0) {
                const gameOverMessage = embedMessage(
                    0xFF0000, 
                    'Game Over!', 
                    `You ran out of guesses :cry:\nCategory: ${games[message.channel.id].category}\nThe word was:\n \n` +
                    `${games[message.channel.id].word.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')}`   
                );

                delete games[message.channel.id];
    
                message.reply({ embeds: [gameOverMessage] });
                break;
            }

            const colorGuess = matchGuess ? 0x00FF00 : 0xFF0000
            const titleGuess = matchGuess ? 'You won!' : 'Wrong guess!'
            const guessEncodedMessage = matchGuess ? `${games[message.channel.id].word.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')}`
                                                    : guessReplaceFormatter(games[message.channel.id].word, games[message.channel.id].guesses)
            const warningSignGuess = (games[message.channel.id].triesLeft === 1) ? ':warning:' : ''

            const guessMessage = embedMessage(
                colorGuess, 
                titleGuess, 
                `Category: ${games[message.channel.id].category}\n` +
                `Number of guesses left: ${games[message.channel.id].triesLeft} ${warningSignGuess}\n \n` +
                `${guessEncodedMessage}` +
                `\n \n:no_entry: Guesses: ${games[message.channel.id].guesses.filter(guess => !guess.isCorrect).map(guess => guess.letter).join(', ')}`,
            )

            if (matchGuess)
                delete games[message.channel.id];

            message.reply({ embeds: [guessMessage] });
            break;
    }
});

client.login(token)