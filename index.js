//require('dotenv').config();
config = require('./.config.json')
const client_token = config.token;
const prefix = config.prefix;
const session_config = {}
var action_queue = []
var players_to_reward = []

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const { Users, CurrencyShop, Servers } = require('./dbObjects');
const { Op, DataTypes } = require('sequelize');


client.commands = new Discord.Collection();
const gold = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var active_monster
var combat = false
var combat_actions_succed = false
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
	args.push(action_queue)
	args.push(gclasses)
	args.push(session_config)

	if (!(message.guild.id in session_config) && !(command === 'make-arena') && !(command === 'help') && !(command === "restore")) {
		message.channel.send("Please make an arena or run !help");
		return;
	}
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args)
	} catch (error) {
		console.error(error);
	}
	try {
		if (message.guild.id in session_config) {
			if (session_config[message.guild.id].active_monster != "None" && !combat) {
				enableCombat()
				setTimeout(() => {
					session_config[message.guild.id].fight_channel.send("the Foe is an evil " + session_config[message.guild.id].active_monster.type + "!")
					session_config[message.guild.id].fight_channel.send("Combat Begins in around 10 seconds!")
					setTimeout(() => {
						time = + new Date()
						action_queue.push(new combat_start_action('SYSTEM', time));
						combatloop(session_config[message.guild.id].active_monster, session_config[message.guild.id].fight_channel, message.guild.id)
					}, 10000);
				}, 5000);
			}
		}
	} catch (e) {
		console.log(e)
	}

	//	var test = await Servers.findOne( { where:{server_id: message.guild.id }  });
	//	console.log(Servers)

});


client.login(client_token);


async function performAction(action, channel, monster) {
	channel.send(action.action_bark())
	if (action.name === "Start Combat") {
		combat_actions_succed = true;
		return;
	}
	if (action.name === "End Combat") {
		if (monster.hp <= 0) {
			channel.send("A victory! All Heroes shall recieve 2 gold!");
		} else if (monster.actions_until_win <= 0) {
			channel.send("All heroes vanquished, a miserable defeat!");
			channel.send("All heroes will be fined 5 gold for forcing us to witness this travesty");
		}
		combat_actions_succed = false;
		return;
	}
	if (combat_actions_succed == true) {
		if (action.name === "Herioc Punch") {
			players_to_reward.push(action.actor_id)
			channel.send(monster.recieveDamage(getRandomInt(2, 4)))
		} else if (action.name === "Stealthy Stab") {
			players_to_reward.push(action.actor_id)
			channel.send(monster.recieveDamage(getRandomInt(4, 8)))
		} else if (action.name === "Holy Light") {
			players_to_reward.push(action.actor_id)
			channel.send("All heroes healed!")
			monster.actions_until_win = monster.actions_until_win + 1;
			channel.send(monster.recieveDamage(getRandomInt(0, 1)))
		} else if (action.name === 'Cowardly Mugging') {
			players_to_reward.push(action.actor_id)
			var insta_gold = getRandomInt(3, 5)
			var p = await Users.findOne({ where: { user_id: action.actor_id } })
			if (p) {
				console.log(p)
				new_balance = p.get('balance') + insta_gold
				Users.upsert({
					user_id: action.actor_id,
					balance: new_balance
				})
			}
			channel.send("The Fighter " + action.actor_name + " has stolen " + insta_gold + " gold!")
		} else if (action.name === "Lowly Scrounging") {
			players_to_reward.push(action.actor_id)
			var insta_gold = getRandomInt(3, 5)
			var p = await Users.findOne({ where: { user_id: action.actor_id } })
			if (p) {
				new_balance = p.get('balance') + insta_gold
				Users.upsert({
					user_id: action.actor_id,
					balance: new_balance
				})
			}
			channel.send("The Thief " + action.actor_name + " has \"acquired\" " + insta_gold + " gold!")
		} else if (action.name === 'Boastful Prayer') {
			players_to_reward.push(action.actor_id)
			var insta_gold = getRandomInt(3, 5)
			var p = await Users.findOne({ where: { user_id: action.actor_id } })
			if (p) {
				console.log(p)
				new_balance = p.get('balance') + insta_gold
				Users.upsert({
					user_id: action.actor_id,
					balance: new_balance
				})
			}
			channel.send("The Cleric " + action.actor_name + " has been unduly " + insta_gold + " gold!")
		} else {
			monster.attack()
			channel.send("All heros damaged!")
		}

	} else {
		channel.send('But is unnsuccessful!')
	}
}

function combatloop(monster, channel, guild_id) {
	if (typeof (action_queue) !== "undefined" && action_queue.length > 0)
		performAction(action_queue.shift(), channel, monster)
	//channel.send(monster.attack())
	if (monster.hp <= 0) {
		time = + new Date()
		action_queue.unshift(new combat_end_action("SYSTEM", time))
		disableCombat(guild_id)
		performAction(action_queue.shift(), channel, monster)

		action_queue = []
	} else if (monster.actions_until_win <= 0) {
		time = + new Date()
		action_queue.unshift(new combat_end_action("SYSTEM", time))
		disableCombat(guild_id)
		performAction(action_queue.shift(), channel, monster)
		action_queue = []
	} else {
		monster_attacks = getRandomInt(1, 100)
		if (monster_attacks > 80) {
			action_queue.push(monster.action)
		}
		time = getRandomInt(1000, 2500)
		setTimeout(combatloop, time, monster, channel, guild_id);
	}
}

function enableCombat() {
	combat = true
	console.log('Combat Started')
}

function disableCombat(id) {
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

async function awardGold () {
	for (var p_id in players_to_reward) {
		var p = await Users.findOne({ where: { user_id: p_id.actor_id } })
		if (p) {
			console.log(p)
			new_balance = p.get('balance') + 2
			Users.upsert({
				user_id: action.actor_id,
				balance: new_balance
			})
		}
	}
	players_to_reward = []
}

async function awardGold () {
	for (var p_id in players_to_reward) {
		var p = await Users.findOne({ where: { user_id: p_id.actor_id } })
		if (p) {
			console.log(p)
			new_balance = p.get('balance') - 5
			Users.upsert({
				user_id: action.actor_id,
				balance: new_balance
			})
		}
	}
	players_to_reward = []
}



class combat_start_action {
	name;
	actor_id;
	time;
	constructor(id, time) {
		this.name = 'Start Combat';
		this.actor_id = id;
		this.time = time

	}
	action_bark() {
		return "Combat has begun!"
	}
}

class combat_end_action {
	name;
	actor_id;
	time;
	constructor(id, time) {
		this.name = 'End Combat';
		this.actor_id = id;
		this.time = time

	}
	action_bark() {
		return "Combat Complete!"
	}
}