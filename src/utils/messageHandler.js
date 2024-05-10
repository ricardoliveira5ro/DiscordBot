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

module.exports = { botMessage, tooManyArgumentsMessage };