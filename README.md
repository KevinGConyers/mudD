# MudD: A multi-user dungeon battle experience

Welcome to MudD,  this bot will allow your server to run time based, multi-user battles! This is only a proof of concept right now but the sky is theoretically the limit!
The idea is that a monster spawns, and players can either help each other bring it down, or help themselves to gain more gold immediately. If the monster is slain, all players get a small reward, but if the monster wins all players are fined.

## Functional Commands
- !make-arena: Designates a channel as the arena
- !make-tower: Designates a channel as the tower, where !spawn can be ran
- !spawn: spawns a monster and signals that combat is about to start, is buggy still
- !change-class: \[classname\]: changes a player to the specified class. Classes are Fighter, Cleric, and Thief
- !view-class: pms player their current class
- !balance: pms player their current gold balance
- !help-self: used in combat, player attempts the selfish action of their class
- !help-others: used in combat, player attempts the helpful action of their class
- !view-foe: pms the player the current enemy


## Future Commands:
- !add-roles: adds classes as roles for easier tracking
- !restore: restores channel settings after bot kick
- !get-quest: pms player their current quest  