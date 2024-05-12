function numOfGuesses(word) {
    //50% percentage | (i.e.) 4 letters -> 2 guesses | 3 letters 2 guesses (roundUp)
    return Math.ceil(word.split(' ').join('').length / 2);
}

function spacesFormatter(word) {
    let spaces = '';

    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === ' ')
            spaces += '\u1CBC\u1CBC';
        else
            spaces += '\\_\u0020';
    }

    return spaces;
}

function guessReplaceFormatter(word, guesses) {
    let encodedWord = '';
    const correctGuesses = guesses.filter((guess) => guess.isCorrect).map(guess => guess.letter.toUpperCase());

    for (let i = 0; i < word.length; i++) {
        if (correctGuesses.some(guess => guess === word.charAt(i).toUpperCase()))
            encodedWord += (word.charAt(i).toUpperCase() + '\u0020')
        else if (word.charAt(i) === ' ')
            encodedWord += '\u1CBC\u1CBC';
        else
            encodedWord += '\\_\u0020';
    }

    return encodedWord
}

function matchLetter(word, letter) {
    return word.toUpperCase().includes(letter.toUpperCase());
}

module.exports = { numOfGuesses, spacesFormatter, guessReplaceFormatter, matchLetter };