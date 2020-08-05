const { Users, CurrencyShop, Servers } = require('../dbObjects');

class fighter_self_action {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time){
        this.name = 'Cowardly Mugging';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time

    }
    action_bark() {
        return "The Fighter " + this.actor_name + " attempts to mug a fellow galdiator!"
    }
}
class thief_help_action {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time) {
        this.name = 'Lowly Scrounging';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time

    }
    action_bark() {
        return "The Thief " + this.actor_name + " trys to liberate some gold!"
    }
}
class cleric_help_action  {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time){
        this.name = 'Boastful Prayer';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time;

    }
    action_bark() {
        return "The Cleric " + this.actor_name + " prays for an unjust reward!"
    }
}

module.exports = {
	name: 'help-self',
	description: 'Adds the classes selfish action to the action queue',
	async execute(message, args ){
        
        if (args[args.length - 1].active_monster === "None") {
            message.channel.send('Nothing to do, wait for combat to begin')
        } else {
        try {
            var u = await Users.findOne({ where: { user_id: message.author.id } });
            if(u) {
                var cclass =  u.get('class').slice(5)
                var time = + new Date()
                if (cclass === "Fighter") {
                    args[args.length - 3].push(new fighter_self_action(message.author.id, message.author.username, time))
                } else if (cclass === "Thief") {
                    args[args.length - 3].push(new thief_self_action(message.author.id, message.author.username, time))
                } else if (cclass === "Cleric") {
                    args[args.length - 3].push(new cleric_self_action(message.author.id, message.author.username, time))
                } else {
                    message.author.send('Your class seems to be corrupted by dark forces, wait until combat is over and change classes to fix it')
                }
            }
           // message.channel.send("You are now a " + args[0] + " in the " + message.guild.name + " instance ")
        }
        catch (e) {
            console.log(e)
        }
    }
	}
}