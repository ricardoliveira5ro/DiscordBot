const botMessage = (color, title, description, footer) => {
    return {
        color: color,
        title: title,
        description: description,
        footer: {
            text: footer,
        },
    };
};

const tooManyArgumentsMessage = botMessage(0xFF0000, 'Invalid command', 'The bot could not recognize your request, if you having trouble type `!help` for full details', '');
const onGoingGameMessage = botMessage(0xFF0000, 'Could not start the game!', 'Unfortunately there is a game ongoing, to start a new game you have to finish this one first. You could also surrender or cancel the game using command `!stop`');
const noGameStartedMessage = botMessage(0xFF0000, 'No game started', 'Before start guessing type `!start` to start the game');
const noGuessMessage = botMessage(0xFF0000, 'No guess inputted', 'The bot could not recognize your guess, try input i.e. `!guess car`');
const letterInGuessMessage = botMessage(0xFF0000, 'Invalid command', 'The bot was expecting complete words and not a letter, for guessing a letter type `!letter [letter]`');
const noLetterMessage = botMessage(0xFF0000, 'No letter guess', 'The bot could not recognize your letter guess, try input i.e. `!letter A`');
const tooManyGuessesMessage = botMessage(0xFF0000, 'Too many guesses', 'The bot could not process your guess, try input just 1 guess per command');
const wordInLetterGuessMessage = botMessage(0xFF0000, 'Too many letters', 'The bot could not process your guess. This command only allows 1 letter, if you want to guess the word type `!guess [word]`');

module.exports = { 
    botMessage, 
    tooManyArgumentsMessage, 
    onGoingGameMessage, 
    noGameStartedMessage, 
    noGuessMessage, 
    letterInGuessMessage, 
    noLetterMessage,
    tooManyGuessesMessage,
    wordInLetterGuessMessage
};