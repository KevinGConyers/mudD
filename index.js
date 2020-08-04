require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();


var client_token = ""

if (process.env.MUDDTOKEN) {
	client_token = process.env.MUDDTOKEN
} else {
	console.log("no token defined")
	exit()
}



client.once('ready', () => {
	console.log('Ready!');
});

client.login(client_token);
