const { guessReplaceFormatter } = require("../utils/functions");
const { botMessage, noGameStartedMessage, noGuessMessage, letterInGuessMessage, } = require("../utils/messageHandler");

module.exports = {
    name: "guess",
    async execute(message, args, games) {
        if(!games[message.channel.id]) {
            message.reply({ embeds: [noGameStartedMessage] });
            return; 
        }

        if (!args[0]) {
            message.reply({ embeds: [noGuessMessage] });
            return;
        }

        if (args[0].length <= 1) {
            message.reply({ embeds: [letterInGuessMessage] });
            return;
        }
        

        const isMatchGuess = games[message.channel.id].word.toUpperCase() === args.join(" ").toUpperCase()
        
        //Check if it's duplicated guess, if not add to the list and decrement tries left counter
        if (!games[message.channel.id].guesses.some(guess => guess.letter === args.join(" ").toUpperCase())) {            
            games[message.channel.id].guesses.push({ isCorrect: isMatchGuess, letter: args.join(" ").toUpperCase()})
            games[message.channel.id].triesLeft--
        }

        //Game over condition
        if (!isMatchGuess && games[message.channel.id].triesLeft === 0) {
            const gameOverMessage = botMessage(
                0xFF0000, 
                'Game Over!', 
                `You ran out of guesses :cry:\nCategory: ${games[message.channel.id].category}\nThe word was:\n \n` +
                `${games[message.channel.id].word.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')}`   
            );

            delete games[message.channel.id];

            message.reply({ embeds: [gameOverMessage] });
            return games;
        }

        const colorGuess = isMatchGuess ? 0x00FF00 : 0xFF0000
        const titleGuess = isMatchGuess ? 'You won!' : 'Wrong guess!'
        const guessEncodedMessage = isMatchGuess ? `${games[message.channel.id].word.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')}`
                                                : guessReplaceFormatter(games[message.channel.id].word, games[message.channel.id].guesses)
        const warningSignGuess = (games[message.channel.id].triesLeft === 1) ? ':warning:' : ''

        const guessMessage = botMessage(
            colorGuess, 
            titleGuess, 
            `Category: ${games[message.channel.id].category}\n` +
            `Number of guesses left: ${games[message.channel.id].triesLeft} ${warningSignGuess}\n \n` +
            `${guessEncodedMessage}` +
            `\n \n:no_entry: Guesses: ${games[message.channel.id].guesses.filter(guess => !guess.isCorrect).map(guess => guess.letter).join(', ')}`,
        )

        if (isMatchGuess)
            delete games[message.channel.id];

        message.reply({ embeds: [guessMessage] });
        return games;
    },
};