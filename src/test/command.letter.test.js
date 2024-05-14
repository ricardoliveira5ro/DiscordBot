const letter = require('../commands/letter');
const { botMessage } = require('../utils/messageHandler');
const { guessReplaceFormatter } = require('../utils/functions')

describe('letter command', () => {
    test('should guess a letter in the word', async () => {
        const message = {
            content: 'letter',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['t'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 4
        }

        games = await letter.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: true, letter: 'T'} ], 
            triesLeft: 3
        });

        const letterGuessMessage = botMessage(
            0x00FF00, 
            'Nice guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 3 \n \n` +
            guessReplaceFormatter('testing', games[message.channel.id].guesses) +
            `\n \n:no_entry: Guesses: `,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [letterGuessMessage]
        });
    });


    test('should guess a wrong letter in the word', async () => {
        const message = {
            content: 'letter',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['o'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 4
        }

        games = await letter.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: false, letter: 'O'} ], 
            triesLeft: 3
        });

        const wrongLetterGuessMessage = botMessage(
            0xFF0000, 
            'Wrong guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 3 \n \n` +
            guessReplaceFormatter('testing', games[message.channel.id].guesses) +
            `\n \n:no_entry: Guesses: O`,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [wrongLetterGuessMessage]
        });
    });


    test('should make 3 letter guesses in the word', async () => {
        const message = {
            content: 'letter',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        let args = ['t'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 4
        }

        games = await letter.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: true, letter: 'T'} ], 
            triesLeft: 3
        });

        const letterGuessMessage = botMessage(
            0x00FF00, 
            'Nice guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 3 \n \n` +
            guessReplaceFormatter('testing', games[message.channel.id].guesses) +
            `\n \n:no_entry: Guesses: `,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [letterGuessMessage]
        });

        // ----------------- 2nd guess (Wrong) ---------------------------

        args = ['a']

        games = await letter.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: true, letter: 'T'}, {isCorrect: false, letter: 'A'} ], 
            triesLeft: 2
        });

        const letter2ndGuessMessage = botMessage(
            0xFF0000, 
            'Wrong guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 2 \n \n` +
            guessReplaceFormatter('testing', games[message.channel.id].guesses) +
            `\n \n:no_entry: Guesses: A`,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [letter2ndGuessMessage]
        });

        // ----------------- 3rd guess ---------------------------

        args = ['i']

        games = await letter.execute(message, args, games) || games;

        expect(games[message.channel.id]).toEqual({
            category: 'Category Test',
            word: 'testing',
            guesses: [ {isCorrect: true, letter: 'T'}, {isCorrect: false, letter: 'A'}, {isCorrect: true, letter: 'I'} ], 
            triesLeft: 1
        });

        const letter3rdGuessMessage = botMessage(
            0x00FF00, 
            'Nice guess!', 
            `Category: Category Test\n` +
            `Number of guesses left: 1 :warning:\n \n` +
            guessReplaceFormatter('testing', games[message.channel.id].guesses) +
            `\n \n:no_entry: Guesses: A`,
        )
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [letter3rdGuessMessage]
        });
    });


    test('ran out of guesses', async () => {
        const message = {
            content: 'letter',
            channel: {
                id: 123456
            },
            reply: jest.fn()
        }
        const args = ['t'];

        let games = {};
        games[123456] = {
            category: 'Category Test',
            word: 'testing',
            guesses: [], 
            triesLeft: 1
        }

        games = await letter.execute(message, args, games) || games;

        expect(games).toEqual({});
        expect(games[message.channel.id]).toBeUndefined();

        const encodedWord = 'testing'.toUpperCase().split('').join(' ');
        const gameOverMessage = botMessage(
            0xFF0000, 
            'Game Over!', 
            `You ran out of guesses :cry:\nCategory: Category Test\nThe word was:\n \n` +
            encodedWord
        );
        expect(message.reply).toHaveBeenCalledWith({
            embeds: [gameOverMessage]
        });
    });
});