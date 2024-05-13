const { botMessage, tooManyArgumentsMessage } = require("../utils/messageHandler");

module.exports = {
    name: "stop",
    async execute(message, args, games) {
        if(args[0]) { 
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return; 
        }

        delete games[message.channel.id];
        
        const stopMessage = botMessage(0xFFFF00, 'Game canceled', 'You decided to cancel an ongoing game, now you can start a new one using command `!start`');
        
        message.reply({ embeds: [stopMessage] });
        return games;
    },
};