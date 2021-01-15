const roleDefender = {
    code: 200,
    body: [
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "tough",
        "attack",
        "move",
        "move",
    ],
    initialMemory: function (initialTarget) {
        return {
            role: this.code,
            target: initialTarget
        };
    },
    run: function (creep) {
        // Find new target if current target not valid
        if (
            creep.memory.target === undefined ||
            creep.memory.target === false ||
            Game.getObjectById(creep.memory.target.id) === undefined
        ) {
            // Do something more intelligent here
            for (const hostile in creep.room.memory.hostiles) {
                creep.memory.target = creep.room.memory.hostiles[hostile];
                break;
            }
        }

        if (
            Math.abs(creep.memory.target.pos.x - creep.pos.x) > 1 ||
            Math.abs(creep.memory.target.pos.y - creep.pos.y) > 1
        ) {
            creep.moveTo(creep.memory.target.pos.x, creep.memory.target.pos.y);
        } else {
            creep.attack(Game.getObjectById(creep.memory.target.id));
        }
    },
};

module.exports = roleDefender;
