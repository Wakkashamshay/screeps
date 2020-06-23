var role_harvester = {

    spawn_definition: function (resource) {
        return {
            body: ["work", "work", "work", "work", "work", "move", "move", "move", "carry"],
            memory: {
                role: ROLE_HARVESTER,
                harvested: false,
                target: resource
            }
        }
    },

    run: function (creep) {
        if (!creep.memory.harvested) {
            if ((Math.abs(creep.memory.target.node.pos.x - creep.pos.x) > 1) || (Math.abs(creep.memory.target.node.pos.y - creep.pos.y) > 1)) {
                creep.moveByPath(creep.memory.target.path_to);
            } else {
                creep.harves(creep.memory.target.node);
            }
        }
        if (Memory.controllers[Game.getObjectById(Game.rooms.controller.id)].needs_energy) {
            
        }
    }
}