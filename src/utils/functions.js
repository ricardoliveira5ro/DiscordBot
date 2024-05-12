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

module.exports = { numOfGuesses, spacesFormatter };