const { Users, CurrencyShop, Servers } = require('../dbObjects');

module.exports = {
	name: 'restore',
	description: 'restores channel information',
	async execute(message, args) {
        session_config = args[args.length - 1]
        message.channel.send('Attempting to restore saved channel information')
        //console.log(args)
		try {
            var u = await Servers.findOne({ where: { server_id: message.guild.id } });
            if (u) {
                session_config[message.guild.id].fight_channel = JSON.parse(u.get('fight_channel'))
                session_config[message.guild.id].wizards_tower = JSON.parse(u.get('wizards_tower'))
            }
        } catch (e) {
            message.channel.send('Information is corrupted by dark forces, please re-designate manually')
            console.log(e)
        }
        //console.log(message.channel)
	}
}