const { Users, CurrencyShop, Servers } = require('../dbObjects');

module.exports = {
	name: 'view-class',
	description: 'DMS The user.',
	async execute(message, args ){
        try {
            var u = await Users.findOne({ where: { user_id: message.author.id } });
            if(u) {
                message.author.send("You are currently a " + u.get('class').slice(5) + " in the " + message.guild.name + " instance ")
            }
           // message.channel.send("You are now a " + args[0] + " in the " + message.guild.name + " instance ")
        }
        catch (e) {
            console.log(e)
        }
	}
}