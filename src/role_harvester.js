var con = require("./constants");

var role_harvester = {

    body: ["work", "work", "move", "carry"],
    create_memory: function (resource) {
        return {
            role: con.WAKKA_ROLE_HARVESTER,
            harvested: false,
            target: resource
        }
    },
    run: function (creep) {
        if (!creep.memory.harvested) {
            if (creep.harvest(creep.memory.target.node) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.target.node);
            } else {
                creep.harvest(creep.memory.target.node);
            }
        }
        
    }
}

module.exports = role_harvester;