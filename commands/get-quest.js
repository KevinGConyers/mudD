module.exports = {
	name: 'get-quest',
	description: 'dms the player their current quest',
	execute(message, args) {
		message.author.send('You have no current Quest')
	}
}
