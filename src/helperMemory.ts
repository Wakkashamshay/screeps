import { xor } from "lodash";

let helperMemory = {
    initializeMemory: function () {
        for (const room in Game.rooms) {

        }
        Memory.controllers = {};
    },
    idStructures: function (room) {
        room.memory.spawns = [];
        room.memory.turrets = [];
        room.memory.extensions = [];

        for (const structure of room.find(FIND_MY_STRUCTURES)) {
            switch (structure.structureType) {
                case STRUCTURE_SPAWN:
                    structure.room.memory.spawns.push({
                        id: structure.id
                    });
                    break;
                case STRUCTURE_TOWER:
                    structure.room.memory.turrets.push({
                        id: structure.id
                    });
                    break;
                case STRUCTURE_EXTENSION:
                    structure.room.memory.extensions.push({
                        id: structure.id
                    });
                    break;
            }
        }
    },
    generateBuildRequests: function (room) {
        // Require a minimum RCL of 3 to build anything useful
        if (room.controller.level < 3) {
            return false;
        }

        // Determine the number of turrets and extensions based on infrastructure?
        if (room.memory.turrets.length < 2) {
            if (room.memory.spawns.length) {
                const origin = Game.getObjectById(room.memory.spawns[0].id).pos;

                let placementMatrix = [
                    [0, -2], [0, -3], [0, 2], [0, 3],
                    [-2, 0], [-3, 0], [2, 0], [3, 0]
                ]

                let attemptSite = false;

                while (attemptSite = placementMatrix.pop()) {
                    const buildResult = room.createConstructionSite(
                        (origin.x + attemptSite[0]),
                        (origin.y + attemptSite[1]),
                        STRUCTURE_TOWER
                    );

                    if (buildResult === OK) {
                        break;
                    } else {
                        console.log(buildResult);
                    }
                }
            }
        }
    },
    findHostiles: function (room) {
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            Game.rooms[room.name].memory.hostilesPresent = true;
            Game.rooms[room.name].memory.hostiles = hostiles;
        } else {
            Game.rooms[room.name].memory.hostilesPresent = false;
            Game.rooms[room.name].memory.hostiles = false;
        }
    },
    findResources: function (room) {
        // Find resources
        // TODO: order them on the closest sources, then check if there's
        //       space for more than one harvester. Maybe store the targets
        //       for the standing positions?
        if (room.memory.resources === undefined) {
            room.memory.resources = {};
            room.memory.resources.energy = {};

            let energySources = room.find(FIND_SOURCES);
            let hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);

            for (const source of energySources) {
                let hostileNear = false;

                hostileStructures.forEach(hostile => {
                    if ((Math.abs(hostile.pos.x - source.pos.x) <= 15) &&
                        (Math.abs(hostile.pos.y - source.pos.y) <= 15)) {
                            hostileNear = true;
                        return;
                    }
                });

                // We want to find the spots where a creep can stand to access it
                let spots = [];
                for (let y = -1; y <= 1; y++) {
                    for (let x = -1; x <= 1; x++) {
                        if (room.getTerrain().get(source.pos.x + x, source.pos.y + y) === 0) {
                            spots.push([source.pos.x + x, source.pos.y + y]);
                        }
                    }
                }

                room.memory.resources.energy[source.id] = {
                    worker: false,
                    node: source,
                    spots: spots,
                    hostile: hostileNear
                }
                //path_to: room.findPath(room.controller.pos, energySources[source].pos, { serialise: false }),
                //path_from: room.findPath(energySources[source].pos, (room.controller.pos), { serialise: false }),
            }

            // Sort based on distance to spawn
        }
    }
}

module.exports = helperMemory;