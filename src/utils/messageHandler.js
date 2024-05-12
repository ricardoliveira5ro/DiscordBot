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

module.exports = { botMessage, tooManyArgumentsMessage, onGoingGameMessage };