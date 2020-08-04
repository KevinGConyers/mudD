module.exports = {
	name: 'make-tower',
	description: 'Designates a channel as the tower',
	execute(message, args, session_config) {
        session_config[message.guild.id]["wizards_tower"] = message.channel
        message.channel.send('Channel Set as wizards tower')
        //console.log(message.channel)
	}
}