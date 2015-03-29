module.exports = {
  "inputs": {
    "data": {
      "id": "8aa72c29-4d9c-4272-8e86-1ca5be769127",
      "friendlyName": "data",
      "description": "The data to save in the session.",
      "typeclass": "dictionary",
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

    // Merge provided data into session
    _.extend(env.req.session, inputs.data);
    return exits();
  },
  "identity": "Remember"
};