const { guessReplaceFormatter, matchLetter } = require("../utils/functions");
const { botMessage, noGameStartedMessage, noLetterMessage, tooManyGuessesMessage, wordInLetterGuessMessage } = require("../utils/messageHandler");

module.exports = {
    name: "letter",
    async execute(message, args, games) {
        if (!games[message.channel.id]) {
            message.reply({ embeds: [noGameStartedMessage] });
            return; 
        }

        if (!args[0]) {
            message.reply({ embeds: [noLetterMessage] });
            return; 
        }

        if (args[1]) {
            message.reply({ embeds: [tooManyGuessesMessage] });
            return;
        }

        if (args[0].length > 1) {
            message.reply({ embeds: [wordInLetterGuessMessage] });
            return;
        }

        const match = matchLetter(games[message.channel.id].word, args[0]);

        //Avoid repeatable guesses
        if (!games[message.channel.id].guesses.some(guess => guess.letter === args[0].toUpperCase())) {
            games[message.channel.id].guesses.push({ isCorrect: match, letter: args[0].toUpperCase()})
            games[message.channel.id].triesLeft--
        }
        
        if (games[message.channel.id].triesLeft === 0) {
            const gameOverMessage = botMessage(
                0xFF0000, 
                'Game Over!', 
                `You ran out of guesses :cry:\nCategory: ${games[message.channel.id].category}\nThe word was:\n \n` +
                `${games[message.channel.id].word.toUpperCase().split('').join(' ')}`
            );

            delete games[message.channel.id];

            message.reply({ embeds: [gameOverMessage] });
            return games;
        }

        const colorLetter = match ? 0x00FF00 : 0xFF0000
        const titleLetter = match ? 'Nice guess!' : 'Wrong guess!'
        const warningSignLetter = (games[message.channel.id].triesLeft === 1) ? ':warning:' : ''
        const encodedWord = guessReplaceFormatter(games[message.channel.id].word, games[message.channel.id].guesses)

        const letterGuessMessage = botMessage(
            colorLetter, 
            titleLetter, 
            `Category: ${games[message.channel.id].category}\n` +
            `Number of guesses left: ${games[message.channel.id].triesLeft} ${warningSignLetter}\n \n` +
            `${encodedWord}` +
            `\n \n:no_entry: Guesses: ${games[message.channel.id].guesses.filter(guess => !guess.isCorrect).map(guess => guess.letter).join(', ')}`,
        )

        message.reply({ embeds: [letterGuessMessage] });
        return games;
    },
};