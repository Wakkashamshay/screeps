var mh = require("./memory_helper");
var cd = require("./creep_definitions");

var resource_manager = {
    room_check: function () {
        mh.id_structures();

        for (let room in Game.rooms) {
            // Is there a controller and is it my controller?
            if (Game.rooms[room].controller !== undefined && Game.rooms[room].controller.my) {
                mh.find_resources(Game.rooms[room]);
                this.manage_civilians(Game.rooms[room]);
            }
        }
    },
    manage_civilians: function (room) {
        // Either we need to create a creep for the resource or we need to replace them
        for (let resource in room.memory.resources.energy) {
            console.log("is it dad " + Game.getObjectById(room.memory.resources.energy[resource].worker) == null);
            if (room.memory.resources.energy[resource].worker == undefined || Game.getObjectById(room.memory.resources.energy[resource].worker) == null) {
                this.createWorkerForResource(room, room.memory.resources.energy[resource]);
            } else {
                room.memory.resources.energy[resource].worker == -1;
            }
        }
    },
    createWorkerForResource: function (room, resource) {
        if (room.memory.spawns[0] !== undefined) {
            var result = Game.getObjectById(room.memory.spawns[0].id).spawnCreep(cd.roles.harvester.body, (room.name + "-" + Math.floor(Math.random() * 1000)), {memory: cd.roles.harvester.create_memory(resource)});
            switch (result) {
                case OK:
                    break;
                default:
                    break;
            }
        }
    }
}

module.exports = resource_manager;