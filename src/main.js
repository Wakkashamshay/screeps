var rm = require("./resource_manager");
var mh = require("./memory_helper");

mh.initialise_memory();

module.exports.loop = function() {
    
    if (Game.time % 20 === 0) {
        rm.room_check();
        rm.manage_civilians();
    }
}