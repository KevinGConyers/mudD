//require('dotenv').config();
config = require('./.config.json')
const client_token = config.token;
const prefix = config.prefix;
const session_config = {}

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const { Users, CurrencyShop, Servers } = require('./dbObjects');
const { Op } = require('sequelize');


client.commands = new Discord.Collection();
const gold = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var active_monster
var combat = false
var gclasses = ["Fighter", "Thief", "Cleric"]


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log("Ready");
});


client.on('message', async message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	args.push(Servers)
	args.push(gclasses)
	args.push(session_config)

	if (!(message.guild.id in session_config) && !(command === 'make-arena') && !(command === 'help') && !(command === "restore")) {
		message.channel.send("Please make an arena or run !help");
		return;
	}
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
	if (session_config[message.guild.id].active_monster != "None" && !combat) {
		enableCombat()
		setTimeout(() => {
			session_config[message.guild.id].fight_channel.send("the Foe is an evil " + session_config[message.guild.id].active_monster.type + "!" )
			session_config[message.guild.id].fight_channel.send("Combat Begins in around 10 seconds!" )
			setTimeout(() => {
				session_config[message.guild.id].fight_channel.send("Combat has begun!") 
				setTimeout(combatloop, 15000, session_config[message.guild.id].active_monster, session_config[message.guild.id].fight_channel, message.guild.id, session_config);
			}, 10000);
		}, 5000);
	}

//	var test = await Servers.findOne( { where:{server_id: message.guild.id }  });
//	console.log(Servers)

});


client.login(client_token);

function combatloop(monster, channel, guild_id, config) {
			channel.send(monster.attack())
			event = getRandomInt(0, 9)
			if (event <= 9) {
				channel.send("The Ground Quakes, damaging your foe")
				channel.send(monster.recieveDamage(22));
			}
			if (monster.hp <= 0) {
				disableCombat(guild_id, config)
				channel.send("A victory! Those devils who remain shall recieve the spoils");
			} else {
			time = getRandomInt(1000, 2500)
		setTimeout(combatloop, time, monster, channel);
			}
}

function enableCombat() {
	combat = true
	console.log('Combat Started')
}

function disableCombat(id, config) {
	session_config[id].active_monster = "None"	
	combat = false;
	console.log('Combat Ended')
}

function spawnController() {
	client.commands.get(spawn).execute('system', 'args', session_config);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadDataIntoSession() {

}