var memory_helper = {

    controller_needs_energy: function(controller) {
        console.log("controllers");
        Memory.controllers[controller.id] = {
            needs_energy: (controller.progress < controller.progressTotal)
        }
        return Memory.controllers[controller.id].needs_energy;
    },
    spawn_needs_energy: function(spawn) {
        console.log("spawns");
        spawn.memory = {
            needs_energy: (spawn.store.getFreeCapacity("energy") > 0)
        }
        return spawn.memory.needs_energy;
    }
}

module.exports = memory_helper;