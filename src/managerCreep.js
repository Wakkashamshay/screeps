let con = require("./constants");

let managerCreep = {
    runAll: function () {
        for (const creep in Game.creeps) {
            switch (Game.creeps[creep].memory.role) {
                case con.roles.WAKKA_HARVESTER.code:
                    con.roles.WAKKA_HARVESTER.run(Game.creeps[creep]);
                    break;
                case con.roles.WAKKA_DEFENDER.code:
                    con.roles.WAKKA_DEFENDER.run(Game.creeps[creep]);
                    break;
            }
        }
    },
};

module.exports = managerCreep;
