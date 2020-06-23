var memory_helper = {
    initialise_memory: function() {
        for (var room in Game.rooms) {
            Game.rooms[room].memory.count_harvesters = 0;   
        }
        Memory.controllers = {};
    },
    id_structures: function() {
        for (var structure in Game.structures) {
            switch (Game.structures[structure].structureType) {
                case STRUCTURE_SPAWN :
                    Game.rooms[Game.structures[structure].room.name].memory.spawns = [];
                    Game.rooms[Game.structures[structure].room.name].memory.spawns.push({
                        id: Game.structures[structure].id
                    });
            }
        }
    },
    find_resources: function(room) {
        // Find resources
        var energy_sources = room.find(FIND_SOURCES);

        if (room.memory.resources == undefined) {
            room.memory.resources = {};
            room.memory.resources.energy = [];

            for (var source in energy_sources) {
                room.memory.resources.energy.push({
                    node: energy_sources[source],
                    path_to: room.findPath(room.controller.pos, energy_sources[source].pos, {serialise: true}),
                    path_from: room.findPath(energy_sources[source].pos, {serialise: true}, (room.controller.pos)),
                    worker: false
                });
            }
        }
    },
    controller_needs_energy: function(controller) {
        Memory.controllers[controller.id] = {
            needs_energy: (controller.progress < controller.progressTotal)
        }
        return Memory.controllers[controller.id].needs_energy;
    },
    spawn_needs_energy: function(spawn) {
        spawn.memory = {
            needs_energy: (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        }
        return spawn.memory.needs_energy;
    }
}

module.exports = memory_helper;