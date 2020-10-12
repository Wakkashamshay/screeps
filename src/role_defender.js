var con = require("./constants");

var role_defender = {
    body: ["tough", "tough", "tough", "tough", "tough", "tough", "tough", "tough", "tough", "tough", "tough", "tough", "attack", "move", "move"],
    create_memory: function (initial_target) {
        return {
            role: con.WAKKA_ROLE_DEFENDER,
            target: initial_target ? ((initial_target !== undefined) && (initial_target.id !== undefined)) : initial_target
        }
    },
    run: function (creep) {
        // Find new target if current target not valid
        if (creep.memory.target === undefined || creep.memory.target === false || Game.getObjectById(creep.memory.target.id) === undefined) {
            // Do something more intelligent here
            for (let hostile of creep.room.memory.hostiles) {
                console.log(hostile);
                creep.memory.target = hostile;
                break;
            }
        }

        if ((Math.abs(creep.memory.target.pos.x - creep.pos.x) > 1) || (Math.abs(creep.memory.target.pos.y - creep.pos.y) > 1)) {
            creep.moveTo(creep.memory.target.pos.x, creep.memory.target.pos.y);
        } else {
            creep.attack(Game.getObjectById(creep.memory.target.id));
        }
    }
}

module.exports = role_defender;