module.exports = {
  "inputs": {
    "a": {
      "friendlyName": "Value",
      "description": "The first value to check (expected to be equal to the second).",
      "extendedDescription": "A value of any type may be provided.",
      "typeclass": "*",
      "required": true,
      "type": "*",
      "name": "a"
    },
    "b": {
      "friendlyName": "Other value",
      "description": "The second value to check (expected to be equal to the first).",
      "extendedDescription": "A value of any type may be provided.",
      "typeclass": "*",
      "required": true,
      "type": "*",
      "name": "b"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "otherwise": {
      "friendlyName": "else",
      "description": "The first value is NOT equal to the second.",
      "name": "otherwise"
    },
    "success": {
      "friendlyName": "then",
      "description": "OK.",
      "isDefault": true,
      "name": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    if (_.isEqual(inputs.a, inputs.b)) {
      return exits.success();
    }
    return exits.otherwise();
  },
  "identity": "if-equal"
};