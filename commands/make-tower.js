module.exports = {
	name: 'make-tower',
	description: 'Designates a channel as the tower',
	execute(message, args) {
		session_config = args[args.length - 1]
        session_config[message.guild.id]["wizards_tower"] = message.channel
		message.channel.send('Channel Set as wizards tower')
		message.channel.send('**WARNING:** Wizard commands can break the game if used improperly, do not file bug reports about wizard commands unless you are absolutely sure you are using them correctly')
		message.channel.send('To be clear, the developer does not know how to use them correctly, so just do not file please :smile_cat:')
        //console.log(message.channel)
	}
}