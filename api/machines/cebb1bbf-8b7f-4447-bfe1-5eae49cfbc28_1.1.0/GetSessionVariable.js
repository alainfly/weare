module.exports = {
  "inputs": {
    "key": {
      "id": "d2aa7b12-4396-4486-b98c-bb44fba11971",
      "extendedDescription": "Note that currently only strings are supported in the session.",
      "friendlyName": "key",
      "description": "The key to retrieve from the session.",
      "required": true,
      "example": "a string"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "then": {
      "id": "then",
      "friendlyName": "then",
      "description": "Normal outcome.",
      "example": "Some string"
    }
  },
  "defaultExit": "then",
  "fn": function(inputs, exits, env) {
    return exits.then(env.req.session[inputs.key]);
  },
  "identity": "GetSessionVariable"
};