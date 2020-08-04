//require('dotenv').config();
config = require('./.config.json')
const client_token = config.token;
const prefix = config.prefix;
const session_config = {}

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	combat_loop(session_config)
});


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	if (!(message.guild.id in session_config) && !(command === 'make-arena')) {
		message.channel.send("Please make an arena");
		return;
	}
	try {
		client.commands.get(command).execute(message, args, session_config);
	} catch (error) {
		console.error(error);
	}

});


client.login(client_token);

while()
