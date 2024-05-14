# Word Guesser

This Discord bot allows users to play a word guessing game within their Discord server. The bot randomly selects a word from various categories, and players can guess letters or the entire word to uncover the hidden word. The game provides feedback on correct and incorrect guesses and keeps track of the number of attempts left. Players can start, stop, and get help with commands

### Commands
* `!help` or `/help` : Displays instructions on how to play the game.
* `!start` or `/start`: Starts a new word guessing game.
* `!stop` or `/stop` : Stops the ongoing word guessing game.
* `!letter [letter]` or `/letter [letter]` : Guesses a letter in the word.
* `!guess [word]` or `/guess [word]` : Guesses the entire word.

### Tech Stack and Packages
* Node.js
* Discord.js
* @discordjs/rest
* discord-api-types
* jest
* dotenv

### Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. In Bot tab enable "Privileged Gateway Intents"
3. If you don't have or remember your discord "token", in Bot tab you can reset your token (You will need this token)
4. In OAuth2 tab select "bot" for the scope and "Administrator" permission bellow,
5. Copy the generated URL at the bottom at paste it into your browser (This URL is the invite for the bot for any server you want)

### Run
1. Clone the repository to your machine
2. Run `npm install` to install all the dependencies and packages
3. Create a .env file and add your Discord bot token `token=[token]` and `guild_id=[guild_id]`. (Add your .env file to your .gitignore file, if you are commiting any code)
4. Install nodemon `npm install -g nodemon` to be able to run your bot locally
5. Run `nodemon` and your bot will be online
6. Finally start a new game in Discord and enjoy!
