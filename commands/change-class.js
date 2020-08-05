const { Users, CurrencyShop, Servers } = require('../dbObjects');

module.exports = {
	name: 'change-class',
	description: 'Sets the users class for use in combat, cannot be used during combat.',
	async execute(message, args ){
        session_config = args[args.length - 1]
        gclasses = args[args.length - 2]
        rclass = args[0]
        if (session_config[message.guild.id].active_monster != "None") {
            message.channel.send("Classes may not be changed during combat")
        } else if (args.length == 0) {
            message.channel.send("Please choose a class")
        } else if (!gclasses.includes(rclass)){
            message.channel.send("That is not one the classes. Classes are Fighter, Thief and Cleric")
        } else {
        try {
            var u = await Users.upsert({
                user_id: message.author.id,
                class: "MudD_" + rclass,
                balance: 5
            });
            message.author.send("You are now a " + args[0] + " in the " + message.guild.name + " instance ")
        }
        catch (e) {
            console.log(e)
        }
            
        }
        /*
        session_config[message.guild.id] = {"fight_channel": message.channel, "active_monster": "None"}
        message.channel.send('Channel Set as Arena')
        //console.log(message.channel) */
	}
}

/* CODE FOR LATER:
if(args[0] === "Fighter") {
                const remove1 = message.guild.roles.fetch(role => role.name === "MudD_thief")
                if (remove1) {
                    remove1.guild.members.cache.get(message.author.id).roles.remove(remove1)
                }
                const remove2 = message.guild.roles.fetch(role => role.name === "MudD_cleric")
                if (remove2) {
                    remove2.guild.members.cache.get(message.author.id).roles.remove(remove2)
                }
                const add = message.guild.roles.fetch(role => "MudD_fighter");
                if (add) {
                    add.guild.members.cache.get(message.author.id).roles.add(add)
                }
            } else if (args[0] === "Cleric") {
                const remove1 = message.guild.roles.fetch(role => role.name === "MudD_thief")
                if (remove1) message.author.removeRole(remove1)
                const remove2 = message.guild.roles.fetch(role => role.name === "MudD_fighter")
                if (remove2) message.author.removeRole(remove1)
                const add = message.guild.roles.fetch(role => "MudD_cleric");
                if (add) message.author.addRole(add);
            } else {
                const remove1 = message.guild.roles.fetch(role => role.name === "MudD_cleric")
                if (remove1) message.author.removeRole(remove1)
                const remove2 = message.guild.roles.fetch(role => role.name === "MudD_fighter")
                if (remove2) message.author.removeRole(remove1)
                const add = message.guild.roles.fetch(role => "MudD_thief");
                if (add) message.author.addRole(add);
            }
            */
