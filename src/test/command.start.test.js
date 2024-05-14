const start = require('../commands/start');
const { botMessage, onGoingGameMessage } = require('../utils/messageHandler');
const { spacesFormatter } = require('../utils/functions')

describe('start command', () => {
    test('should start a new game', async () => {
        const message = {
            content: 'start',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = [];
        let games = {};

        games = await start.execute(message, args, games);

        expect(games).toHaveProperty(String(message.channel.id));

        const startMessage = botMessage(
            0x0099FF, 
            'Game on!', 
            `Category: ${games[message.channel.id].category}\n` +
            `Number of guesses left: ${games[message.channel.id].triesLeft}\n \n` +
            spacesFormatter(games[message.channel.id].word),
            'Any guesses?'
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [startMessage]
        });
    });

    test('should reply with an error if there is an ongoing game', async () => {
        const message = {
            content: 'start',
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

        games = await start.execute(message, args, games) || games;

        expect(message.reply).toHaveBeenCalledWith({
            embeds: [onGoingGameMessage]
        });
    });
});