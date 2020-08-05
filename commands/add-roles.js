module.exports = {
    name: 'add-roles',
    description: 'adds the class roles to the server',
    execute(message, args, session_config, client = null) {
            gclasses = args[args.length - 2]
            session_config = args[args.el]
            if (!("wizards_tower" in session_config[message.guild.id])) {
                message.channel.send("This command must be used by an arena wizard in their tower, and it seems they have no tower! Please make one ASAP")
            } else if (message.channel.id != session_config[message.guild.id].wizards_tower.id) {
                message.channel.send("This command must be used by an arena wizard in their tower! If you are a wizard, try going there, if not, BEGONE WITH YE")
            } else {
                for (var gclass of gclasses) {
                    message.guild.roles.create({
                        data: {
                            name: 'MudD_' + gclass,
                            color: 'BLUE',

                        },
                        reason: 'Make the MudD arena work right'
                    })
                    .then(console.log("roles created"))
                    .catch(console.error)
                }
            }
    }
}
