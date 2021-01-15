let mr = require("./managerResource");
let mc = require("./managerCreep");
let hm = require("./helperMemory");

hm.initializeMemory();

module.exports.loop = function () {
    if (Game.time % 20 === 0) {
        mr.roomCheck();
    }

    mc.runAll();
}