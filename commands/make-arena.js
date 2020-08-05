const { Users, CurrencyShop, Servers } = require('../dbObjects');

module.exports = {
	name: 'make-arena',
	description: 'sets the current channel as the arena',
	execute(message, args, session_config) {
		session_config = args[args.length - 1]
        session_config[message.guild.id] = {"fight_channel": message.channel, "active_monster": "None"}
		message.channel.send('Channel Set as Arena')
		//console.log(message.guild)
		id = message.guild.id
		channel = JSON.stringify(message.channel)
		try {
			var server = Servers.upsert({
				server_id: id,
				fight_channel: channel
			});
			console.log("Saved fight to database")
		}
       catch (e) {
		   console.log(e)
	   }
	}
}
