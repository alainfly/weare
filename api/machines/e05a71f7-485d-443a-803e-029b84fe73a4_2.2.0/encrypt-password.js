module.exports = {
  "inputs": {
    "password": {
      "example": "l0lcatzz",
      "friendlyName": "Password",
      "description": "String to be encrypted",
      "required": true,
      "protect": true,
      "type": "string",
      "name": "password"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "example": "2$a492.abc3fadifhoi3hesdqd",
      "description": "OK.",
      "isDefault": true,
      "type": "string",
      "name": "success",
      "friendlyName": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var difficulty = inputs.difficulty || 10;

    require('bcrypt-nodejs').hash(inputs.password, null, null, function(err, hash) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(hash);
    });

  },
  "identity": "encrypt-password"
};