const { botMessage, tooManyArgumentsMessage, onGoingGameMessage } = require("../utils/messageHandler");
const { generateRandomWord } = require("../data/words");
const { numOfGuesses, spacesFormatter } = require("../utils/functions");

module.exports = {
    name: "start",
    async execute(message, args, games) {
        if(args[0]) { 
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return; 
        }

        if (games[message.channel.id]) {
            message.reply({ embeds: [onGoingGameMessage] });
            return;
        }


        const { category, word } = generateRandomWord();
        const encodedWord = spacesFormatter(word);

        games[message.channel.id] = {
            category: category,
            word: word,
            guesses: [], 
            triesLeft: numOfGuesses(word)
        }

        const startMessage = botMessage(
            0x0099FF, 
            'Game on!', 
            `Category: ${category}\n` +
            `Number of guesses left: ${games[message.channel.id].triesLeft}\n \n` +
            encodedWord,
            'Any guesses?'
        )

        message.reply({ embeds: [startMessage] });
        return games;
    },
};