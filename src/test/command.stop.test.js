const stop = require('../commands/stop');
const { botMessage } = require('../utils/messageHandler');

describe('stop command', () => {
    test('should stop an ongoing game', async () => {
        const message = {
            content: 'stop',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = [];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'Word Test',
            guesses: [], 
            triesLeft: 5
        }

        games = await stop.execute(message, args, games) || games;

        expect(games).toEqual({});
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [botMessage(0xFFFF00, 'Game canceled', 'You decided to cancel an ongoing game, now you can start a new one using command `!start`')]
        });
    });
});