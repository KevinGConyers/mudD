module.exports = {
	name: 'restore',
	description: 'restores channel information',
	execute(message, args) {
        session_config = args[args.length - 1]
        Servers = args[args.legnth - 3]
        message.channel.send('Attempting to restore saved channel information')
        console.log(args)
		try {
            var server = Servers.findOne( {where: { server_id: message.guild.id } });
            if (server) {
                session_config[message.guild.id].fight_channel = JSON.parse(server.fight_channel)
                session_config[message.guild.id].wizards_tower = JSON.parse(server.wizards_tower)
            }
        } catch (e) {
            message.channel.send('Information is corrupted by dark forces, please re-designate manually')
            console.log(e)
        }
        //console.log(message.channel)
	}
}