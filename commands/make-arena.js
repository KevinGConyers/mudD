module.exports = {
	name: 'make-arena',
	description: 'sets the current channel as the arena',
	execute(message, args) {
		message.author.send('You have no current Quest')
	}
}
