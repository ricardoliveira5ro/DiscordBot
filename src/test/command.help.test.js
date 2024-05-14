const help = require('../commands/help')
const { botMessage } = require('../utils/messageHandler')

describe('help command', () => {
    test('should display instructions on how to play the game', async () => {
        const message = {
            content: 'help',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = [];
        let games = {};

        games = await help.execute(message, args, games) || games;

        expect(games).toEqual({});
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [botMessage(0x0099FF, 'Guess the word!', 'Type `!start` to begin the game. A new word will be randomized and you can start guessing by hinting a letter with command `!letter [letter]`, or eventually guessing the word typing `!guess [word]`\n\nUse `!stop` to stop an ongoing game or surrender.', '')]
        });
    });
});