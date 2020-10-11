var mh = require("./memory_helper");
var cd = require("./creep_definitions");

var resource_manager = {

    room_check: function () {
        mh.id_structures();

        for (var room in Game.rooms) {
            // Is there a controller and is it my controller?
            if (Game.rooms[room].controller !== undefined && Game.rooms[room].controller.my) {
                mh.find_resources(Game.rooms[room]);
                mh.controller_needs_energy(Game.rooms[room].controller);
                this.manage_civilians(Game.rooms[room]);
            }
        }
    },
    manage_civilians: function (room) {
        if (room.memory.count_harvesters < room.memory.resources.energy.length) {
            for (i = 0; i < room.memory.resources.energy.length; i++) {
                if (!room.memory.resources.energy[i].worker) {
                    this.createWorkerForResource(room, room.memory.resources.energy[i]);
                }
            }

        }
    },
    createWorkerForResource: function (room, resource) {
        if (room.memory.spawns[0] !== undefined) {
            var result = Game.getObjectById(room.memory.spawns[0].id).spawnCreep(cd.roles.harvester.body, (room.name + "-" + Math.floor(Math.random() * 1000)), {memory: cd.roles.harvester.create_memory(resource)});
            switch (result) {
                case OK:
                    room.memory.resources.energy[i].worker = true;
                    break;
                default:
                    console.log(JSON.stringify(Game.getObjectById(room.memory.spawns[0].id).spawnCreep(cd.roles.harvester.body, (room + "-" + Math.floor(Math.random() * 1000)), {memory: cd.roles.harvester.create_memory(resource)})));
                    break;
            }
        }
    }
}

module.exports = resource_manager;