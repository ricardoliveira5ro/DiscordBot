const { numOfGuesses, spacesFormatter, guessReplaceFormatter, matchLetter } = require('../utils/functions');

describe('util functions', () => {
    test('number of guesses', () => {
        const wordOdd = "testing";
        const wordEven = "test";

        expect(numOfGuesses(wordOdd)).toEqual(4);
        expect(numOfGuesses(wordEven)).toEqual(2);
    });

    test('spacesFormatter', () => {
        const word = "testing";

        expect(spacesFormatter(word)).toEqual("\\_ \\_ \\_ \\_ \\_ \\_ \\_ ");
    });

    test('guessReplaceFormatter', () => {
        const word = "testing";
        const guesses = [ {isCorrect: true, letter: 'T'}, {isCorrect: false, letter: 'A'}, {isCorrect: true, letter: 'E'} ];

        expect(guessReplaceFormatter(word, guesses)).toEqual("T E \\_ T \\_ \\_ \\_ ");
    });

    test('matchLetter', () => {
        const word = "testing";
        const letterGuess = "T";
        const wrongLetterGuess = "A";

        expect(matchLetter(word, letterGuess)).toBeTruthy()
        expect(matchLetter(word, wrongLetterGuess)).toBeFalsy()
    });
});