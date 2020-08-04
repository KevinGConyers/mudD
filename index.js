require('dotenv').config();
config = require('./.config.json')
const Discord = require('discord.js');
const client = new Discord.Client();


const client_token = config.token
const prefix = config.prefix




client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
		message.channel.send(`Command: ${command}`)
});

client.login(client_token);
