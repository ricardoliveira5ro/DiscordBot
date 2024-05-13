const { botMessage, tooManyArgumentsMessage } = require("../utils/messageHandler");

module.exports = {
    name: "help",
    async execute(message, args) {
        if(args[0]) { 
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return; 
        }

        const helpMessage = botMessage(0x0099FF, 'Guess the word!', 'Type `!start` to begin the game. A new word will be randomized and you can start guessing by hinting a letter with command `!letter [letter]`, or eventually guessing the word typing `!guess [word]`\n\nUse `!stop` to stop an ongoing game or surrender.', '');
        message.reply({ embeds: [helpMessage] });
    },
};