const { Users, CurrencyShop, Servers } = require('../dbObjects');

module.exports = {
	name: 'balance',
	description: 'Displays the users gold balance.',
	async execute(message, args ){
        try {
            var u = await Users.findOne({ where: { user_id: message.author.id } });
            if(u) {
                message.author.send("You currenly have " + u.get('balance') + " gold in the " + message.guild.name + " instance ")
            }
           // message.channel.send("You are now a " + args[0] + " in the " + message.guild.name + " instance ")
        }
        catch (e) {
            console.log(e)
        }
	}
}