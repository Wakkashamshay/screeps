const roleHarvester = {
    code: 101,
    body: [
        "work",
        "work",
        "move",
        "carry"
    ],
    initialMemory: function (resource) {
        return {
            role: this.code,
            harvested: false,
            dropoff: false,
            target: resource,
        };
    },
    run: function (creep) {
        // Take responsibility for a resource
        creep.room.memory.resources.energy[creep.memory.target.node.id].worker =
            creep.id;

        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.harvested = false;
            creep.memory.dropoff = false;
        }

        if (!creep.memory.harvested) {
            if (Math.abs(creep.memory.target.node.pos.x - creep.pos.x) > 1 ||
                Math.abs(creep.memory.target.node.pos.y - creep.pos.y) > 1) {
                creep.moveTo(
                    creep.memory.target.node.pos.x,
                    creep.memory.target.node.pos.y
                );
            } else {
                creep.harvest(Game.getObjectById(creep.memory.target.node.id));
                if (creep.store.getFreeCapacity([RESOURCE_ENERGY]) === 0) {
                    creep.memory.harvested = true;

                    for (const spawn in creep.room.memory.spawns) {
                        if (Game.getObjectById(creep.room.memory.spawns[spawn].id).store.getFreeCapacity([RESOURCE_ENERGY]) > 0) {
                            creep.memory.dropoff = {
                                type: STRUCTURE_SPAWN,
                                target: creep.room.memory.spawns[spawn].id
                            }
                            break;
                        }
                    }

                    if (!creep.memory.dropoff &&
                        creep.room.controller.progress < creep.room.controller.progressTotal) {
                        creep.memory.dropoff = {
                            type: STRUCTURE_CONTROLLER,
                            target: creep.room.controller.id
                        }
                    }
                }
            }
        }

        if (creep.memory.dropoff) {
            let dropoff = Game.getObjectById(creep.memory.dropoff.target);

            if (
                Math.abs(dropoff.pos.x - creep.pos.x) > 1 ||
                Math.abs(dropoff.pos.y - creep.pos.y) > 1
            ) {
                creep.moveTo(
                    dropoff.pos.x,
                    dropoff.pos.y
                );
            } else {
                switch (dropoff.structureType) {
                    case STRUCTURE_CONTROLLER:
                        creep.upgradeController(
                            Game.getObjectById(dropoff.id)
                        );
                        break;
                    case STRUCTURE_SPAWN:
                        creep.transfer(
                            dropoff,
                            RESOURCE_ENERGY
                        );
                        break;
                }
            }
        }
    },
};

module.exports = roleHarvester;
