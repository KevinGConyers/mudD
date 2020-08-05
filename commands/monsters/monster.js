class Monster {
    original_hp
    hp;
    damage;
    type;
    attack_name;

    constructor(hp, damage, type, attack_name) {
        this.original_hp = hp
        this.hp = hp
        this.damage = damage
        this.type = type
        this.attack_name = attack_name
    }

    attack() {
        return 'The vile' + this.type + " is using it's dastardly " + this.attack_name
    }

    recieveDamage(amount) {
        this.hp = this.hp - amountS
        var out = 'The vile' + this.type + " has been stuck for " + amount + " of damage!"
        if (this.hp < this.original_hp / 2) {
            out = out + "The beast is bloodied!"
        } else  if (this.hp <= 0) {
            out = out + "The beast has been slain!"
        }
        return out
    }
}