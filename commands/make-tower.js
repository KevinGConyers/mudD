module.exports = {
	name: 'make-tower',
	description: 'Designates a channel as the tower',
	execute(message, args) {
		session_config = args[args.length - 1]
        session_config[message.guild.id]["wizards_tower"] = message.channel
		message.channel.send('Channel Set as wizards tower')
		message.channel.send('**WARNING:** Spawn is a buggy mess Be careful')
		message.channel.send('**WARNING:** It is only here to facilitate testing and demoing, and would not exist if this were not a jam bot')
		message.channel.send('**WARNING:** If spammed they will break e :smile_cat:')
        //console.log(message.channel)
	}
}