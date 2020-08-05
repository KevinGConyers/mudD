module.exports = {
	name: 'change-class',
	description: 'Sets the users class for use in combat, cannot be used during combat.',
	execute(message, args ){
        session_config = args[args.length - 1]
        gclasses = args[args.length - 2]
        rclass = args[0]
        
        if (session_config[message.guild.id].active_monster != "None") {
            message.author.send("Classes may not be changed during combat")
        } else if (args.length == 0) {
            message.author.send("Please choose a class")
        } else if (!gclasses.includes(rclass)){
            message.author.send("That is not one the classes. Classes are Fighter, Thief and Cleric")
        } else {
            message.author.send("You are now a " + args[0] + " in the " + message.guild.name + " instance ")
            
        }
        /*
        session_config[message.guild.id] = {"fight_channel": message.channel, "active_monster": "None"}
        message.channel.send('Channel Set as Arena')
        //console.log(message.channel) */
	}
}
