module.exports = {
  "inputs": {},
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "void": true,
      "friendlyName": "then",
      "variableName": "result",
      "description": "Normal outcome."
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    return exits.success(function() {
      if (session["userid"]) {
        var session = session["userid"];
      }
      return session;
    });
  },
  "identity": "SessionCheck"
};