module.exports = {
  "inputs": {
    "name": {
      "id": "b3d05ec1-451e-4185-ac06-d661014e4437",
      "friendlyName": "name",
      "description": "What session value to check",
      "example": "myKey",
      "required": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "void": true,
      "friendlyName": "then",
      "variableName": "result",
      "description": "Normal outcome."
    },
    "notSet": {
      "friendlyName": "notSet",
      "description": "",
      "example": "abc123"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var key = inputs.name;

    // Make sure the session isn't an empty string
    if (env.req.session[key] && env.req.session[key] !== '') {
      return exits.success();
    } else {
      return exits.notSet();
    }
  },
  "identity": "DoesSessionValueExist_question"
};