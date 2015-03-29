module.exports = {
  "inputs": {
    "keys": {
      "id": "42423f9b-b5b8-4774-abe5-876731f4ad5e",
      "friendlyName": "keys",
      "description": "The keys to remove from the session.",
      "example": [
        "somekey"
      ],
      "required": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "then": {
      "void": true,
      "friendlyName": "then",
      "variableName": "result",
      "description": "Normal outcome."
    }
  },
  "defaultExit": "then",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    // Delete each key from the session
    _.each(inputs.keys, function(key) {
      delete env.req.session[key];
    });
    return exits();
  },
  "identity": "Forget"
};