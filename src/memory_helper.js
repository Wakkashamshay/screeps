var memory_helper = {
    initialise_memory: function() {
        Memory.controllers = {};
    },
    id_structures: function() {

    },
    controller_needs_energy: function(controller) {
        Memory.controllers[controller.id] = {
            needs_energy: (controller.progress < controller.progressTotal)
        }
        return Memory.controllers[controller.id].needs_energy;
    },
    spawn_needs_energy: function(spawn) {
        spawn.memory = {
            needs_energy: (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        }
        return spawn.memory.needs_energy;
    }
}

module.exports = memory_helper;