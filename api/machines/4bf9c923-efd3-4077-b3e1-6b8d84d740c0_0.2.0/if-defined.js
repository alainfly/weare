module.exports = {
  "inputs": {
    "value": {
      "friendlyName": "Value",
      "description": "The value to check.",
      "extendedDescription": "A value of any type may be provided.  If it evaluates to 'undefined', the 'otherwise' exit will be triggered.  Otherwise the 'then' exit will be triggered.",
      "typeclass": "*",
      "required": true,
      "type": "*",
      "name": "value"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "otherwise": {
      "friendlyName": "else",
      "description": "The value is undefined.",
      "name": "otherwise"
    },
    "success": {
      "friendlyName": "then",
      "description": "OK.",
      "getExample": function(inputs, env, input) {
        return inputs.value;
      },
      "isDefault": true,
      "hasDynamicOutputType": true,
      "name": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    if (typeof(inputs.value) === 'undefined') {
      return exits.otherwise();
    }
    return exits.success(inputs.value);
  },
  "identity": "if-defined"
};