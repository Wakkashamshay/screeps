var mh = require("./memory_helper");

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
        console.log("test222");
        if (room.memory.count_harvesters < room.memory.resources.energy.length) {
            for (i = 0; i < room.memory.resources.energy.length; i++) {
                if (!room.memory.resources.energy[i].worker) {
                    this.createWorkerForResource(room, room.memory.resources.energy[i]);
                    room.memory.resources.energy[i].worker = true;
                }
            }

        }
    },
    createWorkerForResource: function (room, resource) {
        console.log("test2" + room);
        if (room.memory.spawns[0] !== undefined) {
            Game.getObjectById(room.memory.spawns[0].id).spawnCreep(resource);
        }
    }
}

module.exports = resource_manager;