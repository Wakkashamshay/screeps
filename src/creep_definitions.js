var role_harvester = require("./role_harvester");
var role_defender = require("./role_defender");

var creep_definitions = {
    roles: {
        harvester: role_harvester,
        defender: role_defender
    }
}

module.exports = creep_definitions;