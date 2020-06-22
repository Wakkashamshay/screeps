var mh = require("./memory_helper");

var resource_manager = {
    
    room_check: function() {
        mh.id_structures();

        for (room in Game.rooms) {
            // Is there a controller and is it my controller?
            if (Game.rooms[room].controller !== undefined && Game.rooms[room].controller.my) {
                mh.controller_needs_energy(Game.rooms[room].controller);
            }
        }
    }
}

module.exports = resource_manager;