let memory_helper = {
    initialise_memory: function() {
        for (let room in Game.rooms) {
            Game.rooms[room].memory.harvesters_energy = 0;
        }
        Memory.controllers = {};
    },
    id_structures: function() {
        for (let structure in Game.structures) {
            switch (Game.structures[structure].structureType) {
                case STRUCTURE_SPAWN :
                    Game.rooms[Game.structures[structure].room.name].memory.spawns = [];
                    Game.rooms[Game.structures[structure].room.name].memory.spawns.push({
                        id: Game.structures[structure].id
                    });
                    break;
            }
        }
    },
    find_hostiles: function(room) {
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            Game.rooms[room.name].memory.hostiles_present = true;
            Game.rooms[room.name].memory.hostiles = hostiles;
        } else {
            Game.rooms[room.name].memory.hostiles_present = false;
        }
    },
    find_resources: function(room) {
        // Find resources
        let energy_sources = room.find(FIND_SOURCES);

        if (room.memory.resources == undefined) {
            room.memory.resources = {};
            room.memory.resources.energy = {};

            for (let source in energy_sources) {
                room.memory.resources.energy[energy_sources[source].id] = {
                    node: energy_sources[source],
                    path_to: room.findPath(room.controller.pos, energy_sources[source].pos, {serialise: false}),
                    path_from: room.findPath(energy_sources[source].pos, (room.controller.pos), {serialise: false}),
                }
            }
        }
    },
}

module.exports = memory_helper;