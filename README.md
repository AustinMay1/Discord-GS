# Discord Mule Tracker

The name isn't very creative but this is a simple Discord bot that Interfaces with Google Sheets API to store an account name and account balance. Inside of ``index.js`` you will find an express server running, paired with Nodemon this allows for changes to be updated in real time without the need for starting/stopping the bot.

You can create, read, and update cell/row values.

# Files

All commands are slash commands. They can be found in ``commands/tools``.
Each command is run through ``functions/handlers`` & ``events/client``.

You will need to obtain credentials for the Google Sheets API and store it in ``./`` renamed to ``creds.json`` or whatever name you like but you will need to update every reference of it in the code. 

The discordToken & spreadsheetId are stored in a ``.env`` file. (dotenv package)

## Run

The bot can be ran simply by typing ``npx nodemon``