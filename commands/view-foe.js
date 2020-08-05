module.exports = {
    name: 'view-foe',
    description: 'Returns the current monster name',
    execute(message, args, session_config, client = null) {
        if (session_config[message.guild.id].active_monster === "None") {
            message.channel.send("No current foe to fight")
        } else {
            message.channel.send("The current foe is a " + session_config[message.guild.id].active_monster.type)
        }
    }
}
