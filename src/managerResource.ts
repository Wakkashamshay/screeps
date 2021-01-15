let con = require("./constants");
let hm = require("./helperMemory");

let managerResource = {
    roomCheck: function () {
        for (const room in Game.rooms) {
            // Is there a controller and is it my controller?
            if (
                Game.rooms[room].controller !== undefined &&
                Game.rooms[room].controller.my
            ) {
                hm.idStructures(Game.rooms[room]);
                hm.findHostiles(Game.rooms[room]);
                hm.findResources(Game.rooms[room]);
                hm.generateBuildRequests(Game.rooms[room]);
                //this.manageDefenders(Game.rooms[room]);
                this.manageCivilians(Game.rooms[room]);
            }
        }
    },
    manageDefenders: function (room) {
        // Should not spam defenders if we have no workers?
        if (room.memory.hostilesPresent !== undefined && room.memory.hostilesPresent) {
            this.createDefender(room, false);
        }
    },
    manageCivilians: function (room) {
        // Either we need to create a creep for the resource or we need to replace one
        for (const resource in room.memory.resources.energy) {
            // Does a spawning creep have an ID?
            if (!room.memory.resources.energy[resource].hostile &&
                !Game.getObjectById(room.memory.resources.energy[resource].worker) &&
                !room.memory.resources.energy[resource].worker) {
                room.memory.resources.energy[resource].worker = true;
                this.createWorkerForResource(
                    room,
                    room.memory.resources.energy[resource]
                );
            } else {
                room.memory.resources.energy[resource].worker = false;
            }
        }
    },
    createDefender: function (room, initialTarget) {
        if (room.memory.spawns[0] !== undefined) {
            const result = Game.getObjectById(room.memory.spawns[0].id).spawnCreep(
                con.roles.WAKKA_DEFENDER.body,
                room.name + "-" + Math.floor(Math.random() * 1000),
                { memory: con.roles.WAKKA_DEFENDER.initialMemory(initialTarget) }
            );
            switch (result) {
                case OK:
                    break;
                default:
                    break;
            }
        }
    },
    createWorkerForResource: function (room, resource) {
        if (room.memory.spawns[0] !== undefined) {
            const result = Game.getObjectById(room.memory.spawns[0].id).spawnCreep(
                con.roles.WAKKA_HARVESTER.body,
                room.name + "-" + Math.floor(Math.random() * 1000),
                { memory: con.roles.WAKKA_HARVESTER.initialMemory(resource) }
            );
            switch (result) {
                case OK:
                    break;
                default:
                    break;
            }
        }
    },
};

module.exports = managerResource;
