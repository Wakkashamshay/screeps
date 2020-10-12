var con = require("./constants");
var cd = require("./creep_definitions");

var creep_manager = {
    run_all: function() {
        for (let creep in Game.creeps) {
            switch (Game.creeps[creep].memory.role) {
                case con.WAKKA_ROLE_HARVESTER :
                    cd.roles.harvester.run(Game.creeps[creep]);
                    break;
                case con.WAKKA_ROLE_DEFENDER :
                    cd.roles.defender.run(Game.creeps[creep]);
                    break;
            }
        }
    }
}

module.exports = creep_manager;