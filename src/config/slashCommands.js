const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    help: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays instructions on how to play the game'),
    start: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts a new word guessing game'),
    stop: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the ongoing word guessing game'),
    letter: new SlashCommandBuilder()
        .setName('letter')
        .setDescription('Guesses a letter in the word')
        .addStringOption(option =>
            option.setName('letter')
                .setDescription('Letter guess')
                .setRequired(true)),
    guess: new SlashCommandBuilder()
        .setName('guess')
        .setDescription('Guesses the entire word')
        .addStringOption(option =>
            option.setName('word')
                .setDescription('Word guess')
                .setRequired(true)),
}