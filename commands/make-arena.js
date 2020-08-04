module.exports = {
	name: 'make-arena',
	description: 'sets the current channel as the arena',
	execute(message, args, session_config) {
        session_config[message.guild.id] = {"fight_channel": message.channel, "monser_to_spawn": "none", "active_monster": "none"}
        message.channel.send('Channel Set as Arena')
        //console.log(message.channel)
	}
}
