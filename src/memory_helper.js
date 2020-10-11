var memory_helper = {
    initialise_memory: function() {
        for (var room in Game.rooms) {
            Game.rooms[room].memory.harvesters_energy = 0;   
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
                    break;
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
                room.memory.resources.energy.push(
                    energy_sources[source].id: {
                        node: energy_sources[source],
                        path_to: room.findPath(room.controller.pos, energy_sources[source].pos, {serialise: false}),
                        path_from: room.findPath(energy_sources[source].pos, (room.controller.pos), {serialise: false}),
                    }
                );
            }
        }
    },
}

module.exports = memory_helper;