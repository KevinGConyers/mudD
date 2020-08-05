module.exports = {
	name: 'help',
	description: 'Displays usage information',
	execute(message, args) {
        message.channel.send('> Welcome to the MudD Arena Bot and thanks for downloading! ' +
        '\n > This bot facilitates multi-user class based boss battles' +
        '\n > To get started, designate a channel as the arena with ```!make-arena```, and a channel as a wizards tower with ```!make-tower.```' +
        '\n > The tower and arena should be seperate' +
        '\n > Then have players pick a class, with ```!change-class [classname]``` the class names are Fighter, Thief, Cleric case sensitive' +
        '\n\n > All players start with a balance of 5 gold, reset on class change' +
        '\n\n> To start combat, use !spawn in the wizards-tower channel you selected' +
        '\n > Once in combat, players can use !help-self or !help-others to attempt to perform their classes selfish or helpful actions' +
        '\n > Selfish actions grant immediate gold, while helpful actions grant no gold, but do help with winning the current combat encounter' +
        '\n > Combat continues until the spawned maonster is killed, or takes it number of win actions' +
        '\n > After combat, gold is awarded or taken away based on wether the monster or players won' +
        '\n > Additional working commands are ```!balance``` to check gold balance and ```!view-class``` to view the users current player class' +
        '\n > Hope you enjoy!')
        //console.log(message.channel)
	}
}