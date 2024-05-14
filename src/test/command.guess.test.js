const guess = require('../commands/guess');
const { botMessage } = require('../utils/messageHandler');
const { guessReplaceFormatter } = require('../utils/functions')

describe('guess command', () => {
    test('should guess the word', async () => {
        const message = {
            content: 'guess',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['testing'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 4
        }

        games = await guess.execute(message, args, games) || games;

        expect(games).toEqual({});
        expect(games[message.channel.id]).toBeUndefined();

        const guessEncodedMessage = 'testing'.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')
        const guessMessage = botMessage(
            0x00FF00, 
            'You won!', 
            `Category: Category Test\n` +
            `Number of guesses left: 3 \n \n` +
            guessEncodedMessage +
            `\n \n:no_entry: Guesses: `,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [guessMessage]
        });
    });


    test('should wrong guess the word', async () => {
        const message = {
            content: 'guess',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['test'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 4
        }

        games = await guess.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: false, letter: 'TEST'} ], 
            triesLeft: 3
        });

        const guessEncodedMessage = guessReplaceFormatter('testing', games[message.channel.id].guesses)
        const guessMessage = botMessage(
            0xFF0000, 
            'Wrong guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 3 \n \n` +
            guessEncodedMessage +
            `\n \n:no_entry: Guesses: TEST`,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [guessMessage]
        });
    });


    test('ran out of guesses', async () => {
        const message = {
            content: 'guess',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['test'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 1
        }

        games = await guess.execute(message, args, games) || games;

        expect(games).toEqual({});
        expect(games[message.channel.id]).toBeUndefined();

        const guessEncodedMessage = 'testing'.toUpperCase().split('').map(char => char === ' ' ? '\u1CBC' : char).join(' ')
        const guessMessage = botMessage(
            0xFF0000, 
            'Game Over!',
            `You ran out of guesses :cry:\nCategory: Category Test\nThe word was:\n \n` +
            guessEncodedMessage
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [guessMessage]
        });
    });
});