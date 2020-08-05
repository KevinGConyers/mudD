module.exports = {
    name: 'spawn',
    description: 'spawns a monster',
    execute(message, args) {
        var Dragon = require('./monsters/Dragon')
        session_config = args[args.length - 1]
        if (message === 'system') {
            session_config[message.guild.id].fight_channel.send("Monster Spawned! Prepare for battle, ye knaves!")
            session_config[message.guild.id].active_monster = new Dragon()
        }else {
            if (!("wizards_tower" in session_config[message.guild.id])) {
                message.channel.send("This command must be used by an arena wizard in their tower, and it seems they have no tower! Please make one ASAP")
            } else if (message.channel.id != session_config[message.guild.id].wizards_tower.id) {
                message.channel.send("This command must be used by an arena wizard in their tower! If you are a wizard, try going there, if not, BEGONE WITH YE")
            } else {
                if (session_config[message.guild.id].active_monster === "None") {
                    //if (args.length == 0) {
                    if ("wizards_tower" in session_config[message.guild.id].wizards_tower) {
                        session_config[message.guild.id].wizards_tower.send("A most brutal Dragon is being summoned for the gladiators to fight!")
                    }
                    session_config[message.guild.id].fight_channel.send("Monster Spawned! Prepare for battle, ye knaves!")
                    session_config[message.guild.id].active_monster = new Dragon()
                    //setTimeout(combatloop, 3000, session_config[message.guild.id].active_monster, session_config[message.guild.id].fight_channel);
                    // }
                } else {
                    session_config[message.guild.id].wizards_tower.send("A fight or summoning is already is progress")
                }
            }
        }
        return null
    }
}
