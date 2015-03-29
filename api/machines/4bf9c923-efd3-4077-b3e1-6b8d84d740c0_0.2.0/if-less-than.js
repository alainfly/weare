module.exports = {
  "inputs": {
    "a": {
      "friendlyName": "Lesser value",
      "description": "The first value to check (expected to be less than the second).",
      "extendedDescription": "A value of any type may be provided.",
      "typeclass": "*",
      "required": true,
      "type": "*",
      "name": "a"
    },
    "b": {
      "friendlyName": "Other value",
      "description": "The second value to check (expected to be greater than the first).",
      "extendedDescription": "A value of any type may be provided.",
      "typeclass": "*",
      "required": true,
      "type": "*",
      "name": "b"
    },
    "isInclusive": {
      "friendlyName": "Inclusive? (<=)",
      "description": "Whether to trigger the \"then\" exit if both values are equal.",
      "defaultsTo": false,
      "example": true,
      "extendedDescription": "If set, this machine will use the <= operator for comparison.",
      "type": "boolean",
      "name": "isInclusive"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "otherwise": {
      "friendlyName": "else",
      "description": "The first value is NOT less than the second.",
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
    if (inputs.isInclusive) {
      if (inputs.a <= inputs.b) {
        return exits.success();
      }
      return exits.otherwise();
    }
    if (inputs.a < inputs.b) {
      return exits.success();
    }
    return exits.otherwise();
  },
  "identity": "if-less-than"
};