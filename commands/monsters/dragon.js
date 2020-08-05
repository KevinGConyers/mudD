class Dragon  {

    original_hp
    hp;
    damage;
    type;
    attack_name;
    action;
    actions_until_win

    constructor() {
        this.original_hp = 21;
        this.hp = 21;
        this.damage = 5;
        this.type = "Dragon"
        this.attack_name = "Flame Breath"
        this.actions_until_win = 5;
        this.action = {
            actor_id: "DRAGON",
            actor_name: "DRAGON",
            time: + new Date(),
            action_bark: function () {
                return "The vile Dragon is using it's dastardly **Flame Breath**"
            }
        }
        //super(21, 5, "Dragon", "Flame Breath")
    }

    attack() {
        this.actions_until_win = this.actions_until_win - 1
        console.log("Dargon has " + this.actions_until_win + " left")
    }

    recieveDamage(amount) {
        this.hp = this.hp - amount
        var out = 'The vile ' + this.type + " has been struck for " + amount + " points of damage!"
        if (this.hp < this.original_hp / 2) {
            out = out + "\nThe beast is bloodied!"
        } else  if (this.hp <= 0) {
            out = out + "\nThe beast has been slain!"
        }
        return out
    }
}
module.exports = Dragon;