const roleBuilder = {
    code: 100,
    body: [
        "work",
        "work",
        "move",
        "carry"
    ],
    initialMemory: function (resource) {
        return {
            role: this.code,
        };
    },
    run: function (creep) {
    },
};

module.exports = roleBuilder;
