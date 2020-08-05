class Dragon  {

    original_hp
    hp;
    damage;
    type;
    attack_name;

    constructor() {
        this.original_hp = 21;
        this.hp = 21;
        this.damage = 5;
        this.type = "Dragon"
        this.attack_name = "Flame Breath"
        //super(21, 5, "Dragon", "Flame Breath")
    }

    attack() {
        return 'The vile ' + this.type + " is using it's dastardly **" + this.attack_name + "**"
    }

    recieveDamage(amount) {
        this.hp = this.hp - amount
        var out = 'The vile ' + this.type + " has been stuck for " + amount + " points of damage!"
        if (this.hp < this.original_hp / 2) {
            out = out + "\nThe beast is bloodied!"
        } else  if (this.hp <= 0) {
            out = out + "\nThe beast has been slain!"
        }
        return out
    }
}
module.exports = Dragon;