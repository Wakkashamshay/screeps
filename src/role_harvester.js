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
        creep.room.memory.resources.energy[creep.memory.target.id].worker = creep.id;

        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.harvested = false;
            creep.memory.dropoff = {};
        }

        if (!creep.memory.harvested) {
            if ((Math.abs(creep.memory.target.node.pos.x - creep.pos.x) > 1) || (Math.abs(creep.memory.target.node.pos.y - creep.pos.y) > 1)) {
                creep.moveTo(creep.memory.target.node.pos.x, creep.memory.target.node.pos.y);
            } else {
                creep.harvest(Game.getObjectById(creep.memory.target.node.id));
                if (creep.store.getFreeCapacity([RESOURCE_ENERGY]) < 1) {
                    creep.memory.harvested = true;

                    if (creep.room.controller.progress < creep.room.controller.progressTotal) {
                        creep.memory.dropoff = {};
                        creep.memory.dropoff.type = STRUCTURE_CONTROLLER;
                        creep.memory.dropoff.target = creep.room.controller;
                    } else {
                        for (spawn in creep.room.controller.memory.spawns) {
                            if (spawn.store.getFreeCapacity([RESOURCE_ENERGY]) > 0) {
                                creep.memory.dropoff = {};
                                creep.memory.dropoff.type = STRUCTURE_SPAWN;
                                creep.memory.dropoff.target = spawn;
                                break;
                            }
                        }
                    }
                }
            }
        } 
        
        if (dropoff.type !== undefined) {
            if ((Math.abs(creep.memory.dropoff.pos.x - creep.pos.x) > 1) || (Math.abs(creep.memory.dropoff.pos.y - creep.pos.y) > 1)) {
                creep.moveTo(creep.memory.dropoff.pos.x, creep.memory.dropoff.pos.y);
            } else {
                switch (dropoff.type) {
                    case STRUCTURE_CONTROLLER :
                        creep.upgradeController(Game.getObjectById(creep.memory.dropoff.id));
                        break;
                    case STRUCTURE_SPAWN :
                        creep.transfer(Game.getObjectById(creep.memory.dropoff.id), RESOURCE_ENERGY, 1);
                        break;
                }
            }
        }
    }
}

module.exports = role_harvester;