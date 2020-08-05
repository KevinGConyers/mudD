const { Users, CurrencyShop, Servers } = require('../dbObjects');

class fighter_help_action {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time){
        this.name = 'Herioc Punch';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time

    }
    action_bark() {
        return "The Fighter " + this.actor_name + " attempts to punch the creature in the jaw!"
    }
}
class thief_help_action {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time) {
        this.name = 'Stealthy Stab';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time

    }
    action_bark() {
        return "The Thief " + this.actor_name + " tries to stab the beast from the shadows"
    }
}
class cleric_help_action  {
    name;
    actor_id;
    actor_name;
    time;
    constructor(id, name, time){
        this.name = 'Holy Light';
        this.actor_id = id;
        this.actor_name = name;
        this.time = time;

    }
    action_bark() {
        return "The Cleric " + this.actor_name + " unleashes a wave of holy light"
    }
}

module.exports = {
	name: 'help-others',
	description: 'Adds the classes helpful action into the action Queue',
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
                    args[args.length - 3].push(new fighter_help_action(message.author.id, message.author.username, time))
                } else if (cclass === "Thief") {
                    args[args.length - 3].push(new thief_help_action(message.author.id, message.author.username, time))
                } else if (cclass === "Cleric") {
                    args[args.length - 3].push(new cleric_help_action(message.author.id, message.author.username, time))
                } else {
                    message.author.send('Your class seems to be corrupted by dark forces, wait until combat is over and change classes to fix it')
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
	}
}