var mh = require("./memory_helper");

var resource_manager = {
    
    room_check: function() {
        console.log(JSON.parse(Game.spawns));
        for (let i = 0; i < Game.rooms.size; i++) {
            // Is there a controller and is it my controller?
            if (Game.rooms[i].controller !== undefined && Game.rooms[i].controller.my) {
                mh.controller_needs_energy(Game.rooms[i].controller);
            }
        }
        for (let i = 0; i < Game.spawns.size; i++) {
            mh.spawn_needs_energy(Game.spawns[i]);
        }
    }
}

module.exports = resource_manager;